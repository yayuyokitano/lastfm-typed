import * as GeoInterface from "../interfaces/geoInterface";
import Base from "../base";
export default class GeoClass extends Base {
    getTopArtists(country: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<GeoInterface.getTopArtists>;
    getTopTracks(country: string, params?: {
        limit?: number;
        page?: number;
        location?: string;
    }): Promise<GeoInterface.getTopTracks>;
    private getTop;
}
