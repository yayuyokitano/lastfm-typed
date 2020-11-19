import LFMRequest from "../request";
import * as AuthInterface from "../interfaces/authInterface";
import Base from "../base";

export default class AuthClass extends Base {

	public async getToken() {

		const token = await new LFMRequest(this.key, this.secret, { method: "auth.getToken" }).execute();
		if (typeof token.token === "undefined") {
			throw Error ("Something went wrong while getting the token. Probably because of Last.FM");
		}

		return token.token as string;

	}

	public async getSession(token:string) {

		return await new LFMRequest(this.key, this.secret, { method: "auth.getSession", token }).execute() as AuthInterface.getSession;

	}

	public async getMobileSession(username:string, password:string) {

		return await new LFMRequest(this.key, this.secret, { method: "auth.getMobileSession", username, password }).execute() as AuthInterface.getSession;

	}

}