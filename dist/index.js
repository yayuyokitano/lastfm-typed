"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class LastFM {
    constructor(api_key, api_secret = "") {
        this.key = api_key;
        this.secret = api_secret;
    }
    async tag_getInfo(tag, params) {
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getInfo",
            tag,
            ...params
        }).execute();
    }
    //skip tag.getSimilar because i have been unable to find any instance of it returning anything
    async tag_getTopAlbums(tag, params) {
        if (params === null || params === void 0 ? void 0 : params.limit) {
            if (params.limit > 1000 || params.limit < 1) {
                throw new Error(`tag.getTopAlbums: limit out of bounds (1-1000), ${params.limit} passed`);
            }
        }
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopAlbums",
            tag,
            ...params
        }).execute();
    }
    async tag_getTopArtists(tag, params) {
        console.log(params);
        if (params === null || params === void 0 ? void 0 : params.limit) {
            if (params.limit > 1000 || params.limit < 1) {
                throw new Error(`tag.getTopArtists: limit out of bounds (1-1000), ${params.limit} passed`);
            }
        }
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopArtists",
            tag,
            ...params
        }).execute();
    }
    async tag_getTopTags(tag, params) {
        if (params === null || params === void 0 ? void 0 : params.limit) {
            if (params.limit > 1000 || params.limit < 1) {
                throw new Error(`tag.getTopTracks: limit out of bounds (1-1000), ${params.limit} passed`);
            }
        }
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopTags",
            tag,
            ...params
        }).execute();
    }
    async tag_getTopTracks(tag, params) {
        if (params === null || params === void 0 ? void 0 : params.limit) {
            if (params.limit > 1000 || params.limit < 1) {
                throw new Error(`tag.getTopTracks: limit out of bounds (1-1000), ${params.limit} passed`);
            }
        }
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopTracks",
            tag,
            ...params
        }).execute();
    }
}
exports.default = LastFM;
//# sourceMappingURL=index.js.map