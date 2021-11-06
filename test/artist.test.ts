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
import artistSchema from "./schema/artistSchema.json";

const lastfm = new LastFM(config.key as string, { apiSecret: config.secret as string });

function lfmError(code:number, message:string) {
	return {code, message} as any;
}

describe("Artist", async () => {
	
	describe(".getCorrection", async () => {

		it("Should return properly when artist exists but no redirect", async () => {
			(expect(await lastfm.artist.getCorrection("TETORA")).to.be as any).jsonSchema(artistSchema.getCorrection);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getCorrection({artist: "TETORA"})).to.be as any).jsonSchema(artistSchema.getCorrection);
		});

		it("Should return properly when artist exists and there is redirect", async () => {
			(expect(await lastfm.artist.getCorrection("Sheena Ringo")).to.be as any).jsonSchema(artistSchema.getCorrection);
		});
		
		it("Should return properly when artist doesn't exist and no redirect", async () => {
			(expect(await lastfm.artist.getCorrection("ユヨヤ")).to.be as any).jsonSchema(artistSchema.getCorrection);
		});

	});

	describe(".getInfo", async () => {

		it("Should return properly with username", async () => {
			(expect(await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("フミンニッキ"), {username: "Mexdeep"})).to.be as any).jsonSchema(artistSchema.getInfo);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getInfo({artist: "フミンニッキ", user: "Mexdeep"})).to.be as any).jsonSchema(artistSchema.getInfo);
		});
	
		it("Should return properly without username", async () => {
			(expect(await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("PassCode"))).to.be as any).jsonSchema(artistSchema.getInfo);
		});

		it("Should return properly when autocorrect is specified true", async () => {
			expect((await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("Sheena Ringo"), {autocorrect: true})).name).to.equal("椎名林檎");
		});

		it("Should return properly when autocorrect is specified false", async () => {
			expect((await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("Sheena Ringo"), {autocorrect: false})).name).to.equal("Sheena Ringo");
		});
	
		it("Should error when artist does not exist", async () => {
			try {
				await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getSimilar", async () => {

		it("Should return properly", async () => {
			(expect(await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("赤い公園"))).to.be as any).jsonSchema(artistSchema.getSimilar);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getSimilar({artist: "赤い公園", autocorrect: true})).to.be as any).jsonSchema(artistSchema.getSimilar);
		});

		it("Should return properly when no similar artists", async () => {
			(expect(await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("山下由貴"))).to.be as any).jsonSchema(artistSchema.getSimilar);
		});

		it("Should verify that artist checked actually doesn't have similar artists", async () => {
			expect((await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("山下由貴"))).artists.length).to.equal(0);
		});

		it("Should error when artist does not exist", async () => {
			try {
				await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTags", async () => {

		it("Should return properly when there are tags", async () => {
			(expect(await lastfm.artist.getTags(lastfm.helper.ArtistFromName("村瀬真弓"), "Mexdeep")).to.be as any).jsonSchema(artistSchema.getTags);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getTags({artist: "村瀬真弓", username: "Mexdeep"})).to.be as any).jsonSchema(artistSchema.getTags);
		});
	
		it("Should return properly when there are no tags", async () => {
			(expect(await lastfm.artist.getTags(lastfm.helper.ArtistFromName("ひかりのなかに"), "Mexdeep")).to.be as any).jsonSchema(artistSchema.getTags);
		});

		it("Should verify that artist checked actually doesn't have tags", async () => {
			expect((await lastfm.artist.getTags(lastfm.helper.ArtistFromName("ひかりのなかに"), "Mexdeep")).tags.length).to.equal(0);
		});
	
		it("Should error when artist does not exist", async () => {
			try {
				await lastfm.artist.getTags(lastfm.helper.ArtistFromName("ヨユヤ"), "Mexdeep");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTopAlbums", async () => {

		it("Should return properly when there are top albums", async () => {
			(expect(await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("きのこ帝国"))).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getTopAlbums({artist: "きのこ帝国"})).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});
	
		it("Should return properly when there is no album", async () => {
			(expect(await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("Jack in The b∅x"))).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});

		it("Should verify that artist checked actually has no album", async () => {
			expect((await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("Jack in The b∅x"))).albums.length).to.equal(0);
		});
	
		it("Should return properly when there is one album", async () => {
			(expect(await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("山下由貴"))).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});

		it("Should verify that artist checked actually has one album", async () => {
			expect((await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("山下由貴"))).albums.length).to.equal(1);
		});
	
		it("Should error when artist does not exist", async () => {
			try {
				await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTopTags", async () => {

		it("Should return properly when there are tags", async () => {
			(expect(await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("水咲加奈"))).to.be as any).jsonSchema(artistSchema.getTopTags);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getTopTags({artist: "水咲加奈"})).to.be as any).jsonSchema(artistSchema.getTopTags);
		});
	
		it("Should return properly when there are no tags", async () => {
			(expect(await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("Lyanas"))).to.be as any).jsonSchema(artistSchema.getTopTags);
		});

		it("Should verify that artist checked actually doesn't have tags", async () => {
			expect((await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("Lyanas"))).tags.length).to.equal(0);
		});
	
		it("Should error when artist does not exist", async () => {
			try {
				await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTopTracks", async () => {

		it("Should return properly when there are top tracks", async () => {
			(expect(await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("水咲加奈"))).to.be as any).jsonSchema(artistSchema.getTopTracks);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.getTopTracks({artist: "水咲加奈"})).to.be as any).jsonSchema(artistSchema.getTopTracks);
		});
	
		it("Should return properly when there is one track", async () => {
			(expect(await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("あねそかり"))).to.be as any).jsonSchema(artistSchema.getTopTracks);
		});

		it("Should verify that artist checked actually has one track", async () => {
			expect((await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("あねそかり"))).tracks.length).to.equal(1);
		});
	
		it("Should error when artist does not exist", async () => {
			try {
				await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".search", async () => {

		it("Should return properly when there is one result", async () => {
			(expect(await lastfm.artist.search("村瀬真弓")).to.be as any).jsonSchema(artistSchema.search);
		});

		it("Should verify that artist checked actually only returns one result", async () => {
			expect((await lastfm.artist.search("村瀬真弓")).artistMatches.length).to.equal(1);
		});
	
		it("Should return properly when there are many results", async () => {
			(expect(await lastfm.artist.search("輪廻")).to.be as any).jsonSchema(artistSchema.search);
		});

		it("Should return properly with object input", async () => {
			(expect(await lastfm.artist.search({artist: "輪廻"})).to.be as any).jsonSchema(artistSchema.search);
		});
	
		it("Should return properly when there is no result", async () => {
			(expect(await lastfm.artist.search("ssdafsdaf")).to.be as any).jsonSchema(artistSchema.search);
		});
	
		it("Should verify that artist checked actually returns no result", async () => {
			expect((await lastfm.artist.search("ssdafsdaf")).artistMatches.length).to.equal(0);
		});

	});

});