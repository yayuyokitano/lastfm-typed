import { AlbumGlobal, Artist, ArtistBasic, ArtistNoMBID, TagUrlCount, TagWUrl, ArtistOptionalMBID, Image, ListenerArtist } from "./shared";

interface Metadata {
	artist:string;
}

interface LargeMetadata extends Metadata {
	page:string;
	perPage:string;
	totalPages:string;
	total:string;
}

interface ArtistData extends Artist {
	ontour:string;
	stats: {
		listeners:string;
		playcount:string;
		userplaycount:string;
	}
	similar: {
		artist:ArtistNoMBID[];
	}
	tags: {
		tag:TagWUrl[];
	}
	bio: {
		links: {
			link: {
				"#text":string;
				rel:string;
				href:string;
			}
		}
		published:string;
		summary:string;
		content:string;
	}
}

interface SimilarArtist extends Artist {
	match:string;
}

interface TrackData extends ArtistOptionalMBID {
	playcount:string;
	listeners:string;
	streamable:string;
	artist:ArtistOptionalMBID;
	image:Image[];
	"@attr": {
		rank:string;
	}
}

export interface getCorrection {
	artist:ArtistBasic;
	"@attr": {
		index:string;
	}
}

export interface getInfo {
	artist: ArtistData;
}

export interface getSimilar {
	similarartists: {
		artist:SimilarArtist;
		"@attr": {
			artist:string;
		}
	}
}

export interface getTags {
	tags: {
		tag:TagWUrl[];
		"@attr":Metadata;
	}
}

export interface getTopAlbums {
	topalbums: {
		album:AlbumGlobal[];
		"@attr":LargeMetadata;
	}
}

export interface getTopTags {
	toptags: {
		tag:TagUrlCount[];
		"@attr":Metadata;
	}
}

export interface getTopTracks {
	toptracks: {
		track:TrackData[];
		"@attr":LargeMetadata;
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
		artistmatches: {
			artist:ListenerArtist[];
		}
		"@attr": {
			for:string;
		}
	}
}