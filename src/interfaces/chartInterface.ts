import {GlobalArtist, ListenerTrack, ShortMetadata, TagGlobalNoWiki} from "./shared";

interface Metadata {
	country:string;
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

export interface getTopArtists {
	artists: {
		artist:GlobalArtist[];
		"@attr":ShortMetadata;
	}
}

export interface getTopTags {
	tags: {
		tag:TagGlobalNoWiki[];
		"@attr":ShortMetadata;
	}
}

export interface getTopTracks {
	tracks: {
		track:ListenerTrack[];
		"@attr":Metadata;
	}
}
