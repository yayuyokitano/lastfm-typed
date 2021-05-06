import * as TrackInterface from "../interfaces/trackInterface";
import Base from "../base";
import { TrackInput } from "../interfaces/shared";

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
			res.meta = res["@attr"];
			delete res["@attr"];
		}

		return res as TrackInterface.getCorrection;

	}

	public async getInfo(track:TrackInput, params?:{autocorrect?:0|1, username?:string, sk?:string}) {

		let res = (await this.sendRequest({ method: "track.getInfo", ...track, ...params })).track as any;

		res.toptags = res.toptags.tag;
		if (res.album) {
			if (res.album["@attr"]) {
				res.album.position = res.album["@attr"].position;
				delete res.album["@attr"];
			}
			res.album.image.forEach((e:any) => {
				e.url = e["#text"];
				delete e["#text"];
			});
		}

		return res as TrackInterface.getInfo;

	}

	public async getSimilar(track:TrackInput, params?:{limit?:number, autocorrect?:0|1}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "track.getSimilar", ...track, ...params })).similartracks as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tracks = res.track;
		delete res.track;

		res.tracks.forEach((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			delete e.streamable["#text"];
		});

		return res as TrackInterface.getSimilar;

	}
	
	public async getTags(track:TrackInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		let res = this.convertGetTags((await this.sendRequest({ method: "track.getTags", ...track, user: usernameOrSessionKey, ...params })).tags) as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tags = res.tag;
		delete res.tag;

		return res as TrackInterface.getTags;
	}

	public async getTopTags(track:TrackInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest({ method: "track.getTopTags", ...track, ...params })).toptags as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tags = res.tag;
		delete res.tag;

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

		res.head = res["@attr"];
		delete res["@attr"];
		res.scrobbles = res.scrobble;
		delete res.scrobble;
		//consistency woo
		if (res.scrobbles.artist) {
			res.scrobbles = [res.scrobbles];
		}
		
		res.scrobbles.forEach((e:any) => {
			e.ignoredMessage.message = e.ignoredMessage["#text"];
			delete e.ignoredMessage["#text"];

			if (e.artist["#text"]) {
				e.artist.name = e.artist["#text"];
				delete e.artist["#text"];
			}
			if (e.album["#text"]) {
				e.album.name = e.album["#text"];
				delete e.album["#text"];
			}
			if (e.track["#text"]) {
				e.track.name = e.track["#text"];
				delete e.track["#text"];
			}
			if (e.albumArtist["#text"]) {
				e.albumArtist.name = e.albumArtist["#text"];
				delete e.albumArtist["#text"];
			}
		});

		return res as TrackInterface.scrobble;

	}

	public async search(track:string, params?:{limit?:number, page?:number, artist?:string}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({method: "track.search", track, ...params})).results as any;

		delete res["opensearch:Query"]["#text"];
		res.itemsPerPage = res["opensearch:itemsPerPage"];
		delete res["opensearch:itemsPerPage"];
		res.startIndex = res["opensearch:startIndex"];
		delete res["opensearch:startIndex"];
		res.totalResults = res["opensearch:totalResults"];
		delete res["opensearch:totalResults"];
		res.query = res["opensearch:Query"];
		delete res["opensearch:Query"];
		res.trackMatches = res.trackmatches.track;
		delete res.trackmatches;

		res.trackMatches.forEach((e:any) => {
			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			});
		});

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