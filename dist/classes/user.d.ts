import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";
export default class UserClass extends Base {
    getFriends(usernameOrSessionKey: string, params?: {
        recenttracks?: 0 | 1;
        limit?: number;
        page?: number;
    }): Promise<UserInterface.getFriends>;
    getInfo(usernameOrSessionKey: string): Promise<UserInterface.getInfo>;
    getLovedTracks(usernameOrSessionKey: string, params?: {
        limit?: number;
        page?: number;
    }): Promise<UserInterface.getLovedTracks>;
    getPersonalTags(usernameOrSessionKey: string, tag: string, taggingType: "artist" | "album" | "track", params?: {
        limit?: number;
        page?: number;
    }): Promise<UserInterface.getPersonalTags>;
    getRecentTracks(usernameOrSessionKey: string, params?: {
        limit?: number;
        page?: number;
        from?: string;
        to?: string;
        extended?: string;
    }): Promise<UserInterface.getRecentTracks>;
    getTopAlbums(usernameOrSessionKey: string, params?: {
        limit?: number;
        page?: number;
        period?: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
    }): Promise<UserInterface.getTopAlbums>;
    getTopArtists(usernameOrSessionKey: string, params?: {
        limit?: number;
        page?: number;
        period?: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
    }): Promise<UserInterface.getTopArtists>;
    getTopTags(usernameOrSessionKey: string, params?: {
        limit?: number;
    }): Promise<UserInterface.getTopTags>;
    getTopTracks(usernameOrSessionKey: string, params?: {
        limit?: number;
        page?: number;
        period?: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
    }): Promise<UserInterface.getTopTracks>;
    getWeeklyAlbumChart(usernameOrSessionKey: string, params?: {
        limit?: number;
        from: string;
        to: string;
    } | {
        limit?: number;
    }): Promise<UserInterface.getWeeklyAlbumChart>;
    getWeeklyArtistChart(usernameOrSessionKey: string, params?: {
        limit?: number;
        from: string;
        to: string;
    } | {
        limit?: number;
    }): Promise<UserInterface.getWeeklyArtistChart>;
    getWeeklyChartList(): Promise<UserInterface.getWeeklyChartList>;
    getWeeklyTrackChart(usernameOrSessionKey: string, params?: {
        limit?: number;
        from: string;
        to: string;
    } | {
        limit?: number;
    }): Promise<UserInterface.getWeeklyTrackChart>;
}
