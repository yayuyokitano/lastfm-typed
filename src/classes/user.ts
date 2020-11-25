import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";

export default class UserClass extends Base {

	public async getFriends(usernameOrSessionKey:string, params?:{recenttracks?:0|1, limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getFriends", user: usernameOrSessionKey, ...params })).friends as UserInterface.getFriends;

	}

	public async getInfo(usernameOrSessionKey:string) {

		return (await this.sendRequest(this.key, this.secret, { method: "user.getInfo", user: usernameOrSessionKey })).user as UserInterface.getInfo;

	}

	public async getLovedTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getLovedTracks", user: usernameOrSessionKey, ...params })).lovedtracks as UserInterface.getLovedTracks;

	}

	public async getPersonalTags(usernameOrSessionKey:string, tag:string, taggingType:"artist"|"album"|"track", params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params })).taggings as UserInterface.getPersonalTags;

	}

	public async getRecentTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:string}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest(this.key, this.secret, { method: "user.getRecentTracks", user: usernameOrSessionKey, ...params })).recenttracks;

		for (let i = 0; i < res.track.length; i++) {
			res.track[i].artist.name ||= res.track[i].artist["#text"];
			delete res.track[i].artist["#text"];
			res.track[i].album.name ||= res.track[i].album["#text"];
			delete res.track[i].album["#text"];
		}

		return res as UserInterface.getRecentTracks;
		
	}

	public async getTopAlbums(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getTopAlbums", user: usernameOrSessionKey, ...params })).topalbums as UserInterface.getTopAlbums;

	}

	public async getTopArtists(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getTopArtists", user: usernameOrSessionKey, ...params })).topartists as UserInterface.getTopArtists;

	}

	public async getTopTags(usernameOrSessionKey:string, params?:{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getTopTags", user: usernameOrSessionKey, ...params })).toptags as UserInterface.getTopTags;

	}

	public async getWeeklyAlbumChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);
		
		let res = (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params })).weeklyalbumchart;
		res.artist.name = res.artist["#text"];
		delete res.artist["#text"];

		return res as UserInterface.getWeeklyAlbumChart;

	}

	public async getWeeklyArtistChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params })).weeklyartistchart as UserInterface.getWeeklyArtistChart;

	}

	public async getWeeklyChartList() {

		return (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyChartList"})).weeklychartlist as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await this.sendRequest(this.key, this.secret, { method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params })).weeklytrackchart as UserInterface.getWeeklyTrackChart;

	}

}