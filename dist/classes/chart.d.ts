import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";
export default class ChartClass extends Base {
    getTopArtists(country: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<ChartInterface.getTopArtists>;
    getTopTags(country: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<ChartInterface.getTopTags>;
    getTopTracks(country: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<ChartInterface.getTopTracks>;
    private getTop;
}
