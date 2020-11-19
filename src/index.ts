import TagClass from "./classes/tag";
import GeoClass from "./classes/geo";
import ChartClass from "./classes/chart";

export default class LastFM {
	private key:string;
	private secret:string;
	public tag:TagClass;
	public geo:GeoClass;
	public chart:ChartClass;

	public constructor(apiKey:string, apiSecret:string = "") {
		this.key = apiKey;
		this.secret = apiSecret;
		this.tag = new TagClass(this.key, this.secret);
		this.geo = new GeoClass(this.key, this.secret);
		this.chart = new ChartClass(this.key, this.secret);
	}
}
