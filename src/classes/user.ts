import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";
import { toInt, toArray, convertMeta, convertEntry, convertEntryArray, convertGetRecentTracks, setDate, convertExtendedMeta, addConditionals, convertString } from "../caster";
import { UserPaginatedInput, UserResolvable } from "../interfaces/shared";

export default class UserClass extends Base {

	public async getFriends(usernameOrSessionKey:string, params?:{recenttracks?:boolean, limit?:number, page?:number}):Promise<UserInterface.getFriends>;
	public async getFriends(input:UserInterface.getFriendsInput):Promise<UserInterface.getFriends>;
	public async getFriends(usernameOrSessionKey:any, params?:{recenttracks?:boolean, limit?:number, page?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getFriends", ...usernameOrSessionKey, ...params })).friends as any;

		res.user = toArray(res.user).map((e:any) => {

			e = setDate(e, "registered");
			e = convertEntry(e);
			return e;

		});

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as UserInterface.getFriends;

	}

	public async getInfo(usernameOrSessionKey:string):Promise<UserInterface.getInfo>;
	public async getInfo(input:UserResolvable):Promise<UserInterface.getInfo>;
	public async getInfo(usernameOrSessionKey:any) {

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getInfo", ...usernameOrSessionKey })).user as any;

		res.registered = toInt(res.registered.unixtime);
		res = convertEntry(res);

		return res as UserInterface.getInfo;

	}

	public async getLovedTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number}):Promise<UserInterface.getLovedTracks>;
	public async getLovedTracks(input:UserPaginatedInput):Promise<UserInterface.getLovedTracks>;
	public async getLovedTracks(usernameOrSessionKey:any, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getLovedTracks", ...usernameOrSessionKey, ...params })).lovedtracks as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.tracks = toArray(res.track).map((e:any) => {

			e = setDate(e, "date");
			e = convertEntry(e);
			return e;

		});

		res.track = void 0;

		return res as UserInterface.getLovedTracks;

	}

	public async getPersonalTags(usernameOrSessionKey:string, tag:string, taggingType:"artist"|"album"|"track", params?:{limit?:number, page?:number}):Promise<UserInterface.getPersonalTags>;
	public async getPersonalTags(input:UserInterface.getPersonalTagsInput):Promise<UserInterface.getPersonalTags>;
	public async getPersonalTags(usernameOrSessionKey:any, tag?:string, taggingType?:"artist"|"album"|"track", params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {tag, taggingType});

		let res = (await this.sendRequest({ method: "user.getPersonalTags", ...usernameOrSessionKey, ...params })).taggings as any;

		if (res.hasOwnProperty("artists")) {

			res.artists = convertEntryArray(res.artists.artist);

		} else if (res.hasOwnProperty("albums")) {

			res.albums = convertEntryArray(res.albums.album);

		} else if (res.hasOwnProperty("tracks")) {

			res.tracks = convertEntryArray(res.tracks.track);

		}

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as UserInterface.getPersonalTags;

	}

	public async getRecentTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:boolean}):Promise<UserInterface.getRecentTracks>;
	public async getRecentTracks(usernameOrSessionKey:UserInterface.getRecentTracksInput):Promise<UserInterface.getRecentTracks>;
	public async getRecentTracks(firstInput:any, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:boolean|number}) {

		this.checkLimit(params?.limit ?? firstInput?.limit, 1000);

		firstInput = convertString(firstInput, "user", {});

		if (params?.hasOwnProperty("extended")) {
			params.extended = toInt(params.extended);
		} else if (firstInput?.hasOwnProperty("extended")) {
			firstInput.extended = toInt(firstInput.extended);
		}

		let res = (await this.sendRequest({ method: "user.getRecentTracks", ...firstInput, ...params })).recenttracks;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.tracks = convertGetRecentTracks(res.track);
		res.track = void 0;

		return res as UserInterface.getRecentTracks;
		
	}

	public async getTopAlbums(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}):Promise<UserInterface.getTopAlbums>;
	public async getTopAlbums(input:UserInterface.getTopEntriesInput):Promise<UserInterface.getTopAlbums>;
	public async getTopAlbums(usernameOrSessionKey:any, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getTopAlbums", ...usernameOrSessionKey, ...params })).topalbums as any;

		return convertExtendedMeta(res, "album") as UserInterface.getTopAlbums;

	}

	public async getTopArtists(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}):Promise<UserInterface.getTopArtists>;
	public async getTopArtists(input:UserInterface.getTopEntriesInput):Promise<UserInterface.getTopArtists>;
	public async getTopArtists(usernameOrSessionKey:any, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getTopArtists", ...usernameOrSessionKey, ...params })).topartists as any;

		return convertExtendedMeta(res, "artist") as UserInterface.getTopArtists;

	}

	public async getTopTags(usernameOrSessionKey:string, params?:{limit?:number}):Promise<UserInterface.getTopTags>;
	public async getTopTags(input:UserInterface.getTopTagsInput):Promise<UserInterface.getTopTags>;
	public async getTopTags(usernameOrSessionKey:any, params?:{limit?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getTopTags", ...usernameOrSessionKey, ...params })).toptags as any;

		return convertExtendedMeta(res, "tag") as UserInterface.getTopTags;

	}

	public async getTopTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}):Promise<UserInterface.getTopTracks>;
	public async getTopTracks(input:UserInterface.getTopEntriesInput):Promise<UserInterface.getTopTracks>;
	public async getTopTracks(usernameOrSessionKey:any, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getTopTracks", ...usernameOrSessionKey, ...params })).toptracks as any;

		return convertExtendedMeta(res, "track") as UserInterface.getTopTracks;
	}

	public async getWeeklyAlbumChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}):Promise<UserInterface.getWeeklyAlbumChart>;
	public async getWeeklyAlbumChart(input:UserInterface.getWeeklyChartInput):Promise<UserInterface.getWeeklyAlbumChart>;
	public async getWeeklyAlbumChart(usernameOrSessionKey:any, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});
		
		let res = (await this.sendRequest({ method: "user.getWeeklyAlbumChart", ...usernameOrSessionKey, ...params })).weeklyalbumchart;
		
		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.albums = toArray(res.album).map((e:any) => {
			e.artist.name = e.artist["#text"];
			e.artist["#text"] = void 0;
			e = convertEntry(e);
			return e;
		});

		res.album = void 0;

		return res as UserInterface.getWeeklyAlbumChart;

	}

	public async getWeeklyArtistChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}):Promise<UserInterface.getWeeklyArtistChart>;
	public async getWeeklyArtistChart(input:UserInterface.getWeeklyChartInput):Promise<UserInterface.getWeeklyArtistChart>;
	public async getWeeklyArtistChart(usernameOrSessionKey:any, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getWeeklyArtistChart", ...usernameOrSessionKey, ...params })).weeklyartistchart as any;

		return convertExtendedMeta(res, "artist") as UserInterface.getWeeklyArtistChart;
	}

	public async getWeeklyChartList():Promise<UserInterface.getWeeklyChartList>;
	public async getWeeklyChartList(input?:{}):Promise<UserInterface.getWeeklyChartList>;
	public async getWeeklyChartList(input?:{}) {

		let res = (await this.sendRequest({ method: "user.getWeeklyChartList"})).weeklychartlist as any;

		res.charts = toArray(res.chart).map(convertMeta);
		res.chart = void 0;

		return res as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}):Promise<UserInterface.getWeeklyTrackChart>;
	public async getWeeklyTrackChart(input:UserInterface.getWeeklyChartInput):Promise<UserInterface.getWeeklyTrackChart>;
	public async getWeeklyTrackChart(usernameOrSessionKey:any, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit ?? usernameOrSessionKey?.limit, 1000);

		usernameOrSessionKey = convertString(usernameOrSessionKey, "user", {});

		let res = (await this.sendRequest({ method: "user.getWeeklyTrackChart", ...usernameOrSessionKey, ...params })).weeklytrackchart as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.tracks = toArray(res.track).map((e:any) => {
			e.artist.name = e.artist["#text"];
			e.artist["#text"] = void 0;
			e = convertEntry(e);
			return e;
		});

		res.track = void 0;

		return res as UserInterface.getWeeklyTrackChart;

	}

}