import fetch from "node-fetch";
import {stringify} from "querystring";
import * as md5 from "md5";

export interface LFMArgumentObject {
	
	method:string;

	lang?:string;
	tag?:string;
	user?:string;
	sk?:string;
	country?:string;
	location?:string;
	num_res?:number;
	offset?:number;
	page?:number;
	limit?:number;
	token?:string;
	api_sig?:string;
	username?:string;
	password?:string;
	artist?:string;
	album?:string;
	tags?:string;
	mbid?:string;
	track?:string;
	timestamp?:string;
	taggingType?:string;

}


export class LFMRequest {

	private key:string;
	private params:LFMArgumentObject;
	private secret:string;
	private response:any;
	private userAgent:string;
	private connectionType:string;

	public constructor(key:string, secret:string, userAgent:string, secureConnection:boolean, params:LFMArgumentObject) {

		this.key = key;
		this.params = params;
		this.secret = secret;
		this.userAgent = userAgent;
		this.connectionType = secureConnection ? "https" : "http";

	}

	public async execute() {

		const isPostRequest = this.isPostRequest();

		if (isPostRequest) {

			if (this.secret === "") {
				throw new SyntaxError("Please enter an api secret key to use post requests with session key.");
			}

			this.response = await this.post();

		} else {

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
		} catch (err) {
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

	private async post() {

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

		const paramString = stringify(requestParam);

		return await fetch(`${this.connectionType}://ws.audioscrobbler.com/2.0/`, {
			method: "POST",
			headers: {
				"Content-Length":  Buffer.byteLength(paramString).toString(),
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": this.userAgent
			},
			body: paramString
		});

	}

	private async get() {

		const params = {
			api_key: this.key,
			format: "json",
			...this.params
		};
		
		return await fetch(`${this.connectionType}://ws.audioscrobbler.com/2.0?${stringify(params)}`, {
			method: "GET",
			headers: {
				"User-Agent": this.userAgent
			}
		});

	}

	private getSignature() {

		const paramObj:any = {
			...this.params,
			api_key: this.key
		};

		const args = Object.keys(paramObj).sort().map((e) => [e, paramObj[e]]) as string[][];

		let sig = args.reduce((acc, cur) => `${acc}${cur[0]}${cur[1]}`, "");

		sig = md5(sig + this.secret);

		return sig;

	}

	private isPostRequest() {
		return this.params.user?.length === 32 || this.params.username?.length === 32 || this.params.hasOwnProperty("sk") || this.params.hasOwnProperty("token") || this.params.hasOwnProperty("password");
	}

}