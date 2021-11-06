import LastFM from "..";
import { Image } from "../interfaces/shared";
import * as ArtistInterface from "../interfaces/artistInterface";
import * as AlbumInterface from "../interfaces/albumInterface";
import * as TrackInterface from "../interfaces/trackInterface";
import * as UserInterface from "../interfaces/userInterface";
import * as HelperInterface from "../interfaces/helperInterface";

import {EventEmitter} from "events";
import TypedEmitter from "typed-emitter";
import { convertString, toInt } from "../caster";

interface ScrobbleEmitter {
	start: (meta:{totalPages:number, count:number}) => void;
	data: (data:{data:UserInterface.getRecentTracks, completedPages:number, totalPages:number, progress:number}) => void;
	close: () => void;
	internalDontUse: (data:UserInterface.getRecentTracks|number) => void;
	error: (err:{
		message:string;
		code:number;
	}, intendedPage:number) => void;
}

export default class HelperClass {

	private lastfm:LastFM;

	public constructor(lastfm:LastFM) {
		this.lastfm = lastfm;
	}

	public async getCombo(username:string, limit:number, params?:{sk?:string}):Promise<HelperInterface.getCombo>;
	public async getCombo(input:HelperInterface.getComboInput):Promise<HelperInterface.getCombo>;
	public async getCombo(firstInput:any, limit?:number) {

		firstInput = convertString(firstInput, "user", {limit: Math.min(1000, limit ?? 200)});

		let combo = [true, true, true];
		let comboData:[string,number][] = [["",0],["",0],["",0]];
		let page = 0;
		let nowplaying = false;
		let trueLimit = 1000;
		let image:Image[] = [];
		while (firstInput.limit > 0 && combo[0] === combo[1] && combo[1] === combo[2] && combo[2] === true) {

			if (firstInput.limit < 1000 && page > 0) {

				trueLimit = firstInput.limit;
				limit = 1000;

			} else if (page === 0 && firstInput.limit <= 1000) {

				trueLimit = firstInput.limit;

			}

			page++;

			let res = await this.lastfm.user.getRecentTracks({...firstInput, page});

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

	public async getNowPlaying(username:string, detailTypes?:("artist"|"album"|"track")[], params?:{sk?:string, extended:boolean}):Promise<HelperInterface.getNowPlaying>;
	public async getNowPlaying(input:HelperInterface.getNowPlayingInput):Promise<HelperInterface.getNowPlaying>;
	public async getNowPlaying(firstInput:any, detailTypes:("artist"|"album"|"track")[] = [], params:{extended:boolean} = {extended: true}) {

		firstInput = convertString(firstInput, "user", {detailTypes, ...params});
		firstInput = this.homogenizeUserInput(firstInput);

		const curr = await this.lastfm.user.getRecentTracks(firstInput.user, {limit: 1, extended: firstInput.extended});
		const currTrack = curr.tracks[0]

		const artist = currTrack.artist.name;
		const track = currTrack.name;
		const image = currTrack.image;
		const album = currTrack.album?.name;
		const url = currTrack.url;
		const username = curr.meta.user;
		const nowplaying = currTrack?.nowplaying;

		const details:{
			recent:{
				data:UserInterface.getRecentTracks;
			}
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
			recent: {
				data: curr
			},
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

		if (firstInput.detailTypes) {

			const res = await this.fetchDetails(firstInput.user, firstInput.detailTypes, artist, album, track);

			const exists = res.map((e) => typeof e !== "undefined" && typeof e.error === "undefined");

			let i = 0;

			if (firstInput.detailTypes.includes("artist")) {
				details.artist.data = res[i];
				details.artist.successful = exists[i];
				i++;
			}
			if (firstInput.detailTypes.includes("album") && album) {
				details.album.data = res[i];
				details.album.successful = exists[i];
				i++;
			}
			if (firstInput.detailTypes.includes("track")) {
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
				username,
				nowplaying
			},
			details: {
				recent: {
					data: curr
				},
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
		};

	}

	public async getMatchingArtists(user1:string, user2:string, limit:number, period:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"):Promise<HelperInterface.getMatchingArtists>;
	public async getMatchingArtists(input:HelperInterface.getMatchingArtistsInput):Promise<HelperInterface.getMatchingArtists>;
	public async getMatchingArtists(firstInput:any, user2?:string, limit?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month") {

		firstInput = convertString(firstInput, "user1", {user2, limit, period});
		
		this.checkLimit(firstInput.limit, 1000);

		let request = [
			this.lastfm.user.getTopArtists(firstInput.user1, {limit: firstInput.limit, period: firstInput.period}),
			this.lastfm.user.getTopArtists(firstInput.user2, {limit: firstInput.limit, period: firstInput.period})
		];

		const res = await Promise.all(request);

		return this.getIntersection(res[0].artists, res[1].artists);

	}

	public ArtistFromMBID = (mbid:string) => ({ mbid });

	public ArtistFromName = (artist:string) => ({ artist });

	public AlbumFromMBID = (mbid:string) => ({ mbid });

	public AlbumFromName = (artist:string, album:string) => ({ artist, album });

	public TrackFromMBID = (mbid:string) => ({ mbid });

	public TrackFromName = (artist:string, track:string) => ({ artist, track });

	public cacheScrobbles(user:string, params?:{previouslyCached?:number, parallelCaches?:number, rateLimitTimeout?:number}):TypedEmitter<ScrobbleEmitter>;
	public cacheScrobbles(input:HelperInterface.cacheScrobblesInput):TypedEmitter<ScrobbleEmitter>;
	public cacheScrobbles(user:any, params?:{previouslyCached?:number, parallelCaches?:number, rateLimitTimeout?:number}) {

		params ??= {};

		if (typeof user !== "string") {
			params.previouslyCached = user.previouslyCached;
			params.parallelCaches = user.parallelCaches;
			params.rateLimitTimeout = user.rateLimitTimeout;
			user = user.user;
		}

		let scrobbleEmitter = new EventEmitter() as TypedEmitter<ScrobbleEmitter>;

		this.handleCaching(user, scrobbleEmitter, params);

		return scrobbleEmitter;

	}

	private async handleCaching(user:string, scrobbleEmitter:TypedEmitter<ScrobbleEmitter>, params?:{previouslyCached?:number, parallelCaches?:number, rateLimitTimeout?:number}) {
		let count:number;
		try {
			count = (await this.lastfm.user.getRecentTracks(user, {limit: 1})).meta.total;
		} catch {
			let rateLimitInterval = setInterval(() => {
				
				try {
					this.handleCaching(user, scrobbleEmitter, params);
				
					clearInterval(rateLimitInterval);
				} catch (err) {
					// ignore this. Why? I forgot
				}
			});
			return;
		}

		let newCount = count - (params?.previouslyCached || 0);
		let totalPages = Math.ceil(newCount / 1000);
		let rateLimited = false;
		let limitTime = params?.rateLimitTimeout || 300000;

		scrobbleEmitter.emit("start", {totalPages, count: newCount});

		let pages = Array(totalPages).fill("").map((_, i) => i + 1);
		let active = Math.min(params?.parallelCaches || 1, totalPages);
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

				if (data2.meta.page === totalPages) {
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

			if (toInt(err.code) === 29) {
				rateLimited = true;
				setTimeout(() => {
					rateLimited = false;
				}, limitTime);
			}

			scrobbleEmitter.emit("internalDontUse", page);

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
			if (typeof err === "object" && err !== null && err.hasOwnProperty("code") && err.hasOwnProperty("message")) {
				scrobbleEmitter.emit("error", {
					code: Number((err as any).code),
					message: (err as any).message
				}, page);
			} else {
				scrobbleEmitter.emit("error", {
					code: 41,
					message: `An unknown error occurred. Details: ${err}`
				}, page);
			}
			
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
					playcount: [aSort[i1].playcount, bSort[i2].playcount]
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

	private checkLimit(limit:number|undefined, maxLimit:number) {
		if (typeof limit !== "undefined" && (limit > maxLimit || limit < 1)) {
			throw new Error(`Limit out of bounds (1-${maxLimit}), ${limit} passed`);
		}
	}


	private async fetchDetails(username:string, detailTypes:("artist"|"album"|"track")[], artist:string, album:string, track:string, params?:{sk?:string}) {

		let promises:Promise<any>[] = [];
		let options:{
			username:string;
			sk?:string;
		} = {
			username
		}
		if (params?.sk) {
			options.sk = params.sk;
		}

		if (detailTypes?.includes("artist")) {
			promises.push(this.lastfm.artist.getInfo({artist}, options).catch((err) => {}));
		}
		if (detailTypes?.includes("album") && album) {
			promises.push(this.lastfm.album.getInfo({artist, album}, options).catch((err) => {}));
		}
		if (detailTypes?.includes("track")) {
			promises.push(this.lastfm.track.getInfo({artist, track}, options).catch((err) => {}));
		}

		return await Promise.all(promises);

	}

	private homogenizeUserInput(input:any) {
		if (input.hasOwnProperty("user")) {
			return input;
		}
		for (let userInput of ["username", "sk", "usernameOrSessionKey"]) {
			if (input.hasOwnProperty(userInput)) {
				input.user = input[userInput];
				delete input[userInput];
			}
		}
		throw "No valid user input";
	}

}