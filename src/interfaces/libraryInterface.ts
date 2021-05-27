import { Artist, ShortMetadata } from "./shared";

interface Metadata extends ShortMetadata {
	user:string;
}

interface LocalArtist extends Artist {
	playcount:number;
	tagcount:number;
}

export interface getArtists {
	artists:LocalArtist[];
	meta:Metadata;
}