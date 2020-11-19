import * as Tag from "./interfaces/tagInterface";
export default class LastFM {
    private key;
    private secret;
    constructor(api_key: string, api_secret?: string);
    tag_getInfo(tag: string, params?: {
        lang?: string;
    }): Promise<Tag.getInfo>;
    tag_getTopAlbums(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<Tag.getTopAlbums>;
    tag_getTopArtists(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<Tag.getTopArtists>;
    tag_getTopTags(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<Tag.getTopAlbums>;
    tag_getTopTracks(tag: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<Tag.getTopAlbums>;
}
