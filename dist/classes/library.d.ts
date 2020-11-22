import * as LibraryInterface from "../interfaces/libraryInterface";
import Base from "../base";
export default class ArtistClass extends Base {
    getArtists(usernameOrSessionKey: string, params?: {
        page?: number;
        limit?: number;
    }): Promise<LibraryInterface.getArtists>;
}
