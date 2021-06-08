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
import helperSchema from "./schema/helperSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

describe("Helper", async () => {

	describe(".getCombo", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.helper.getCombo("Mexdeep", 1000)).to.be as any).jsonSchema(helperSchema.getCombo);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.helper.getCombo({username: "Mexdeep", limit: 1000})).to.be as any).jsonSchema(helperSchema.getCombo);
		});

	});

	describe(".getMatchingArtists", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.helper.getMatchingArtists("Mexdeep", "joameba", 1000, "overall")).to.be as any).jsonSchema(helperSchema.getMatchingArtists);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.helper.getMatchingArtists({user1: "Mexdeep", limit: 1000, user2: "joameba", period: "overall"})).to.be as any).jsonSchema(helperSchema.getMatchingArtists);
		});
		
	});

	describe(".getNowPlaying", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.helper.getNowPlaying("Mexdeep")).to.be as any).jsonSchema(helperSchema.getNowPlaying);
		});

		it("Should return properly with all details", async () => {
			(expect(await lastfm.helper.getNowPlaying("Mexdeep", ["artist", "album", "track"], {extended: true})).to.be as any).jsonSchema(helperSchema.getNowPlaying);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.helper.getNowPlaying({user: "Mexdeep", extended: true})).to.be as any).jsonSchema(helperSchema.getNowPlaying);
		});
		
	});

	describe(".ArtistFromMBID", async () => {

		it("Should return properly", async () => {
			expect(lastfm.helper.ArtistFromMBID("2133d8d4-0418-45bc-904b-2a5e925ad4c3")).to.deep.equal({mbid: "2133d8d4-0418-45bc-904b-2a5e925ad4c3"});
		});
		
	});

	describe(".ArtistFromName", async () => {

		it("Should return properly", async () => {
			expect(lastfm.helper.ArtistFromName("TETORA")).to.deep.equal({artist: "TETORA"});
		});
		
	});

	describe(".AlbumFromMBID", async () => {

		it("Should return properly", async () => {
			expect(lastfm.helper.AlbumFromMBID("5c2a22ac-e5fb-47a7-b0b6-e40c70a61aea")).to.deep.equal({mbid: "5c2a22ac-e5fb-47a7-b0b6-e40c70a61aea"});
		});
		
	});

	describe(".AlbumFromName", async () => {

		it("Should return properly", async () => {
			expect(lastfm.helper.AlbumFromName("TETORA", "me me")).to.deep.equal({artist: "TETORA", album: "me me"});
		});
		
	});

	describe(".TrackFromMBID", async () => {

		it("Should return properly", async () => {
			expect(lastfm.helper.TrackFromMBID("ccccbf88-9b05-4aa2-8cae-a8b17c1f5536")).to.deep.equal({mbid: "ccccbf88-9b05-4aa2-8cae-a8b17c1f5536"});
		});
		
	});
	
	describe(".TrackFromName", async () => {

		it("Should return properly", async () => {
			expect(lastfm.helper.TrackFromName("TETORA", "めんどくさい")).to.deep.equal({artist: "TETORA", track: "めんどくさい"});
		});
		
	});

});