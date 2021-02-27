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
    tag: TagClass;
    geo: GeoClass;
    chart: ChartClass;
    auth: AuthClass;
    album: AlbumClass;
    artist: ArtistClass;
    library: LibraryClass;
    track: TrackClass;
    user: UserClass;
    helper: HelperClass;
    constructor(apiKey: string, apiSecret?: string, userAgent?: string, secureConnection?: boolean);
}
