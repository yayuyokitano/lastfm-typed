"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LFMRequest = void 0;
const node_fetch_1 = require("node-fetch");
const querystring_1 = require("querystring");
const md5 = require("md5");
class LFMRequest {
    constructor(key, secret, userAgent, secureConnection, params) {
        this.key = key;
        this.params = params;
        this.secret = secret;
        this.userAgent = userAgent;
        this.connectionType = secureConnection ? "https" : "http";
    }
    async execute() {
        const isPostRequest = this.isPostRequest();
        if (isPostRequest) {
            if (this.secret === "") {
                throw new SyntaxError("Please enter an api secret key to use post requests with session key.");
            }
            this.response = await this.post();
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
                response: await this.response.json()
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
    async post() {
        if (this.params.hasOwnProperty("user")) {
            this.params.sk = this.params.user;
            delete this.params.user;
        }
        if (this.params.hasOwnProperty("username")) {
            this.params.sk = this.params.username;
            delete this.params.username;
        }
        const api_sig = this.getSignature();
        const requestParam = {
            ...this.params,
            api_key: this.key,
            format: "json",
            api_sig
        };
        const paramString = querystring_1.stringify(requestParam);
        return await node_fetch_1.default(`${this.connectionType}://ws.audioscrobbler.com/2.0/`, {
            method: "POST",
            headers: {
                "Content-Length": Buffer.byteLength(paramString).toString(),
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": this.userAgent
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
        return await node_fetch_1.default(`${this.connectionType}://ws.audioscrobbler.com/2.0?${querystring_1.stringify(params)}`, {
            method: "GET",
            headers: {
                "User-Agent": this.userAgent
            }
        });
    }
    getSignature() {
        const paramObj = {
            ...this.params,
            api_key: this.key
        };
        const args = Object.keys(paramObj).sort().map((e) => [e, paramObj[e]]);
        let sig = args.reduce((acc, cur) => `${acc}${cur[0]}${cur[1]}`, "");
        sig = md5(sig + this.secret);
        return sig;
    }
    isPostRequest() {
        var _a, _b;
        return ((_a = this.params.user) === null || _a === void 0 ? void 0 : _a.length) === 32 || ((_b = this.params.username) === null || _b === void 0 ? void 0 : _b.length) === 32 || this.params.hasOwnProperty("sk") || this.params.hasOwnProperty("token") || this.params.hasOwnProperty("password");
    }
}
exports.LFMRequest = LFMRequest;
//# sourceMappingURL=request.js.map