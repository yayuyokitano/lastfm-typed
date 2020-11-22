import { GlobalAlbum, StringAlbum, TagUrlCount, TagWUrl, TagTrack, Wiki } from "./shared";

interface Metadata {
	artist:string;
	album:string;
}

export interface getInfo extends GlobalAlbum {
	userplaycount?:string;
	wiki?:Wiki;
	tags: {
		tag:TagWUrl[];
	}
	tracks: {
		track:TagTrack[];
	}
}

export interface getTags {
	tag:TagWUrl[];
	"@attr":Metadata;
}

export interface getTopTags {
	tag:TagUrlCount[];
	"@attr":Metadata;
}

export interface search {
	"opensearch:Query": {
		"#text":string;
		role:string;
		searchTerms:string;
		startPage:string;
	}
	"opensearch:totalResults":string;
	"opensearch:startIndex":string;
	"opensearch:itemsPerPage":string;
	albummatches: {
		album:StringAlbum[];
	}
	"@attr": {
		for:string;
	}
}