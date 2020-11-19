"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class LastFM {
    constructor(api_key, api_secret = "") {
        this.key = api_key;
        this.secret = api_secret;
    }
    async tag_getInfo(tag, params) {
        let res = await new request_1.default(this.key, this.secret, {
            method: "tag.getInfo",
            tag,
            ...params
        }).execute();
        res.tag.wiki.published = new Date(res.tag.wiki.published);
        return res;
    }
}
//# sourceMappingURL=index.js.map