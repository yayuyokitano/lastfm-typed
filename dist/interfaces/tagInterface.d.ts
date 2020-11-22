import { TagAlbum, TagArtist, TagBasic, TagTrack, Wiki } from "./shared";
interface Metadata {
    tag: string;
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
}
export interface getInfo {
    name: string;
    reach: number;
    total: number;
    wiki: Wiki;
}
export interface getTopAlbums {
    album: TagAlbum[];
    "@attr": Metadata;
}
export interface getTopArtists {
    artist: TagArtist[];
    "@attr": Metadata;
}
export interface getTopTags {
    tag: TagBasic[];
    "@attr": Metadata;
}
export interface getTopTracks {
    track: TagTrack[];
    "@attr": Metadata;
}
export {};
