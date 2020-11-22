import * as TrackInterface from "../interfaces/trackInterface";
import Base from "../base";
import { TrackInput } from "../interfaces/shared";
interface ScrobbleObject {
    artist: string;
    track: string;
    timestamp: number;
    album?: string;
    chosenByUser?: 0 | 1;
    trackNumber?: number;
    mbid?: string;
    albumArtist?: string;
    duration?: number;
}
export default class ArtistClass extends Base {
    addTags(artist: string, track: string, tags: string[] | string, sk: string): Promise<{}>;
    getCorrection(artist: string, track: string): Promise<{} | TrackInterface.getCorrection>;
    getInfo(track: TrackInput, params?: {
        autocorrect?: 0 | 1;
        username?: string;
        sk?: string;
    }): Promise<TrackInterface.getInfo>;
    getSimilar(track: TrackInput, params?: {
        limit?: number;
        autocorrect?: 0 | 1;
    }): Promise<TrackInterface.getSimilar>;
    getTags(track: TrackInput, usernameOrSessionKey: string, params?: {
        autocorrect?: 0 | 1;
    }): Promise<TrackInterface.getTags>;
    getTopTags(track: TrackInput, params?: {
        autocorrect?: 0 | 1;
    }): Promise<TrackInterface.getTopTags>;
    love(track: TrackInput, sk: string): Promise<{}>;
    removeTag(track: TrackInput, tag: string, sk: string): Promise<{}>;
    scrobble(sk: string, scrobbles: ScrobbleObject[]): Promise<any>;
    search(track: string, params?: {
        limit?: number;
        page?: number;
        artist?: string;
    }): Promise<TrackInterface.search>;
    unlove(track: TrackInput, sk: string): Promise<{}>;
    updateNowPlaying(artist: string, track: string, sk: string, params?: {
        album?: string;
        trackNumber?: number;
        mbid?: string;
        duration?: number;
        albumArtist?: string;
    }): Promise<{}>;
}
export {};
