import LFMRequest from "../request";
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

interface ScrobbleArrayed {
	artist:string[];
	track:string[];
	timestamp:number[];
	album?:string[];
	chosenByUser?:(0|1)[];
	trackNumber?:number[];
	mbid?:string[];
	albumArtist?:string[];
	duration?:number[];
}

interface ScrobbleArrayStringified {
	artist:string;
	track:string;
	timestamp:string;
	album?:string;
	chosenByUser?:string;
	trackNumber?:string;
	mbid?:string;
	albumArtist?:string;
	duration?:string;
}

export default class TrackClass extends Base {

	public async addTags(artist:string, track:string, tags:string[]|string, sk:string) {

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

		return await new LFMRequest(this.key, this.secret, { method: "track.addTags", tags, sk, artist, track }).execute() as {};

	}

	public async getCorrection(artist:string, track:string) {
		
		return (((await new LFMRequest(this.key, this.secret, { method: "track.getCorrection", artist, track }).execute())?.corrections?.correction) || {}) as TrackInterface.getCorrection|{};

	}

	public async getInfo(track:TrackInput, params?:{autocorrect?:0|1, username?:string, sk?:string}) {

		return (await new LFMRequest(this.key, this.secret, { method: "track.getInfo", ...track, ...params }).execute()).track as TrackInterface.getInfo;

	}

	public async getSimilar(track:TrackInput, params?:{limit?:number, autocorrect?:0|1}) {

		this.checkLimit(params?.limit, 1000);

		return (await new LFMRequest(this.key, this.secret, { method: "track.getSimilar", ...track, ...params }).execute()).similartracks as TrackInterface.getSimilar;

	}
	
	public async getTags(track:TrackInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		return this.convertGetTags((await new LFMRequest(this.key, this.secret, { method: "track.getTags", ...track, user: usernameOrSessionKey, ...params }).execute()).tags) as TrackInterface.getTags;

	}

	public async getTopTags(track:TrackInput, params?:{autocorrect?:0|1}) {

		return (await new LFMRequest(this.key, this.secret, { method: "track.getTopTags", ...track, ...params }).execute()).toptags as TrackInterface.getTopTags;

	}

	public async love(track:TrackInput, sk:string) {

		return await new LFMRequest(this.key, this.secret, { method: "track.love", ...track, sk }).execute() as {};

	}

	public async removeTag(track:TrackInput, tag:string, sk:string) {

		return await new LFMRequest(this.key, this.secret, { method: "track.removeTag", tag, sk, ...track }).execute() as {};

	}

	public async scrobble(sk:string, scrobbles:ScrobbleObject[]) {

		this.checkScrobbleCount(scrobbles.length, 50);

		let params:any = {};

		for (let [index, scrobble] of scrobbles.entries()) {
			for (let [key, value] of Object.keys(scrobble)) {
				params[`${key}[${index}]`] = value;
			}
		}

		return await new LFMRequest(this.key, this.secret, {method: "track.scrobble", ...params, sk}).execute(true) as any;

	}

	public async search(track:string, params?:{limit?:number, page?:number, artist?:string}) {

		this.checkLimit(params?.limit, 1000);

		return (await new LFMRequest(this.key, this.secret, {method: "track.search", track, ...params}).execute()).results as TrackInterface.search;

	}

	public async unlove(track:TrackInput, sk:string) {

		return await new LFMRequest(this.key, this.secret, { method: "track.unlove", ...track, sk }).execute() as {};

	}

	public async updateNowPlaying(artist:string, track:string, sk:string, params?: {
		album?:string;
		trackNumber?:number;
		mbid?:string;
		duration?:number;
		albumArtist?:string;
	}) {

		return await new LFMRequest(this.key, this.secret, { method: "track.updateNowPlaying", artist, track, sk, ...params }).execute() as {};

	}

}