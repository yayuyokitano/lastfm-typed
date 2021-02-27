"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class TrackClass extends base_1.default {
    async addTags(artist, track, tags, sk) {
        if (Array.isArray(tags)) {
            tags = tags.join(",");
        }
        return await this.sendRequest(this.key, this.secret, { method: "track.addTags", tags, sk, artist, track });
    }
    async getCorrection(artist, track) {
        var _a, _b;
        return (((_b = (_a = (await this.sendRequest(this.key, this.secret, { method: "track.getCorrection", artist, track }))) === null || _a === void 0 ? void 0 : _a.corrections) === null || _b === void 0 ? void 0 : _b.correction) || {});
    }
    async getInfo(track, params) {
        return (await this.sendRequest(this.key, this.secret, { method: "track.getInfo", ...track, ...params })).track;
    }
    async getSimilar(track, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "track.getSimilar", ...track, ...params })).similartracks;
    }
    async getTags(track, usernameOrSessionKey, params) {
        return this.convertGetTags((await this.sendRequest(this.key, this.secret, { method: "track.getTags", ...track, user: usernameOrSessionKey, ...params })).tags);
    }
    async getTopTags(track, params) {
        return (await this.sendRequest(this.key, this.secret, { method: "track.getTopTags", ...track, ...params })).toptags;
    }
    async love(artist, track, sk) {
        return await this.sendRequest(this.key, this.secret, { method: "track.love", artist, track, sk });
    }
    async removeTag(artist, track, tag, sk) {
        return await this.sendRequest(this.key, this.secret, { method: "track.removeTag", tag, sk, artist, track });
    }
    async scrobble(sk, scrobbles) {
        this.checkScrobbleCount(scrobbles.length, 50);
        let params = {};
        for (let [index, scrobble] of scrobbles.entries()) {
            for (let [key, value] of Object.entries(scrobble)) {
                params[`${key}[${index}]`] = value;
            }
        }
        return (await this.sendRequest(this.key, this.secret, { method: "track.scrobble", ...params, sk })).scrobbles;
    }
    async search(track, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "track.search", track, ...params })).results;
    }
    async unlove(artist, track, sk) {
        return await this.sendRequest(this.key, this.secret, { method: "track.unlove", artist, track, sk });
    }
    async updateNowPlaying(artist, track, sk, params) {
        return await this.sendRequest(this.key, this.secret, { method: "track.updateNowPlaying", artist, track, sk, ...params });
    }
}
exports.default = TrackClass;
//# sourceMappingURL=track.js.map