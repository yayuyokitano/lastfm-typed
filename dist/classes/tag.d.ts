import * as TagInterface from "../interfaces/tagInterface";
import Base from "../base";
export default class TagClass extends Base {
    getInfo(tag: string, params?: {
        lang?: string;
    }): Promise<TagInterface.getInfo>;
    getTopAlbums(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<TagInterface.getTopAlbums>;
    getTopArtists(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<TagInterface.getTopArtists>;
    getTopTags(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<TagInterface.getTopTags>;
    getTopTracks(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<TagInterface.getTopTracks>;
    private getTop;
}
