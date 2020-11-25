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

		return (await this.sendRequest(this.key, this.secret, { method: "album.getInfo", ...album, ...params })).album as AlbumInterface.getInfo;

	}
	
	public async getTags(album:AlbumInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		return this.convertGetTags((await this.sendRequest(this.key, this.secret, { method: "album.getTags", ...album, user: usernameOrSessionKey, ...params })).tags) as AlbumInterface.getTags;

	}

	public async getTopTags(album:AlbumInput, params?:{autocorrect?:0|1}) {

		return (await this.sendRequest(this.key, this.secret, { method: "album.getTopTags", ...album, ...params })).toptags as AlbumInterface.getTopTags;

	}

	public async removeTag(artist:string, album:string, tag:string, sk:string) {

		return await this.sendRequest(this.key, this.secret, { method: "album.removeTag", tag, sk, artist, album }) as {};

	}

	public async search(album:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, {method: "album.search", album, ...params })).results as AlbumInterface.search;

	}

}