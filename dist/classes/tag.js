"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class TagClass extends base_1.default {
    async getInfo(tag, params) {
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getInfo",
            tag,
            ...params
        }).execute();
    }
    //skip tag.getSimilar because i have been unable to find any instance of it returning anything
    async getTopAlbums(tag, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopAlbums",
            tag,
            ...params
        }).execute();
    }
    async getTopArtists(tag, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopArtists",
            tag,
            ...params
        }).execute();
    }
    async getTopTags(tag, params) {
        //set arguments in a way consistent with other endpoints
        const newParams = this.convertNumRes(params);
        this.checkLimit(newParams.num_res, 1000);
        let res = await new request_1.default(this.key, this.secret, {
            method: "tag.getTopTags",
            tag,
            ...newParams
        }).execute();
        let attr = {
            total: res.toptags["@attr"].total,
            page: ((newParams.offset / newParams.num_res) + 1).toString(),
            perPage: newParams.num_res.toString(),
            totalPages: Math.ceil(parseInt(res.toptags["@attr"].total) / newParams.num_res).toString()
        };
        res.toptags["@attr"] = attr;
        return res;
    }
    async getTopTracks(tag, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return await new request_1.default(this.key, this.secret, {
            method: "tag.getTopTracks",
            tag,
            ...params
        }).execute();
    }
}
exports.default = TagClass;
//# sourceMappingURL=tag.js.map