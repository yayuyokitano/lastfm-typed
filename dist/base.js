"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LFMBase {
    constructor(apiKey, apiSecret = "") {
        this.key = apiKey;
        this.secret = apiSecret;
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
        newParams.num_res = (params === null || params === void 0 ? void 0 : params.limit) || 50,
            newParams.offset = (((params === null || params === void 0 ? void 0 : params.page) || 1) - 1) * newParams.num_res;
        return newParams;
    }
    formatSearch(query) {
        return query.replace(/:/g, " ");
    }
}
exports.default = LFMBase;
//# sourceMappingURL=base.js.map