export interface Wiki {
    published?: string;
    summary: string;
    content: string;
}
interface ArtistAlbumInput {
    artist: string;
    album: string;
    mbid?: string;
}
interface MBIDAlbumInput {
    artist?: string;
    album?: string;
    mbid: string;
}
export declare type AlbumInput = ArtistAlbumInput | MBIDAlbumInput;
interface ArtistNameInput {
    artist: string;
    mbid?: string;
}
interface MBIDArtistInput {
    artist?: string;
    mbid: string;
}
export declare type ArtistInput = ArtistNameInput | MBIDArtistInput;
interface ArtistTrackInput {
    artist: string;
    track: string;
    mbid?: string;
}
interface MBIDTrackInput {
    artist?: string;
    album?: string;
    mbid: string;
}
export declare type TrackInput = ArtistTrackInput | MBIDTrackInput;
export interface ShortMetadata {
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
}
export interface Image {
    "#text": string;
    size: string;
}
export interface ArtistNoMBID {
    name: string;
    url: string;
}
export interface ArtistBasic extends ArtistNoMBID {
    mbid: string;
}
export interface TrackBasic extends ArtistNoMBID {
    artist: ArtistBasic;
}
export interface ArtistOptionalMBID extends ArtistNoMBID {
    mbid?: string;
}
interface InfoNoMBID {
    name: string;
    url: string;
    image: Image[];
}
interface BasicInfo extends InfoNoMBID {
    mbid: string;
}
interface BasicOptionalMBID extends InfoNoMBID {
    mbid?: string;
}
export interface StringAlbum extends BasicInfo {
    artist: string;
    streamable: string;
}
export interface Album extends BasicInfo {
    artist: ArtistBasic;
}
interface AlbumOptionalMBID extends BasicOptionalMBID {
    artist: ArtistOptionalMBID;
}
export interface AlbumGlobal extends AlbumOptionalMBID {
    playcount: number;
}
export interface TagAlbum extends Album {
    "@attr": {
        rank: string;
    };
}
export interface GlobalAlbum extends BasicInfo {
    artist: string;
    listeners: string;
    playcount: string;
}
export interface Artist extends ArtistBasic {
    streamable: string;
}
export interface TagArtist extends ArtistBasic {
    "@attr": {
        rank: string;
    };
}
export interface ListenerArtist extends Artist {
    listeners: string;
}
export interface GlobalArtist extends ListenerArtist {
    playcount: string;
}
interface Track extends ArtistNoMBID {
    duration: string;
    streamable: {
        "#text": string;
        fulltrack: string;
    };
}
interface TrackMBID extends Track {
    mbid: string;
    artist: ArtistBasic;
}
interface TrackOptionalMBID extends Track {
    mbid?: string;
    artist: ArtistOptionalMBID;
}
export interface TrackOptionalMBIDImg extends TrackOptionalMBID {
    image: Image[];
}
export interface TagTrack extends TrackMBID {
    "@attr": {
        rank: string;
    };
}
export interface ListenerTrack extends TrackMBID {
    listeners: string;
}
export interface GlobalTrack extends ListenerTrack {
    playcount: string;
}
export interface GlobalTrackOptionalMBID extends TrackOptionalMBID {
    playcount: string;
    listeners: string;
    userplaycount?: string;
}
interface Tag {
    name: string;
}
export interface TagWUrl extends Tag {
    url: string;
}
export interface TagUrlCount extends TagWUrl {
    count: number;
}
export interface TagBasic extends Tag {
    count: number;
    reach: number;
}
export interface TagGlobalNoWiki extends Tag {
    url: string;
    reach: string;
    taggings: string;
    streamable: string;
}
export {};
