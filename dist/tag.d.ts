import * as TagInterface from "./interfaces/tagInterface";
export declare class Tag {
    private key;
    private secret;
    constructor(api_key: string, api_secret?: string);
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
}
