import LFMRequest from "../request";
import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";

export default class ChartClass extends Base {

	public async getTopArtists(country:string, params?:{
		limit?:number,
		page?:number
	}) {

		return await this.getTop("chart.getTopArtists", params) as ChartInterface.getTopArtists;

	}

	public async getTopTags(country:string, params?:{
		limit?:number,
		page?:number
	}) {

		return await this.getTop("chart.getTopTags", params) as ChartInterface.getTopTags;

	}

	public async getTopTracks(country:string, params?:{
		limit?:number,
		page?:number
	}) {

		return await this.getTop("chart.getTopTracks", params) as ChartInterface.getTopTracks;

	}

	private async getTop(method:string, params?:{
		limit?:number,
		page?:number
	}) {
		this.checkLimit(params?.limit, 1000);

		return await new LFMRequest(this.key, this.secret, {
			method,
			...params
		}).execute();
	}

}