"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class GeoClass extends base_1.default {
    async getTopArtists(country, params) {
        return (await this.getTop("geo.getTopArtists", country, params)).topartists;
    }
    async getTopTracks(country, params) {
        return (await this.getTop("geo.getTopTracks", country, params)).tracks;
    }
    async getTop(method, country, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return await new request_1.default(this.key, this.secret, { method, country, ...params }).execute();
    }
}
exports.default = GeoClass;
//# sourceMappingURL=geo.js.map