"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class ArtistClass extends base_1.default {
    async addTags(artist, tags, sk) {
        if (Array.isArray(tags)) {
            tags = tags.join(",");
        }
        return await this.sendRequest(this.key, this.secret, { method: "artist.addTags", tags, sk, artist });
    }
    async getCorrection(artist) {
        var _a, _b;
        return (((_b = (_a = (await this.sendRequest(this.key, this.secret, { method: "artist.getCorrection", artist }))) === null || _a === void 0 ? void 0 : _a.corrections) === null || _b === void 0 ? void 0 : _b.correction) || {});
    }
    async getInfo(artist, params) {
        return (await this.sendRequest(this.key, this.secret, { method: "artist.getInfo", ...artist, ...params })).artist;
    }
    async getSimilar(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "artist.getSimilar", ...artist, ...params })).similarartists;
    }
    async getTags(artist, usernameOrSessionKey, params) {
        return this.convertGetTags((await this.sendRequest(this.key, this.secret, { method: "artist.getTags", ...artist, user: usernameOrSessionKey, ...params })).tags);
    }
    async getTopAlbums(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "artist.getTopAlbums", ...artist, ...params })).topalbums;
    }
    async getTopTags(artist, params) {
        return (await this.sendRequest(this.key, this.secret, { method: "artist.getTopTags", ...artist, ...params })).toptags;
    }
    async getTopTracks(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "artist.getTopTracks", ...artist, ...params })).toptracks;
    }
    async removeTag(artist, tag, sk) {
        return await this.sendRequest(this.key, this.secret, { method: "artist.removeTag", tag, sk, artist });
    }
    async search(artist, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "artist.search", artist, ...params })).results;
    }
}
exports.default = ArtistClass;
//# sourceMappingURL=artist.js.map