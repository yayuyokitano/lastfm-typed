import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";
import { convertExtendedMeta } from "../caster";

export default class ChartClass extends Base {

	public async getTopArtists(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopArtists", params)).artists as any;

		return convertExtendedMeta(res, "artist") as ChartInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTags", params)).tags as any;

		return convertExtendedMeta(res, "tag") as ChartInterface.getTopTags;

	}

	public async getTopTracks(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTracks", params)).tracks as any;

		return convertExtendedMeta(res, "track") as ChartInterface.getTopTracks;

	}

	private async getTop(method:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return await this.sendRequest({method, ...params});

	}

}