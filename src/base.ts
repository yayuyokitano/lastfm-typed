import {LFMArgumentObject, LFMRequest} from "./request";

export default class LFMBase {

	protected key:string;
	protected secret:string;
	protected userAgent:string;
	protected secureConnection: boolean;

	public constructor(apiKey:string, apiSecret:string = "", userAgent:string = "lastfm-typed-npm", secureConnection:boolean = false) {
		this.key = apiKey;
		this.secret = apiSecret;
		this.userAgent = userAgent;
		this.secureConnection = secureConnection;
	}
	
	protected checkLimit(limit:number|undefined, maxLimit:number) {
		if (typeof limit !== "undefined" && (limit > maxLimit || limit < 1)) {
			throw new Error(`Limit out of bounds (1-${maxLimit}), ${limit} passed`);
		}
	}

	protected checkScrobbleCount(scrobbleCount:number|undefined, maxScrobbleCount:number) {
		if (typeof scrobbleCount === "undefined" || (scrobbleCount > maxScrobbleCount || scrobbleCount < 1)) {
			throw new Error(`Scrobble count out of bounds (1-${maxScrobbleCount}), ${scrobbleCount} passed`);
		}
	}

	protected convertNumRes(params:any) {
		let newParams = {
			num_res: 50,
			offset: 0
		};

		newParams.num_res = params?.limit || 50;
		newParams.offset = ((params?.page || 1) - 1) * newParams.num_res;
		return newParams;
	}

	protected convertGetTags(res:any) {
		if (res?.["#text"] === " ") {
			res.tag = [];
			delete res["#text"];
		}
		return res;
	}

	protected formatSearch(query:string) {
		return query.replace(/:/g, " ");
	}

	protected async sendRequest(apiKey:string, apiSecret:string, params:LFMArgumentObject) {
		return await new LFMRequest(apiKey, apiSecret, this.userAgent, this.secureConnection, params).execute();
	}

}
