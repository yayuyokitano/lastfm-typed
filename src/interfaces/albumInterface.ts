import { GlobalAlbum, StringAlbum, TagUrlCount, TagWUrl, TagTrack, Wiki } from "./shared";

interface Metadata {
	artist:string;
	album:string;
}

export interface getInfo extends GlobalAlbum {
	userplaycount?:number;
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
		startPage:number;
	}
	totalResults:number;
	startIndex:number;
	itemsPerPage:number;
	albumMatches:StringAlbum[];
	meta: {
		query:string;
	}
}