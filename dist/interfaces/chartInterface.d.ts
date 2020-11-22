import { GlobalArtist, ListenerTrack, ShortMetadata, TagGlobalNoWiki } from "./shared";
interface Metadata {
    country: string;
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
}
export interface getTopArtists {
    artist: GlobalArtist[];
    "@attr": ShortMetadata;
}
export interface getTopTags {
    tag: TagGlobalNoWiki[];
    "@attr": ShortMetadata;
}
export interface getTopTracks {
    track: ListenerTrack[];
    "@attr": Metadata;
}
export {};
