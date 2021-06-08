import * as AlbumInterface from "../interfaces/albumInterface";
import Base from "../base";
import { AlbumInput } from "../interfaces/shared";
import { convertEntryArray, convertEntry, joinArray, convertSearchWithQuery, convertBasicMetaTag, addConditionals, convertString } from "../caster";

export default class AlbumClass extends Base {

	public async addTags(artist:string, album:string, tags:string|string[], sk:string):Promise<{}>;
	public async addTags(params:AlbumInterface.addTagsInput):Promise<{}>;
	public async addTags(firstInput:any, album?:string, tags?:string|string[], sk?:string) {

		firstInput = convertString(firstInput, "artist", {album, tags, sk});
		firstInput.tags = joinArray(firstInput.tags);

		return await this.sendRequest({ method: "album.addTags", ...firstInput }) as {};

	}

	public async getInfo(album:AlbumInput, params?:{autocorrect?:boolean, username?:string, sk?:string, lang?:string}):Promise<AlbumInterface.getInfo>;
	public async getInfo(params:AlbumInterface.getInfoInput):Promise<AlbumInterface.getInfo>;
	public async getInfo(firstInput:any, params?:{autocorrect?:boolean, username?:string, sk?:string, lang?:string}) {
		
		let res = (await this.sendRequest({ method: "album.getInfo", ...firstInput, ...params })).album as any;

		res = convertEntry(res);
		res.tracks = convertEntryArray(res.tracks.track);
		res.tags = convertEntryArray(res.tags.tag);

		return res as AlbumInterface.getInfo;

	}
	
	public async getTags(album:AlbumInput, usernameOrSessionKey:string, params?:{autocorrect?:boolean}):Promise<AlbumInterface.getTags>;
	public async getTags(params:AlbumInterface.getTagsInput):Promise<AlbumInterface.getTags>;
	public async getTags(firstInput:any, usernameOrSessionKey?:string, params?:{autocorrect?:boolean}) {

		let req = addConditionals({...firstInput, ...params }, {user: usernameOrSessionKey});
		let res = this.convertGetTags((await this.sendRequest({method: "album.getTags", ...req})).tags) as any;

		return convertBasicMetaTag(res) as AlbumInterface.getTags;

	}

	public async getTopTags(album:AlbumInput, params?:{autocorrect?:boolean}):Promise<AlbumInterface.getTopTags>;
	public async getTopTags(params:AlbumInterface.BasicAlbumInput):Promise<AlbumInterface.getTopTags>;
	public async getTopTags(firstInput:any, params?:{autocorrect?:boolean}) {

		let res = (await this.sendRequest({ method: "album.getTopTags", ...firstInput, ...params })).toptags as any;

		return convertBasicMetaTag(res) as AlbumInterface.getTopTags;

	}

	public async removeTag(artist:string, album:string, tag:string, sk:string):Promise<{}>;
	public async removeTag(params:AlbumInterface.removeTagInput):Promise<{}>;
	public async removeTag(firstInput:any, album?:string, tag?:string, sk?:string) {

		firstInput = convertString(firstInput, "artist", {album, tag, sk});

		return await this.sendRequest({ method: "album.removeTag", ...firstInput }) as {};

	}

	public async search(album:string, params?:{limit?:number, page?:number}):Promise<AlbumInterface.search>;
	public async search(params:AlbumInterface.searchInput):Promise<AlbumInterface.search>;
	public async search(firstInput:any, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit ?? firstInput.limit, 1000);

		firstInput = convertString(firstInput, "album", {});

		let res = (await this.sendRequest({method: "album.search", ...firstInput, ...params })).results as any;
		
		res = convertSearchWithQuery(res);

		res.albumMatches = convertEntryArray(res.albummatches.album);
		res.albummatches = void 0;
		
		return res as AlbumInterface.search;

	}

}