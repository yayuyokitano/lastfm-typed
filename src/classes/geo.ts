import * as GeoInterface from "../interfaces/geoInterface";
import Base from "../base";
import { convertExtendedMeta } from "../caster";

export default class GeoClass extends Base {

	public async getTopArtists(country:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("geo.getTopArtists", country, params)).topartists as any;

		return convertExtendedMeta(res, "artist") as GeoInterface.getTopArtists;

	}

	public async getTopTracks(country:string, params?:{limit?:number, page?:number, location?:string}) {

		let res = (await this.getTop("geo.getTopTracks", country, params)).tracks as any;

		return convertExtendedMeta(res, "track") as GeoInterface.getTopTracks;

	}

	private async getTop(method:string, country:string, params?:{limit?:number, page?:number, location?:string}) {

		this.checkLimit(params?.limit, 1000);

		return await this.sendRequest({method, country, ...params});

	}

}