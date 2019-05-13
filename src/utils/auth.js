import store from "@/store"
export const create = (arr,role) => {
	let tmp = []
	if (role == '*') {
		return arr
	}
	for(let i in arr) {
		//
		if(!arr[i].auth) {
			tmp.push(arr[i])
		}
		else if(arr[i].auth && arr[i].auth.includes(role)) {
			tmp.push(arr[i])
		}
	}
	return tmp
}

