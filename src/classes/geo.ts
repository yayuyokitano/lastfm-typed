import * as GeoInterface from "../interfaces/geoInterface";
import Base from "../base";
import { convertExtendedMeta } from "../caster";

export default class GeoClass extends Base {

	public async getTopArtists(country:string, params?:{limit?:number, page?:number}):Promise<GeoInterface.getTopArtists>;
	public async getTopArtists(input:GeoInterface.GeoBase):Promise<GeoInterface.getTopArtists>;
	public async getTopArtists(firstInput:any, params?:{limit?:number, page?:number}) {

		if (typeof firstInput === "string") {
			firstInput = {country: firstInput};
		}

		let res = (await this.getTop("geo.getTopArtists", firstInput, params)).topartists as any;

		return convertExtendedMeta(res, "artist") as GeoInterface.getTopArtists;

	}

	public async getTopTracks(country:string, params?:{limit?:number, page?:number, location?:string}):Promise<GeoInterface.getTopTracks>;
	public async getTopTracks(input:GeoInterface.getTopTracksInput):Promise<GeoInterface.getTopTracks>;
	public async getTopTracks(firstInput:any, params?:{limit?:number, page?:number, location?:string}) {

		if (typeof firstInput === "string") {
			firstInput = {country: firstInput};
		}

		let res = (await this.getTop("geo.getTopTracks", firstInput, params)).tracks as any;

		return convertExtendedMeta(res, "track") as GeoInterface.getTopTracks;

	}

	private async getTop(method:string, firstInput:any, params?:{limit?:number, page?:number, location?:string}) {

		this.checkLimit(params?.limit ?? firstInput?.limit, 1000);

		return await this.sendRequest({method, ...firstInput, ...params});

	}

}