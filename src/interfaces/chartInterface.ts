import {GlobalArtist, ListenerTrack, ShortMetadata, TagGlobalNoWiki} from "./shared";

interface Metadata {
	country:string;
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

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
	meta:Metadata;
}
