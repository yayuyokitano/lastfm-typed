import { resolve } from "path";
import {promises as fs} from "fs";

import * as TJS from "typescript-json-schema";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
};

// optionally pass a base path
const basePath = "./my-dir";


const types = {
	album: ["getInfo", "getTags", "getTopTags", "search"],
	artist: ["getCorrection", "getInfo", "getSimilar", "getTags", "getTopAlbums", "getTopTags", "getTopTracks", "search"],
	chart: ["getTopArtists", "getTopTags", "getTopTracks"],
	library: ["getArtists"],
	tag: ["getInfo", "getTopAlbums", "getTopArtists", "getTopTags", "getTopTracks"],
	track: ["getCorrection", "getInfo", "getSimilar", "getTags", "getTopTags", "scrobble", "search"],
	user: ["getFriends", "getInfo", "getLovedTracks", "getPersonalTags", "getRecentTracks", "getTopAlbums", "getTopArtists", "getTopTags", "getTopTracks", "getWeeklyAlbumChart", "getWeeklyArtistChart", "getWeeklyChartList", "getWeeklyTrackChart"]
}

console.log("\nGenerating typing schemas...");

for (let [processingType, typeList] of Object.entries(types)) {

	console.log(`\n${processingType}`);

	const program = TJS.getProgramFromFiles(
		[resolve(`src/interfaces/${processingType}Interface.ts`)],
		compilerOptions,
		basePath
	);
	
	// We can either get the schema for one file and one type...
	const schemas:{[key:string]:(TJS.Definition|null)} = {};
	for (let type of typeList) {
		console.log(`  .${type}`);
		schemas[type] = TJS.generateSchema(program, type, settings);
	}
	
	fs.writeFile(`test/schema/${processingType}Schema.json`, JSON.stringify(schemas));

}
