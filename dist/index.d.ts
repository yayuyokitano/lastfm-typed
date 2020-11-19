import TagClass from "./classes/tag";
export default class LastFM {
    private key;
    private secret;
    Tag: TagClass;
    constructor(apiKey: string, apiSecret?: string);
}
