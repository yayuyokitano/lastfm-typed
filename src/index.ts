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

		if (params?.limit) {
			if (params.limit > 1000 || params.limit < 1) {
				throw new Error(`tag.getTopAlbums: limit out of bounds (1-1000), ${params.limit} passed`);
			}
		}

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

		console.log(params);

		if (params?.limit) {
			if (params.limit > 1000 || params.limit < 1) {
				throw new Error(`tag.getTopArtists: limit out of bounds (1-1000), ${params.limit} passed`);
			}
		}

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

		if (params?.limit) {
			if (params.limit > 1000 || params.limit < 1) {
				throw new Error(`tag.getTopTracks: limit out of bounds (1-1000), ${params.limit} passed`);
			}
		}

		return await new lfmrequest(this.key, this.secret, {
			method: "tag.getTopTags",
			tag,
			...params
		}).execute() as Tag.getTopAlbums;

	}

	public async tag_getTopTracks(tag:string, params?:{
		limit?:number,
		page?:number
	}) {

		if (params?.limit) {
			if (params.limit > 1000 || params.limit < 1) {
				throw new Error(`tag.getTopTracks: limit out of bounds (1-1000), ${params.limit} passed`);
			}
		}

		return await new lfmrequest(this.key, this.secret, {
			method: "tag.getTopTracks",
			tag,
			...params
		}).execute() as Tag.getTopAlbums;

	}


}
