import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";
import { toInt, toArray, convertMeta, convertEntry, convertEntryArray, convertGetRecentTracks, setDate, convertExtendedMeta, addConditionals, convertString } from "../caster";
import { UserPaginatedInput, UserResolvable } from "../interfaces/shared";

export default class UserClass extends Base {

	public async getFriends(username:string, params?:{sk?:string, recenttracks?:boolean, limit?:number, page?:number}):Promise<UserInterface.getFriends>;
	public async getFriends(input:UserInterface.getFriendsInput):Promise<UserInterface.getFriends>;
	public async getFriends(firstInput:any, params?:{sk?:string, recenttracks?:boolean, limit?:number, page?:number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getFriends", ...firstInput, ...params })).friends as any;

		res.users = toArray(res.user).map((e:any) => {

			e = setDate(e, "registered");
			e = convertEntry(e);
			return e;

		});
		delete res.user;

		res.meta = convertMeta(res["@attr"]);
		delete res["@attr"];

		return res as UserInterface.getFriends;

	}

	public async getInfo(username:string, params?:{sk?:string}):Promise<UserInterface.getInfo>;
	public async getInfo(input:UserResolvable):Promise<UserInterface.getInfo>;
	public async getInfo(firstInput:any, params?:{sk?:string}) {

		firstInput = convertString(firstInput, "user", {});

		let res = (await this.sendRequest({ method: "user.getInfo", ...firstInput , ...params})).user as any;

		res.registered = toInt(res.registered.unixtime);
		res = convertEntry(res);

		return res as UserInterface.getInfo;

	}

	public async getLovedTracks(username:string, params?:{sk?:string, limit?:number, page?:number}):Promise<UserInterface.getLovedTracks>;
	public async getLovedTracks(input:UserPaginatedInput):Promise<UserInterface.getLovedTracks>;
	public async getLovedTracks(firstInput:any, params?:{sk?:string, limit?:number, page?:number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getLovedTracks", ...firstInput, ...params })).lovedtracks as any;

		res.meta = convertMeta(res["@attr"]);
		delete res["@attr"];
		res.tracks = toArray(res.track).map((e:any) => {

			e = setDate(e, "date");
			e = convertEntry(e);
			return e;

		});

		delete res.track;

		return res as UserInterface.getLovedTracks;

	}

	public async getPersonalTags(username:string, tag:string, taggingType:"artist"|"album"|"track", params?:{sk?:string, limit?:number, page?:number}):Promise<UserInterface.getPersonalTags>;
	public async getPersonalTags(input:UserInterface.getPersonalTagsInput):Promise<UserInterface.getPersonalTags>;
	public async getPersonalTags(firstInput:any, tag?:string, taggingType?:"artist"|"album"|"track", params?:{sk?:string, limit?:number, page?:number}) {

		this.checkLimit(params?.limit ?? firstInput?.limit, 1000);

		firstInput = convertString(firstInput, "user", {tag, taggingType});

		let res = (await this.sendRequest({ method: "user.getPersonalTags", ...firstInput, ...params })).taggings as any;

		if (res.hasOwnProperty("artists")) {

			res.artists = convertEntryArray(res.artists.artist);

		} else if (res.hasOwnProperty("albums")) {

			res.albums = convertEntryArray(res.albums.album);

		} else if (res.hasOwnProperty("tracks")) {

			res.tracks = convertEntryArray(res.tracks.track);

		}

		res.meta = convertMeta(res["@attr"]);
		delete res["@attr"];

		return res as UserInterface.getPersonalTags;

	}

	public async getRecentTracks(username:string, params?:{sk?:string, limit?:number, page?:number, from?:string, to?:string, extended?:boolean}):Promise<UserInterface.getRecentTracks>;
	public async getRecentTracks(input:UserInterface.getRecentTracksInput):Promise<UserInterface.getRecentTracks>;
	public async getRecentTracks(firstInput:any, params?:{sk?:string, limit?:number, page?:number, from?:string, to?:string, extended?:boolean|number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		if (params?.hasOwnProperty("extended")) {
			params.extended = toInt(params.extended) ?? 0;
		} else if (firstInput?.hasOwnProperty("extended")) {
			firstInput.extended = toInt(firstInput.extended);
		}

		let res = (await this.sendRequest({ method: "user.getRecentTracks", ...firstInput, ...params })).recenttracks;

		res.meta = convertMeta(res["@attr"]);
		delete res["@attr"];
		res.tracks = convertGetRecentTracks(res.track);
		delete res.track;

		return res as UserInterface.getRecentTracks;
		
	}

	public async getTopAlbums(username:string, params?:{sk?:string, limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}):Promise<UserInterface.getTopAlbums>;
	public async getTopAlbums(input:UserInterface.getTopEntriesInput):Promise<UserInterface.getTopAlbums>;
	public async getTopAlbums(firstInput:any, params?:{sk?:string, limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getTopAlbums", ...firstInput, ...params })).topalbums as any;

		return convertExtendedMeta(res, "album") as UserInterface.getTopAlbums;

	}

	public async getTopArtists(username:string, params?:{sk?:string, limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}):Promise<UserInterface.getTopArtists>;
	public async getTopArtists(input:UserInterface.getTopEntriesInput):Promise<UserInterface.getTopArtists>;
	public async getTopArtists(firstInput:any, params?:{sk?:string, limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getTopArtists", ...firstInput, ...params })).topartists as any;

		return convertExtendedMeta(res, "artist") as UserInterface.getTopArtists;

	}

	public async getTopTags(username:string, params?:{sk?:string, limit?:number}):Promise<UserInterface.getTopTags>;
	public async getTopTags(input:UserInterface.getTopTagsInput):Promise<UserInterface.getTopTags>;
	public async getTopTags(firstInput:any, params?:{sk?:string, limit?:number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getTopTags", ...firstInput, ...params })).toptags as any;

		return convertExtendedMeta(res, "tag") as UserInterface.getTopTags;

	}

	public async getTopTracks(username:string, params?:{sk?:string, limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}):Promise<UserInterface.getTopTracks>;
	public async getTopTracks(input:UserInterface.getTopEntriesInput):Promise<UserInterface.getTopTracks>;
	public async getTopTracks(firstInput:any, params?:{sk?:string, limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getTopTracks", ...firstInput, ...params })).toptracks as any;

		return convertExtendedMeta(res, "track") as UserInterface.getTopTracks;
	}

	public async getWeeklyAlbumChart(username:string, params?:{sk?:string, limit?:number, from:string, to:string}|{limit?:number}):Promise<UserInterface.getWeeklyAlbumChart>;
	public async getWeeklyAlbumChart(input:UserInterface.getWeeklyChartInput):Promise<UserInterface.getWeeklyAlbumChart>;
	public async getWeeklyAlbumChart(firstInput:any, params?:{sk?:string, limit?:number, from:string, to:string}|{limit?:number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);
		
		let res = (await this.sendRequest({ method: "user.getWeeklyAlbumChart", ...firstInput, ...params })).weeklyalbumchart;
		
		res.meta = convertMeta(res["@attr"]);
		delete res["@attr"];

		res.albums = toArray(res.album).map((e:any) => {
			e.artist.name = e.artist["#text"];
			delete e.artist["#text"];
			e = convertEntry(e);
			return e;
		});

		delete res.album;

		return res as UserInterface.getWeeklyAlbumChart;

	}

	public async getWeeklyArtistChart(username:string, params?:{sk?:string, limit?:number, from:string, to:string}|{limit?:number}):Promise<UserInterface.getWeeklyArtistChart>;
	public async getWeeklyArtistChart(input:UserInterface.getWeeklyChartInput):Promise<UserInterface.getWeeklyArtistChart>;
	public async getWeeklyArtistChart(firstInput:any, params?:{sk?:string, limit?:number, from:string, to:string}|{limit?:number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getWeeklyArtistChart", ...firstInput, ...params })).weeklyartistchart as any;

		return convertExtendedMeta(res, "artist") as UserInterface.getWeeklyArtistChart;
	}

	public async getWeeklyChartList():Promise<UserInterface.getWeeklyChartList>;
	public async getWeeklyChartList(input?:{}):Promise<UserInterface.getWeeklyChartList>;
	public async getWeeklyChartList(input?:{}) {

		let res = (await this.sendRequest({ method: "user.getWeeklyChartList"})).weeklychartlist as any;

		res.charts = toArray(res.chart).map(convertMeta);
		delete res.chart;

		return res as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(username:string, params?:{sk?:string, limit?:number, from:string, to:string}|{limit?:number}):Promise<UserInterface.getWeeklyTrackChart>;
	public async getWeeklyTrackChart(input:UserInterface.getWeeklyChartInput):Promise<UserInterface.getWeeklyTrackChart>;
	public async getWeeklyTrackChart(firstInput:any, params?:{sk?:string, limit?:number, from:string, to:string}|{limit?:number}) {

		firstInput = this.checkLimitAndConvertString(firstInput, params);

		let res = (await this.sendRequest({ method: "user.getWeeklyTrackChart", ...firstInput, ...params })).weeklytrackchart as any;

		res.meta = convertMeta(res["@attr"]);
		delete res["@attr"];

		res.tracks = toArray(res.track).map((e:any) => {
			e.artist.name = e.artist["#text"];
			delete e.artist["#text"];
			e = convertEntry(e);
			return e;
		});

		delete res.track;

		return res as UserInterface.getWeeklyTrackChart;

	}

	private checkLimitAndConvertString(firstInput:any, params:any) {

		this.checkLimit(params?.limit ?? firstInput?.limit, 1000);
		return convertString(firstInput, "user", {});

	}

}