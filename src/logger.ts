import LastFM from "./index";
import {LFMArgumentObject} from "./request";

export default class LoggerClass {

	private lastfm:LastFM;

	public constructor(lastfm:LastFM) {
		this.lastfm = lastfm;
	}

	public emitRequest(args:LFMArgumentObject, HTTPMethod:"GET"|"POST") {
		this.lastfm.emit("requestStart", args, HTTPMethod);
	}

	public emitRequestComplete(args:LFMArgumentObject, time:number, res:any) {
		this.lastfm.emit("requestComplete", args, time, res);
	}

}
