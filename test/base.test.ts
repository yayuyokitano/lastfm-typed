import * as chai from "chai";
const expect = chai.expect;
import LastFM from "../dist/index";
import {joinArray, toArray} from "../dist/caster";

import {env} from "process";

let config = {
	key: env.LASTFMKEY,
	secret: env.LASTFMSECRET,
	session: ""
}

if (!config.key) {
	config = require("./config.json");
} else {
	// This is key for a throwaway account, I don't care
	config.session = "0SJC2cHJBjnjR-vbPCF-Skke0K9j5SQx";
}

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

describe("Base", async () => {
	
	describe(".checkLimit", async () => {

		it("Should error when too high limit passed", async () => {
			try {
				await lastfm.user.getRecentTracks("Mexdeep", {limit: 2000});
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Limit out of bounds (1-1000), 2000 passed"));
			}
		});
	});

	describe(".checkScrobbleCount", async () => {

		it("Should error when too many scrobbles passed", async () => {
			let scrobbleArray = [];
			for (let i = 0; i < 60; i++) {
				scrobbleArray.push({artist: "赤い公園", track: "KILT OF MANTRA", album: "THE PARK", timestamp: Number(new Date()) / 1000});
			}
			try {
				await lastfm.track.scrobble(config.session, scrobbleArray);
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Scrobble count out of bounds (1-50), 60 passed"));
			}
		});
	});

});

describe("Caster", async () => {

	describe(".toArray", async () => {

		it("Should return properly with undefined", async () => {
			expect(toArray(void 0)).to.deep.equal([]);
		});

		it("Should return properly with string", async () => {
			expect(toArray("TETORA")).to.deep.equal(["TETORA"]);
		});

		it("Should return properly with array", async () => {
			expect(toArray(["TETORA", "村瀬真弓"])).to.deep.equal(["TETORA", "村瀬真弓"]);
		});

	});

	describe(".joinArray", async () => {

		it("Should return properly with array", async () => {
			expect(joinArray(["japanese", "singer-songwriter", "punk"])).to.equal("japanese,singer-songwriter,punk");
		});

		it("Should return properly with string", async () => {
			expect(joinArray(["japanese,singer-songwriter,punk"])).to.equal("japanese,singer-songwriter,punk");
		});

	});

});