import * as AuthInterface from "../interfaces/authInterface";
import Base from "../base";
export default class AuthClass extends Base {
    getToken(): Promise<string>;
    getSession(token: string): Promise<AuthInterface.getSession>;
    getMobileSession(username: string, password: string): Promise<AuthInterface.getSession>;
}
