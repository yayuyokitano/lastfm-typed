import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";

export default class ChartClass extends Base {

	public async getTopArtists(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopArtists", params)).artists as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.artists = res.artist;
		delete res.artist;

		return res as ChartInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTags", params)).tags as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tags = res.tag;
		delete res.tag;

		return res as ChartInterface.getTopTags;

	}

	public async getTopTracks(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTracks", params)).tracks as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tracks = res.track;
		delete res.track;

		res.tracks.forEach((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			delete e.streamable["#text"];
		});

		return res as ChartInterface.getTopTracks;

	}

	private async getTop(method:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return await this.sendRequest(this.key, this.secret, {method, ...params});

	}

}