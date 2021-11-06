import * as TagInterface from "../interfaces/tagInterface";
import {ShortMetadata} from "../interfaces/shared";
import Base from "../base";
import { toInt, convertEntryArray, convertExtendedMeta, addConditionals, convertString } from "../caster";

export default class TagClass extends Base {

	public async getInfo(tag:string, params?:{lang?:string}):Promise<TagInterface.getInfo>;
	public async getInfo(input:TagInterface.getInfoInput):Promise<TagInterface.getInfo>;
	public async getInfo(firstInput:any, params?:{lang?:string}) {

		firstInput = convertString(firstInput, "tag", params ?? {});

		return (await this.sendRequest({method: "tag.getInfo", ...firstInput, ...params})).tag as TagInterface.getInfo;

	}
	
	//skip tag.getSimilar because i have been unable to find any instance of it returning anything

	public async getTopAlbums(tag:string, params?:{limit?:number, page?:number}):Promise<TagInterface.getTopAlbums>;
	public async getTopAlbums(input:TagInterface.PaginatedTagInput):Promise<TagInterface.getTopAlbums>;
	public async getTopAlbums(firstInput:any, params?:{limit?:number, page?:number}) {

		firstInput = convertString(firstInput, "tag", params ?? {});

		let res = (await this.getTop("tag.getTopAlbums", firstInput, params)).albums as any;

		return convertExtendedMeta(res, "album") as TagInterface.getTopAlbums;

	}

	public async getTopArtists(tag:string, params?:{limit?:number, page?:number}):Promise<TagInterface.getTopArtists>;
	public async getTopArtists(input:TagInterface.PaginatedTagInput):Promise<TagInterface.getTopArtists>;
	public async getTopArtists(firstInput:any, params?:{limit?:number, page?:number}) {

		firstInput = convertString(firstInput, "tag", params ?? {});

		let res = (await this.getTop("tag.getTopArtists", firstInput, params)).topartists as any;

		return convertExtendedMeta(res, "artist") as TagInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		//set arguments in a way consistent with other endpoints
		const newParams = this.convertNumRes(params);

		let res = (await this.getTop("tag.getTopTags", {}, newParams)).toptags as any;

		const total = toInt(res["@attr"].total);
		if (total === null) {
			throw "Total is not a number";
		}

		let attr:ShortMetadata = {
			total,
			page: ((newParams.offset / newParams.num_res) + 1),
			perPage: newParams.num_res,
			totalPages: Math.ceil(total) / newParams.num_res
		};

		res.meta = attr;
		delete res["@attr"];
		res.tags = convertEntryArray(res.tag);

		delete res.tag;
		return res as TagInterface.getTopTags;

	}

	public async getTopTracks(tag:string, params?:{limit?:number, page?:number}):Promise<TagInterface.getTopTracks>;
	public async getTopTracks(input:TagInterface.PaginatedTagInput):Promise<TagInterface.getTopTracks>;
	public async getTopTracks(firstInput:any, params?:{limit?:number, page?:number}) {

		firstInput = convertString(firstInput, "tag", params ?? {});

		let res = (await this.getTop("tag.getTopTracks", firstInput, params)).tracks as any;

		return convertExtendedMeta(res, "track") as TagInterface.getTopTracks;

	}

	private async getTop(method:string, firstInput:any, params?:{limit?:number, page?:number, num_res?:number, offset?:number}) {

		this.checkLimit((params?.limit ?? firstInput?.limit) || (params?.num_res ?? firstInput?.num_res), 1000);

		return await this.sendRequest({method, ...firstInput, ...params});

	}

}