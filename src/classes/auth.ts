import * as AuthInterface from "../interfaces/authInterface";
import Base from "../base";
import { toBool } from "../caster";

export default class AuthClass extends Base {

	public async getToken() {

		const token = await this.sendRequest({ method: "auth.getToken" });
		if (typeof token.token === "undefined") {
			throw Error ("Something went wrong while getting the token. Probably because of Last.FM");
		}

		return token.token as string;

	}

	public async getSession(token:string) {

		const res = (await this.sendRequest({ method: "auth.getSession", token })).session as any;
		res.subscriber = toBool(res.subscriber);
		
		return res as AuthInterface.getSession;

	}

	public async getMobileSession(username:string, password:string) {

		return (await this.sendRequest({ method: "auth.getMobileSession", username, password })).session as AuthInterface.getSession;

	}

}