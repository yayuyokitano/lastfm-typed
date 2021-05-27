import * as TrackInterface from "../interfaces/trackInterface";
import Base from "../base";
import { TrackInput } from "../interfaces/shared";
import { toInt, toBool, toArray, convertMeta } from "../caster";

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

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

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

		res.toptags = res.toptags.tag;
		res.userloved = toBool(res.userloved);
		res.playcount = toInt(res.playcount);
		res.userplaycount = toInt(res.userplaycount);
		res.listeners = toInt(res.listeners);
		res.duration = toInt(res.duration);
		if (res.album) {
			
			if (res.album["@attr"]) {
				res.album.position = toInt(res.album["@attr"].position);
				res.album["@attr"] = void 0;
			}
			
			res.album.image = toArray(res.album.image).map((e:any) => {
				e.url = e["#text"];
				e["#text"] = void 0;
				return e;
			});

		}

		return res as TrackInterface.getInfo;

	}

	public async getSimilar(track:TrackInput, params?:{limit?:number, autocorrect?:0|1}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "track.getSimilar", ...track, ...params })).similartracks as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tracks = toArray(res.track).map((e:any) => {
			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
			e.streamable["#text"] = void 0;
			return e;
		});

		return res as TrackInterface.getSimilar;

	}
	
	public async getTags(track:TrackInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		let res = this.convertGetTags((await this.sendRequest({ method: "track.getTags", ...track, user: usernameOrSessionKey, ...params })).tags) as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = res.tag;
		res.tag = void 0;

		return res as TrackInterface.getTags;
	}

	public async getTopTags(track:TrackInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest({ method: "track.getTopTags", ...track, ...params })).toptags as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = res.tag;
		res.tag = void 0;

		return res as TrackInterface.getTopTags;

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

		res["opensearch:Query"]["#text"] = void 0;
		res.itemsPerPage = res["opensearch:itemsPerPage"];
		res["opensearch:itemsPerPage"] = void 0;
		res.startIndex = res["opensearch:startIndex"];
		res["opensearch:startIndex"] = void 0;
		res.totalResults = res["opensearch:totalResults"];
		res["opensearch:totalResults"] = void 0;
		res.query = res["opensearch:Query"];
		res["opensearch:Query"] = void 0;

		res.trackMatches = toArray(res.trackmatches.track).map((e:any) => {

			e.streamable = toBool(e.streamable);
			e.listeners = toInt(e.listeners);
			e.playcount = toInt(e.playcount);

			e.image = toArray(e.image).map((f:any) => {
				f.url = f["#text"];
				f["#text"] = void 0;
				return f;
			});

			return e;

		});

		res.trackmatches = void 0;

		res.query.startPage = toInt(res.query.startPage);
		res.totalResults = toInt(res.totalResults);
		res.startIndex = toInt(res.startIndex);
		res.itemsPerPage = toInt(res.itemsPerPage);

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