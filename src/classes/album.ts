import * as AlbumInterface from "../interfaces/albumInterface";
import Base from "../base";
import { AlbumInput } from "../interfaces/shared";
import { toInt, toBool, toArray } from "../caster";

export default class AlbumClass extends Base {

	public async addTags(artist:string, album:string, tags:string[]|string, sk:string) {

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

		return await this.sendRequest({ method: "album.addTags", tags, sk, artist, album }) as {};

	}

	public async getInfo(album:AlbumInput, params?:{autocorrect?:0|1, username?:string, sk?:string, lang?:string}) {

		let res = (await this.sendRequest({ method: "album.getInfo", ...album, ...params })).album as any;
		if (res.hasOwnProperty("userplaycount")) {
			res.userplaycount = toInt(res.userplaycount);
		}
		res.listeners = toInt(res.listeners);
		res.playcount = toInt(res.playcount);

		res.tracks = toArray(res.tracks.track);
		res.tracks.map((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			e.streamable["#text"] = void 0;
			e.rank = e["@attr"].rank;
			e["@attr"] = void 0;
			return e;
		});

		res.tags = toArray(res.tags.tag);
		res.tags.map((e:any) => {
			e.rank = toInt(e.rank);
			return e;
		});
		res.image.map((e:any) => {
			e.url = e["#text"];
			e["#text"] = void 0;
			return e;
		});

		return res as AlbumInterface.getInfo;

	}
	
	public async getTags(album:AlbumInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		let res = this.convertGetTags((await this.sendRequest({ method: "album.getTags", ...album, user: usernameOrSessionKey, ...params })).tags) as any;
		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = res.tag;
		res.tag = void 0;

		return res as AlbumInterface.getTags;

	}

	public async getTopTags(album:AlbumInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest({ method: "album.getTopTags", ...album, ...params })).toptags as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = res.tag;
		res.tag = void 0;

		return res as AlbumInterface.getTopTags;

	}

	public async removeTag(artist:string, album:string, tag:string, sk:string) {

		return await this.sendRequest({ method: "album.removeTag", tag, sk, artist, album }) as {};

	}

	public async search(album:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({method: "album.search", album, ...params })).results as any;
		res["opensearch:Query"]["#text"] = void 0;
		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.meta.query = res.meta.for;
		res.meta.for = void 0;
		res.itemsPerPage = res["opensearch:itemsPerPage"];
		res["opensearch:itemsPerPage"] = void 0;
		res.startIndex = res["opensearch:startIndex"];
		res["opensearch:startIndex"] = void 0;
		res.totalResults = res["opensearch:totalResults"];
		res["opensearch:totalResults"] = void 0;
		res.query = res["opensearch:Query"];
		res["opensearch:Query"] = void 0;
		res.albumMatches = res.albummatches.album;
		res.albummatches = void 0;

		res.query.startPage = toInt(res.query.startPage);
		res.totalResults = toInt(res.totalResults);
		res.startIndex = toInt(res.startIndex);
		res.itemsPerPage = toInt(res.itemsPerPage);

		res.albumMatches.map((e:any) => {

			e.streamable = toBool(e.streamable);
			e.image.map((f:any) => {
				f.url = f["#text"];
				f["#text"] = void 0;
				return f;
			});
			return e;
		
		});
		
		return res as AlbumInterface.search;

	}

}