import { Image, TagUrlCount, TagWUrl, TrackBasic, Wiki, ArtistOptionalMBID, GlobalTrackOptionalMBID, ArtistNoMBID } from "./shared";
interface Metadata {
    artist: string;
}
interface TrackMetadata extends Metadata {
    track: string;
}
interface SimilarTrack extends ArtistNoMBID {
    duration: number;
    streamable: {
        "#text": string;
        fulltrack: string;
    };
    match: number;
    playcount: number;
    artist: ArtistOptionalMBID;
}
interface searchTrack {
    name: string;
    artist: string;
    url: string;
    streamable: string;
    listeners: string;
    image: Image[];
    mbid: string;
}
export interface getCorrection {
    track: TrackBasic;
    "@attr": {
        index: string;
        artistcorrected: string;
        trackcorrected: string;
    };
}
export interface getInfo extends GlobalTrackOptionalMBID {
    userplaycount?: string;
    userloved?: string;
    wiki?: Wiki;
    toptags: {
        tag: TagWUrl[];
    };
    album?: {
        artist: string;
        title: string;
        mbid: string;
        url: string;
        image: Image[];
        "@attr": {
            position: string;
        };
    };
    artist: ArtistOptionalMBID;
}
export interface getSimilar {
    track: SimilarTrack[];
    "@attr": {
        artist: string;
    };
}
export interface getTags {
    tag: TagWUrl[];
    "@attr": TrackMetadata;
}
export interface getTopTags {
    tag: TagUrlCount[];
    "@attr": TrackMetadata;
}
export interface search {
    "opensearch:Query": {
        "#text": string;
        role: string;
        startPage: string;
    };
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    trackmatches: {
        track: searchTrack[];
    };
}
export {};
