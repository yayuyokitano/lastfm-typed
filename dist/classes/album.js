"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class AlbumClass extends base_1.default {
    async addTags(artist, album, tags, sk) {
        if (Array.isArray(tags)) {
            tags = tags.join(",");
        }
        return await this.sendRequest(this.key, this.secret, { method: "album.addTags", tags, sk, artist, album });
    }
    async getInfo(album, params) {
        return (await this.sendRequest(this.key, this.secret, { method: "album.getInfo", ...album, ...params })).album;
    }
    async getTags(album, usernameOrSessionKey, params) {
        return this.convertGetTags((await this.sendRequest(this.key, this.secret, { method: "album.getTags", ...album, user: usernameOrSessionKey, ...params })).tags);
    }
    async getTopTags(album, params) {
        return (await this.sendRequest(this.key, this.secret, { method: "album.getTopTags", ...album, ...params })).toptags;
    }
    async removeTag(artist, album, tag, sk) {
        return await this.sendRequest(this.key, this.secret, { method: "album.removeTag", tag, sk, artist, album });
    }
    async search(album, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "album.search", album, ...params })).results;
    }
}
exports.default = AlbumClass;
//# sourceMappingURL=album.js.map