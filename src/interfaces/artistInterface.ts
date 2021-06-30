import { AlbumGlobal, StaticArtistInput, ArtistNoMBID, TagUrlCount, TagWUrl, ArtistOptionalMBID, Image, ListenerArtist, ShortMetadata, ArtistStreamableOptionalMBID, UserResolvable } from "./shared";

interface Metadata {
	artist:string;
}

type LargeMetadata = Metadata & ShortMetadata;

interface SimilarArtist extends ArtistStreamableOptionalMBID {
	match:number;
}

interface TrackData extends ArtistOptionalMBID {
	playcount:number;
	listeners:number;
	streamable:boolean;
	artist:ArtistOptionalMBID;
	image:Image[];
	rank:number;
}

export interface getCorrection {
	artist?:ArtistOptionalMBID;
	index?:number;
}

export interface getInfo extends ArtistStreamableOptionalMBID {
	ontour:boolean;
	stats: {
		listeners:number;
		playcount:number;
		userplaycount?:number;
	}
	similarArtists:ArtistNoMBID[];
	tags:TagWUrl[];
	bio?: {
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
	tags:TagWUrl[];
	meta:Metadata;
}

export interface getTopAlbums {
	albums:AlbumGlobal[];
	meta:LargeMetadata;
}

export interface getTopTags {
	tags:TagUrlCount[];
	meta:Metadata;
}

export interface getTopTracks {
	tracks:TrackData[];
	meta:LargeMetadata;
}

export interface search {
	meta: {
			query: {
			role:string;
			searchTerms:string;
			startPage:number;
		}
		totalResults:number;
		startIndex:number;
		itemsPerPage:number;
	},
	artistMatches:ListenerArtist[];
}

export interface BasicArtistInput extends StaticArtistInput {
	autocorrect?:boolean;
}

export type getTagsInput = BasicArtistInput & UserResolvable

export interface getInfoInput extends getTagsInput {
	lang?:string;
}

export interface getSimilarInput extends BasicArtistInput {
	limit?:number;
}

export interface PageLimitInput extends getSimilarInput {
	page?:number;
}

export interface searchInput extends BasicArtistInput {
	page?:number;
	limit?:number;
}

interface PostTemplate {
	artist:string;
	sk:string;
}

export interface addTagsInput extends PostTemplate {
	tags:string|string[];
}

export interface removeTagInput extends PostTemplate {
	tag:string;
}