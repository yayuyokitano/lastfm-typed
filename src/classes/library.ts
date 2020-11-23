import LFMRequest from "../request";
import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";

export default class LibraryClass extends Base {

	public async getArtists(usernameOrSessionKey:string, params?:{page?:number, limit?:number}) {

		this.checkLimit(params?.limit, 1000);

		return (await new LFMRequest(this.key, this.secret, { method: "library.getArtists", user: usernameOrSessionKey, ...params }).execute()).artists as LibraryInterface.getArtists;

	}

}