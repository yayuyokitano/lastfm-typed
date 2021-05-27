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
			meta[key] = toInt(meta[key]);
		}
	}

	for (let key of ["artistcorrected", "trackcorrected"]) {
		if (meta.hasOwnProperty(key)) {
			meta[key] = toBool(meta[key]);
		}
	}

	return meta;

}