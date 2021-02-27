"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class LFMBase {
    constructor(apiKey, apiSecret = "", userAgent = "lastfm-typed-npm", secureConnection = false) {
        this.key = apiKey;
        this.secret = apiSecret;
        this.userAgent = userAgent;
        this.secureConnection = secureConnection;
    }
    checkLimit(limit, maxLimit) {
        if (typeof limit !== "undefined" && (limit > maxLimit || limit < 1)) {
            throw new Error(`Limit out of bounds (1-${maxLimit}), ${limit} passed`);
        }
    }
    checkScrobbleCount(scrobbleCount, maxScrobbleCount) {
        if (typeof scrobbleCount === "undefined" || (scrobbleCount > maxScrobbleCount || scrobbleCount < 1)) {
            throw new Error(`Scrobble count out of bounds (1-${maxScrobbleCount}), ${scrobbleCount} passed`);
        }
    }
    convertNumRes(params) {
        let newParams = {
            num_res: 50,
            offset: 0
        };
        newParams.num_res = (params === null || params === void 0 ? void 0 : params.limit) || 50;
        newParams.offset = (((params === null || params === void 0 ? void 0 : params.page) || 1) - 1) * newParams.num_res;
        return newParams;
    }
    convertGetTags(res) {
        if ((res === null || res === void 0 ? void 0 : res["#text"]) === " ") {
            res.tag = [];
            delete res["#text"];
        }
        return res;
    }
    formatSearch(query) {
        return query.replace(/:/g, " ");
    }
    async sendRequest(apiKey, apiSecret, params) {
        return await new request_1.LFMRequest(apiKey, apiSecret, this.userAgent, this.secureConnection, params).execute();
    }
}
exports.default = LFMBase;
//# sourceMappingURL=base.js.map