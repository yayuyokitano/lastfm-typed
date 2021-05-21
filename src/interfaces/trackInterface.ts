import { Image, TagUrlCount, TagWUrl, TrackBasic, Wiki, ArtistOptionalMBID, GlobalTrackOptionalMBID, ArtistNoMBID } from "./shared";

interface Metadata {
	artist:string;
}

interface TrackMetadata extends Metadata {
	track:string;
}

interface SimilarTrack extends ArtistNoMBID {
	duration:number;
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
	track:TrackBasic;
	meta: {
		index:number;
		artistcorrected:string;
		trackcorrected:string;
	}
}

export interface getInfo extends GlobalTrackOptionalMBID {
	userloved?:boolean;
	wiki?:Wiki;
	toptags:TagWUrl[];
	album?: {
		artist:string;
		title:string;
		mbid:string;
		url:string;
		image:Image[];
		position:number;
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
	head: {
		accepted:boolean;
		ignored:boolean;
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