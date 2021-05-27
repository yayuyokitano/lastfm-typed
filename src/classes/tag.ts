import * as TagInterface from "../interfaces/tagInterface";
import {ShortMetadata} from "../interfaces/shared";
import Base from "../base";
import { toInt, convertEntryArray, convertExtendedMeta } from "../caster";

export default class TagClass extends Base {

	public async getInfo(tag:string, params?:{lang?:string}) {

		return (await this.sendRequest({method: "tag.getInfo", tag, ...params})).tag as TagInterface.getInfo;

	}
	
	//skip tag.getSimilar because i have been unable to find any instance of it returning anything

	public async getTopAlbums(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopAlbums", tag, params)).albums as any;

		return convertExtendedMeta(res, "album") as TagInterface.getTopAlbums;

	}

	public async getTopArtists(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopArtists", tag, params)).topartists as any;

		return convertExtendedMeta(res, "artist") as TagInterface.getTopArtists;

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
		res.tags = convertEntryArray(res.tag);

		res.tag = void 0;
		return res as TagInterface.getTopTags;

	}

	public async getTopTracks(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopTracks", tag, params)).tracks as any;

		return convertExtendedMeta(res, "track") as TagInterface.getTopTracks;

	}

	private async getTop(method:string, tag:string, params?:{limit?:number, page?:number, num_res?:number, offset?:number}) {

		this.checkLimit(params?.limit || params?.num_res, 1000);

		return await this.sendRequest({method, tag, ...params});

	}

}