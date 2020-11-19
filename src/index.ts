import TagClass from "./classes/tag";

export default class LastFM {
	private key:string;
	private secret:string;
	public Tag:TagClass;

	public constructor(apiKey:string, apiSecret:string = "") {
		this.key = apiKey;
		this.secret = apiSecret;
		this.Tag = new TagClass(this.key, this.secret);
	}
}
