import * as AlbumInterface from "../interfaces/albumInterface";
import Base from "../base";
import { AlbumInput } from "../interfaces/shared";
export default class AlbumClass extends Base {
    addTags(artist: string, album: string, tags: string[] | string, sk: string): Promise<{}>;
    getInfo(album: AlbumInput, params?: {
        autocorrect?: 0 | 1;
        username?: string;
        sk?: string;
        lang?: string;
    }): Promise<AlbumInterface.getInfo>;
    getTags(album: AlbumInput, usernameOrSessionKey: string, params?: {
        autocorrect?: 0 | 1;
    }): Promise<AlbumInterface.getTags>;
    getTopTags(album: AlbumInput, params?: {
        autocorrect?: 0 | 1;
    }): Promise<AlbumInterface.getTopTags>;
    removeTag(artist: string, album: string, tag: string, sk: string): Promise<{}>;
    search(album: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<AlbumInterface.search>;
}
