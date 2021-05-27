import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";
import { toInt, toBool, toArray } from "../caster";

export default class ChartClass extends Base {

	public async getTopArtists(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopArtists", params)).artists as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.artists = toArray(res.artist).map((e:any) => {

			e.playcount = toInt(e.playcount);
			e.listeners = toInt(e.listeners);
			e.streamable = toBool(e.streamable);
			return e;

		});
		res.artist = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as ChartInterface.getTopArtists;

	}

	public async getTopTags(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTags", params)).tags as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tags = toArray(res.tag).map((e:any) => {

			e.reach = toInt(e.reach);
			e.taggings = toInt(e.taggings);
			e.streamable = toBool(e.streamable);
			return e;

		});
		res.tag = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as ChartInterface.getTopTags;

	}

	public async getTopTracks(params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("chart.getTopTracks", params)).tracks as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tracks = toArray(res.track).map((e:any) => {

			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
			e.streamable["#text"] = void 0;
			e.listeners = toInt(e.listeners);
			e.duration = toInt(e.duration);
			return e;

		});
		res.track = void 0;
		
		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as ChartInterface.getTopTracks;

	}

	private async getTop(method:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return await this.sendRequest({method, ...params});

	}

}