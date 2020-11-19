import TagClass from "./classes/tag";
import GeoClass from "./classes/geo";
import ChartClass from "./classes/chart";
import AuthClass from "./classes/auth";
export default class LastFM {
    private key;
    private secret;
    tag: TagClass;
    geo: GeoClass;
    chart: ChartClass;
    auth: AuthClass;
    constructor(apiKey: string, apiSecret?: string);
}
