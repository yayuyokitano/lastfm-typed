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
import geoSchema from "./schema/geoSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

describe("Geo", async () => {
	
	describe(".getTopArtists", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.geo.getTopArtists("spain")).to.be as any).jsonSchema(geoSchema.getTopArtists);
		});

		it("Should error when user does not exist", async () => {

			try {
				await lastfm.geo.getTopArtists("es");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "country param invalid"));
			}

		});

	});

	describe(".getTopTracks", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.geo.getTopTracks("spain")).to.be as any).jsonSchema(geoSchema.getTopTracks);
		});

		it("Should error when user does not exist", async () => {

			try {
				await lastfm.geo.getTopTracks("es");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "country param required")); // why do the geo endpoints have different error messages i hate it here
			}

		});

	});

});