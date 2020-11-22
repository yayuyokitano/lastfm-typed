"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class ChartClass extends base_1.default {
    async getTopArtists(params) {
        return (await this.getTop("chart.getTopArtists", params)).artists;
    }
    async getTopTags(params) {
        return (await this.getTop("chart.getTopTags", params)).tags;
    }
    async getTopTracks(params) {
        return (await this.getTop("chart.getTopTracks", params)).tracks;
    }
    async getTop(method, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return await new request_1.default(this.key, this.secret, { method, ...params }).execute();
    }
}
exports.default = ChartClass;
//# sourceMappingURL=chart.js.map