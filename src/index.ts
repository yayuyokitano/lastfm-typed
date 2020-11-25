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

	public constructor(apiKey:string, apiSecret:string = "", userAgent:string = "lastfm-typed-npm") {
		this.tag = new TagClass(apiKey, apiSecret, userAgent);
		this.geo = new GeoClass(apiKey, apiSecret, userAgent);
		this.chart = new ChartClass(apiKey, apiSecret, userAgent);
		this.auth = new AuthClass(apiKey, apiSecret, userAgent);
		this.album = new AlbumClass(apiKey, apiSecret, userAgent);
		this.artist = new ArtistClass(apiKey, apiSecret, userAgent);
		this.library = new LibraryClass(apiKey, apiSecret, userAgent);
		this.track = new TrackClass(apiKey, apiSecret, userAgent);
		this.user = new UserClass(apiKey, apiSecret, userAgent);
		this.helper = new HelperClass(this);
	}
}
