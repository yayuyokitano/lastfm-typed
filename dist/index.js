"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class LastFM {
    constructor(api_key, api_secret = "") {
        this.key = api_key;
        this.secret = api_secret;
    }
    async tag_getInfo(tag, params) {
        var _a, _b;
        let res = await new request_1.default(this.key, this.secret, {
            method: "tag.getInfo",
            tag,
            ...params
        }).execute();
        if ((_b = (_a = res.tag) === null || _a === void 0 ? void 0 : _a.wiki) === null || _b === void 0 ? void 0 : _b.published) {
            res.tag.wiki.published = new Date(res.tag.wiki.published);
        }
        return res;
    }
}
exports.default = LastFM;
//# sourceMappingURL=index.js.map