interface LFMArgumentObject {
    lang?: string;
    tag?: string;
    method: string;
    user?: string;
    sk?: string;
    country?: string;
    location?: string;
    num_res?: number;
    offset?: number;
    page?: number;
    limit?: number;
}
export default class LFMRequest {
    private key;
    private params;
    private secret;
    private response;
    constructor(key: string, secret: string, params: LFMArgumentObject);
    execute(): Promise<any>;
    checkStatus(): Promise<any>;
    private post;
    private get;
}
export {};
