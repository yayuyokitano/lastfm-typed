import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";
import { toInt, toBool, toArray } from "../caster";

export default class UserClass extends Base {

	public async getFriends(usernameOrSessionKey:string, params?:{recenttracks?:0|1, limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getFriends", user: usernameOrSessionKey, ...params })).friends as any;

		res.user = toArray(res.user).map((e:any) => {

			e.registered.datetime = e.registered["#text"];
			e.registered["#text"] = void 0;
			e.registered.uts = toInt(e.registered.unixtime);
			e.registered.unixtime = void 0;
			e.image = toArray(e.image).map((f:any) => {
				f.url = f["#text"];
				f["#text"] = void 0;
				return f;
			});
			e.subscriber = toBool(e.subscriber);
			e.bootstrap = toInt(e.bootstrap);
			return e;

		});

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getFriends;

	}

	public async getInfo(usernameOrSessionKey:string) {

		let res = (await this.sendRequest({ method: "user.getInfo", user: usernameOrSessionKey })).user as any;

		res.registered = toInt(res.registered.unixtime);
		res.age = toInt(res.age);
		res.image = toArray(res.image).map((e:any) => {
			e.url = e["#text"];
			e["#text"] = void 0;
			return e;
		});

		res.playcount = toInt(res.playcount);
		res.subscriber = toBool(res.subscriber);
		res.bootstrap = toInt(res.bootstrap);

		return res as UserInterface.getInfo;

	}

	public async getLovedTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getLovedTracks", user: usernameOrSessionKey, ...params })).lovedtracks as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;
		res.tracks = toArray(res.track).map((e:any) => {

			e.date.datetime = e.date["#text"];
			e.date["#text"] = void 0;
			e.date.uts = toInt(e.date.uts);
			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			e.streamable["#text"] = void 0;
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
			return e;

		});

		res.track = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getLovedTracks;

	}

	public async getPersonalTags(usernameOrSessionKey:string, tag:string, taggingType:"artist"|"album"|"track", params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params })).taggings as any;

		if (res.hasOwnProperty("artists")) {
			res.artists = toArray(res.artists.artist).map((e:any) => {

				e.streamable = toBool(e.streamable);
				return e;

			});
		} else if (res.hasOwnProperty("albums")) {

			res.albums = toArray(res.albums.album).map((e:any) => {
				e.image = toArray(e.image).map((f:any) => {
					f.url = f["#text"];
					f["#text"] = void 0;
					return f;
				});
				return e;
			});

		} else if (res.hasOwnProperty("tracks")) {

			res.tracks = toArray(res.tracks.track).map((e:any) => {
				e.image = toArray(e.image).map((f:any) => {
					f.url = f["#text"];
					f["#text"] = void 0;
					return f;
				});
				
				e.streamable.isStreamable = toBool(e.streamable["#text"]);
				e.streamable["#text"] = void 0;
				return e;
			});

		}

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getPersonalTags;

	}

	public async getRecentTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:string}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getRecentTracks", user: usernameOrSessionKey, ...params })).recenttracks;

		res.meta = res["@attr"];
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

			e.image = toArray(e.image).map((f:any) => {
				f.url = f["#text"];
				f["#text"] = void 0;
				return f;
			});

			e.streamable = toBool(e.streamable);
			e.loved = toBool(e.loved);
			e.date.uts = toInt(e.date.uts);

			return e;

		});

		res.track = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getRecentTracks;
		
	}

	public async getTopAlbums(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopAlbums", user: usernameOrSessionKey, ...params })).topalbums as any;
	
		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.albums = toArray(res.album).map((e:any) => {

			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			e.image = toArray(e.image).map((f:any) => {
				f.url = f["#text"];
				f["#text"] = void 0;
				return f;
			});
			e.playcount = toInt(e.playcount);
			return e;
			
		});

		res.album = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getTopAlbums;

	}

	public async getTopArtists(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopArtists", user: usernameOrSessionKey, ...params })).topartists as any;
		
		res.meta = res["@attr"];

		res.artists = toArray(res.artist).map((e:any) => {
			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			e.streamable = toBool(e.streamable);
			e.playcount = toInt(e.playcount);
			return e;
		});

		res.artist = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getTopArtists;

	}

	public async getTopTags(usernameOrSessionKey:string, params?:{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopTags", user: usernameOrSessionKey, ...params })).toptags as any;

		res.tags = toArray(res.tag).map((e:any) => {
			e.count = toInt(e.count);
			return e;
		});
		res.tag = void 0;
		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getTopTags;

	}

	public async getTopTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopTracks", user: usernameOrSessionKey, ...params })).toptracks as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.tracks = toArray(res.track).map((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			e.streamable["#text"] = void 0;
			e.rank = e["@attr"].rank;
			e["@attr"] = void 0;
			e.streamable.isStreamable = toBool(e.streamable.isStreamable);
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
			e.duration = toInt(e.duration);
			e.rank = toInt(e.rank);
			e.playcount = toInt(e.playcount);
			return e;
		});

		res.track = void 0;

		res.meta.page = toInt(res.meta.page);
		res.meta.perPage = toInt(res.meta.perPage);
		res.meta.totalPages = toInt(res.meta.totalPages);
		res.meta.total = toInt(res.meta.total);

		return res as UserInterface.getTopTracks;
	}

	public async getWeeklyAlbumChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);
		
		let res = (await this.sendRequest({ method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params })).weeklyalbumchart;
		
		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.albums = toArray(res.album).map((e:any) => {
			e.artist.name = e.artist["#text"];
			e.artist["#text"] = void 0;
			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			e.playcount = toInt(e.playcount);
			return e;
		});

		res.album = void 0;
		res.meta.from = toInt(res.meta.from);
		res.meta.to = toInt(res.meta.to);

		return res as UserInterface.getWeeklyAlbumChart;

	}

	public async getWeeklyArtistChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params })).weeklyartistchart as any;
		
		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.artists = toArray(res.artist).map((e:any) => {
			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			e.playcount = toInt(e.playcount);
			return e;
		});

		res.artist = void 0;
		res.meta.from = toInt(res.meta.from);
		res.meta.to = toInt(res.meta.to);

		return res as UserInterface.getWeeklyArtistChart;
	}

	public async getWeeklyChartList() {

		let res = (await this.sendRequest({ method: "user.getWeeklyChartList"})).weeklychartlist as any;

		res.charts = toArray(res.chart).map((e:any) => {

			e.from = toInt(e.from);
			e.to = toInt(e.to);
			return e;

		});
		res.chart = void 0;

		return res as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params })).weeklytrackchart as any;

		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.tracks = toArray(res.track).map((e:any) => {
			e.artist.name = e.artist["#text"];
			e.artist["#text"] = void 0;
			e.rank = toInt(e["@attr"].rank);
			e["@attr"] = void 0;
			e.playcount = toInt(e.playcount);
			return e;
		});

		res.track = void 0;
		res.meta.from = toInt(res.meta.from);
		res.meta.to = toInt(res.meta.to);

		return res as UserInterface.getWeeklyTrackChart;

	}

}