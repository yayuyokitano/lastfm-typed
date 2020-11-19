export interface Wiki {
	published?:string;
	summary:string;
	content:string;
}

export interface ShortMetadata {
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

export interface Image {
	"#text":string;
	size:string;
}

export interface ArtistBasic {
	name:string;
	mbid:string;
	url:string;
}

interface BasicInfo {
	name:string;
	mbid:string;
	url:string;
	image:Image[];
}

export interface Album extends BasicInfo {
	artist:ArtistBasic;
}

export interface TagAlbum extends Album {
	"@attr": {
		rank:string;
	}
}

export interface Artist extends BasicInfo {
	streamable:string;
}

export interface TagArtist extends BasicInfo {
	"@attr": {
		rank:string;
	}
}

export interface ListenerArtist extends Artist {
	listeners:string;
}

export interface GlobalArtist extends Artist {
	playcount:string;
}

export interface Track extends BasicInfo {
	duration:string;
	streamable: {
		"#text":string;
		fulltrack:string;
	}
	artist:ArtistBasic;
}

export interface TagTrack extends Track {
	"@attr": {
		rank:string;
	}
}

export interface ListenerTrack extends Track {
	listeners:string;
}

export interface GlobalTrack extends ListenerTrack {
	playcount:string;
	image:Image[];
}

interface Tag {
	name:string;
}

export interface TagBasic extends Tag {
	count:number;
	reach:number;
}

export interface TagGlobalNoWiki extends Tag {
	url:string;
	reach:string;
	taggings:string;
	streamable:string;
}