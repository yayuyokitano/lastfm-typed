"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../request");
const base_1 = require("../base");
class AuthClass extends base_1.default {
    async getToken() {
        const token = await new request_1.default(this.key, this.secret, { method: "auth.getToken" }).execute();
        if (typeof token.token === "undefined") {
            throw Error("Something went wrong while getting the token. Probably because of Last.FM");
        }
        return token.token;
    }
    async getSession(token) {
        return await new request_1.default(this.key, this.secret, { method: "auth.getSession", token }).execute();
    }
    async getMobileSession(username, password) {
        return await new request_1.default(this.key, this.secret, { method: "auth.getMobileSession", username, password }).execute();
    }
}
exports.default = AuthClass;
//# sourceMappingURL=auth.js.map