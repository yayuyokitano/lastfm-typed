"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class UserClass extends base_1.default {
    async getFriends(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getFriends", user: usernameOrSessionKey, ...params }).execute()).friends;
    }
    async getInfo(usernameOrSessionKey) {
        return (await new request_1.default(this.key, this.secret, { method: "user.getInfo", user: usernameOrSessionKey }).execute()).user;
    }
    async getLovedTracks(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getLovedTracks", user: usernameOrSessionKey, ...params }).execute()).lovedtracks;
    }
    async getPersonalTags(usernameOrSessionKey, tag, taggingType, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params }).execute()).taggings;
    }
    async getRecentTracks(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getRecentTracks", user: usernameOrSessionKey, ...params }).execute()).recenttracks;
    }
    async getTopAlbums(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getTopAlbums", user: usernameOrSessionKey, ...params }).execute()).topalbums;
    }
    async getTopArtists(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getTopArtists", user: usernameOrSessionKey, ...params }).execute()).topartists;
    }
    async getTopTags(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getTopTags", user: usernameOrSessionKey, ...params }).execute()).toptags;
    }
    async getWeeklyAlbumChart(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params }).execute()).weeklyalbumchart;
    }
    async getWeeklyArtistChart(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params }).execute()).weeklyartistchart;
    }
    async getWeeklyChartList() {
        return (await new request_1.default(this.key, this.secret, { method: "user.getWeeklyChartList" }).execute()).weeklychartlist;
    }
    async getWeeklyTrackChart(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params }).execute()).weeklytrackchart;
    }
}
exports.default = UserClass;
//# sourceMappingURL=user.js.map