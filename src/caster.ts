export function toInt(num:any) {
	
	if (typeof num === "number") {
		return num;
	}
	const res = parseInt(num, 10);
	return isNaN(res) ? void 0 : res;

}

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

export function convertImage(img:any) {

	img.url = img["#text"];
	img["#text"] = void 0;
	return img;

}

export const convertImageArray = (img:any) => toArray(img).map(convertImage);

export function convertEntry(e:any) {

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

	for (let key of ["ontour", "userloved", "subscriber", "loved"]) {
		if (e.hasOwnProperty(key)) {
			e[key] = toBool(e[key]); // eslint-disable-line
		}
	}

	if (e.hasOwnProperty("streamable")) {
		if (e.streamable.hasOwnProperty("fulltrack")) {
			e.streamable.isStreamable = toBool(e.streamable["#text"]);
			e.streamable["#text"] = void 0;
			e.streamable.fulltrack = toBool(e.streamable.fulltrack);
		} else {
			e.streamable = toBool(e.streamable?.["#text"] ?? e.streamable);
		}
	}

	if (e.hasOwnProperty("image")) {
		e.image = convertImageArray(e.image);
	}

	return e;

}

export const convertEntryArray = (e:any) => toArray(e).map(convertEntry);