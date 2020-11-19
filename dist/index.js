"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("./classes/tag");
class LastFM {
    constructor(apiKey, apiSecret = "") {
        this.key = apiKey;
        this.secret = apiSecret;
        this.Tag = new tag_1.default(this.key, this.secret);
    }
}
exports.default = LastFM;
//# sourceMappingURL=index.js.map