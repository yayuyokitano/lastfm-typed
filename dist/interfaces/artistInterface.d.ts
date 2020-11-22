import { AlbumGlobal, Artist, ArtistBasic, ArtistNoMBID, TagUrlCount, TagWUrl, ArtistOptionalMBID, Image, ListenerArtist } from "./shared";
interface Metadata {
    artist: string;
}
interface LargeMetadata extends Metadata {
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
}
interface SimilarArtist extends Artist {
    match: string;
}
interface TrackData extends ArtistOptionalMBID {
    playcount: string;
    listeners: string;
    streamable: string;
    artist: ArtistOptionalMBID;
    image: Image[];
    "@attr": {
        rank: string;
    };
}
export interface getCorrection {
    artist: ArtistBasic;
    "@attr": {
        index: string;
    };
}
export interface getInfo extends Artist {
    ontour: string;
    stats: {
        listeners: string;
        playcount: string;
        userplaycount: string;
    };
    similar: {
        artist: ArtistNoMBID[];
    };
    tags: {
        tag: TagWUrl[];
    };
    bio: {
        links: {
            link: {
                "#text": string;
                rel: string;
                href: string;
            };
        };
        published: string;
        summary: string;
        content: string;
    };
}
export interface getSimilar {
    artist: SimilarArtist[];
    "@attr": {
        artist: string;
    };
}
export interface getTags {
    tag: TagWUrl[];
    "@attr": Metadata;
}
export interface getTopAlbums {
    album: AlbumGlobal[];
    "@attr": LargeMetadata;
}
export interface getTopTags {
    tag: TagUrlCount[];
    "@attr": Metadata;
}
export interface getTopTracks {
    track: TrackData[];
    "@attr": LargeMetadata;
}
export interface search {
    "opensearch:Query": {
        "#text": string;
        role: string;
        searchTerms: string;
        startPage: string;
    };
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    artistmatches: {
        artist: ListenerArtist[];
    };
    "@attr": {
        for: string;
    };
}
export {};
