import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";

export default class LibraryClass extends Base {

	public async getArtists(usernameOrSessionKey:string, params?:{page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		let res = (await this.sendRequest({ method: "library.getArtists", user: usernameOrSessionKey, ...params })).artists as any;

		res.meta = res["@attr"];
		delete res["@attr"];

		return res as LibraryInterface.getArtists;

	}

}