"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class ArtistClass extends base_1.default {
    async getArtists(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        if (this.isSessionKey(usernameOrSessionKey)) {
            return (await new request_1.default(this.key, this.secret, { method: "library.getArtists", sk: usernameOrSessionKey, ...params }).execute()).artists;
        }
        else {
            return (await new request_1.default(this.key, this.secret, { method: "library.getArtists", user: usernameOrSessionKey, ...params }).execute()).artists;
        }
    }
}
exports.default = ArtistClass;
//# sourceMappingURL=library.js.map