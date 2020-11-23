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

	public constructor(apiKey:string, apiSecret:string = "") {
		this.tag = new TagClass(apiKey, apiSecret);
		this.geo = new GeoClass(apiKey, apiSecret);
		this.chart = new ChartClass(apiKey, apiSecret);
		this.auth = new AuthClass(apiKey, apiSecret);
		this.album = new AlbumClass(apiKey, apiSecret);
		this.artist = new ArtistClass(apiKey, apiSecret);
		this.library = new LibraryClass(apiKey, apiSecret);
		this.track = new TrackClass(apiKey, apiSecret);
		this.user = new UserClass(apiKey, apiSecret);
		this.helper = new HelperClass(this);
	}
}
