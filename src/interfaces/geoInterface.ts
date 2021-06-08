import {ListenerArtist, ListenerTrack, ShortMetadata} from "./shared";

interface Metadata extends ShortMetadata {
	country:string;
}

export interface getTopArtists {
	artists:ListenerArtist[];
	meta:Metadata;
}

export interface getTopTracks {
	tracks:ListenerTrack[];
	meta:Metadata;
}

export interface GeoBase {
	country:string;
	limit?:number;
	page?:number;
}

export interface getTopTracksInput extends GeoBase {
	location?:string;
}