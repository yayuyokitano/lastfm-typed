import { Url } from "url";

export interface Wiki {
	published?:string;
	summary:string;
	content:string;
}

export interface Album {
	name:string,
	mbid:string,
	url: string,
	artist:ArtistBasic,
	image:Image[],
	"@attr": {
		rank:string
	}
}

export interface Artist {
	name:string,
	mbid:string,
	url:string,
	streamable:string,
	image:Image[],
	"@attr": {
		rank:string
	}
}

export interface ArtistBasic {
	name:string,
	mbid:string,
	url:string
}

export interface Image {
	"#text":string,
	size:string
}
