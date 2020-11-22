"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class AlbumClass extends base_1.default {
    async addTags(album, tags, sk) {
        if (Array.isArray(tags)) {
            tags = tags.join(",");
        }
        return await new request_1.default(this.key, this.secret, { method: "album.addTags", tags, sk, ...album }).execute();
    }
    async getInfo(album, params) {
        return (await new request_1.default(this.key, this.secret, { method: "album.getInfo", ...album, ...params }).execute()).album;
    }
    async getTags(album, usernameOrSessionKey, params) {
        if (this.isSessionKey(usernameOrSessionKey)) {
            return (await new request_1.default(this.key, this.secret, { method: "album.getTags", ...album, sk: usernameOrSessionKey, ...params }).execute()).tags;
        }
        else {
            return (await new request_1.default(this.key, this.secret, { method: "album.getTags", ...album, user: usernameOrSessionKey, ...params }).execute()).tags;
        }
    }
    async getTopTags(album, params) {
        return (await new request_1.default(this.key, this.secret, { method: "album.getTopTags", ...album, ...params }).execute()).toptags;
    }
    async removeTag(album, tag, sk) {
        return await new request_1.default(this.key, this.secret, { method: "album.removeTag", tag, sk, ...album }).execute();
    }
    async search(album, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await new request_1.default(this.key, this.secret, { method: "album.search", album, ...params }).execute()).results;
    }
}
exports.default = AlbumClass;
//# sourceMappingURL=album.js.map