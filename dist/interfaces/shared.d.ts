export interface Wiki {
    published?: string;
    summary: string;
    content: string;
}
export interface Image {
    "#text": string;
    size: string;
}
export interface ArtistBasic {
    name: string;
    mbid: string;
    url: string;
}
interface BasicInfo {
    name: string;
    mbid: string;
    url: string;
    image: Image[];
    "@attr": {
        rank: string;
    };
}
export interface Album extends BasicInfo {
    artist: ArtistBasic;
}
export interface Artist extends BasicInfo {
    streamable: string;
}
export interface Track extends BasicInfo {
    duration: string;
    streamable: {
        "#text": string;
        fulltrack: string;
    };
    artist: ArtistBasic;
}
export interface TagBasic {
    name: string;
    count: number;
    reach: number;
}
export {};
