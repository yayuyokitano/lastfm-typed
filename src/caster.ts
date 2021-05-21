export function toInt(num:any) {
	
	if (typeof num === "number") {
		return num;
	}
	return parseInt(num, 10);

}

export function toBool(bool:any) {
	return bool && bool !== "0";
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