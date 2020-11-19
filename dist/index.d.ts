import * as Tag from "./tagInterface";
export default class LastFM {
    private key;
    private secret;
    constructor(api_key: string, api_secret?: string);
    tag_getInfo(tag: string, params?: {
        lang?: string;
    }): Promise<Tag.getInfo>;
}
