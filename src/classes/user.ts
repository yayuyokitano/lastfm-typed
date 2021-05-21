import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";
import { toInt, toBool, toArray } from "../caster";

export default class UserClass extends Base {

	public async getFriends(usernameOrSessionKey:string, params?:{recenttracks?:0|1, limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getFriends", user: usernameOrSessionKey, ...params })).friends as any;

		res.user.forEach((e:any) => {
			e.registered.datetime = e.registered["#text"];
			delete e.registered["#text"];
			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			});
		});

		res.meta = res["@attr"];
		delete res["@attr"];

		return res as UserInterface.getFriends;

	}

	public async getInfo(usernameOrSessionKey:string) {

		let res = (await this.sendRequest({ method: "user.getInfo", user: usernameOrSessionKey })).user as any;

		res.registered.datetime = res.registered["#text"];
		delete res.registered["#text"];
		res.image.forEach((e:any) => {
			e.url = e["#text"];
			delete e["#text"];
		});

		return res as UserInterface.getInfo;

	}

	public async getLovedTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getLovedTracks", user: usernameOrSessionKey, ...params })).lovedtracks as any;

		res.meta = res["@attr"];
		delete res["@attr"];
		res.tracks = res.track;
		delete res.track;

		res.tracks.forEach((e:any) => {
			e.date.datetime = e.date["#text"];
			delete e.date["#text"];
			e.streamable.isStreamable = e.streamable["#text"];
			delete e.streamable["#text"];
		});

		return res as UserInterface.getLovedTracks;

	}

	public async getPersonalTags(usernameOrSessionKey:string, tag:string, taggingType:"artist"|"album"|"track", params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params })).taggings as any;

		if (res.hasOwnProperty("artists")) {
			res.artists = res.artists.artist;
		} else if (res.hasOwnProperty("albums")) {
			res.albums = res.albums.album;

			res.albums.forEach((e:any) => {
				e.image.forEach((f:any) => {
					f.url = f["#text"];
					delete f["#text"];
				});
			});

		} else if (res.hasOwnProperty("tracks")) {
			res.tracks = res.tracks.track;

			res.tracks.forEach((e:any) => {
				e.image.forEach((f:any) => {
					f.url = f["#text"];
					delete f["#text"];
				});
				
				e.streamable.isStreamable = e.streamable["#text"];
				delete e.streamable["#text"];
			});
		}

		return res as UserInterface.getPersonalTags;

	}

	public async getRecentTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:string}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getRecentTracks", user: usernameOrSessionKey, ...params })).recenttracks;

		res.meta = res["@attr"];
		delete res["@attr"];

		res.tracks = res.track;
		delete res.track;

		res.tracks.forEach((e:any) => {
			if (!e.artist.hasOwnProperty("name")) {
				e.artist.name = e.artist["#text"];
				delete e.artist["#text"];
			}

			if (e.hasOwnProperty("album")) {
				e.album.name ||= e.album["#text"];
				delete e.album["#text"];
			}
			
			if (e.hasOwnProperty("date")) {
				e.date.datetime = e.date["#text"];
				delete e.date["#text"];
			}

			if (e?.["@attr"]?.hasOwnProperty("nowplaying")) {
				e.nowplaying = e["@attr"].nowplaying;
				delete e["@attr"];
			}

			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			});

		});

		return res as UserInterface.getRecentTracks;
		
	}

	public async getTopAlbums(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopAlbums", user: usernameOrSessionKey, ...params })).topalbums as any;
	
		res.meta = res["@attr"];
		delete res["@attr"];
		res.albums = res.album;
		delete res.album;

		res.albums.forEach((e:any) => {
			e.rank = e["@attr"].rank;
			delete e["@attr"];
			e.image.forEach((f:any) => {
				f.url = f["#text"];
				delete f["#text"];
			});
		});

		return res as UserInterface.getTopAlbums;

	}

	public async getTopArtists(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopArtists", user: usernameOrSessionKey, ...params })).topartists as any;
		
		res.artists = res.artist;
		delete res.artist;
		res.meta = res["@attr"];

		res.artists.forEach((e:any) => {
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		});

		return res as UserInterface.getTopArtists;

	}

	public async getTopTags(usernameOrSessionKey:string, params?:{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopTags", user: usernameOrSessionKey, ...params })).toptags as any;

		res.tags = res.tag;
		delete res.tag;
		res.meta = res["@attr"];
		delete res["@attr"];

		return res as UserInterface.getTopTags;

	}

	public async getTopTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getTopTracks", user: usernameOrSessionKey, ...params })).toptracks as any;

		res.tracks = toArray(res.track);
		res.track = void 0;
		res.meta = res["@attr"];
		res["@attr"] = void 0;

		res.tracks.map((e:any) => {
			e.streamable.isStreamable = e.streamable["#text"];
			e.streamable["#text"] = void 0;
			e.rank = e["@attr"].rank;
			e["@attr"] = void 0;
			e.streamable.isStreamable = toBool(e.streamable.isStreamable);
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
			e.duration = toInt(e.duration);
			e.rank = toInt(e.rank);
			return e;
		});

		return res as UserInterface.getTopTracks;
	}

	public async getWeeklyAlbumChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);
		
		let res = (await this.sendRequest({ method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params })).weeklyalbumchart;
		
		res.albums = res.album;
		delete res.album;
		res.meta = res["@attr"];
		delete res["@attr"];

		res.albums.forEach((e:any) => {
			e.artist.name = e.artist["#text"];
			delete e.artist["#text"];
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		});

		return res as UserInterface.getWeeklyAlbumChart;

	}

	public async getWeeklyArtistChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params })).weeklyartistchart as any;

		res.artists = res.artist;
		delete res.artist;
		res.meta = res["@attr"];
		delete res["@attr"];

		res.artists.forEach((e:any) => {
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		});

		return res as UserInterface.getWeeklyArtistChart;
	}

	public async getWeeklyChartList() {

		let res = (await this.sendRequest({ method: "user.getWeeklyChartList"})).weeklychartlist as any;

		res.charts = res.chart;
		delete res.chart;

		return res as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params })).weeklytrackchart as any;

		res.tracks = res.track;
		delete res.track;
		res.meta = res["@attr"];
		delete res["@attr"];

		res.tracks.forEach((e:any) => {
			e.artist.name = e.artist["#text"];
			delete e.artist["#text"];
			e.rank = e["@attr"].rank;
			delete e["@attr"];
		});

		return res as UserInterface.getWeeklyTrackChart;

	}

}