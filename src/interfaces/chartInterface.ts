import {GlobalArtist, GlobalTrack, ShortMetadata, TagGlobalNoWiki} from "./shared";

export interface getTopArtists {
	artists:GlobalArtist[];
	meta:ShortMetadata;
}

export interface getTopTags {
	tags:TagGlobalNoWiki[];
	meta:ShortMetadata;
}

export interface getTopTracks {
	tracks:GlobalTrack[];
	meta:ShortMetadata;
}

export interface chartInput {
	limit?:number;
	page?:number;
}