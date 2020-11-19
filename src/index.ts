import lfmrequest from "./request"
import * as Tag from "./interfaces/tagInterface"

export default class LastFM {

	private key:string;
	private secret:string;

	public constructor(api_key:string, api_secret:string = "") {
		this.key = api_key;
		this.secret = api_secret;
	}

	public async tag_getInfo(tag:string, params?:{
		lang?:string;
	}) {

		return await new lfmrequest(this.key, this.secret, {
			method: "tag.getInfo",
			tag,
			...params
		}).execute() as Tag.getInfo;

	}
	
	//skip tag.getSimilar because i have been unable to find any instance of it returning anything

	public async tag_getTopAlbums(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		this.checkLimit(params?.limit, 1000);

		return await new lfmrequest(this.key, this.secret, {
			method: "tag.getTopAlbums",
			tag,
			...params
		}).execute() as Tag.getTopAlbums;

	}

	public async tag_getTopArtists(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		this.checkLimit(params?.limit, 1000);

		return await new lfmrequest(this.key, this.secret, {
			method: "tag.getTopArtists",
			tag,
			...params
		}).execute() as Tag.getTopArtists;

	}

	public async tag_getTopTags(tag:string, params?:{
		limit?:number,
		page?:number
	}) {


		//set arguments in a way consistent with other endpoints
		const newParams = this.convertNumRes(params);
		this.checkLimit(newParams.num_res, 1000);

		let res = await new lfmrequest(this.key, this.secret, {
			method: "tag.getTopTags",
			tag,
			...newParams
		}).execute();

		let attr:Tag.ShortMetadata = {
			total: res.toptags["@attr"].total as string,
			page: ((newParams.offset / newParams.num_res) + 1).toString(),
			perPage: newParams.num_res.toString(),
			totalPages: Math.ceil(parseInt(res.toptags["@attr"].total) / newParams.num_res).toString()
		}
		res.toptags["@attr"] = attr;
		return res as Tag.getTopTags;

	}

	public async tag_getTopTracks(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		this.checkLimit(params?.limit, 1000);

		return await new lfmrequest(this.key, this.secret, {
			method: "tag.getTopTracks",
			tag,
			...params
		}).execute() as Tag.getTopTracks;

	}




	///helper functions

	private checkLimit(limit:number|undefined, maxLimit:number) {
		if (limit !== undefined && (limit > maxLimit || limit < 1)) {
			throw new Error(`Limit out of bounds (1-${maxLimit}), ${limit} passed`);
		}
	}

	private convertNumRes(params:any) {
		let newParams = {
			num_res: 50,
			offset: 0
		}

		newParams.num_res = params?.limit || 50,
		newParams.offset = ((params?.page || 1) - 1) * newParams.num_res;
		return newParams;
	}


}
