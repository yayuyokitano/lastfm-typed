import * as TrackInterface from "../interfaces/trackInterface";
import Base from "../base";
import { TrackInput } from "../interfaces/shared";
import { toInt, toBool, toArray, convertMeta, convertSearch, convertEntry, convertImageArray, convertEntryArray, joinArray, convertBasicMetaTag, convertExtendedMeta, addConditionals, convertString, boolToInt } from "../caster";

export default class TrackClass extends Base {

	public async addTags(artist:string, track:string, tags:string[]|string, sk:string):Promise<{}>;
	public async addTags(input:TrackInterface.addTagsInput):Promise<{}>;
	public async addTags(artist?:any, track?:string, tags?:string[]|string, sk?:string) {

		artist = convertString(artist, "artist", {track, tags, sk});

		artist.tags = joinArray(artist.tags);

		return await this.sendRequest({ method: "track.addTags", ...artist }) as {};

	}

	public async getCorrection(artist:string, track:string):Promise<TrackInterface.getCorrection>;
	public async getCorrection(input:TrackInterface.BaseTrackInput):Promise<TrackInterface.getCorrection>;
	public async getCorrection(artist:any, track?:string) {

		artist = convertString(artist, "artist", {track});
		
		let res = (((await this.sendRequest({ method: "track.getCorrection", ...artist }))?.corrections?.correction) || {}) as any;
		if (!res.track.hasOwnProperty("name")) {
			res = {};
		}

		if (Object.keys(res).length) {

			res.meta = convertMeta(res["@attr"]);
			res["@attr"] = void 0;
			
		}

		return res as TrackInterface.getCorrection;

	}
	public async getInfo(track:TrackInput, params?:{autocorrect?:boolean, username?:string, sk?:string}):Promise<TrackInterface.getInfo>;
	public async getInfo(input:TrackInterface.getInfoInput):Promise<TrackInterface.getInfo>;
	public async getInfo(track:any, params?:{autocorrect?:boolean, username?:string, sk?:string}) {

		let res = (await this.sendRequest({ method: "track.getInfo", ...track, ...params })).track as any;

		res.toptags = toArray(res.toptags?.tag);
		res = convertEntry(res);
		if (res.album) {
			
			if (res.album["@attr"]) {
				res.album.position = toInt(res.album["@attr"]?.position);
				res.album["@attr"] = void 0;
			}
			
			res.album.image = convertImageArray(res.album.image);

		}

		return res as TrackInterface.getInfo;

	}

	public async getSimilar(track:TrackInput, params?:{limit?:number, autocorrect?:boolean}):Promise<TrackInterface.getSimilar>;
	public async getSimilar(input:TrackInterface.getSimilarInput):Promise<TrackInterface.getSimilar>;
	public async getSimilar(track:any, params?:{limit?:number, autocorrect?:boolean}) {

		this.checkLimit(params?.limit ?? track?.limit, 1000);

		let res = (await this.sendRequest({ method: "track.getSimilar", ...track, ...params })).similartracks as any;

		return convertExtendedMeta(res, "track") as TrackInterface.getSimilar;

	}

	public async getTags(track:TrackInput, usernameOrSessionKey:string, params?:{autocorrect?:boolean}):Promise<TrackInterface.getTags>;
	public async getTags(input:TrackInterface.getInfoInput):Promise<TrackInterface.getTags>;
	public async getTags(track:any, usernameOrSessionKey?:string, params?:{autocorrect?:boolean}) {

		track = addConditionals(track, {usernameOrSessionKey});

		let res = this.convertGetTags((await this.sendRequest({ method: "track.getTags", ...track, ...params })).tags) as any;

		return convertBasicMetaTag(res) as TrackInterface.getTags;
	}

	public async getTopTags(track:TrackInput, params?:{autocorrect?:boolean}):Promise<TrackInterface.getTopTags>;
	public async getTopTags(input:TrackInterface.getTagsInput):Promise<TrackInterface.getTopTags>;
	public async getTopTags(track:any, params?:{autocorrect?:boolean}) {

		let res = (await this.sendRequest({ method: "track.getTopTags", ...track, ...params })).toptags as any;

		return convertBasicMetaTag(res) as TrackInterface.getTopTags;

	}

	public async love(artist:string, track:string, sk:string):Promise<{}>;
	public async love(input:TrackInterface.PostTemplate):Promise<{}>;
	public async love(artist:any, track?:string, sk?:string) {

		artist = convertString(artist, "artist", {track, sk});

		return await this.sendRequest({ method: "track.love", ...artist }) as {};

	}

