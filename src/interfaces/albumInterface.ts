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
	parameters:Metadata;
}

export interface getTopTags {
	tags:TagUrlCount[];
	parameters:Metadata;
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
	parameters: {
		query:string;
	}
}