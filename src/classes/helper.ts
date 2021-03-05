import LastFM from "..";
import { Image } from "../interfaces/shared";
import * as ArtistInterface from "../interfaces/artistInterface";
import * as AlbumInterface from "../interfaces/albumInterface";
import * as TrackInterface from "../interfaces/trackInterface";
import * as UserInterface from "../interfaces/userInterface";

import {EventEmitter} from "events";
import TypedEmitter from "typed-emitter";

interface ScrobbleEmitter {
	start: (meta:{totalPages:number, count:number}) => void;
	data: (data:{data:UserInterface.getRecentTracks, completedPages:number, totalPages:number, progress:number}) => void;
	close: () => void;
	internalDontUse: (data:UserInterface.getRecentTracks|number) => void;
	error: (err:NodeJS.ErrnoException, intendedPage:number) => void;
}

export default class HelperClass {

	private lastfm:LastFM;

	public constructor(lastfm:LastFM) {
		this.lastfm = lastfm;
	}

	public async getCombo(usernameOrSessionKey:string, limit:number) {
		let combo = [true, true, true];
		let comboData:[string,number][] = [["",0],["",0],["",0]];
		let page = 0;
		let nowplaying = false;
		let trueLimit = 1000;
		let image:Image[] = [];
		while (limit > 0 && combo[0] === combo[1] && combo[1] === combo[2] && combo[2] === true) {

			if (limit < 1000 && page > 0) {

				trueLimit = limit;
				limit = 1000;

			} else if (page === 0 && limit <= 1000) {

				trueLimit = limit;

			}

			page++;

			let res = await this.lastfm.user.getRecentTracks(usernameOrSessionKey, {limit: Math.min(1000, limit), page});

			if (page === 1) {
				comboData[0][0] = res.tracks[0].artist.name;
				comboData[1][0] = res.tracks[0].album.name;
				comboData[2][0] = res.tracks[0].name;
				image = res.tracks[0].image;

				if (comboData[1][0] === "") {
					combo[1] = false;
				}
			}

			if (res.tracks[0]?.nowplaying) {
				nowplaying = true;
				res.tracks = res.tracks.slice(1);
			}

			for (let i = 0; i < trueLimit; i++) {
				if (!combo[0] && !combo[1] && !combo[2]) {
					break;
				}

				if (combo[0]) {
					if (comboData[0][0] === res.tracks[Number(i)].artist.name) {
						comboData[0][1]++;
					} else {
						combo[0] = false;
					}
				}

				if (combo[1]) {
					if (comboData[1][0] === res.tracks[Number(i)].album.name) {
						comboData[1][1]++;
					} else {
						combo[1] = false;
					}
				}

				if (combo[2]) {
					if (comboData[2][0] === res.tracks[Number(i)].name) {
						comboData[2][1]++;
					} else {
						combo[2] = false;
					}
				}
			}

		}

		return {
			artist: {
				name:comboData[0][0],
				combo:comboData[0][1]
			},
			album: {
				name:comboData[1][0],
				combo:comboData[1][1]
			},
			track: {
				name:comboData[2][0],
				combo:comboData[2][1]
			},
			nowplaying,
			image
		};
	}

