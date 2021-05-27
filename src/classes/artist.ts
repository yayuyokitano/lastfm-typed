import * as ArtistInterface from "../interfaces/artistInterface";
import Base from "../base";
import { ArtistInput } from "../interfaces/shared";
import { toInt, toBool, toArray, convertMeta, convertSearch, convertImage } from "../caster";

export default class ArtistClass extends Base {

	public async addTags(artist:string, tags:string[]|string, sk:string) {

		if (Array.isArray(tags)) {
			tags = tags.join(",");
		}

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

	public async getInfo(artist:ArtistInput, params?:{autocorrect?:0|1, username?:string, sk?:string, lang?:string}) {

		let res = (await this.sendRequest({ method: "artist.getInfo", ...artist, ...params })).artist as any;

		res.similarArtists = toArray(res.similar.artist);
		res.similar = void 0;
		res.tags = toArray(res.tags.tag);
		res.bio.link = res.bio.links.link;
		res.bio.links = void 0;

		res.ontour = toBool(res.ontour);
		res.stats.listeners = toInt(res.stats.listeners);
		res.stats.playcount = toInt(res.stats.playcount);
		res.stats.userplaycount = toInt(res.stats.userplaycount);
		res.streamable = toBool(res.streamable);

		return res as ArtistInterface.getInfo;

	}

	public async getSimilar(artist:ArtistInput, params?:{limit?:number, autocorrect?:0|1}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getSimilar", ...artist, ...params })).similarartists as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.artists = toArray(res.artist).map((e:any) => {
			e.streamable = toBool(e.streamable);
			return e;
		});
		res.artist = void 0;
		
		return res as ArtistInterface.getSimilar;

	}
	
	public async getTags(artist:ArtistInput, usernameOrSessionKey:string, params?:{autocorrect?:0|1}) {

		let res = this.convertGetTags((await this.sendRequest({ method: "artist.getTags", ...artist, user: usernameOrSessionKey, ...params })).tags) as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = toArray(res.tag);
		res.tag = void 0;

		return res as ArtistInterface.getTags;

	}

	public async getTopAlbums(artist:ArtistInput, params?:{autocorrect?:0|1, page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getTopAlbums", ...artist, ...params })).topalbums as any;

		res.albums = toArray(res.album).filter((e:any) => e.name !== "(null)")
		.map((e:any) => {
			e.image = convertImage(e.image);
			return e;
		});
		res.album = void 0;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as ArtistInterface.getTopAlbums;

	}

	public async getTopTags(artist:ArtistInput, params?:{autocorrect?:0|1}) {

		let res = (await this.sendRequest({ method: "artist.getTopTags", ...artist, ...params })).toptags as any;
		
		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = res.tag;
		res.tag = void 0;

		return res as ArtistInterface.getTopTags;

	}

	public async getTopTracks(artist:ArtistInput, params?:{autocorrect?:0|1, page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "artist.getTopTracks", ...artist, ...params })).toptracks as any;
		res.tracks = toArray(res.track).map((e:any) => {
			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;

			e.image = convertImage(e.image);

			e.playcount = toInt(e.playcount);
			e.listeners = toInt(e.listeners);
			e.streamable = toBool(e.streamable);

			return e;
		});

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

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.meta.query = res.meta.for;
		res.meta.for = void 0;
		
		res = convertSearch(res);

		res.artistMatches = toArray(res.artistmatches.artist).map((e:any) => {

			e.listeners = toInt(e.listeners);
			e.streamable = toBool(e.streamable);
			
			return e;
		
		});

		res.artistmatches = void 0;

		return res as ArtistInterface.search;

	}

}