import { GlobalAlbum, StringAlbum, TagUrlCount, TagWUrl, TagTrack, Wiki } from "./shared";

interface Metadata {
	artist:string;
	album:string;
}

interface AlbumData extends GlobalAlbum {
	userplaycount?:string;
	wiki?:Wiki;
	tags: {
		tag:TagWUrl[];
	}
	tracks: {
		track:TagTrack[];
	}
}

export interface getInfo {
	album: AlbumData;
}

export interface getTags {
	tags: {
		tag:TagWUrl[];
		"@attr":Metadata;
	}
}

export interface getTopTags {
	toptags: {
		tag:TagUrlCount[];
		"@attr":Metadata;
	}
}

export interface search {
	results: {
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
}