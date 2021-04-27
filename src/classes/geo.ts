import * as GeoInterface from "../interfaces/geoInterface";
import Base from "../base";

export default class GeoClass extends Base {

	public async getTopArtists(country:string, params?:{limit?:number, page?:number}) {

		let res = (await this.getTop("geo.getTopArtists", country, params)).topartists as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.artists = res.artist;
		delete res.artist;

		return res as GeoInterface.getTopArtists;

	}

	public async getTopTracks(country:string, params?:{limit?:number, page?:number, location?:string}) {

		let res = (await this.getTop("geo.getTopTracks", country, params)).tracks as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tracks = res.track;
		delete res.track;

		res.tracks.forEach((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			delete e.streamable["#text"];
		});

		return res as GeoInterface.getTopTracks;

	}

	private async getTop(method:string, country:string, params?:{limit?:number, page?:number, location?:string}) {

		this.checkLimit(params?.limit, 1000);

		return await this.sendRequest({method, country, ...params});

	}

}