	public async getNowPlaying(usernameOrSessionKey:string, detailTypes:("artist"|"album"|"track")[] = []) {

		const curr = (await this.lastfm.user.getRecentTracks(usernameOrSessionKey, {limit: 1}));
		const currTrack = curr.tracks[0]

		const artist = currTrack.artist.name;
		const track = currTrack.name;
		const image = currTrack.image;
		const album = currTrack.album?.name;
		const url = currTrack.url;
		const username = curr.meta.user;
		const nowplaying = currTrack?.nowplaying === "true";

		const details:{
			artist:{
				data?:ArtistInterface.getInfo;
				successful:boolean;
			}
			album:{
				data?:AlbumInterface.getInfo;
				successful:boolean;
			}
			track:{
				data?:TrackInterface.getInfo;
				successful:boolean;
			}
		} = {
			artist: {
				successful: false
			},
			album: {
				successful: false
			},
			track: {
				successful: false
			}
		};

		if (detailTypes !== []) {

			const res = await this.fetchDetails(usernameOrSessionKey, detailTypes, artist, album, track);

			const exists = res.map((e) => typeof e !== "undefined" && typeof e.error === "undefined");

			let i = 0;

			if (detailTypes.includes("artist")) {
				details.artist.data = res[i];
				details.artist.successful = exists[i];
				i++;
			}
			if (detailTypes.includes("album") && album) {
				details.album.data = res[i];
				details.album.successful = exists[i];
				i++;
			}
			if (detailTypes.includes("track")) {
				details.track.data = res[i];
				details.track.successful = exists[i];
				i++;
			}

			return {
				recent: {
					artist,
					album,
					track,
					image,
					url,
					username,
					nowplaying
				},
				details
			};

		}

		return {
			recent: {
				artist,
				album,
				track,
				image,
				url,
				nowplaying
			},
			details: {
				artist: {
					successful: false
				},
				album: {
					successful: false
				},
				track: {
					successful: false
				},
			}
		}

	}

	public async getMatchingArtists(user1:string, user2:string, limit:number, period:"overall"|"7day"|"1month"|"3month"|"6month"|"12month") {
		
		this.checkLimit(limit, 1000);

		let request = [
			this.lastfm.user.getTopArtists(user1, {limit, period}),
			this.lastfm.user.getTopArtists(user2, {limit, period})
		];

		const res = await Promise.all(request);

		return this.getIntersection(res[0].artists, res[1].artists);

	}

	public ArtistFromMBID(mbid:string) {
		return {
			mbid
		}
	}

	public ArtistFromName(artist:string) {
		return {
			artist
		}
	}

	public AlbumFromMBID(mbid:string) {
		return {
			mbid
		}
	}

	public AlbumFromName(artist:string, album:string) {
		return {
			artist,
			album
		}
	}

	public TrackFromMBID(mbid:string) {
		return {
			mbid
		}
	}

	public TrackFromName(artist:string, track:string) {
		return {
			artist,
			track,
		}
	}

	public async cacheScrobbles(user:string, options?:{previouslyCached?:number, parallelCaches?:number, rateLimitTimeout?:number}) {

		let scrobbleEmitter = new EventEmitter() as TypedEmitter<ScrobbleEmitter>;

		this.handleCaching(user, scrobbleEmitter, options);

		return scrobbleEmitter;

	}

	private async handleCaching(user:string, scrobbleEmitter:TypedEmitter<ScrobbleEmitter>, options?:{previouslyCached?:number, parallelCaches?:number, rateLimitTimeout?:number}) {
		let count:number;
		try {
			count = parseInt((await this.lastfm.user.getRecentTracks(user, {limit: 1})).meta.total);
		} catch {
			let rateLimitInterval = setInterval(() => {
				
				try {
					this.handleCaching(user, scrobbleEmitter, options);
				
					clearInterval(rateLimitInterval);
				} catch (err) {

				}
			})
			return;
		}

		let newCount = count - (options?.previouslyCached || 0);
		let totalPages = Math.ceil(newCount / 1000);
		let rateLimited = false;
		let limitTime = options?.rateLimitTimeout || 300000;

		scrobbleEmitter.emit("start", {totalPages, count: newCount});

		let pages = Array(totalPages).fill("").map((_, i) => i + 1);
		let active = Math.min(options?.parallelCaches || 1, totalPages);
		let complete = 0;

		this.attemptClose(active, scrobbleEmitter);

		for (let currPage = 1; currPage <= active; currPage++) {

			pages.shift();
			this.handleCacheInstance(user, scrobbleEmitter, currPage, newCount);

		}

		scrobbleEmitter.on("internalDontUse", (data) => {

			if (typeof data !== "number") {

				complete++;
				let data2 = data as UserInterface.getRecentTracks;

				if (parseInt(data2.meta.page) === totalPages) {
					data2.tracks = data2.tracks.slice(0, newCount % 1000);
				}
				
				scrobbleEmitter.emit("data", {data:data2, completedPages: complete, totalPages, progress: complete / totalPages});

				if (pages.length) {
					if (!rateLimited) {
						this.handleCacheInstance(user, scrobbleEmitter, pages[0], newCount);
						pages.shift();
					} else {

						let rateLimitInterval = setInterval(() => {
							if (!rateLimited) {
								this.handleCacheInstance(user, scrobbleEmitter, pages[0], newCount);
								pages.shift();
								clearInterval(rateLimitInterval);
							}
						})

					}
				} else {
					active--;
					this.attemptClose(active, scrobbleEmitter);
				}
				
			} else {
				if (!rateLimited) {
					this.handleCacheInstance(user, scrobbleEmitter, data, newCount);
				} else {
					let rateLimitInterval = setInterval(() => {
						if (!rateLimited) {
							this.handleCacheInstance(user, scrobbleEmitter, data, newCount);
							clearInterval(rateLimitInterval);
						}
					})
				}
			}

		});

		scrobbleEmitter.on("error", (err, page) => {

			if (err.code == "29") {
				rateLimited = true;
				setTimeout(() => {
					rateLimited = false;
				}, limitTime);
			}

			scrobbleEmitter.emit("internalDontUse", page)

		});

	}

