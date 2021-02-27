"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class UserClass extends base_1.default {
    async getFriends(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getFriends", user: usernameOrSessionKey, ...params })).friends;
    }
    async getInfo(usernameOrSessionKey) {
        return (await this.sendRequest(this.key, this.secret, { method: "user.getInfo", user: usernameOrSessionKey })).user;
    }
    async getLovedTracks(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getLovedTracks", user: usernameOrSessionKey, ...params })).lovedtracks;
    }
    async getPersonalTags(usernameOrSessionKey, tag, taggingType, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params })).taggings;
    }
    async getRecentTracks(usernameOrSessionKey, params) {
        var _a, _b;
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        let res = (await this.sendRequest(this.key, this.secret, { method: "user.getRecentTracks", user: usernameOrSessionKey, ...params })).recenttracks;
        for (let i = 0; i < res.track.length; i++) {
            (_a = res.track[i].artist).name || (_a.name = res.track[i].artist["#text"]);
            delete res.track[i].artist["#text"];
            (_b = res.track[i].album).name || (_b.name = res.track[i].album["#text"]);
            delete res.track[i].album["#text"];
        }
        return res;
    }
    async getTopAlbums(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getTopAlbums", user: usernameOrSessionKey, ...params })).topalbums;
    }
    async getTopArtists(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getTopArtists", user: usernameOrSessionKey, ...params })).topartists;
    }
    async getTopTags(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getTopTags", user: usernameOrSessionKey, ...params })).toptags;
    }
    async getTopTracks(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getTopTracks", user: usernameOrSessionKey, ...params })).toptracks;
    }
    async getWeeklyAlbumChart(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        let res = (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params })).weeklyalbumchart;
        res.artist.name = res.artist["#text"];
        delete res.artist["#text"];
        return res;
    }
    async getWeeklyArtistChart(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params })).weeklyartistchart;
    }
    async getWeeklyChartList() {
        return (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyChartList" })).weeklychartlist;
    }
    async getWeeklyTrackChart(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params })).weeklytrackchart;
    }
}
exports.default = UserClass;
//# sourceMappingURL=user.js.map