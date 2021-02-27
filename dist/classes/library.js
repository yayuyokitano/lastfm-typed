"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class LibraryClass extends base_1.default {
    async getArtists(usernameOrSessionKey, params) {
        this.checkLimit(params === null || params === void 0 ? void 0 : params.limit, 1000);
        return (await this.sendRequest(this.key, this.secret, { method: "library.getArtists", user: usernameOrSessionKey, ...params })).artists;
    }
}
exports.default = LibraryClass;
//# sourceMappingURL=library.js.map