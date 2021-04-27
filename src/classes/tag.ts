import * as TagInterface from "../interfaces/tagInterface";
import {ShortMetadata} from "../interfaces/shared";
import Base from "../base";

export default class TagClass extends Base {

	public async getInfo(tag:string, params?:{lang?:string}) {

		return (await this.sendRequest({method: "tag.getInfo", tag, ...params})).tag as TagInterface.getInfo;

	}
	
	//skip tag.getSimilar because i have been unable to find any instance of it returning anything

	public async getTopAlbums(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopAlbums", tag, params)).albums as any;
		
		res.meta = res["@attr"];
		delete res["@attr"];
		res.albums = res.album;
		delete res.album;

		res.albums.forEach((e:any) => {
			e.rank = e["@attr"].rank;
			delete e["@attr"];
			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			});
		});

		return res as TagInterface.getTopAlbums;

	}

	public async getTopArtists(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopArtists", tag, params)).topartists as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.artists = res.artist;
		delete res.artist;

		res.artists.forEach((e:any) => {
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		});

		return res as TagInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		//set arguments in a way consistent with other endpoints
		const newParams = this.convertNumRes(params);

		let res = (await this.getTop("tag.getTopTags", "", newParams)).toptags as any;

		let attr:ShortMetadata = {
			total: res["@attr"].total as string,
			page: ((newParams.offset / newParams.num_res) + 1).toString(),
			perPage: newParams.num_res.toString(),
			totalPages: Math.ceil(parseInt(res["@attr"].total) / newParams.num_res).toString()
		};

		res.meta = attr;
		delete res["@attr"];
		res.tags = res.tag;
		delete res.tag;
		return res as TagInterface.getTopTags;

	}

	public async getTopTracks(tag:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("tag.getTopTracks", tag, params)).tracks as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tracks = res.track;
		delete res.track;

		res.tracks.forEach((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			delete e.streamable["#text"];
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		});

		return res as TagInterface.getTopTracks;

	}

	private async getTop(method:string, tag:string, params?:{limit?:number, page?:number, num_res?:number, offset?:number}) {

		this.checkLimit(params?.limit || params?.num_res, 1000);

		return await this.sendRequest({method, tag, ...params});

	}

}