	public async removeTag(artist:string, track:string, tag:string, sk:string):Promise<{}>;
	public async removeTag(input:TrackInterface.removeTagInput):Promise<{}>;
	public async removeTag(artist:any, track?:string, tag?:string, sk?:string) {

		artist = convertString(artist, "artist", {track, sk, tag});

		return await this.sendRequest({ method: "track.removeTag", ...artist }) as {};

	}

	public async scrobble(sk:string, scrobbles:TrackInterface.ScrobbleObject[]):Promise<TrackInterface.scrobble>;
	public async scrobble(input:TrackInterface.scrobbleInput):Promise<TrackInterface.scrobble>;
	public async scrobble(sk:any, scrobbles?:TrackInterface.ScrobbleObject[]) {

		sk = convertString(sk, "sk", {scrobbles});

		this.checkScrobbleCount(sk.scrobbles.length, 50);

		let params:any = {};

		for (let [index, scrobble] of sk.scrobbles.entries()) {
			for (let [key, value] of Object.entries(scrobble)) {
				if (key === "chosenByUser") {
					params[`${key}[${index}]`] = boolToInt(value as boolean);
				} else {
					params[`${key}[${index}]`] = value;
				}
			}
		}

		let res = (await this.sendRequest({method: "track.scrobble", ...params, sk: sk.sk})).scrobbles as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.scrobbles = toArray(res.scrobble).map((e:any) => {
			e.ignoredMessage.message = e.ignoredMessage["#text"];
			e.ignoredMessage["#text"] = void 0;

			if (e.artist["#text"]) {
				e.artist.name = e.artist["#text"];
				e.artist["#text"] = void 0;
			}
			if (e.album["#text"]) {
				e.album.name = e.album["#text"];
				e.album["#text"] = void 0;
			}
			if (e.track["#text"]) {
				e.track.name = e.track["#text"];
				e.track["#text"] = void 0;
			}
			if (e.albumArtist["#text"]) {
				e.albumArtist.name = e.albumArtist["#text"];
				e.albumArtist["#text"] = void 0;
			}

			e.artist.corrected = toBool(e.artist.corrected);
			e.album.corrected = toBool(e.album.corrected);
			e.albumArtist.corrected = toBool(e.albumArtist.corrected);
			e.track.corrected = toBool(e.track.corrected);
			e.ignoredMessage.code = toInt(e.ignoredMessage.code);
			e.timestamp = toInt(e.timestamp);

			return e;
		});

		res.scrobble = void 0;

		return res as TrackInterface.scrobble;

	}

	public async search(track:string, params?:{limit?:number, page?:number, artist?:string}):Promise<TrackInterface.search>;
	public async search(input:TrackInterface.searchInput):Promise<TrackInterface.search>;
	public async search(track:any, params?:{limit?:number, page?:number, artist?:string}) {

		track = convertString(track, "track", {});

		this.checkLimit(params?.limit ?? track?.limit, 1000);

		let res = (await this.sendRequest({method: "track.search", ...track, ...params})).results as any;

		res = convertSearch(res);
		res.trackMatches = convertEntryArray(res.trackmatches.track);
		res.trackmatches = void 0;

		return res as TrackInterface.search;
	}

	public async unlove(artist:string, track:string, sk:string):Promise<{}>;
	public async unlove(input:TrackInterface.PostTemplate):Promise<{}>;
	public async unlove(artist:any, track?:string, sk?:string) {

		artist = convertString(artist, "artist", {track, sk});

		return await this.sendRequest({ method: "track.unlove", ...artist }) as {};

	}

	public async updateNowPlaying(artist:string, track:string, sk:string, params?: {
		album?:string;
		trackNumber?:number;
		mbid?:string;
		duration?:number;
		albumArtist?:string;
	}):Promise<{}>;
	public async updateNowPlaying(input:TrackInterface.updateNowPlayingInput):Promise<{}>;
	public async updateNowPlaying(artist:any, track?:string, sk?:string, params?: {
		album?:string;
		trackNumber?:number;
		mbid?:string;
		duration?:number;
		albumArtist?:string;
	}) {

		artist = convertString(artist, "artist", {track, sk});

		return await this.sendRequest({ method: "track.updateNowPlaying", ...artist, ...params }) as {};

	}

}