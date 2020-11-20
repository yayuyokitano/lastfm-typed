import TagClass from "./classes/tag";
import GeoClass from "./classes/geo";
import ChartClass from "./classes/chart";
import AuthClass from "./classes/auth";
import AlbumClass from "./classes/album";
import ArtistClass from "./classes/artist";
export default class LastFM {
    private key;
    private secret;
    tag: TagClass;
    geo: GeoClass;
    chart: ChartClass;
    auth: AuthClass;
    album: AlbumClass;
    artist: ArtistClass;
    constructor(apiKey: string, apiSecret?: string);
}
