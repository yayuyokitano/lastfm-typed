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
		"#text":string;
	}
	url:string;
	realname:string;
	bootstrap:string;
	type:string;
}

export interface getFriends {
	user:User[];
	"@attr":Metadata;
}

export interface getInfo extends User {
	age:string;
	gender:string;
	playcount:string;
}

export interface getLovedTracks {
	"@attr":Metadata;
	track: {
		artist:ArtistBasic;
		mbid:string;
		date: {
			uts:string;
			"#text":string;
		}
		url:string;
		name:string;
		streamable:{
			fulltrack:string;
			"#text":string;
		}
	}
}

interface PersonalTags extends Metadata {
	tag:string;
}

interface ArtistPersonalTags extends PersonalTags {
	artists: {
		artist:Artist[];
	}
}

interface AlbumPersonalTags extends PersonalTags {
	albums: {
		album:Album[];
	}
}

interface TrackPersonalTags extends PersonalTags {
	tracks: {
		track:TrackOptionalMBIDImg[];
	}
}

export type getPersonalTags = ArtistPersonalTags|AlbumPersonalTags|TrackPersonalTags;

interface ShortInfo {
	mbid:string;
	name:string;
}

interface RecentTrack {
	artist: ShortInfo&ArtistBasic;
	"@attr"?:{
		nowplaying?:string;
	}
	mbid:string;
	album:ShortInfo;
	streamable:string;
	url:string;
	name:string;
	image:Image[];
	loved?:string;
}

export interface getRecentTracks {
	"@attr":Metadata;
	track:RecentTrack[];
}

interface TopAlbum extends TagAlbum {
	playcount:string;
}

export interface getTopAlbums {
	album:TopAlbum[];
	"@attr":Metadata;
}

interface ChartArtist extends TagArtist {
	playcount:string;
}

export interface TopArtist extends ChartArtist {
	streamable:string;
}

export interface getTopArtists {
	artist:TopArtist[];
	"@attr":Metadata;
}

export interface getTopTags {
	tag:TagUrlCount[];
	"@attr": {
		user:string
	};
}

interface TopTrack extends TagTrack {
	playcount:string;
}

export interface getTopTracks {
	track:TopTrack[];
	"@attr":Metadata;
}

interface ChartMetadata {
	user:string;
	from:string;
	to:string;
}

interface ChartAlbum {
	artist:ShortInfo;
	"@attr": {
		rank:string;
	}
	mbid:string;
	playcount:string;
	name:string;
	url:string;
}

export interface getWeeklyAlbumChart {
	album:ChartAlbum[];
	"@attr":ChartMetadata;
}

export interface getWeeklyArtistChart {
	album:ChartArtist[];
	"@attr":ChartMetadata;
}

interface ChartEntry {
	from:string;
	to:string;
}

export interface getWeeklyChartList {
	chart:ChartEntry[];
}

interface ChartTrack {
	artist: {
		mbid:string;
		"#text":string;
	}
	"@attr": {
		rank:string;
	}
	mbid:string;
	url:string;
	name:string;
	playcount:string;
}

export interface getWeeklyTrackChart {
	album:ChartTrack[];
	"@attr":ChartMetadata;
}