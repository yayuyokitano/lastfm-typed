import { ShortMetadata, TagAlbum, TagArtist, TagBasic, TagTrack, Wiki } from "./shared";

interface Metadata extends ShortMetadata {
	tag:string;
}

export interface getInfo {
	name:string;
	reach:number;
	total:number;
	wiki:Wiki;
}

export interface getTopAlbums {
	albums:TagAlbum[];
	meta:Metadata;
}

export interface getTopArtists {
	artists:TagArtist[];
	meta:Metadata;
}

export interface getTopTags {
	tags:TagBasic[];
	meta:Metadata;
}

export interface getTopTracks {
	tracks:TagTrack[];
	meta:Metadata;
}