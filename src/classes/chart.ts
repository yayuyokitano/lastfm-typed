import LFMRequest from "../request";
import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";

export default class ChartClass extends Base {

	public async getTopArtists(params?:{limit?:number, page?:number}) {

		return (await this.getTop("chart.getTopArtists", params)).artists as ChartInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		return (await this.getTop("chart.getTopTags", params)).tags as ChartInterface.getTopTags;

	}

	public async getTopTracks(params?:{limit?:number, page?:number}) {

		return (await this.getTop("chart.getTopTracks", params)).tracks as ChartInterface.getTopTracks;

	}

	private async getTop(method:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return await new LFMRequest(this.key, this.secret, {method, ...params}).execute();

	}

}