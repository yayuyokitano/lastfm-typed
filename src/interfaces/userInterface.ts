import { Album, Artist, ArtistBasic, Image, ShortMetadata, TagAlbum, TagArtist, TagTrack, TagUrlCount, TrackOptionalMBID, UserPaginatedInput, UserResolvable } from "./shared";

interface Metadata extends ShortMetadata {
	user:string;
}

interface TagMetadata extends ShortMetadata {
	tag:string;
}

interface User { //playcount and playlist seem to just not work.
	subscriber:boolean;
	name:string;
	country:string;
	image:Image[];
	url:string;
	realname:string;
	bootstrap:number;
	type:string;
}

interface UserDualTimestamp extends User {
	registered: {
		uts:number,
		datetime:string
	}
}

export interface getFriends {
	users:UserDualTimestamp[];
	meta:Metadata;
}

export interface getInfo extends User {
	age:number;
	gender:string;
	playcount:number;
	registered:number;
	artistCount:number;
	albumCount:number;
	trackCount:number;
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

export interface getPersonalTags {
	artists?:Artist[];
	albums?:Album[];
	tracks?:TrackOptionalMBID[];
	meta:TagMetadata;
}

interface ShortInfo {
	mbid:string;
	name:string;
}

interface getRecentArtist extends ShortInfo {
	url?:string;
}

interface RecentTrack {
	artist: getRecentArtist;
	nowplaying:boolean;
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
	from:number;
	to:number;
}

interface ChartAlbum {
	artist:ShortInfo;
	rank:number;
	mbid:string;
	playcount:number;
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

export interface getFriendsInput extends UserPaginatedInput {
	recenttracks?:boolean;
}

export interface getRecentTracksInput extends UserPaginatedInput {
	from?:string;
	to?:string;
	extended?:boolean;
}

export interface getPersonalTagsInput extends UserPaginatedInput {
	tag:string;
	taggingType:"artist"|"album"|"track";
}

export interface getTopEntriesInput extends UserPaginatedInput {
	period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month";
}

export interface getTopTagsInput extends UserResolvable {
	limit?:number;
}

interface topFromTo extends getTopTagsInput {
	from:string;
	to:string;
}

export type getWeeklyChartInput = getTopTagsInput | topFromTo;