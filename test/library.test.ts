import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;
import LastFM from "../dist/index";

import {env} from "process";

let config = {
	key: env.LASTFMKEY,
	secret: env.LASTFMSECRET
}

if (!config.key) {
	config = require("./config.json");
}
import librarySchema from "./schema/librarySchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

describe("Library", async () => {
	
	describe(".getArtists", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.library.getArtists("Mexdeep", {limit: 15})).to.be as any).jsonSchema(librarySchema.getArtists);
		});

		it("Should error when user doesnt exist", async () => {
			try {
				await lastfm.library.getArtists("lkasjdgkfljasfdgkjhdfakjghadsfafgafdgfgafdg");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "User not found"));
			}
		})

	});

});