import LFMRequest from "../request";
import * as UserInterface from "../interfaces/userInterface";
import Base from "../base";

export default class UserClass extends Base {

	public async getFriends(usernameOrSessionKey:string, params?:{recenttracks?:0|1, limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getFriends", sk: usernameOrSessionKey, ...params }).execute()).friends as UserInterface.getFriends;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getFriends", user: usernameOrSessionKey, ...params }).execute()).friends as UserInterface.getFriends;

		}

	}

	public async getInfo(usernameOrSessionKey:string) {

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getInfo", sk: usernameOrSessionKey }).execute()).user as UserInterface.getInfo;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getInfo", user: usernameOrSessionKey }).execute()).user as UserInterface.getInfo;

		}

	}

	public async getLovedTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getLovedTracks", sk: usernameOrSessionKey, ...params }).execute()).lovedtracks as UserInterface.getLovedTracks;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getLovedTracks", user: usernameOrSessionKey, ...params }).execute()).lovedtracks as UserInterface.getLovedTracks;

		}

	}

	public async getPersonalTags(usernameOrSessionKey:string, tag:string, taggingType:"artist"|"album"|"track", params?:{limit?:number, page?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getPersonalTags", tag, taggingType, sk: usernameOrSessionKey, ...params }).execute()).taggings as UserInterface.getPersonalTags;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getPersonalTags", tag, taggingType, user: usernameOrSessionKey, ...params }).execute()).taggings as UserInterface.getPersonalTags;

		}

	}

	public async getRecentTracks(usernameOrSessionKey:string, params?:{limit?:number, page?:number, from?:string, to?:string, extended?:string}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getRecentTracks", sk: usernameOrSessionKey, ...params }).execute()).recenttracks as UserInterface.getRecentTracks;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getRecentTracks", user: usernameOrSessionKey, ...params }).execute()).recenttracks as UserInterface.getRecentTracks;

		}

	}

	public async getTopAlbums(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getTopAlbums", sk: usernameOrSessionKey, ...params }).execute()).topalbums as UserInterface.getTopAlbums;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getTopAlbums", user: usernameOrSessionKey, ...params }).execute()).topalbums as UserInterface.getTopAlbums;

		}

	}

	public async getTopArtists(usernameOrSessionKey:string, params?:{limit?:number, page?:number, period?:"overall"|"7day"|"1month"|"3month"|"6month"|"12month"}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getTopArtists", sk: usernameOrSessionKey, ...params }).execute()).topartists as UserInterface.getTopArtists;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getTopArtists", user: usernameOrSessionKey, ...params }).execute()).topartists as UserInterface.getTopArtists;

		}

	}

	public async getTopTags(usernameOrSessionKey:string, params?:{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getTopTags", sk: usernameOrSessionKey, ...params }).execute()).toptags as UserInterface.getTopTags;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getTopTags", user: usernameOrSessionKey, ...params }).execute()).toptags as UserInterface.getTopTags;

		}

	}

	public async getWeeklyAlbumChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyAlbumChart", sk: usernameOrSessionKey, ...params }).execute()).weeklyalbumchart as UserInterface.getWeeklyAlbumChart;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyAlbumChart", user: usernameOrSessionKey, ...params }).execute()).weeklyalbumchart as UserInterface.getWeeklyAlbumChart;

		}

	}

	public async getWeeklyArtistChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyArtistChart", sk: usernameOrSessionKey, ...params }).execute()).weeklyartistchart as UserInterface.getWeeklyArtistChart;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyArtistChart", user: usernameOrSessionKey, ...params }).execute()).weeklyartistchart as UserInterface.getWeeklyArtistChart;

		}

	}

	public async getWeeklyChartList() {

		return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyChartList"}).execute()).weeklychartlist as UserInterface.getWeeklyChartList;

	}

	public async getWeeklyTrackChart(usernameOrSessionKey:string, params?:{limit?:number, from:string, to:string}|{limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		if (this.isSessionKey(usernameOrSessionKey)) {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyTrackChart", sk: usernameOrSessionKey, ...params }).execute()).weeklytrackchart as UserInterface.getWeeklyTrackChart;

		} else {

			return (await new LFMRequest(this.key, this.secret, { method: "user.getWeeklyTrackChart", user: usernameOrSessionKey, ...params }).execute()).weeklytrackchart as UserInterface.getWeeklyTrackChart;

		}

	}

}