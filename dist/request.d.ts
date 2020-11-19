export default class LFMRequest {
    private api_key;
    private params;
    private secret;
    private response;
    constructor(key: string, secret: string, params: LFMArgumentObject);
    execute(): Promise<any>;
    checkStatus(): any;
    private post;
    private get;
}
interface LFMArgumentObject {
    lang?: string;
    tag?: string;
    method: string;
    user?: string;
    sk?: string;
}
export {};
