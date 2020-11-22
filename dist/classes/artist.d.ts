import * as ArtistInterface from "../interfaces/artistInterface";
import Base from "../base";
import { ArtistInput } from "../interfaces/shared";
export default class ArtistClass extends Base {
    addTags(artist: string, tags: string[] | string, sk: string): Promise<{}>;
    getCorrection(artist: string): Promise<{} | ArtistInterface.getCorrection>;
    getInfo(artist: ArtistInput, params?: {
        autocorrect?: 0 | 1;
        username?: string;
        sk?: string;
        lang?: string;
    }): Promise<ArtistInterface.getInfo>;
    getSimilar(artist: ArtistInput, params?: {
        limit?: number;
        autocorrect?: 0 | 1;
    }): Promise<ArtistInterface.getSimilar>;
    getTags(artist: ArtistInput, usernameOrSessionKey: string, params?: {
        autocorrect?: 0 | 1;
    }): Promise<ArtistInterface.getTags>;
    getTopAlbums(artist: ArtistInput, params?: {
        autocorrect?: 0 | 1;
        page?: number;
        limit?: number;
    }): Promise<ArtistInterface.getTopAlbums>;
    getTopTags(artist: ArtistInput, params?: {
        autocorrect?: 0 | 1;
    }): Promise<ArtistInterface.getTopTags>;
    getTopTracks(artist: ArtistInput, params?: {
        autocorrect?: 0 | 1;
        page?: number;
        limit?: number;
    }): Promise<ArtistInterface.getTopTracks>;
    removeTag(artist: ArtistInput, tag: string, sk: string): Promise<{}>;
    search(artist: string, params?: {
        limit: number;
        page: number;
    }): Promise<ArtistInterface.search>;
}
