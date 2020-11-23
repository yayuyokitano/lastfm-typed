"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class ArtistClass extends base_1.default {
    async addTags(artist, tags, sk) {
        if (Array.isArray(tags)) {
            tags = tags.join(",");
        }
        return await new request_1.default(this.key, this.secret, { method: "artist.addTags", tags, sk, artist }).execute();
    }
    async getCorrection(artist) {
        var _a, _b;
        return (((_b = (_a = (await new request_1.default(this.key, this.secret, { method: "artist.getCorrection", artist }).execute())) === null || _a === void 0 ? void 0 : _a.corrections) === null || _b === void 0 ? void 0 : _b.correction) || {});
    }
    async getInfo(artist, params) {
        return (await new request_1.default(this.key, this.secret, { method: "artist.getInfo", ...artist, ...params }).execute()).artist;
    }
    async getSimilar(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "artist.getSimilar", ...artist, ...params }).execute()).similarartists;
    }
    async getTags(artist, usernameOrSessionKey, params) {
        return this.convertGetTags((await new request_1.default(this.key, this.secret, { method: "artist.getTags", ...artist, user: usernameOrSessionKey, ...params }).execute()).tags);
    }
    async getTopAlbums(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "artist.getTopAlbums", ...artist, ...params }).execute()).topalbums;
    }
    async getTopTags(artist, params) {
        return (await new request_1.default(this.key, this.secret, { method: "artist.getTopTags", ...artist, ...params }).execute()).toptags;
    }
    async getTopTracks(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "artist.getTopTracks", ...artist, ...params }).execute()).toptracks;
    }
    async removeTag(artist, tag, sk) {
        return await new request_1.default(this.key, this.secret, { method: "artist.removeTag", tag, sk, ...artist }).execute();
    }
    async search(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "artist.search", artist, ...params }).execute()).results;
    }
}
exports.default = ArtistClass;
//# sourceMappingURL=artist.js.map