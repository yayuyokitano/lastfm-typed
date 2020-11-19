export default class LFMBase {
    protected key: string;
    protected secret: string;
    constructor(apiKey: string, apiSecret?: string);
    protected checkLimit(limit: number | undefined, maxLimit: number): void;
    protected convertNumRes(params: any): {
        num_res: number;
        offset: number;
    };
}
