import * as AlbumInterface from "../interfaces/albumInterface";
import Base from "../base";
import { AlbumInput } from "../interfaces/shared";

export default class AlbumClass extends Base {

	public async addTags(artist:string, album:string, tags:string[]|string, sk:string) {

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

		return await this.sendRequest(this.key, this.secret, { method: "album.addTags", tags, sk, artist, album }) as {};

	}

	public async getInfo(album:AlbumInput, params?:{autocorrect?:0|1, username?:string, sk?:string, lang?:string}) {

		let res = (await this.sendRequest(this.key, this.secret, { method: "album.getInfo", ...album, ...params })).album as any;

		res.tracks = res.tracks.track;
		res.tracks.forEach((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			delete e.streamable["#text"];
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		})

		res.tags = res.tags.tag;
		res.image.forEach((e:any) => {
			e.url = e["#text"];
			delete e["#text"];
		})

		return res as AlbumInterface.getInfo;

	}
	
	public async getTags(album:AlbumInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		let res = this.convertGetTags((await this.sendRequest(this.key, this.secret, { method: "album.getTags", ...album, user: usernameOrSessionKey, ...params })).tags) as any;
		res.meta = res["@attr"];
		delete res["@attr"];
		res.tags = res.tag;
		delete res.tag;

		return res as AlbumInterface.getTags;

	}

	public async getTopTags(album:AlbumInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest(this.key, this.secret, { method: "album.getTopTags", ...album, ...params })).toptags as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tags = res.tag;
		delete res.tag;

		return res as AlbumInterface.getTopTags;

	}

	public async removeTag(artist:string, album:string, tag:string, sk:string) {

		return await this.sendRequest(this.key, this.secret, { method: "album.removeTag", tag, sk, artist, album }) as {};

	}

	public async search(album:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest(this.key, this.secret, {method: "album.search", album, ...params })).results as any;
		delete res["opensearch:Query"]["#text"];
		res.meta = res["@attr"];
		delete res["@attr"];
		res.meta.query = res.meta.for;
		delete res.meta.for;
		res.itemsPerPage = res["opensearch:itemsPerPage"];
		delete res["opensearch:itemsPerPage"];
		res.startIndex = res["opensearch:startIndex"];
		delete res["opensearch:startIndex"];
		res.totalResults = res["opensearch:totalResults"];
		delete res["opensearch:totalResults"];
		res.query = res["opensearch:Query"];
		delete res["opensearch:Query"];
		res.albumMatches = res.albummatches.album;
		delete res.albummatches;

		res.albumMatches.forEach((e:any) => {
			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			});
		});
		
		return res as AlbumInterface.search;

	}

}