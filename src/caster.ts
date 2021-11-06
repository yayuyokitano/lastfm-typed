export function toInt(num:any) {
	
	if (typeof num === "number") {
		return num;
	}
	const res = parseInt(num, 10);
	return isNaN(res) ? null : res;

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

	if (!res.meta) {
		res.meta = {};
	}
	delete res["opensearch:Query"]["#text"];
	res.meta.itemsPerPage = toInt(res["opensearch:itemsPerPage"]);
	delete res["opensearch:itemsPerPage"];
	res.meta.startIndex = toInt(res["opensearch:startIndex"]);
	delete res["opensearch:startIndex"];
	res.meta.totalResults = toInt(res["opensearch:totalResults"]);
	delete res["opensearch:totalResults"];
	res.meta.query = { ...res.meta.query, ...res["opensearch:Query"]};
	delete res["opensearch:Query"];
	if (res.meta.query?.startPage) {
		res.meta.query.startPage = toInt(res.meta.query.startPage);
	}
	return res;

}

export function convertSearchWithQuery(res:any) {

	res.meta

	res.meta = res["@attr"];
	delete res["@attr"];
	res.meta.query = { for: res.meta.for };
	delete res.meta.for;

	return convertSearch(res);

}

export function convertImage(img:any) {

	img.url = img["#text"];
	delete img["#text"];
	return img;

}

export const convertImageArray = (img:any) => toArray(img).map(convertImage);

function entryIntConverter(e:any) {

	for (let key of ["playcount", "listeners", "tagcount", "userplaycount", "rank", "duration", "taggings", "reach", "bootstrap", "age", "count", "match"]) {
		if (e.hasOwnProperty(key)) {
			e[key] = toInt(e[key]); // eslint-disable-line
			continue;
		}

		if (e["@attr"]?.hasOwnProperty(key)) {
			e[key] = toInt(e["@attr"][key]); // eslint-disable-line
			delete e["@attr"];
		}
	}
	return e;

}

function entryStreamableConverter(e:any) {

	if (e.hasOwnProperty("streamable")) {
		if (e.streamable.hasOwnProperty("fulltrack")) {
			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			delete e.streamable["#text"];
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
		delete e.artist["#text"];
	}

	if (e.hasOwnProperty("album")) {
		e.album.name ||= e.album["#text"];
		delete e.album["#text"];
	}

	return e;

}

export function setDate(e:any, prop:string) {

	if (e.hasOwnProperty(prop)) {
		e[prop].datetime = e[prop]["#text"]; // eslint-disable-line
		delete e[prop]["#text"]; // eslint-disable-line
		e[prop].uts = toInt(e[prop].uts ?? e[prop].unixtime); // eslint-disable-line
		delete e[prop].unixtime; // eslint-disable-line
	}

	return e;

}

function convertGetRecentTracksEntry(e:any) {

	e = setName(e);
	e = setDate(e, "date");

	if (e?.["@attr"]?.hasOwnProperty("nowplaying")) {
		e.nowplaying = toBool(e["@attr"].nowplaying);
		delete e["@attr"];
	} else {
		e.nowplaying = false;
	}
	return convertEntry(e);

}

export const convertGetRecentTracks = (e:any) => toArray(e).map(convertGetRecentTracksEntry);

export const joinArray = (e:string[]|string) => Array.isArray(e) ? e.join(",") : e;

export function convertBasicMetaTag(res:any) {

	res.meta = res["@attr"];
	delete res["@attr"];
	res.tags = toArray(res.tag);
	delete res.tag;
	return res;

}

export function convertExtendedMeta(res:any, type:"tag"|"artist"|"album"|"track") {

	res.meta = convertMeta(res["@attr"]);
	delete res["@attr"];
	res[`${type}s`] = convertEntryArray(res[type]); // eslint-disable-line
	delete res[type]; // eslint-disable-line
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

export function convertString(str:any, name:string, props:{[key:string]:any}) {
	if (typeof str !== "string") {
		return str;
	}
	let obj:any = {};
	obj[name] = str;
	return addConditionals(obj, props);
}
