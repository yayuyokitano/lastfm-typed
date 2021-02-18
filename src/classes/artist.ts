import * as ArtistInterface from "../interfaces/artistInterface";
import Base from "../base";
import { ArtistInput } from "../interfaces/shared";

export default class ArtistClass extends Base {

	public async addTags(artist:string, tags:string[]|string, sk:string) {

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

		return await this.sendRequest(this.key, this.secret, { method: "artist.addTags", tags, sk, artist }) as {};

	}

	public async getCorrection(artist:string) {
		
		let res = (((await this.sendRequest(this.key, this.secret, { method: "artist.getCorrection", artist }))?.corrections?.correction) || {}) as any;

		res.index = res["@attr"].index;
		delete res["@attr"];

		return res as ArtistInterface.getCorrection|{}

	}

	public async getInfo(artist:ArtistInput, params?:{autocorrect?:0|1, username?:string, sk?:string, lang?:string}) {

		let res = (await this.sendRequest(this.key, this.secret, { method: "artist.getInfo", ...artist, ...params })).artist as any;

		res.similarArtists = res.similar.artist;
		delete res.similar;
		res.tags = res.tags.tag;
		res.bio.link = res.bio.links.link;
		delete res.bio.links;

		return res as ArtistInterface.getInfo;

	}

	public async getSimilar(artist:ArtistInput, params?:{limit?:number, autocorrect?:0|1}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest(this.key, this.secret, { method: "artist.getSimilar", ...artist, ...params })).similarartists as any;

		res.artists = res.artist;
		delete res.artist;
		res.meta = res["@attr"];
		delete res["@attr"];
		
		return res as ArtistInterface.getSimilar;

	}
	
	public async getTags(artist:ArtistInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		let res = this.convertGetTags((await this.sendRequest(this.key, this.secret, { method: "artist.getTags", ...artist, user: usernameOrSessionKey, ...params })).tags) as any;

		res.meta = res["@attr"];
		delete res["@attr"];

		return res as ArtistInterface.getTags

	}

	public async getTopAlbums(artist:ArtistInput, params?:{autocorrect?:0|1, page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest(this.key, this.secret, { method: "artist.getTopAlbums", ...artist, ...params })).topalbums as any;

		res.albums = res.album;
		delete res.album;
		res.albums.forEach((e:any) => {
			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			})
		})
		res.meta = res["@attr"];
		delete res["@attr"];

		return res as ArtistInterface.getTopAlbums;

	}

	public async getTopTags(artist:ArtistInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest(this.key, this.secret, { method: "artist.getTopTags", ...artist, ...params })).toptags as any;
		
		res.meta = res["@attr"];
		delete res["@attr"];

		return res as ArtistInterface.getTopTags;

	}

	public async getTopTracks(artist:ArtistInput, params?:{autocorrect?:0|1, page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest(this.key, this.secret, { method: "artist.getTopTracks", ...artist, ...params })).toptracks as any;
		res.track.forEach((e:any) => {
			e.rank = e["@attr"].rank;
			delete e["@attr"];

			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			})

		});

		res.tracks = res.track;
		delete res.track;

		res.meta = res["@attr"];
		delete res["@attr"];

		return res as ArtistInterface.getTopTracks;

	}

	public async removeTag(artist:string, tag:string, sk:string) {

		return await this.sendRequest(this.key, this.secret, { method: "artist.removeTag", tag, sk, artist }) as {};

	}

	public async search(artist:string, params?:{limit:number, page:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest(this.key, this.secret, {method: "artist.search", artist, ...params})).results as any;

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
		res.artistMatches = res.artistmatches.artist;
		delete res.artistmatches;

		return res as ArtistInterface.search;

	}

}