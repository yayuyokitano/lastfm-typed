"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const querystring_1 = require("querystring");
const md5 = require("md5");
class LFMRequest {
    constructor(key, secret, params) {
        this.key = key;
        this.params = params;
        this.secret = secret;
    }
    async execute(isScrobble = false) {
        const isPostRequest = this.isPostRequest();
        if (isPostRequest) {
            if (this.secret === "") {
                throw new SyntaxError("Please enter an api secret key to use post requests with session key.");
            }
            this.response = await this.post(isScrobble);
        }
        else {
            this.response = await this.get();
        }
        return await this.checkStatus();
    }
    async checkStatus() {
        //request errors
        if (!this.response.ok) {
            let error = {
                ...new Error(this.response.statusText),
                response: this.response
            };
            throw error;
        }
        try {
            this.response = await this.response.json();
        }
        catch (err) {
            throw new Error("Returned invalid json! Most likely a Last.FM issue.");
        }
        //lastfm errors
        if (this.response.hasOwnProperty("error")) {
            let error = {
                ...new Error(this.response.message),
                code: this.response.error
            };
            throw error;
        }
        //successful request
        return this.response;
    }
    async post(isScrobble) {
        const api_sig = this.getSignature(isScrobble);
        if (this.params.hasOwnProperty("sk")) {
            this.params.sk = this.params.user;
            delete this.params.user;
        }
        const requestParam = {
            ...this.params,
            api_key: this.key,
            format: "json",
            api_sig
        };
        const paramString = querystring_1.stringify(requestParam);
        return await node_fetch_1.default("http://ws.audioscrobbler.com/2.0/", {
            method: "POST",
            headers: {
                "Content-Length": Buffer.byteLength(paramString).toString(),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: paramString
        });
    }
    async get() {
        const params = {
            api_key: this.key,
            format: "json",
            ...this.params
        };
        return await node_fetch_1.default(`http://ws.audioscrobbler.com/2.0?${querystring_1.stringify(params)}`);
    }
    getSignature(isScrobble) {
        const paramObj = {
            ...this.params,
            api_key: this.key
        };
        const args = Object.keys(paramObj).sort().map((e) => [e, paramObj[e]]);
        let sig = args.reduce((acc, cur) => acc + (isScrobble && !["api_key", "sk"].includes(cur[0]) ? "" : cur[0]) + cur[1], "");
        sig = md5(sig + this.secret);
        return sig;
    }
    isPostRequest() {
        var _a;
        return ((_a = this.params.user) === null || _a === void 0 ? void 0 : _a.length) === 32 || this.params.hasOwnProperty("sk") || this.params.hasOwnProperty("token") || this.params.hasOwnProperty("password");
    }
}
exports.default = LFMRequest;
//# sourceMappingURL=request.js.map