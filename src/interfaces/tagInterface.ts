import { TagAlbum, TagArtist, TagBasic, TagTrack, Wiki } from "./shared";

interface Metadata {
	tag:string;
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

export interface getInfo {
	tag: {
		name:string;
		reach:number;
		total:number;
		wiki:Wiki;
	}
}

export interface getTopAlbums {
	albums: {
		album:TagAlbum[];
		"@attr":Metadata;
	}
}

export interface getTopArtists {
	topartists: {
		artist:TagArtist[];
		"@attr":Metadata;
	}
}

export interface getTopTags {
	toptags: {
		tag:TagBasic[];
		"@attr":Metadata;
	}
}

export interface getTopTracks {
	tracks: {
		track:TagTrack[];
		"@attr":Metadata;
	}
}