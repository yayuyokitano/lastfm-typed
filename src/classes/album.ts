import LFMRequest from "../request";
import * as AlbumInterface from "../interfaces/albumInterface";
import Base from "../base";
import { AlbumInput } from "../interfaces/shared";

export default class AlbumClass extends Base {

	public async addTags(album:AlbumInput, tags:string[]|string, sk:string) {

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

		return await new LFMRequest(this.key, this.secret, { method: "album.addTags", tags, sk, ...album }).execute() as {};

	}

	public async getInfo(album:AlbumInput, params?:{autocorrect?:0|1, username?:string, sk?:string, lang?:string}) {

		return (await new LFMRequest(this.key, this.secret, { method: "album.getInfo", ...album, ...params }).execute()).album as AlbumInterface.getInfo;

	}
	
	public async getTags(album:AlbumInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "album.getTags", ...album, sk: usernameOrSessionKey, ...params }).execute()).tags as AlbumInterface.getTags;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "album.getTags", ...album, user: usernameOrSessionKey, ...params }).execute()).tags as AlbumInterface.getTags;

		}

	}

	public async getTopTags(album:AlbumInput, params?:{autocorrect?:0|1}) {

		return (await new LFMRequest(this.key, this.secret, { method: "album.getTopTags", ...album, ...params }).execute()).toptags as AlbumInterface.getTopTags;

	}

	public async removeTag(album:AlbumInput, tag:string, sk:string) {

		return await new LFMRequest(this.key, this.secret, { method: "album.removeTag", tag, sk, ...album }).execute() as {};

	}

	public async search(album:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await new LFMRequest(this.key, this.secret, {method: "album.search", album, ...params}).execute()).results as AlbumInterface.search;

	}

}