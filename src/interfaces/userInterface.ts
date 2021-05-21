import { Album, Artist, ArtistBasic, Image, ShortMetadata, TagAlbum, TagArtist, TagTrack, TagUrlCount, TrackOptionalMBIDImg } from "./shared";

interface Metadata extends ShortMetadata {
	user:string;
}

interface User { //playcount and playlist seem to just not work.
	subscriber:boolean;
	name:string;
	country:string;
	image:Image[];
	registered: {
		unixtime:number;
		datetime:string;
	}
	url:string;
	realname:string;
	bootstrap:number;
	type:string;
}

export interface getFriends {
	user:User[];
	meta:Metadata;
}

export interface getInfo extends User {
	age:number;
	gender:string;
	playcount:number;
}

export interface getLovedTracks {
	meta:Metadata;
	tracks: {
		artist:ArtistBasic;
		mbid:string;
		date: {
			uts:number;
			datetime:string;
		}
		url:string;
		name:string;
		streamable:{
			fulltrack:boolean;
			isStreamable:boolean;
		}
	}[]
}

interface PersonalTags extends Metadata {
	tag:string;
}

interface ArtistPersonalTags extends PersonalTags {
	artists:Artist[];
}

interface AlbumPersonalTags extends PersonalTags {
	albums:Album[];
}

interface TrackPersonalTags extends PersonalTags {
	tracks:TrackOptionalMBIDImg[];
}

export type getPersonalTags = ArtistPersonalTags|AlbumPersonalTags|TrackPersonalTags;

interface ShortInfo {
	mbid:string;
	name:string;
}

interface RecentTrack {
	artist: ShortInfo&ArtistBasic;
	nowplaying?:boolean;
	mbid:string;
	album:ShortInfo;
	streamable:boolean;
	url:string;
	name:string;
	image:Image[];
	loved?:boolean;
	date?: {
		uts:number;
		datetime:string;
	}
}

export interface getRecentTracks {
	meta:Metadata;
	tracks:RecentTrack[];
}

interface TopAlbum extends TagAlbum {
	playcount:number;
}

export interface getTopAlbums {
	albums:TopAlbum[];
	meta:Metadata;
}

interface ChartArtist extends TagArtist {
	playcount:number;
}

// For use in helper, not directly used
export interface TopArtist extends ChartArtist {
	streamable:boolean;
}

export interface getTopArtists {
	artists:TopArtist[];
	meta:Metadata;
}

export interface getTopTags {
	tags:TagUrlCount[];
	meta: {
		user:string
	};
}

interface TopTrack extends TagTrack {
	playcount:number;
}

export interface getTopTracks {
	tracks:TopTrack[];
	meta:Metadata;
}

interface ChartMetadata {
	user:string;
	from:string;
	to:string;
}

interface ChartAlbum {
	artist:ShortInfo;
	rank:string;
	mbid:string;
	playcount:string;
	name:string;
	url:string;
}

export interface getWeeklyAlbumChart {
	albums:ChartAlbum[];
	meta:ChartMetadata;
}

export interface getWeeklyArtistChart {
	artists:ChartArtist[];
	meta:ChartMetadata;
}

interface ChartEntry {
	from:number;
	to:number;
}

export interface getWeeklyChartList {
	charts:ChartEntry[];
}

interface ChartTrack {
	artist: {
		mbid:string;
		name:string;
	}
	rank:number;
	mbid:string;
	url:string;
	name:string;
	playcount:number;
}

export interface getWeeklyTrackChart {
	tracks:ChartTrack[];
	meta:ChartMetadata;
}