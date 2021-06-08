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
import albumSchema from "./schema/albumSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

console.log("\n\n\nStarting tests...")

describe("Album", async () => {
	
	describe(".getInfo", async () => {

		it("Should return properly with username", async () => {
			(expect(await lastfm.album.getInfo(lastfm.helper.AlbumFromName("KITANO REM", "RAINSICK/オレンジ"), {username: "Mexdeep"})).to.be as any).jsonSchema(albumSchema.getInfo);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.album.getInfo({artist: "KITANO REM", album: "RAINSICK/オレンジ", username: "Mexdeep"})).to.be as any).jsonSchema(albumSchema.getInfo);
		});
	
		it("Should return properly without username", async () => {
			(expect(await lastfm.album.getInfo(lastfm.helper.AlbumFromName("ヤユヨ", "ヤユヨ"))).to.be as any).jsonSchema(albumSchema.getInfo);
		});
	
		it("Should error when album does not exist", async () => {
			try {
				await lastfm.album.getInfo(lastfm.helper.AlbumFromName("ヤユヨ", "ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Album not found"));
			}
		});

	});

	describe(".getTags", async () => {

		it("Should return properly when there are tags", async () => {
			(expect(await lastfm.album.getTags(lastfm.helper.AlbumFromName("鈴", "ベランダのその先へ"), "Mexdeep")).to.be as any).jsonSchema(albumSchema.getTags);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.album.getTags({artist: "鈴", album: "ベランダのその先へ", username: "Mexdeep"})).to.be as any).jsonSchema(albumSchema.getTags);
		});
	
		it("Should return properly when there are no tags", async () => {
			(expect(await lastfm.album.getTags(lastfm.helper.AlbumFromName("ひかりのなかに", "まっすぐなままでいい"), "Mexdeep")).to.be as any).jsonSchema(albumSchema.getTags);
		});

		it("Should verify that album checked actually doesn't have tags", async () => {
			expect((await lastfm.album.getTags(lastfm.helper.AlbumFromName("ひかりのなかに", "まっすぐなままでいい"), "Mexdeep")).tags.length).to.equal(0);
		});
	
		it("Should error when album does not exist", async () => {
			try {
				await lastfm.album.getTags(lastfm.helper.AlbumFromName("ヤユヨ", "ヨユヤ"), "Mexdeep");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Album not found"));
			}
		});

	});

	describe(".getTopTags", async () => {

		it("Should return properly when there are tags", async () => {
			(expect(await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("鈴", "ベランダのその先へ"))).to.be as any).jsonSchema(albumSchema.getTopTags);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.album.getTopTags({artist: "鈴", album: "ベランダのその先へ"})).to.be as any).jsonSchema(albumSchema.getTopTags);
		});
	
		it("Should return properly when there are no tags", async () => {
			(expect(await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("聴色", "さよならを交わすとき"))).to.be as any).jsonSchema(albumSchema.getTopTags);
		});

		it("Should verify that album checked actually doesn't have tags", async () => {
			expect((await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("聴色", "さよならを交わすとき"))).tags.length).to.equal(0);
		});
	
		it("Should error when album does not exist", async () => {
			try {
				await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("ヤユヨ", "ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "Album not found"));
			}
		});

	});

	describe(".search", async () => {

		it("Should return properly when there is one result", async () => {
			(expect(await lastfm.album.search("ベランダのその先へ")).to.be as any).jsonSchema(albumSchema.search);
		});

		it("Should verify that album checked actually only returns one result", async () => {
			expect((await lastfm.album.search("ベランダのその先へ")).albumMatches.length).to.equal(1);
		});
	
		it("Should return properly when there are many results", async () => {
			(expect(await lastfm.album.search("RAINSICK")).to.be as any).jsonSchema(albumSchema.search);
		});
	
		it("Should return properly when there is no result", async () => {
			(expect(await lastfm.album.search("ssdafsdaf")).to.be as any).jsonSchema(albumSchema.search);
		});

		it("Should return properly when params are by object", async () => {
			(expect(await lastfm.album.search({album: "RAINSICK", limit: 2})).to.be as any).jsonSchema(albumSchema.search);
		});
	
		it("Should verify that album checked actually returns no result", async () => {
			expect((await lastfm.album.search("ssdafsdaf")).albumMatches.length).to.equal(0);
		});

	});

});