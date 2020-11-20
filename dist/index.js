"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("./classes/tag");
const geo_1 = require("./classes/geo");
const chart_1 = require("./classes/chart");
const auth_1 = require("./classes/auth");
const album_1 = require("./classes/album");
class LastFM {
    constructor(apiKey, apiSecret = "") {
        this.key = apiKey;
        this.secret = apiSecret;
        this.tag = new tag_1.default(this.key, this.secret);
        this.geo = new geo_1.default(this.key, this.secret);
        this.chart = new chart_1.default(this.key, this.secret);
        this.auth = new auth_1.default(this.key, this.secret);
        this.album = new album_1.default(this.key, this.secret);
    }
}
exports.default = LastFM;
//# sourceMappingURL=index.js.map