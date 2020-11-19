import lfmrequest from "./request"
import * as Tag from "./tagInterface"

export default class LastFM {

	private key:string;
	private secret:string;

	public constructor(api_key:string, api_secret:string = "") {
		this.key = api_key;
		this.secret = api_secret;
	}

	public async tag_getInfo(tag:string, params?:{
		lang?:string;
	}) {

		let res = await new lfmrequest(this.key, this.secret, {
			method: "tag.getInfo",
			tag,
			...params
		}).execute() as Tag.getInfo;
		if (res.tag?.wiki?.published) {
			res.tag.wiki.published = new Date(res.tag.wiki.published);
		}
		return res;

	}
	

}