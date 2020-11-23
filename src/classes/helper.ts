import LastFM from "..";
import { Image } from "../interfaces/shared";

export default class HelperClass {

	lastfm:LastFM;

	constructor(lastfm:LastFM) {
		this.lastfm = lastfm;
	}

	async getCombo(usernameOrSessionKey:string, limit:number) {
		let combo = [true, true, true];
		let comboData:[string,number][] = [["",0],["",0],["",0]];
		let page = 0;
		let nowplaying = false;
		let trueLimit = 1000;
		let image:Image[] = [];
		while (limit > 0 && combo[0] === combo[1] && combo[1] === combo[2] && combo[2] === true) {

			if (limit < 1000 && page > 0) {

				trueLimit = limit;
				limit = 1000;

			} else if (page === 0 && limit <= 1000) {

				trueLimit = limit

			}

			page++;

			let res = await this.lastfm.user.getRecentTracks(usernameOrSessionKey, {limit: Math.min(1000, limit), page});

			if (page === 1) {
				comboData[0][0] = res.track[0].artist.name;
				comboData[1][0] = res.track[0].album.name;
				comboData[2][0] = res.track[0].name;
				image = res.track[0].image;

				if (comboData[1][0] === "") {
					combo[1] = false;
				}
			}

			if (res.track[0]["@attr"]?.nowplaying) {
				nowplaying = true;
				res.track = res.track.slice(1);
			}

			for (let i = 0; i < trueLimit; i++) {
				if (!combo[0] && !combo[1] && !combo[2]) {
					break;
				}

				if (combo[0]) {
					if (comboData[0][0] === res.track[i].artist.name) {
						comboData[0][1]++;
					} else {
						combo[0] = false;
					}
				}

				if (combo[1]) {
					if (comboData[1][0] === res.track[i].album.name) {
						comboData[1][1]++;
					} else {
						combo[1] = false;
					}
				}

				if (combo[2]) {
					if (comboData[2][0] === res.track[i].name) {
						comboData[2][1]++;
					} else {
						combo[2] = false;
					}
				}
			}

		}

		return {
			artist: {
				name:comboData[0][0],
				combo:comboData[0][1]
			},
			album: {
				name:comboData[1][0],
				combo:comboData[1][1]
			},
			track: {
				name:comboData[2][0],
				combo:comboData[2][1]
			},
			nowplaying,
			image
		}
	}

}