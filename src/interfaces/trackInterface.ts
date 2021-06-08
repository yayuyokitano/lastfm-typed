import { Image, TagUrlCount, TagWUrl, TrackBasic, Wiki, ArtistOptionalMBID, GlobalTrackOptionalMBID, ArtistNoMBID, UserResolvable } from "./shared";

interface Metadata {
	artist:string;
}

interface TrackMetadata extends Metadata {
	track:string;
}

interface SimilarTrack extends ArtistNoMBID {
	duration?:number;
	streamable: {
		isStreamable:boolean;
		fulltrack:boolean;
	}
	match:number;
	playcount:number;
	artist:ArtistOptionalMBID;
}

interface searchTrack {
	name:string;
	artist:string;
	url:string;
	streamable:boolean;
	listeners:number;
	image:Image[];
	mbid:string;
}

export interface getCorrection {
	track?:TrackBasic;
	artist?:ArtistOptionalMBID;
	meta?: {
		index:number;
		artistcorrected:boolean;
		trackcorrected:boolean;
	}
}

export interface getInfo extends GlobalTrackOptionalMBID {
	userloved?:boolean;
	wiki?:Wiki;
	toptags:TagWUrl[];
	album?: {
		artist:string;
		title:string;
		mbid?:string;
		url:string;
		image:Image[];
		position?:number;
	}
	artist:ArtistOptionalMBID;
}

export interface getSimilar {
	tracks:SimilarTrack[];
	meta: {
		artist:string;
	}
}

export interface getTags {
	tags:TagWUrl[];
	meta:TrackMetadata;
}

export interface getTopTags {
	tags:TagUrlCount[];
	meta:TrackMetadata;
}

interface ScrobbleEntry {
	corrected:boolean;
	name?:string;
}

export interface scrobble {
	meta: {
		accepted:number;
		ignored:number;
	}
	scrobbles: {
		artist:ScrobbleEntry;
		ignoredMessage: {
			code:number;
			message:string;
		}
		albumArtist:ScrobbleEntry;
		timestamp:number;
		album:ScrobbleEntry;
		track:ScrobbleEntry;
	}[]
}

export interface search {
	query: {
		role:string;
		startPage:number;
	}
	totalResults:number;
	startIndex:number;
	itemsPerPage:number;
	trackMatches:searchTrack[];
}

export interface ScrobbleObject {
	artist:string;
	track:string;
	timestamp:number;
	album?:string;
	chosenByUser?:0|1;
	trackNumber?:number;
	mbid?:string;
	albumArtist?:string;
	duration?:number;
}

export interface BaseTrackInput {
	artist:string;
	track:string;
}

export interface PostTemplate extends BaseTrackInput {
	sk:string;
}

export interface addTagsInput extends PostTemplate {
	tags:string[]|string;
}

export interface getTagsInput extends BaseTrackInput {
	autocorrect?:boolean;
}

export type getInfoInput = getTagsInput & UserResolvable;

export interface getSimilarInput extends getTagsInput {
	limit?:number;
}

export interface removeTagInput extends PostTemplate {
	tag:string;
}

export interface scrobbleInput {
	sk:string;
	scrobbles:ScrobbleObject[];
}

export interface searchInput {
	track:string;
	artist?:string;
	page?:number;
	limit?:number;
}

export interface updateNowPlayingInput extends PostTemplate {
	album?:string;
	trackNumber?:number;
	mbid?:string;
	duration?:number;
	albumArtist?:string;
}
