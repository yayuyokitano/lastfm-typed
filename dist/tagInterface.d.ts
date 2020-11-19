export interface getInfo {
    tag: {
        name: string;
        reach: number;
        total: number;
        wiki: {
            published?: Date;
            summary: string;
            content: string;
        };
    };
}
