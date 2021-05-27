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

		it("Should return properly when artist exists and there is redirect", async () => {
			(expect(await lastfm.artist.getCorrection("Sheena Ringo")).to.be as any).jsonSchema(artistSchema.getCorrection);
		});
		
		it("Should return properly when artist doesn't exist and no redirect", async () => {
			(expect(await lastfm.artist.getCorrection("ユヨヤ")).to.be as any).jsonSchema(artistSchema.getCorrection);
		});

	});

	describe(".getInfo", async () => {

		it("Should return properly for artist.getInfo with username", async () => {
			(expect(await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("フミンニッキ"), {username: "Mexdeep"})).to.be as any).jsonSchema(artistSchema.getInfo);
		});
	
		it("Should return properly for artist.getInfo without username", async () => {
			(expect(await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("PassCode"))).to.be as any).jsonSchema(artistSchema.getInfo);
		});
	
		it("Should error when artist.getInfo artist does not exist", async () => {
			try {
				await lastfm.artist.getInfo(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getSimilar", async () => {

		it("Should return properly for artist.getSimilar", async () => {
			(expect(await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("赤い公園"))).to.be as any).jsonSchema(artistSchema.getSimilar);
		});

		it("Should return properly for artist.getSimilar when no similar artists", async () => {
			(expect(await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("フミンニッキ"))).to.be as any).jsonSchema(artistSchema.getSimilar);
		});

		it("Should verify that artist checked actually doesn't have similar artists", async () => {
			expect((await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("フミンニッキ"))).artists.length).to.equal(0);
		});

		it("Should error when artist.getSimilar artist does not exist", async () => {
			try {
				await lastfm.artist.getSimilar(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTags", async () => {

		it("Should return properly for artist.getTags when there are tags", async () => {
			(expect(await lastfm.artist.getTags(lastfm.helper.ArtistFromName("村瀬真弓"), "Mexdeep")).to.be as any).jsonSchema(artistSchema.getTags);
		});
	
		it("Should return properly for artist.getTags when there are no tags", async () => {
			(expect(await lastfm.artist.getTags(lastfm.helper.ArtistFromName("ひかりのなかに"), "Mexdeep")).to.be as any).jsonSchema(artistSchema.getTags);
		});

		it("Should verify that artist checked actually doesn't have tags", async () => {
			expect((await lastfm.artist.getTags(lastfm.helper.ArtistFromName("ひかりのなかに"), "Mexdeep")).tags.length).to.equal(0);
		});
	
		it("Should error when artist.getTags artist does not exist", async () => {
			try {
				await lastfm.artist.getTags(lastfm.helper.ArtistFromName("ヨユヤ"), "Mexdeep");
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTopAlbums", async () => {

		it("Should return properly for artist.getTopAlbums when there are top albums", async () => {
			(expect(await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("きのこ帝国"))).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});
	
		it("Should return properly for artist.getTopAlbums when there is no album", async () => {
			(expect(await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("フミンニッキ"))).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});

		it("Should verify that artist checked actually has no album", async () => {
			expect((await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("フミンニッキ"))).albums.length).to.equal(0);
		});
	
		it("Should return properly for artist.getTopAlbums when there is one album", async () => {
			(expect(await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("Lyanas"))).to.be as any).jsonSchema(artistSchema.getTopAlbums);
		});

		it("Should verify that artist checked actually has one album", async () => {
			expect((await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("Lyanas"))).albums.length).to.equal(1);
		});
	
		it("Should error when artist.getTopAlbums artist does not exist", async () => {
			try {
				await lastfm.artist.getTopAlbums(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTopTags", async () => {

		it("Should return properly for artist.getTopTags when there are tags", async () => {
			(expect(await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("水咲加奈"))).to.be as any).jsonSchema(artistSchema.getTopTags);
		});
	
		it("Should return properly for artist.getTopTags when there are no tags", async () => {
			(expect(await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("Lyanas"))).to.be as any).jsonSchema(artistSchema.getTopTags);
		});

		it("Should verify that artist checked actually doesn't have tags", async () => {
			expect((await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("Lyanas"))).tags.length).to.equal(0);
		});
	
		it("Should error when artist.getTopTags artist does not exist", async () => {
			try {
				await lastfm.artist.getTopTags(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".getTopTracks", async () => {

		it("Should return properly for artist.getTopTracks when there are top tracks", async () => {
			(expect(await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("水咲加奈"))).to.be as any).jsonSchema(artistSchema.getTopTracks);
		});
	
		it("Should return properly for artist.getTopTracks when there is one track", async () => {
			(expect(await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("フミンニッキ"))).to.be as any).jsonSchema(artistSchema.getTopTracks);
		});

		it("Should verify that artist checked actually has one track", async () => {
			expect((await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("フミンニッキ"))).tracks.length).to.equal(1);
		});
	
		it("Should error when artist.getTopTracks artist does not exist", async () => {
			try {
				await lastfm.artist.getTopTracks(lastfm.helper.ArtistFromName("ヨユヤ"));
				throw "Did not error";
			} catch (err) {
				expect(err).to.deep.equal(lfmError(6, "The artist you supplied could not be found"));
			}
		});

	});

	describe(".search", async () => {

		it("Should return properly for artist.search when there is one result", async () => {
			(expect(await lastfm.artist.search("村瀬真弓")).to.be as any).jsonSchema(artistSchema.search);
		});

		it("Should verify that artist checked actually only returns one result", async () => {
			expect((await lastfm.artist.search("村瀬真弓")).artistMatches.length).to.equal(1);
		});
	
		it("Should return properly for artist.search when there are many results", async () => {
			(expect(await lastfm.artist.search("輪廻")).to.be as any).jsonSchema(artistSchema.search);
		});
	
		it("Should return properly for artist.search when there is no result", async () => {
			(expect(await lastfm.artist.search("ssdafsdaf")).to.be as any).jsonSchema(artistSchema.search);
		});
	
		it("Should verify that artist checked actually returns no result", async () => {
			expect((await lastfm.artist.search("ssdafsdaf")).artistMatches.length).to.equal(0);
		});

	});

});