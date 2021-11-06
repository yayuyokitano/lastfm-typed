import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";
import { convertExtendedMeta, convertString } from "../caster";
import { UserPaginatedInput } from "../interfaces/shared";

export default class LibraryClass extends Base {

	public async getArtists(username:string, params?:{sk?:string, page?:number, limit?:number}):Promise<LibraryInterface.getArtists>;
	public async getArtists(input:UserPaginatedInput):Promise<LibraryInterface.getArtists>;
	public async getArtists(firstInput:any, params?:{page?:number, limit?:number}) {

		firstInput = convertString(firstInput, "user", {});

		this.checkLimit(params?.limit ?? firstInput?.limit, 1000);

		let res = (await this.sendRequest({ method: "library.getArtists", ...firstInput, ...params })).artists as any;

		return convertExtendedMeta(res, "artist") as LibraryInterface.getArtists;

	}

}