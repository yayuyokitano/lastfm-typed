import {GlobalArtist, ListenerTrack, ShortMetadata, TagGlobalNoWiki} from "./shared";

export interface getTopArtists {
	artists:GlobalArtist[];
	meta:ShortMetadata;
}

export interface getTopTags {
	tags:TagGlobalNoWiki[];
	meta:ShortMetadata;
}

export interface getTopTracks {
	tracks:ListenerTrack[];
	meta:ShortMetadata;
}

export interface chartInput {
	limit?:number;
	page?:number;
}