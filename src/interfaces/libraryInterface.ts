import { Artist } from "./shared";

interface Metadata {
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
	user:string;
}

interface LocalArtist extends Artist {
	playcount:string;
	tagcount:string;
}

export interface getArtists {
	artist:LocalArtist;
	meta:Metadata;
}