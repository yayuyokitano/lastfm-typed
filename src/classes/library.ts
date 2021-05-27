import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";
import { convertMeta, toArray, toBool, toInt } from "../caster";

export default class LibraryClass extends Base {

	public async getArtists(usernameOrSessionKey:string, params?:{page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "library.getArtists", user: usernameOrSessionKey, ...params })).artists as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.artists = toArray(res.artist).map((e:any) => {
			e.playcount = toInt(e.playcount);
			e.tagcount = toInt(e.tagcount);
			e.streamable = toBool(e.streamable);
			return e;
		});
		res.artist = void 0;

		return res as LibraryInterface.getArtists;

	}

}