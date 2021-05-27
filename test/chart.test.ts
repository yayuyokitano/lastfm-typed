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
import chartSchema from "./schema/chartSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

describe("Chart", async () => {
	
	describe(".getTopArtists", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.chart.getTopArtists()).to.be as any).jsonSchema(chartSchema.getTopArtists);
		});

	});

	describe(".getTopTags", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.chart.getTopTags()).to.be as any).jsonSchema(chartSchema.getTopTags);
		});

	});

	describe(".getTopTracks", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.chart.getTopTracks()).to.be as any).jsonSchema(chartSchema.getTopTracks);
		});

	});

});