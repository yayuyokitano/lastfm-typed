import * as ArtistInterface from "../interfaces/artistInterface";
import Base from "../base";
import { ArtistInput } from "../interfaces/shared";
import { toInt, toArray, convertMeta, convertEntryArray, convertEntry, joinArray, convertSearchWithQuery, convertBasicMetaTag, addConditionals, convertString } from "../caster";

export default class ArtistClass extends Base {

	public async addTags(artist:string, tags:string|string[], sk:string):Promise<{}>;
	public async addTags(params:ArtistInterface.addTagsInput):Promise<{}>;
	public async addTags(firstInput:any, tags?:string|string[], sk?:string) {

		firstInput = convertString(firstInput, "artist", {tags, sk});
		firstInput.tags = joinArray(firstInput.tags);

		return await this.sendRequest({ method: "artist.addTags", ...firstInput }) as {};

	}

	public async getCorrection(artist:string):Promise<ArtistInterface.getCorrection>;
	public async getCorrection(params:{artist:string}):Promise<ArtistInterface.getCorrection>;
	public async getCorrection(artist:any) {
		
		artist = convertString(artist, "artist", {});
		let res = (((await this.sendRequest({ method: "artist.getCorrection", ...artist }))?.corrections?.correction) || {}) as any;

		if (Object.keys(res).length) {
			res.index = toInt(res["@attr"].index);
			res["@attr"] = void 0;
		}

		return res as ArtistInterface.getCorrection;

	}

	public async getInfo(artist:ArtistInput, params?:{autocorrect?:boolean, username?:string, sk?:string, lang?:string}):Promise<ArtistInterface.getInfo>;
	public async getInfo(params:ArtistInterface.getInfoInput):Promise<ArtistInterface.getInfo>;
	public async getInfo(firstInput:any, params?:{autocorrect?:boolean, username?:string, sk?:string, lang?:string}) {

		let res = (await this.sendRequest({ method: "artist.getInfo", ...firstInput, ...params })).artist as any;

		res.similarArtists = toArray(res.similar.artist);
		res.similar = void 0;
		res.tags = toArray(res.tags.tag);
		res.bio.link = res.bio.links.link;
		res.bio.links = void 0;

		res = convertEntry(res);
		res.stats = convertEntry(res.stats);

		return res as ArtistInterface.getInfo;

	}

	public async getSimilar(artist:ArtistInput, params?:{autocorrect?:boolean, limit?:number}):Promise<ArtistInterface.getSimilar>;
	public async getSimilar(params:ArtistInterface.getSimilarInput):Promise<ArtistInterface.getSimilar>;
	public async getSimilar(firstInput:any, params?:{limit?:number, autocorrect?:boolean}) {

		this.checkLimit(params?.limit ?? firstInput.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getSimilar", ...firstInput, ...params })).similarartists as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.artists = convertEntryArray(res.artist);
		res.artist = void 0;
		
		return res as ArtistInterface.getSimilar;

	}
	
	public async getTags(artist:ArtistInput, usernameOrSessionKey:string, params?:{autocorrect?:boolean}):Promise<ArtistInterface.getTags>;
	public async getTags(params:ArtistInterface.getTagsInput):Promise<ArtistInterface.getTags>;
	public async getTags(firstInput:any, usernameOrSessionKey?:string, params?:{autocorrect?:boolean}) {

		let req = addConditionals({ ...firstInput, ...params }, {user: usernameOrSessionKey});
		let res = this.convertGetTags((await this.sendRequest({method: "artist.getTags", ...req})).tags) as any;

		return convertBasicMetaTag(res) as ArtistInterface.getTags;

	}

	public async getTopAlbums(artist:ArtistInput, params?:{autocorrect?:boolean, username?:string, sk?:string, page?:number, limit?:number}):Promise<ArtistInterface.getTopAlbums>;
	public async getTopAlbums(params:ArtistInterface.PageLimitInput):Promise<ArtistInterface.getTopAlbums>;
	public async getTopAlbums(firstInput:any, params?:{page?:number, limit?:number, autocorrect?:boolean}) {

		this.checkLimit(params?.limit ?? firstInput.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getTopAlbums", ...firstInput, ...params })).topalbums as any;

		res.albums = toArray(res.album).filter((e:any) => e.name !== "(null)").map(convertEntry);
		res.album = void 0;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as ArtistInterface.getTopAlbums;

	}

	public async getTopTags(artist:ArtistInput, params?:{autocorrect?:boolean}):Promise<ArtistInterface.getTopTags>;
	public async getTopTags(params:ArtistInterface.BasicArtistInput):Promise<ArtistInterface.getTopTags>;
	public async getTopTags(firstInput:any, params?:{autocorrect?:boolean}) {

		let res = (await this.sendRequest({ method: "artist.getTopTags", ...firstInput, ...params })).toptags as any;

		return convertBasicMetaTag(res) as ArtistInterface.getTopTags;

	}

	public async getTopTracks(artist:ArtistInput, params?:{autocorrect?:boolean, page?:number, limit?:number}):Promise<ArtistInterface.getTopTracks>;
	public async getTopTracks(params:ArtistInterface.PageLimitInput):Promise<ArtistInterface.getTopTracks>;
	public async getTopTracks(firstInput:any, params?:{autocorrect?:boolean, page?:number, limit?:number}) {

		this.checkLimit(params?.limit ?? firstInput.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getTopTracks", ...firstInput, ...params })).toptracks as any;
		res.tracks = convertEntryArray(res.track);
		res.track = void 0;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as ArtistInterface.getTopTracks;

	}

	public async removeTag(artist:string, tag:string, sk:string):Promise<{}>;
	public async removeTag(params:ArtistInterface.removeTagInput):Promise<{}>;
	public async removeTag(firstInput:any, tag?:string, sk?:string) {

		firstInput = convertString(firstInput, "artist", {tag, sk});
		firstInput.tag = joinArray(firstInput.tag);

		return await this.sendRequest({ method: "artist.removeTag", ...firstInput }) as {};

	}

	public async search(artist:string, params?:{limit:number, page:number}):Promise<ArtistInterface.search>;
	public async search(params:ArtistInterface.searchInput):Promise<ArtistInterface.search>;
	public async search(firstInput:any, params?:{limit:number, page:number}) {

		this.checkLimit(params?.limit ?? firstInput?.limit, 1000);

		if (typeof firstInput === "string") {
			firstInput = {artist: firstInput}
		}

		let res = (await this.sendRequest({method: "artist.search", ...firstInput, ...params})).results as any;

		res = convertSearchWithQuery(res);

		res.artistMatches = convertEntryArray(res.artistmatches.artist);
		res.artistmatches = void 0;

		return res as ArtistInterface.search;

	}

}