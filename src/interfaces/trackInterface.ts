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
		isStreamable:string;
		fulltrack:string;
	}
	match:number;
	playcount:number;
	artist:ArtistOptionalMBID;
}

interface searchTrack {
	name:string;
	artist:string;
	url:string;
	streamable:string;
	listeners:string;
	image:Image[];
	mbid:string;
}

export interface getCorrection {
	track:TrackBasic;
	meta: {
		index:string;
		artistcorrected:string;
		trackcorrected:string;
	}
}

export interface getInfo extends GlobalTrackOptionalMBID {
	userplaycount?:string;
	userloved?:string;
	wiki?:Wiki;
	toptags:TagWUrl[];
	album?: {
		artist:string;
		title:string;
		mbid:string;
		url:string;
		image:Image[];
		position:string;
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
	corrected:string;
	name?:string;
}

export interface scrobble {
	head: {
		accepted:number;
		ignored:number;
	}
	scrobbles: {
		artist:ScrobbleEntry;
		ignoredMessage: {
			code:string;
			message:string;
		}
		albumArtist:ScrobbleEntry;
		timestamp:string;
		album:ScrobbleEntry;
		track:ScrobbleEntry;
	}[]
}

export interface search {
	query: {
		role:string;
		startPage:string;
	}
	totalResults:string;
	startIndex:string;
	itemsPerPage:string;
	trackmatches:searchTrack[];
}