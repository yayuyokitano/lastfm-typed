import * as ChartInterface from "../interfaces/chartInterface";
import Base from "../base";
export default class ChartClass extends Base {
    getTopArtists(params?: {
        limit?: number;
        page?: number;
    }): Promise<ChartInterface.getTopArtists>;
    getTopTags(params?: {
        limit?: number;
        page?: number;
    }): Promise<ChartInterface.getTopTags>;
    getTopTracks(params?: {
        limit?: number;
        page?: number;
    }): Promise<ChartInterface.getTopTracks>;
    private getTop;
}
