"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("./classes/tag");
const geo_1 = require("./classes/geo");
const chart_1 = require("./classes/chart");
const auth_1 = require("./classes/auth");
const album_1 = require("./classes/album");
const artist_1 = require("./classes/artist");
const library_1 = require("./classes/library");
const track_1 = require("./classes/track");
const user_1 = require("./classes/user");
class LastFM {
    constructor(apiKey, apiSecret = "") {
        this.tag = new tag_1.default(apiKey, apiSecret);
        this.geo = new geo_1.default(apiKey, apiSecret);
        this.chart = new chart_1.default(apiKey, apiSecret);
        this.auth = new auth_1.default(apiKey, apiSecret);
        this.album = new album_1.default(apiKey, apiSecret);
        this.artist = new artist_1.default(apiKey, apiSecret);
        this.library = new library_1.default(apiKey, apiSecret);
        this.track = new track_1.default(apiKey, apiSecret);
        this.user = new user_1.default(apiKey, apiSecret);
    }
}
exports.default = LastFM;
//# sourceMappingURL=index.js.map