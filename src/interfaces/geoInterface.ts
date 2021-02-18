import {ListenerArtist, ListenerTrack} from "./shared";

interface Metadata {
	country:string;
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

export interface getTopArtists {
	artists:ListenerArtist[];
	meta:Metadata;
}

export interface getTopTracks {
	tracks:ListenerTrack[];
	meta:Metadata;
}