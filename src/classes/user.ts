import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";
import { toInt, toBool, toArray, convertMeta, convertImageArray, convertEntry, convertEntryArray } from "../caster";

export default class UserClass extends Base {

	public async getFriends(usernameOrSessionKey:string, params?:{recenttracks?:0|1, limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getFriends", user: usernameOrSessionKey, ...params })).friends as any;

		res.user = toArray(res.user).map((e:any) => {

			e.registered.datetime = e.registered["#text"];
			e.registered["#text"] = void 0;
			e.registered.uts = toInt(e.registered.unixtime);
			e.registered.unixtime = void 0;
			e = convertEntry(e);
			return e;

		});

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as UserInterface.getFriends;

	}

	public async getInfo(usernameOrSessionKey:string) {

		let res = (await this.sendRequest({ method: "user.getInfo", user: usernameOrSessionKey })).user as any;

		res.registered = toInt(res.registered.unixtime);
		res = convertEntry(res);

		return res as UserInterface.getInfo;

	}

	public async getLovedTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getLovedTracks", user: usernameOrSessionKey, ...params })).lovedtracks as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;
		res.tracks = toArray(res.track).map((e:any) => {

			e.date.datetime = e.date["#text"];
			e.date["#text"] = void 0;
			e.date.uts = toInt(e.date.uts);
			e = convertEntry(e);
			return e;

		});

		res.track = void 0;

		return res as UserInterface.getLovedTracks;

	}

	public async getPersonalTags(usernameOrSessionKey:string, tag:string, taggingType:"artist"|"album"|"track", params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params })).taggings as any;

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

	public async getRecentTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:string}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getRecentTracks", user: usernameOrSessionKey, ...params })).recenttracks;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.tracks = toArray(res.track).map((e:any) => {
			if (!e.artist.hasOwnProperty("name")) {
				e.artist.name = e.artist["#text"];
				e.artist["#text"] = void 0;
			}

			if (e.hasOwnProperty("album")) {
				e.album.name ||= e.album["#text"];
				e.album["#text"] = void 0;
			}
			
			if (e.hasOwnProperty("date")) {
				e.date.datetime = e.date["#text"];
				e.date["#text"] = void 0;
			}

			if (e?.["@attr"]?.hasOwnProperty("nowplaying")) {
				e.nowplaying = e["@attr"].nowplaying;
				e["@attr"] = void 0;
			}

			e = convertEntry(e);
			e.date.uts = toInt(e.date.uts);

			return e;

		});

		res.track = void 0;

		return res as UserInterface.getRecentTracks;
		
	}

	public async getTopAlbums(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopAlbums", user: usernameOrSessionKey, ...params })).topalbums as any;
	
		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.albums = convertEntryArray(res.album);
		res.album = void 0;

		return res as UserInterface.getTopAlbums;

	}

	public async getTopArtists(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopArtists", user: usernameOrSessionKey, ...params })).topartists as any;
		
		res.meta = convertMeta(res["@attr"]);
		res.artists = convertEntryArray(res.artist);
		res.artist = void 0;

		return res as UserInterface.getTopArtists;

	}

	public async getTopTags(usernameOrSessionKey:string, params?:{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopTags", user: usernameOrSessionKey, ...params })).toptags as any;

		res.tags = convertEntryArray(res.tag);
		res.tag = void 0;
		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		return res as UserInterface.getTopTags;

	}

	public async getTopTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopTracks", user: usernameOrSessionKey, ...params })).toptracks as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.tracks = convertEntryArray(res.track);
		res.track = void 0;

		return res as UserInterface.getTopTracks;
	}

	public async getWeeklyAlbumChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);
		
		let res = (await this.sendRequest({ method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params })).weeklyalbumchart;
		
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

	public async getWeeklyArtistChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params })).weeklyartistchart as any;
		
		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.artists = convertEntryArray(res.artist);
		res.artist = void 0;

		return res as UserInterface.getWeeklyArtistChart;
	}

	public async getWeeklyChartList() {

		let res = (await this.sendRequest({ method: "user.getWeeklyChartList"})).weeklychartlist as any;

		res.charts = toArray(res.chart).map(convertMeta);
		res.chart = void 0;

		return res as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params })).weeklytrackchart as any;

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