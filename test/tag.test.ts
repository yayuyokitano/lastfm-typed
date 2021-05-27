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
import tagSchema from "./schema/tagSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

describe("Tag", async () => {
	
	describe(".getInfo", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.tag.getInfo("japanese")).to.be as any).jsonSchema(tagSchema.getInfo);
		});

		it("Should return properly with unused tag", async () => {
			(expect(await lastfm.tag.getInfo("sodkjfklasdjfkl")).to.be as any).jsonSchema(tagSchema.getInfo);
		});

	});

	describe(".getTopAlbums", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.tag.getTopAlbums("japanese")).to.be as any).jsonSchema(tagSchema.getTopAlbums);
		});

		it("Should return properly with unused tag", async () => {
			(expect(await lastfm.tag.getTopAlbums("sodkjfklasdjfkl")).to.be as any).jsonSchema(tagSchema.getTopAlbums);
		});

	});

	describe(".getTopArtists", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.tag.getTopArtists("japanese")).to.be as any).jsonSchema(tagSchema.getTopArtists);
		});

		it("Should return properly with unused tag", async () => {
			(expect(await lastfm.tag.getTopArtists("sodkjfklasdjfkl")).to.be as any).jsonSchema(tagSchema.getTopArtists);
		});

	});

	describe(".getTopTags", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.tag.getTopTags()).to.be as any).jsonSchema(tagSchema.getTopTags);
		});

	});

	describe(".getTopTracks", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.tag.getTopTracks("japanese")).to.be as any).jsonSchema(tagSchema.getTopTracks);
		});

		it("Should return properly with unused tag", async () => {
			(expect(await lastfm.tag.getTopTracks("sodkjfklasdjfkl")).to.be as any).jsonSchema(tagSchema.getTopTracks);
		});

	});

});