import fetch from "node-fetch";
import {stringify} from "querystring";
import * as md5 from "md5";

interface LFMArgumentObject {
	
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


export default class LFMRequest {

	private key:string;
	private params:LFMArgumentObject;
	private secret:string;
	private response:any;

	public constructor(key:string, secret:string, params:LFMArgumentObject) {

		this.key = key;
		this.params = params;
		this.secret = secret;

	}

	public async execute(isScrobble = false) {

		const isPostRequest = this.isPostRequest();

		if (isPostRequest) {

			if (this.secret === "") {
				throw new SyntaxError("Please enter an api secret key to use post requests with session key.");
			}

			this.response = await this.post(isScrobble);

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
				response: this.response
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

	private async post(isScrobble:boolean) {

		if (this.params.hasOwnProperty("user")) {
			this.params.sk = this.params.user;
			delete this.params.user;
		}

		const api_sig = this.getSignature(isScrobble);

		const requestParam = {
			...this.params,
			api_key: this.key,
			format: "json",
			api_sig
		};

		const paramString = stringify(requestParam);

		return await fetch("http://ws.audioscrobbler.com/2.0/", {
			method: "POST",
			headers: {
				"Content-Length":  Buffer.byteLength(paramString).toString(),
				"Content-Type": "application/x-www-form-urlencoded"
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
		
		return await fetch(`http://ws.audioscrobbler.com/2.0?${stringify(params)}`);

	}

	private getSignature(isScrobble:boolean) {

		const paramObj:any = {
			...this.params,
			api_key: this.key
		};

		const args = Object.keys(paramObj).sort().map((e) => [e, paramObj[e]]) as string[][];

		let sig = args.reduce((acc, cur) => acc + (isScrobble && !["api_key", "sk"].includes(cur[0]) ? "" : cur[0]) + cur[1], "");

		sig = md5(sig + this.secret);

		return sig;

	}

	private isPostRequest() {
		return this.params.user?.length === 32 || this.params.hasOwnProperty("sk") || this.params.hasOwnProperty("token") || this.params.hasOwnProperty("password");
	}

}