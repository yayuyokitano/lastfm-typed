export function toInt(num:any) {
	
	if (typeof num === "number") {
		return num;
	}
	const res = parseInt(num, 10);
	return isNaN(res) ? void 0 : res;

}

export const boolToInt = (bool:boolean):number => Number(bool);

export const toBool = (bool:any) => bool !== 0 && bool && bool !== "0";

export function toArray(arr:any) {

	if (arr instanceof Array) {
		return arr;
	}
	if (!arr) {
		return [];
	}	
	return [arr];

}

export function convertMeta(meta:any) {

	for (let key of ["page", "perPage", "total", "totalPages", "from", "to", "index", "accepted", "ignored"]) {
		if (meta.hasOwnProperty(key)) {
			meta[key] = toInt(meta[key]); // eslint-disable-line
		}
	}

	for (let key of ["artistcorrected", "trackcorrected"]) {
		if (meta.hasOwnProperty(key)) {
			meta[key] = toBool(meta[key]); // eslint-disable-line
		}
	}

	return meta;

}

export function convertSearch(res:any) {

	res["opensearch:Query"]["#text"] = void 0;
	res.itemsPerPage = res["opensearch:itemsPerPage"];
	res["opensearch:itemsPerPage"] = void 0;
	res.startIndex = res["opensearch:startIndex"];
	res["opensearch:startIndex"] = void 0;
	res.totalResults = res["opensearch:totalResults"];
	res["opensearch:totalResults"] = void 0;
	res.query = res["opensearch:Query"];
	res["opensearch:Query"] = void 0;
	res.query.startPage = toInt(res.query.startPage);
	res.totalResults = toInt(res.totalResults);
	res.startIndex = toInt(res.startIndex);
	res.itemsPerPage = toInt(res.itemsPerPage);
	return res;

}

export function convertSearchWithQuery(res:any) {

	res.meta = res["@attr"];
	res["@attr"] = void 0;
	res.meta.query = res.meta.for;
	res.meta.for = void 0;

	return convertSearch(res);

}

export function convertImage(img:any) {

	img.url = img["#text"];
	img["#text"] = void 0;
	return img;

}

export const convertImageArray = (img:any) => toArray(img).map(convertImage);

function entryIntConverter(e:any) {

	for (let key of ["playcount", "listeners", "tagcount", "userplaycount", "rank", "duration", "taggings", "reach", "bootstrap", "age", "count"]) {
		if (e.hasOwnProperty(key)) {
			e[key] = toInt(e[key]); // eslint-disable-line
			continue;
		}

		if (e["@attr"]?.hasOwnProperty(key)) {
			e[key] = toInt(e["@attr"][key]); // eslint-disable-line
			e["@attr"] = void 0;
		}
	}
	return e;

}

function entryStreamableConverter(e:any) {

	if (e.hasOwnProperty("streamable")) {
		if (e.streamable.hasOwnProperty("fulltrack")) {
			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			e.streamable["#text"] = void 0;
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
		} else {
			e.streamable = toBool(e.streamable?.["#text"] ?? e.streamable);
		}
	}
	return e;

}

export function convertEntry(e:any) {

	e = entryIntConverter(e);

	for (let key of ["ontour", "userloved", "subscriber", "loved"]) {
		if (e.hasOwnProperty(key)) {
			e[key] = toBool(e[key]); // eslint-disable-line
		}
	}

	e = entryStreamableConverter(e);

	if (e.hasOwnProperty("image")) {
		e.image = convertImageArray(e.image);
	}

	return e;

}

export const convertEntryArray = (e:any) => toArray(e).map(convertEntry);

function setName(e:any) {

	if (!e.artist.hasOwnProperty("name")) {
		e.artist.name = e.artist["#text"];
		e.artist["#text"] = void 0;
	}

	if (e.hasOwnProperty("album")) {
		e.album.name ||= e.album["#text"];
		e.album["#text"] = void 0;
	}

	return e;

}

export function setDate(e:any, prop:string) {

	if (e.hasOwnProperty(prop)) {
		e[prop].datetime = e[prop]["#text"]; // eslint-disable-line
		e[prop]["#text"] = void 0; // eslint-disable-line
		e[prop].uts = toInt(e[prop].uts ?? e[prop].unixtime); // eslint-disable-line
		e[prop].unixtime = void 0; // eslint-disable-line
	}

	return e;

}

function convertGetRecentTracksEntry(e:any) {

	e = setName(e);
	e = setDate(e, "date");

	if (e?.["@attr"]?.hasOwnProperty("nowplaying")) {
		e.nowplaying = toBool(e["@attr"].nowplaying);
		e["@attr"] = void 0;
	} else {
		e.nowplaying = false;
	}
	return convertEntry(e);

}

export const convertGetRecentTracks = (e:any) => toArray(e).map(convertGetRecentTracksEntry);

export const joinArray = (e:string[]|string) => Array.isArray(e) ? e.join(",") : e;

export function convertBasicMetaTag(res:any) {

	res.meta = res["@attr"];
	res["@attr"] = void 0;
	res.tags = toArray(res.tag);
	res.tag = void 0;
	return res;

}

export function convertExtendedMeta(res:any, type:"tag"|"artist"|"album"|"track") {

	res.meta = convertMeta(res["@attr"]);
	res["@attr"] = void 0;
	res[`${type}s`] = convertEntryArray(res[type]); // eslint-disable-line
	res[type] = void 0; // eslint-disable-line
	return res;
	
}

export function addConditionals(req:{[key:string]:any}, props:{[key:string]:any}) {
	
	for (let [key, value] of Object.entries(props)) {
		if (value !== void 0) {
			req[key] = value;
		}
	}
	return req;

}
