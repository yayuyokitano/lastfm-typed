import * as AuthInterface from "../interfaces/authInterface";
import Base from "../base";
import { convertString, toBool } from "../caster";

export default class AuthClass extends Base {

	public async getToken():Promise<string>;
	public async getToken(input:{}):Promise<string>;
	public async getToken(firstInput?:any) {

		const token = await this.sendRequest({ method: "auth.getToken" });
		if (typeof token.token === "undefined") {
			throw Error ("Something went wrong while getting the token. Probably because of Last.FM");
		}

		return token.token as string;

	}
	public async getSession(token:string):Promise<AuthInterface.getSession>;
	public async getSession(input:{token:string}):Promise<AuthInterface.getSession>;
	public async getSession(firstInput:any) {

		firstInput = convertString(firstInput, "token", {});

		const res = (await this.sendRequest({ method: "auth.getSession", ...firstInput })).session as any;
		res.subscriber = toBool(res.subscriber);
		
		return res as AuthInterface.getSession;

	}

	public async getMobileSession(username:string, password:string, token:string):Promise<AuthInterface.getSession>;
	public async getMobileSession(input:{username:string, password:string, token:string}):Promise<AuthInterface.getSession>;
	public async getMobileSession(firstInput:any, password?:string, token?: string) {

		firstInput = convertString(firstInput, "username", {password, token});

		return (await this.sendRequest({ method: "auth.getMobileSession", ...firstInput })).session as AuthInterface.getSession;

	}

}