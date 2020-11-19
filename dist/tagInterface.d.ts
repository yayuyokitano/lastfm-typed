/// <reference types="node" />
import { Url } from "url";
export interface getInfo {
    tag: {
        name: string;
        url: Url;
        reach: number;
        taggings: number;
        streamable: number;
        wiki: {
            published: Date;
            summary: string;
            content: string;
        };
    };
}
