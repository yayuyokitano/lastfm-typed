import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";
import { convertExtendedMeta } from "../caster";

export default class LibraryClass extends Base {

	public async getArtists(usernameOrSessionKey:string, params?:{page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "library.getArtists", user: usernameOrSessionKey, ...params })).artists as any;

		return convertExtendedMeta(res, "artist") as LibraryInterface.getArtists;

	}

}