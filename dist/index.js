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
const helper_1 = require("./classes/helper");
class LastFM {
    constructor(apiKey, apiSecret = "", userAgent = "lastfm-typed-npm", secureConnection = false) {
        this.tag = new tag_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.geo = new geo_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.chart = new chart_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.auth = new auth_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.album = new album_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.artist = new artist_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.library = new library_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.track = new track_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.user = new user_1.default(apiKey, apiSecret, userAgent, secureConnection);
        this.helper = new helper_1.default(this);
    }
}
exports.default = LastFM;
//# sourceMappingURL=index.js.map