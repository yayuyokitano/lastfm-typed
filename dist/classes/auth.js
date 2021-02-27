"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
class AuthClass extends base_1.default {
    async getToken() {
        const token = await this.sendRequest(this.key, this.secret, { method: "auth.getToken" });
        if (typeof token.token === "undefined") {
            throw Error("Something went wrong while getting the token. Probably because of Last.FM");
        }
        return token.token;
    }
    async getSession(token) {
        return (await this.sendRequest(this.key, this.secret, { method: "auth.getSession", token })).session;
    }
    async getMobileSession(username, password) {
        return (await this.sendRequest(this.key, this.secret, { method: "auth.getMobileSession", username, password })).session;
    }
}
exports.default = AuthClass;
//# sourceMappingURL=auth.js.map