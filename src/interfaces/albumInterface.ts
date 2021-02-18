import { GlobalAlbum, StringAlbum, TagUrlCount, TagWUrl, TagTrack, Wiki } from "./shared";

interface Metadata {
	artist:string;
	album:string;
}

export interface getInfo extends GlobalAlbum {
	userplaycount?:string;
	wiki?:Wiki;
	tags:TagWUrl[];
	tracks:TagTrack[];
}

export interface getTags {
	tags:TagWUrl[];
	meta:Metadata;
}

export interface getTopTags {
	tags:TagUrlCount[];
	meta:Metadata;
}

export interface search {
	query: {
		role:string;
		searchTerms:string;
		startPage:string;
	}
	totalResults:string;
	startIndex:string;
	itemsPerPage:string;
	albumMatches:StringAlbum[];
	meta: {
		query:string;
	}
}