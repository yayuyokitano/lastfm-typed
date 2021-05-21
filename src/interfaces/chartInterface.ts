import {GlobalArtist, ListenerTrack, ShortMetadata, TagGlobalNoWiki} from "./shared";

interface Metadata extends ShortMetadata {
	country:string;
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
