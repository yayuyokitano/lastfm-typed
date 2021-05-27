import * as ArtistInterface from "../interfaces/artistInterface";
import Base from "../base";
import { ArtistInput } from "../interfaces/shared";
import { toInt, toArray, convertMeta, convertEntryArray, convertEntry, joinArray, convertSearchWithQuery, convertBasicMetaTag } from "../caster";

export default class ArtistClass extends Base {

	public async addTags(artist:string, tags:string[]|string, sk:string) {

		tags = joinArray(tags);

		return await this.sendRequest({ method: "artist.addTags", tags, sk, artist }) as {};

	}

	public async getCorrection(artist:string) {
		
		let res = (((await this.sendRequest({ method: "artist.getCorrection", artist }))?.corrections?.correction) || {}) as any;

		if (Object.keys(res).length) {
			res.index = toInt(res["@attr"].index);
			res["@attr"] = void 0;
		}

		return res as ArtistInterface.getCorrection;

	}

	public async getInfo(artist:ArtistInput, params?:{autocorrect?:boolean, username?:string, sk?:string, lang?:string}) {

		let res = (await this.sendRequest({ method: "artist.getInfo", ...artist, ...params })).artist as any;

		res.similarArtists = toArray(res.similar.artist);
		res.similar = void 0;
		res.tags = toArray(res.tags.tag);
		res.bio.link = res.bio.links.link;
		res.bio.links = void 0;

		res = convertEntry(res);
		res.stats = convertEntry(res.stats);

		return res as ArtistInterface.getInfo;

	}

	public async getSimilar(artist:ArtistInput, params?:{limit?:number, autocorrect?:boolean}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getSimilar", ...artist, ...params })).similarartists as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.artists = convertEntryArray(res.artist);
		res.artist = void 0;
		
		return res as ArtistInterface.getSimilar;

	}
	
	public async getTags(artist:ArtistInput, usernameOrSessionKey:string, params?:{autocorrect?:boolean}) {

		let res = this.convertGetTags((await this.sendRequest({ method: "artist.getTags", ...artist, user: usernameOrSessionKey, ...params })).tags) as any;

		return convertBasicMetaTag(res) as ArtistInterface.getTags;

	}

	public async getTopAlbums(artist:ArtistInput, params?:{autocorrect?:boolean, page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getTopAlbums", ...artist, ...params })).topalbums as any;

		res.albums = toArray(res.album).filter((e:any) => e.name !== "(null)").map(convertEntry);
		res.album = void 0;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as ArtistInterface.getTopAlbums;

	}

	public async getTopTags(artist:ArtistInput, params?:{autocorrect?:boolean}) {

		let res = (await this.sendRequest({ method: "artist.getTopTags", ...artist, ...params })).toptags as any;

		return convertBasicMetaTag(res) as ArtistInterface.getTopTags;

	}

	public async getTopTracks(artist:ArtistInput, params?:{autocorrect?:boolean, page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getTopTracks", ...artist, ...params })).toptracks as any;
		res.tracks = convertEntryArray(res.track);
		res.track = void 0;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as ArtistInterface.getTopTracks;

	}

	public async removeTag(artist:string, tag:string, sk:string) {

		return await this.sendRequest({ method: "artist.removeTag", tag, sk, artist }) as {};

	}

	public async search(artist:string, params?:{limit:number, page:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({method: "artist.search", artist, ...params})).results as any;

		res = convertSearchWithQuery(res);

		res.artistMatches = convertEntryArray(res.artistmatches.artist);
		res.artistmatches = void 0;

		return res as ArtistInterface.search;

	}

}