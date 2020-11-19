import LFMRequest from "../request";
import * as TagInterface from "../interfaces/tagInterface";
import {ShortMetadata} from "../interfaces/shared";
import Base from "../base";

export default class TagClass extends Base {

	public async getInfo(tag:string, params?:{
		lang?:string;
	}) {

		return await new LFMRequest(this.key, this.secret, {
			method: "tag.getInfo",
			tag,
			...params
		}).execute() as TagInterface.getInfo;

	}
	
	//skip tag.getSimilar because i have been unable to find any instance of it returning anything

	public async getTopAlbums(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		return await this.getTop("tag.getTopAlbums", tag, params) as TagInterface.getTopAlbums;

	}

	public async getTopArtists(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		return await this.getTop("tag.getTopArtists", tag, params) as TagInterface.getTopArtists;

	}

	public async getTopTags(tag:string, params?:{
		limit?:number,
		page?:number
	}) {


		//set arguments in a way consistent with other endpoints
		const newParams = this.convertNumRes(params);

		let res = await this.getTop("tag.getTopTags", tag, newParams);

		let attr:ShortMetadata = {
			total: res.toptags["@attr"].total as string,
			page: ((newParams.offset / newParams.num_res) + 1).toString(),
			perPage: newParams.num_res.toString(),
			totalPages: Math.ceil(parseInt(res.toptags["@attr"].total) / newParams.num_res).toString()
		};

		res.toptags["@attr"] = attr;
		return res as TagInterface.getTopTags;

	}

	public async getTopTracks(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		return await this.getTop("tag.getTopTracks", tag, params) as TagInterface.getTopTracks;

	}

	private async getTop(method:string, tag:string, params?:{
		limit?:number,
		page?:number,
		num_res?:number,
		offset?:number
	}) {
		this.checkLimit(params?.limit || params?.num_res, 1000);

		return await new LFMRequest(this.key, this.secret, {
			method,
			tag,
			...params
		}).execute();
	}

}