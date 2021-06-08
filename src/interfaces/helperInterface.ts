import { Image, UserResolvable } from "./shared";
import * as UserInterface from "./userInterface";
import * as ArtistInterface from "./artistInterface";
import * as AlbumInterface from "./albumInterface";
import * as TrackInterface from "./trackInterface";

export interface getCombo {
	artist: {
			name: string;
			combo: number;
	};
	album: {
			name: string;
			combo: number;
	};
	track: {
			name: string;
			combo: number;
	};
	nowplaying: boolean;
	image: Image[];
}

export interface getComboInput extends UserResolvable {
	limit?:number;
}

export interface getNowPlaying {
	recent: {
		artist: string;
		album: string;
		track: string;
		image: Image[];
		url: string;
		username: string;
		nowplaying: boolean;
	};
	details: {
		recent:{
			data:UserInterface.getRecentTracks;
		}
		artist:{
			data?:ArtistInterface.getInfo;
			successful:boolean;
		}
		album:{
			data?:AlbumInterface.getInfo;
			successful:boolean;
		}
		track:{
			data?:TrackInterface.getInfo;
			successful:boolean;
		}
	};
}

export interface getNowPlayingInput extends UserResolvable {
	detailTypes?:("artist"|"album"|"track")[];
	extended?:true
}

interface matchingArtist {
	name: string;
	url: string;
	playcount: number[];
}

export type getMatchingArtists = matchingArtist[];

export interface getMatchingArtistsInput {
	user1:string;
	user2:string;
	limit:number;
	period:"overall"|"7day"|"1month"|"3month"|"6month"|"12month";
}

export interface cacheScrobblesInput extends UserResolvable {
	previouslyCached?:number;
	parallelCaches?:number;
	rateLimitTimeout?:number;
}