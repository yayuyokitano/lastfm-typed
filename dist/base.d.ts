import { LFMArgumentObject } from "./request";
export default class LFMBase {
    protected key: string;
    protected secret: string;
    protected userAgent: string;
    protected secureConnection: boolean;
    constructor(apiKey: string, apiSecret?: string, userAgent?: string, secureConnection?: boolean);
    protected checkLimit(limit: number | undefined, maxLimit: number): void;
    protected checkScrobbleCount(scrobbleCount: number | undefined, maxScrobbleCount: number): void;
    protected convertNumRes(params: any): {
        num_res: number;
        offset: number;
    };
    protected convertGetTags(res: any): any;
    protected formatSearch(query: string): string;
    protected sendRequest(apiKey: string, apiSecret: string, params: LFMArgumentObject): Promise<any>;
}
