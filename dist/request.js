"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unfetch_1 = require("node-fetch");
const querystring_1 = require("querystring");
class LFMRequest {
    constructor(key, secret, params) {
        this.api_key = key;
        this.params = params;
        this.secret = secret;
    }
    async execute() {
        if (this.params.hasOwnProperty("sk")) {
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
    async post() {
    }
    async get() {
        const params = {
            api_key: this.api_key,
            format: "json",
            ...this.params
        };
        return await unfetch_1.default(`http://ws.audioscrobbler.com/2.0?${querystring_1.stringify(params)}`);
    }
}
exports.default = LFMRequest;
//# sourceMappingURL=request.js.map