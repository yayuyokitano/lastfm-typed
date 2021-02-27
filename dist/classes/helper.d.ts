import LastFM from "..";
import { Image } from "../interfaces/shared";
import * as ArtistInterface from "../interfaces/artistInterface";
import * as AlbumInterface from "../interfaces/albumInterface";
import * as TrackInterface from "../interfaces/trackInterface";
export default class HelperClass {
    private lastfm;
    constructor(lastfm: LastFM);
    getCombo(usernameOrSessionKey: string, limit: number): Promise<{
        artist: {
            name: string;
            combo: number;
        };
        album: {
            name: string;
            combo: number;
        };
        track: {
            name: string;
            combo: number;
        };
        nowplaying: boolean;
        image: Image[];
    }>;
    getNowPlaying(usernameOrSessionKey: string, detailTypes?: ("artist" | "album" | "track")[]): Promise<{
        recent: {
            artist: string;
            album: string;
            track: string;
            image: Image[];
            url: string;
            nowplaying: boolean;
        };
        details: {
            artist: {
                data?: ArtistInterface.getInfo;
                successful: boolean;
            };
            album: {
                data?: AlbumInterface.getInfo;
                successful: boolean;
            };
            track: {
                data?: TrackInterface.getInfo;
                successful: boolean;
            };
        };
    }>;
    getMatchingArtists(user1: string, user2: string, limit: number, period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month"): Promise<{
        name: string;
        url: string;
        playcount: number[];
    }[]>;
    ArtistFromMBID(mbid: string): {
        mbid: string;
    };
    ArtistFromName(artist: string): {
        artist: string;
    };
    AlbumFromMBID(mbid: string): {
        mbid: string;
    };
    AlbumFromName(artist: string, album: string): {
        artist: string;
        album: string;
    };
    TrackFromMBID(mbid: string): {
        mbid: string;
    };
    TrackFromName(artist: string, track: string): {
        artist: string;
        track: string;
    };
    private getIntersection;
    private fetchDetails;
    private checkLimit;
}
