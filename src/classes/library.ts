import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";
import { convertEntryArray, convertMeta } from "../caster";

export default class LibraryClass extends Base {

	public async getArtists(usernameOrSessionKey:string, params?:{page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "library.getArtists", user: usernameOrSessionKey, ...params })).artists as any;

		res.meta = convertMeta(res["@attr"]);
		res["@attr"] = void 0;

		res.artists = convertEntryArray(res.artist);
		res.artist = void 0;

		return res as LibraryInterface.getArtists;

	}

}