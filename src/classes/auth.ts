import * as AuthInterface from "../interfaces/authInterface";
import Base from "../base";

export default class AuthClass extends Base {

	public async getToken() {

		const token = await this.sendRequest(this.key, this.secret, { method: "auth.getToken" });
		if (typeof token.token === "undefined") {
			throw Error ("Something went wrong while getting the token. Probably because of Last.FM");
		}

		return token.token as string;

	}

	public async getSession(token:string) {

		return (await this.sendRequest(this.key, this.secret, { method: "auth.getSession", token })).session as AuthInterface.getSession;

	}

	public async getMobileSession(username:string, password:string) {

		return (await this.sendRequest(this.key, this.secret, { method: "auth.getMobileSession", username, password })).session as AuthInterface.getSession;

	}

}