	private attemptClose(active:number, scrobbleEmitter:TypedEmitter<ScrobbleEmitter>) {
		if (active === 0) {
			scrobbleEmitter.emit("close");
			scrobbleEmitter.removeAllListeners();
		}
	}

	private async handleCacheInstance(user:string, scrobbleEmitter:TypedEmitter<ScrobbleEmitter>, page:number, count:number) {

		try {
			let res = await this.lastfm.user.getRecentTracks(user, {limit: 1000, page});
			if (res.tracks[0].nowplaying) {
				res?.tracks?.shift();
			}
	
			scrobbleEmitter.emit("internalDontUse", res);
		} catch(err) {
			scrobbleEmitter.emit("error", err, page);
		}

	}

	private getIntersection(arr1:UserInterface.TopArtist[], arr2:UserInterface.TopArtist[]){
		const aSort = arr1.sort((a, b) => a.name.localeCompare(b.name));
		const bSort = arr2.sort((a, b) => a.name.localeCompare(b.name));
		let i1 = 0;
		let i2 = 0;
		let common = [];

		while (i1 < aSort.length && i2 < bSort.length) {

			const compare = aSort[i1].name.localeCompare(bSort[i2].name);

			if (compare === 0) {
				common.push({
					name: aSort[i1].name,
					url: aSort[i1].url,
					playcount: [parseInt(aSort[i1].playcount), parseInt(bSort[i2].playcount)]
				});
				i1++;
				i2++;
			} else {
				i1 += +(compare < 0);
				i2 += +(compare > 0);
			}
		}
		return common;
	}


	private async fetchDetails(usernameOrSessionKey:string, detailTypes:("artist"|"album"|"track")[], artist:string, album:string, track:string) {

		let promises:Promise<any>[] = [];

		if (detailTypes?.includes("artist")) {
			promises.push(this.lastfm.artist.getInfo({artist}, {username: usernameOrSessionKey}).catch((err) => {}));
		}
		if (detailTypes?.includes("album") && album) {
			promises.push(this.lastfm.album.getInfo({artist, album}, {username: usernameOrSessionKey}).catch((err) => {}));
		}
		if (detailTypes?.includes("track")) {
			promises.push(this.lastfm.track.getInfo({artist, track}, {username: usernameOrSessionKey}).catch((err) => {}));
		}

		return await Promise.all(promises);

	}

	private checkLimit(limit:number|undefined, maxLimit:number) {
		if (typeof limit !== "undefined" && (limit > maxLimit || limit < 1)) {
			throw new Error(`Limit out of bounds (1-${maxLimit}), ${limit} passed`);
		}
	}

}