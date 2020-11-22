import {ListenerArtist, ListenerTrack} from "./shared";

interface Metadata {
	country:string;
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

export interface getTopArtists {
	artist:ListenerArtist[];
	"@attr":Metadata;
}

export interface getTopTracks {
	track:ListenerTrack[];
	"@attr":Metadata;
}