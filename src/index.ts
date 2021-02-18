import TagClass from "./classes/tag";
import GeoClass from "./classes/geo";
import ChartClass from "./classes/chart";
import AuthClass from "./classes/auth";
import AlbumClass from "./classes/album";
import ArtistClass from "./classes/artist";
import LibraryClass from "./classes/library";
import TrackClass from "./classes/track";
import UserClass from "./classes/user";
import HelperClass from "./classes/helper";

export default class LastFM {
	public tag:TagClass;
	public geo:GeoClass;
	public chart:ChartClass;
	public auth:AuthClass;
	public album:AlbumClass;
	public artist:ArtistClass;
	public library:LibraryClass;
	public track:TrackClass;
	public user:UserClass;
	public helper:HelperClass;

	public constructor(apiKey:string, options?:{apiSecret?:string, userAgent?:string, secureConnection?:boolean}) {
		if (!options) {
			options = {};
		}

		options.apiSecret ??= "";
		options.userAgent ??= "lastfm-typed-npm";
		options.secureConnection ??= true;

		let {apiSecret, userAgent, secureConnection} = options;

		this.tag = new TagClass(apiKey, apiSecret, userAgent, secureConnection);
		this.geo = new GeoClass(apiKey, apiSecret, userAgent, secureConnection);
		this.chart = new ChartClass(apiKey, apiSecret, userAgent, secureConnection);
		this.auth = new AuthClass(apiKey, apiSecret, userAgent, secureConnection);
		this.album = new AlbumClass(apiKey, apiSecret, userAgent, secureConnection);
		this.artist = new ArtistClass(apiKey, apiSecret, userAgent, secureConnection);
		this.library = new LibraryClass(apiKey, apiSecret, userAgent, secureConnection);
		this.track = new TrackClass(apiKey, apiSecret, userAgent, secureConnection);
		this.user = new UserClass(apiKey, apiSecret, userAgent, secureConnection);
		this.helper = new HelperClass(this);
	}
}
