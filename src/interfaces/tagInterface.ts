import { Album, Artist, Wiki } from "./shared";

interface Metadata {
	tag:string,
	page:string,
	perPage:string,
	totalPages:string,
	total:string
}

export interface getInfo {
	tag: {
		name:string;
		reach:number;
		total:number;
		wiki:Wiki
	}
}

export interface getTopAlbums {
	albums: {
		album:Album[],
		"@attr":Metadata
	}
}

export interface getTopArtists {
	topartists: {
		artist:Artist[],
		"@attr":Metadata
	}
}
