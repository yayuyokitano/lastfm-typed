import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";
import { convertMeta, convertEntryArray } from "../caster";

export default class ChartClass extends Base {

	public async getTopArtists(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopArtists", params)).artists as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.artists = convertEntryArray(res.artist);
		res.artist = void 0;

		return res as ChartInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTags", params)).tags as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.tags = convertEntryArray(res.tag);
		res.tag = void 0;

		return res as ChartInterface.getTopTags;

	}

	public async getTopTracks(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTracks", params)).tracks as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.tracks = convertEntryArray(res.track);
		res.track = void 0;

		return res as ChartInterface.getTopTracks;

	}

	private async getTop(method:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return await this.sendRequest({method, ...params});

	}

}