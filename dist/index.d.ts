import TagClass from "./classes/tag";
import GeoClass from "./classes/geo";
import ChartClass from "./classes/chart";
import AuthClass from "./classes/auth";
import AlbumClass from "./classes/album";
export default class LastFM {
    private key;
    private secret;
    tag: TagClass;
    geo: GeoClass;
    chart: ChartClass;
    auth: AuthClass;
    album: AlbumClass;
    constructor(apiKey: string, apiSecret?: string);
}
