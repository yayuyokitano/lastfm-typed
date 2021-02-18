import { Album, Artist, ArtistBasic, Image, TagAlbum, TagArtist, TagTrack, TagUrlCount, TrackOptionalMBIDImg } from "./shared";

interface Metadata {
	user:string;
	page:string;
	total:string;
	perPage:string;
	totalPages:string;
}

interface User { //playcount and playlist seem to just not work.
	subscriber:string;
	name:string;
	country:string;
	image:Image[];
	registered: {
		unixtime:string;
		datetime:string;
	}
	url:string;
	realname:string;
	bootstrap:string;
	type:string;
}

export interface getFriends {
	user:User[];
	meta:Metadata;
}

export interface getInfo extends User {
	age:string;
	gender:string;
	playcount:string;
}

export interface getLovedTracks {
	meta:Metadata;
	tracks: {
		artist:ArtistBasic;
		mbid:string;
		date: {
			uts:string;
			datetime:string;
		}
		url:string;
		name:string;
		streamable:{
			fulltrack:string;
			isStreamable:string;
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
	nowplaying?:string;
	mbid:string;
	album:ShortInfo;
	streamable:string;
	url:string;
	name:string;
	image:Image[];
	loved?:string;
}

export interface getRecentTracks {
	meta:Metadata;
	tracks:RecentTrack[];
}

interface TopAlbum extends TagAlbum {
	playcount:string;
}

export interface getTopAlbums {
	albums:TopAlbum[];
	meta:Metadata;
}

interface ChartArtist extends TagArtist {
	playcount:string;
}

export interface TopArtist extends ChartArtist {
	streamable:string;
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
	playcount:string;
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
	from:string;
	to:string;
}

export interface getWeeklyChartList {
	charts:ChartEntry[];
}

interface ChartTrack {
	artist: {
		mbid:string;
		name:string;
	}
	rank:string;
	mbid:string;
	url:string;
	name:string;
	playcount:string;
}

export interface getWeeklyTrackChart {
	tracks:ChartTrack[];
	meta:ChartMetadata;
}