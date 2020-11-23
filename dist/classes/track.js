"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class TrackClass extends base_1.default {
    async addTags(artist, track, tags, sk) {
        if (Array.isArray(tags)) {
            tags = tags.join(",");
        }
        return await new request_1.default(this.key, this.secret, { method: "track.addTags", tags, sk, artist, track }).execute();
    }
    async getCorrection(artist, track) {
        var _a, _b;
        return (((_b = (_a = (await new request_1.default(this.key, this.secret, { method: "track.getCorrection", artist, track }).execute())) === null || _a === void 0 ? void 0 : _a.corrections) === null || _b === void 0 ? void 0 : _b.correction) || {});
    }
    async getInfo(track, params) {
        return (await new request_1.default(this.key, this.secret, { method: "track.getInfo", ...track, ...params }).execute()).track;
    }
    async getSimilar(track, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "track.getSimilar", ...track, ...params }).execute()).similartracks;
    }
    async getTags(track, usernameOrSessionKey, params) {
        return this.convertGetTags((await new request_1.default(this.key, this.secret, { method: "track.getTags", ...track, user: usernameOrSessionKey, ...params }).execute()).tags);
    }
    async getTopTags(track, params) {
        return (await new request_1.default(this.key, this.secret, { method: "track.getTopTags", ...track, ...params }).execute()).toptags;
    }
    async love(track, sk) {
        return await new request_1.default(this.key, this.secret, { method: "track.love", ...track, sk }).execute();
    }
    async removeTag(track, tag, sk) {
        return await new request_1.default(this.key, this.secret, { method: "track.removeTag", tag, sk, ...track }).execute();
    }
    async scrobble(sk, scrobbles) {
        this.checkScrobbleCount(scrobbles.length, 50);
        let params = {};
        for (let [index, scrobble] of scrobbles.entries()) {
            for (let [key, value] of Object.keys(scrobble)) {
                params[`${key}[${index}]`] = value;
            }
        }
        return await new request_1.default(this.key, this.secret, { method: "track.scrobble", ...params, sk }).execute(true);
    }
    async search(track, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "track.search", track, ...params }).execute()).results;
    }
    async unlove(track, sk) {
        return await new request_1.default(this.key, this.secret, { method: "track.unlove", ...track, sk }).execute();
    }
    async updateNowPlaying(artist, track, sk, params) {
        return await new request_1.default(this.key, this.secret, { method: "track.updateNowPlaying", artist, track, sk, ...params }).execute();
    }
}
exports.default = TrackClass;
//# sourceMappingURL=track.js.map