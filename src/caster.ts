export function toInt(num:any) {
	
	if (typeof num === "number") {
		return num;
	}
	const res = parseInt(num, 10);
	return isNaN(res) ? void 0 : res;

}

export function toBool(bool:any) {
	return bool !== 0 && bool && bool !== "0";
}

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