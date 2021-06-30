import { GlobalAlbum, StringAlbum, TagUrlCount, TagWUrl, TagTrack, Wiki, StaticAlbumInput, UserResolvable } from "./shared";

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
	meta: {
		query: {
			role:string;
			searchTerms:string;
			startPage:number;
		}
		totalResults:number;
		startIndex:number;
		itemsPerPage:number;
	}
	albumMatches:StringAlbum[];
}

export interface BasicAlbumInput extends StaticAlbumInput {
	autocorrect?:boolean
}

export type getTagsInput = BasicAlbumInput & UserResolvable;

export interface getInfoInput extends getTagsInput {
	lang?:string;
}

interface PostTemplate {
	artist:string;
	album:string;
	sk:string;
}

export interface addTagsInput extends PostTemplate {
	tags:string|string[];
}

export interface removeTagInput extends PostTemplate {
	tag:string;
}

export interface searchInput {
	album:string;
	limit?:number;
	page?:number;
}