import * as chai from "chai";
chai.use(require("chai-json-schema-ajv"));
const expect = chai.expect;
import LastFM from "../dist/index";
import config from "./config.json";
import albumSchema from "./schema/albumSchema.json";

const lastfm = new LastFM(config.key, { apiSecret: config.secret });

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

describe("Album", async () => {

	it("Should return properly for album.getInfo with username", async () => {
		(expect(await lastfm.album.getInfo(lastfm.helper.AlbumFromName("KITANO REM", "RAINSICK/オレンジ"), {username: "Mexdeep"})).to.be as any).jsonSchema(albumSchema.getInfo);
	});

	it("Should return properly for album.getInfo without username", async () => {
		(expect(await lastfm.album.getInfo(lastfm.helper.AlbumFromName("ヤユヨ", "ヤユヨ"))).to.be as any).jsonSchema(albumSchema.getInfo);
	});

	it("Should error when album.getInfo album does not exist", async () => {
		try {
			await lastfm.album.getInfo(lastfm.helper.AlbumFromName("ヤユヨ", "ヨユヤ"));
			throw "Did not error";
		} catch (err) {
			expect(err).to.deep.equal(lfmError(6, "Album not found"));
		}
	});

	it("Should return properly for album.getTags when there are tags", async () => {
		(expect(await lastfm.album.getTags(lastfm.helper.AlbumFromName("鈴", "ベランダのその先へ"), "Mexdeep")).to.be as any).jsonSchema(albumSchema.getTags);
	});

	it("Should return properly for album.getTags when there are no tags", async () => {
		(expect(await lastfm.album.getTags(lastfm.helper.AlbumFromName("ひかりのなかに", "まっすぐなままでいい"), "Mexdeep")).to.be as any).jsonSchema(albumSchema.getTags);
	});

	it("Should error when album.getTags album does not exist", async () => {
		try {
			await lastfm.album.getTags(lastfm.helper.AlbumFromName("ヤユヨ", "ヨユヤ"), "Mexdeep");
			throw "Did not error";
		} catch (err) {
			expect(err).to.deep.equal(lfmError(6, "Album not found"));
		}
	});

	it("Should return properly for album.getTopTags when there are tags", async () => {
		(expect(await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("鈴", "ベランダのその先へ"))).to.be as any).jsonSchema(albumSchema.getTopTags);
	});

	// This one might have to be updated
	it("Should return properly for album.getTopTags when there are no tags", async () => {
		(expect(await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("聴色", "さよならを交わすとき"))).to.be as any).jsonSchema(albumSchema.getTopTags);
	});

	it("Should error when album.getTopTags album does not exist", async () => {
		try {
			await lastfm.album.getTopTags(lastfm.helper.AlbumFromName("ヤユヨ", "ヨユヤ"));
			throw "Did not error";
		} catch (err) {
			expect(err).to.deep.equal(lfmError(6, "Album not found"));
		}
	});

	it("Should return properly for album.search when there is one result", async () => {
		(expect(await lastfm.album.search("Lily Sketch")).to.be as any).jsonSchema(albumSchema.search);
	});

	it("Should return properly for album.search when there are many results", async () => {
		(expect(await lastfm.album.search("RAINSICK")).to.be as any).jsonSchema(albumSchema.search);
	});

	it("Should return properly for album.search when there are no results", async () => {
		(expect(await lastfm.album.search("ssdafsdaf")).to.be as any).jsonSchema(albumSchema.search);
	});

});