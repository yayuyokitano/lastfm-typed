import TagClass from "./classes/tag";
import GeoClass from "./classes/geo";
import ChartClass from "./classes/chart";
export default class LastFM {
    private key;
    private secret;
    tag: TagClass;
    geo: GeoClass;
    chart: ChartClass;
    constructor(apiKey: string, apiSecret?: string);
}
