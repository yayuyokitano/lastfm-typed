import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;
import LastFM from "../dist/index";

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
import trackSchema from "./schema/trackSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

describe("Track", async () => {
	
	describe(".getCorrection", async () => {

		it("Should return properly when track exists but no redirect", async () => {
			(expect(await lastfm.track.getCorrection("TETORA", "めんどくさい")).to.be as any).jsonSchema(trackSchema.getCorrection);
		});

		it("Should return properly when track exists and there is redirect", async () => {
			(expect(await lastfm.track.getCorrection("Girls' Generation", "VITAMIN")).to.be as any).jsonSchema(trackSchema.getCorrection);
		});
		
		it("Should return properly when track doesn't exist and no redirect", async () => {
			(expect(await lastfm.track.getCorrection("ユヨヤ", "ヨヤユ")).to.be as any).jsonSchema(trackSchema.getCorrection);
		});

	});
	
	describe(".getInfo", async () => {

		it("Should return properly with username", async () => {
			(expect(await lastfm.track.getInfo(lastfm.helper.TrackFromName("Lily Sketch", "Black Lily"), {username: "Mexdeep"})).to.be as any).jsonSchema(trackSchema.getInfo);
		});
	
		it("Should return properly without username", async () => {
			(expect(await lastfm.track.getInfo(lastfm.helper.TrackFromName("Blume popo", "溺レル"))).to.be as any).jsonSchema(trackSchema.getInfo);
		});
	
		it("Should error when does not exist", async () => {
			try {
				await lastfm.track.getInfo(lastfm.helper.TrackFromName("ヨユヤ", "ヤユヨ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Track not found"));
			}
		});

	});
	
	describe(".getSimilar", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.track.getSimilar(lastfm.helper.TrackFromName("Cher", "Believe"))).to.be as any).jsonSchema(trackSchema.getSimilar);
		});

		it("Should return properly when no similar tracks", async () => {
			(expect(await lastfm.track.getSimilar(lastfm.helper.TrackFromName("Schrödinger Box", "往く者"))).to.be as any).jsonSchema(trackSchema.getSimilar);
		});

		it("Should verify that track checked actually doesn't have similar tracks", async () => {
			expect((await lastfm.track.getSimilar(lastfm.helper.TrackFromName("Schrödinger Box", "往く者"))).tracks.length).to.equal(0);
		});

		it("Should error when track does not exist", async () => {
			try {
				await lastfm.track.getSimilar(lastfm.helper.TrackFromName("ヨユヤ", "ヤユヨ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Track not found"));
			}
		});

	});
	
	describe(".getTags", async () => {

		it("Should return properly when there are tags", async () => {
			(expect(await lastfm.track.getTags(lastfm.helper.TrackFromName("Lily Sketch", "Black Lily"), "Mexdeep")).to.be as any).jsonSchema(trackSchema.getTags);
		});
	
		it("Should return properly for artist.getTags when there are no tags", async () => {
			(expect(await lastfm.track.getTags(lastfm.helper.TrackFromName("ひかりのなかに", "大丈夫"), "Mexdeep")).to.be as any).jsonSchema(trackSchema.getTags);
		});

		it("Should verify that artist checked actually doesn't have tags", async () => {
			expect((await lastfm.track.getTags(lastfm.helper.TrackFromName("ひかりのなかに", "大丈夫"), "Mexdeep")).tags.length).to.equal(0);
		});
	
		it("Should error when artist.getTags artist does not exist", async () => {
			try {
				await lastfm.track.getTags(lastfm.helper.TrackFromName("ヨユヤ", "ヤユヨ"), "Mexdeep");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Track not found"));
			}
		});

	});

	describe(".getTopTags", async () => {

		it("Should return properly when there are tags", async () => {
			(expect(await lastfm.track.getTopTags(lastfm.helper.TrackFromName("BRATS", "アイニコイヨ"))).to.be as any).jsonSchema(trackSchema.getTopTags);
		});
	
		it("Should return properly when there are no tags", async () => {
			(expect(await lastfm.track.getTopTags(lastfm.helper.TrackFromName("ミズニ ウキクサ", "街"))).to.be as any).jsonSchema(trackSchema.getTopTags);
		});

		it("Should verify that track checked actually doesn't have tags", async () => {
			expect((await lastfm.track.getTopTags(lastfm.helper.TrackFromName("ミズニ ウキクサ", "街"))).tags.length).to.equal(0);
		});
	
		it("Should error when track does not exist", async () => {
			try {
				await lastfm.track.getTopTags(lastfm.helper.TrackFromName("ヨユヤ", "ヤユヨ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Track not found"));
			}
		});

	});

	describe(".scrobble", async () => {

		it("Should return properly for one track", async () => {
			(expect(await lastfm.track.scrobble(config.session, [{artist: "赤い公園", track: "Mutant", album: "THE PARK", timestamp: Number(new Date()) / 1000}])).to.be as any).jsonSchema(trackSchema.scrobble);
		});

		it("Should error when session key invalid", async () => {
			try {
				await lastfm.track.scrobble("0SJC2cHJBjnjR-vbPCF-Skke0K9j5SQS", [{artist: "赤い公園", track: "Mutant", album: "THE PARK", timestamp: Number(new Date()) / 1000}]);
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(9, "Invalid session key - Please re-authenticate"));
			}
		});

		it("Wait for lfm to process", async () => {
			await sleep(3000);
		});

		it("Should actually have scrobbled", async () => {
			expect((await lastfm.user.getRecentTracks(config.session, {limit: 1})).tracks[0]).to.deep.nested.include({
				"artist.name": "赤い公園",
				"album.name": "THE PARK",
				"name": "Mutant"
			});
		});

		it("Should return properly for many tracks", async () => {
			(expect(await lastfm.track.scrobble(config.session, [{artist: "赤い公園", track: "yumeutsutsu", album: "THE PARK", timestamp: Number(new Date()) / 1000},{artist: "赤い公園", track: "yumeutsutsu", album: "THE PARK", timestamp: (Number(new Date()) / 1000) - 1}])).to.be as any).jsonSchema(trackSchema.scrobble);
		});

		it("Wait for lfm to process", async () => {
			await sleep(3000);
		});

		it("Should actually have scrobbled many", async () => {
			expect((await lastfm.user.getRecentTracks(config.session, {limit: 1})).tracks[0]).to.deep.nested.include({
				"artist.name": "赤い公園",
				"album.name": "THE PARK",
				"name": "yumeutsutsu"
			});
		});
	
	});

	describe(".search", async () => {

		it("Should return properly for when there is one result", async () => {
			(expect(await lastfm.track.search("心中治療室")).to.be as any).jsonSchema(trackSchema.search);
		});

		it("Should verify that track checked actually only returns one result", async () => {
			expect((await lastfm.track.search("心中治療室")).trackMatches.length).to.equal(1);
		});
	
		it("Should return properly when there are many results", async () => {
			(expect(await lastfm.track.search("輪廻")).to.be as any).jsonSchema(trackSchema.search);
		});
	
		it("Should return properly when there is no result", async () => {
			(expect(await lastfm.track.search("ssdafsdaf")).to.be as any).jsonSchema(trackSchema.search);
		});
	
		it("Should verify that track checked actually returns no result", async () => {
			expect((await lastfm.track.search("ssdafsdaf")).trackMatches.length).to.equal(0);
		});

	});

});