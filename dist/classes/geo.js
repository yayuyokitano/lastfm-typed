"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return await this.sendRequest(this.key, this.secret, { method, country, ...params });
    }
}
exports.default = GeoClass;
//# sourceMappingURL=geo.js.map