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

interface SimilarArtist extends Artist {
	match:string;
}

interface TrackData extends ArtistOptionalMBID {
	playcount:string;
	listeners:string;
	streamable:string;
	artist:ArtistOptionalMBID;
	image:Image[];
	rank:string;
}

export interface getCorrection {
	artist:ArtistBasic;
	index:string;
}

export interface getInfo extends Artist {
	ontour:string;
	stats: {
		listeners:string;
		playcount:string;
		userplaycount:string;
	}
	similarArtists:ArtistNoMBID[];
	tags:TagWUrl[];
	bio: {
		link: {
			rel:string;
			href:string;
		}
		published:string;
		summary:string;
		content:string;
	}
}

export interface getSimilar {
	artists:SimilarArtist[];
	meta:Metadata;
}

export interface getTags {
	tag:TagWUrl[];
	meta:Metadata;
}

export interface getTopAlbums {
	albums:AlbumGlobal[];
	meta:LargeMetadata;
}

export interface getTopTags {
	tag:TagUrlCount[];
	meta:Metadata;
}

export interface getTopTracks {
	tracks:TrackData[];
	meta:LargeMetadata;
}

export interface search {
	query: {
		role:string;
		searchTerms:string;
		startPage:string;
	}
	totalResults:string;
	startIndex:string;
	itemsPerPage:string;
	artistMatches:ListenerArtist[];
	parameters: {
		query:string;
	}
}