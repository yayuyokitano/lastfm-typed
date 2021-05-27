import * as TrackInterface from "../interfaces/trackInterface";
import Base from "../base";
import { TrackInput } from "../interfaces/shared";
import { toInt, toBool, toArray, convertMeta, convertSearch, convertEntry, convertImageArray, convertEntryArray, joinArray, convertBasicMetaTag, convertExtendedMeta } from "../caster";

interface ScrobbleObject {
	artist:string;
	track:string;
	timestamp:number;
	album?:string;
	chosenByUser?:0|1;
	trackNumber?:number;
	mbid?:string;
	albumArtist?:string;
	duration?:number;
}

export default class TrackClass extends Base {

	public async addTags(artist:string, track:string, tags:string[]|string, sk:string) {

		tags = joinArray(tags);

		return await this.sendRequest({ method: "track.addTags", tags, sk, artist, track }) as {};

	}

	public async getCorrection(artist:string, track:string) {
		
		let res = (((await this.sendRequest({ method: "track.getCorrection", artist, track }))?.corrections?.correction) || {}) as any;

		if (Object.keys(res).length) {

			res.meta = convertMeta(res["@attr"]);
			res["@attr"] = void 0;
			
		}

		return res as TrackInterface.getCorrection;

	}

	public async getInfo(track:TrackInput, params?:{autocorrect?:0|1, username?:string, sk?:string}) {

		let res = (await this.sendRequest({ method: "track.getInfo", ...track, ...params })).track as any;

		res.toptags = toArray(res.toptags.tag);
		res = convertEntry(res);
		if (res.album) {
			
			if (res.album["@attr"]) {
				res.album.position = toInt(res.album["@attr"].position);
				res.album["@attr"] = void 0;
			}
			
			res.album.image = convertImageArray(res.album.image);

		}

		return res as TrackInterface.getInfo;

	}

	public async getSimilar(track:TrackInput, params?:{limit?:number, autocorrect?:boolean}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "track.getSimilar", ...track, ...params })).similartracks as any;

		return convertExtendedMeta(res, "track") as TrackInterface.getSimilar;

	}
	
	public async getTags(track:TrackInput, usernameOrSessionKey:string, params?:{autocorrect?:boolean}) {

		let res = this.convertGetTags((await this.sendRequest({ method: "track.getTags", ...track, user: usernameOrSessionKey, ...params })).tags) as any;

		return convertBasicMetaTag(res) as TrackInterface.getTags;
	}

	public async getTopTags(track:TrackInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest({ method: "track.getTopTags", ...track, ...params })).toptags as any;

		return convertBasicMetaTag(res) as TrackInterface.getTopTags;

	}

	public async love(artist:string, track:string, sk:string) {

		return await this.sendRequest({ method: "track.love", artist, track, sk }) as {};

	}

	public async removeTag(artist:string, track:string, tag:string, sk:string) {

		return await this.sendRequest({ method: "track.removeTag", tag, sk, artist, track }) as {};

	}

	public async scrobble(sk:string, scrobbles:ScrobbleObject[]) {

		this.checkScrobbleCount(scrobbles.length, 50);

		let params:any = {};

		for (let [index, scrobble] of scrobbles.entries()) {
			for (let [key, value] of Object.entries(scrobble)) {
				params[`${key}[${index}]`] = value;
			}
		}

		let res = (await this.sendRequest({method: "track.scrobble", ...params, sk})).scrobbles as any;

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

	public async search(track:string, params?:{limit?:number, page?:number, artist?:string}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({method: "track.search", track, ...params})).results as any;

		res = convertSearch(res);
		res.trackMatches = convertEntryArray(res.trackmatches.track);
		res.trackmatches = void 0;

		return res as TrackInterface.search;
	}

	public async unlove(artist:string, track:string, sk:string) {

		return await this.sendRequest({ method: "track.unlove", artist, track, sk }) as {};

	}

	public async updateNowPlaying(artist:string, track:string, sk:string, params?: {
		album?:string;
		trackNumber?:number;
		mbid?:string;
		duration?:number;
		albumArtist?:string;
	}) {

		return await this.sendRequest({ method: "track.updateNowPlaying", artist, track, sk, ...params }) as {};

	}

}