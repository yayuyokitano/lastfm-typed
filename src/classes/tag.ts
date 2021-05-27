import * as TagInterface from "../interfaces/tagInterface";
import {ShortMetadata} from "../interfaces/shared";
import Base from "../base";
import { toInt, toBool, toArray, convertMeta } from "../caster";

export default class TagClass extends Base {

	public async getInfo(tag:string, params?:{lang?:string}) {

		return (await this.sendRequest({method: "tag.getInfo", tag, ...params})).tag as TagInterface.getInfo;

	}
	
	//skip tag.getSimilar because i have been unable to find any instance of it returning anything

	public async getTopAlbums(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopAlbums", tag, params)).albums as any;
		
		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.albums = toArray(res.album).map((e:any) => {

			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;

			e.image = toArray(e.image).map((f:any) => {
				f.url = f["#text"];
				f["#text"] = void 0;
				return f;
			});

			return e;

		});

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as TagInterface.getTopAlbums;

	}

	public async getTopArtists(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopArtists", tag, params)).topartists as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.artists = toArray(res.artist).map((e:any) => {

			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			return e;

		});

		return res as TagInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		//set arguments in a way consistent with other endpoints
		const newParams = this.convertNumRes(params);

		let res = (await this.getTop("tag.getTopTags", "", newParams)).toptags as any;

		const total = toInt(res["@attr"].total);
		if (typeof total === "undefined") {
			throw "Total is not a number";
		}

		let attr:ShortMetadata = {
			total,
			page: ((newParams.offset / newParams.num_res) + 1),
			perPage: newParams.num_res,
			totalPages: Math.ceil(total) / newParams.num_res
		};

		res.meta = attr;
		res["@attr"] = void 0;
		res.tags = toArray(res.tag).map((e: any) => {
			e.rank = toInt(e.rank);
			return e;
		});

		res.tag = void 0;
		return res as TagInterface.getTopTags;

	}

	public async getTopTracks(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopTracks", tag, params)).tracks as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.tracks = toArray(res.track).map((e:any) => {

			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
			e.streamable["#text"] = void 0;
			e.duration = toInt(e.duration);
			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			return e;

		});

		return res as TagInterface.getTopTracks;

	}

	private async getTop(method:string, tag:string, params?:{limit?:number, page?:number, num_res?:number, offset?:number}) {

		this.checkLimit(params?.limit || params?.num_res, 1000);

		return await this.sendRequest({method, tag, ...params});

	}

}