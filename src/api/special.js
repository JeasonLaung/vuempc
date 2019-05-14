import axios from "@/utils/axios";

export const getSpecial = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/special/read',
	        method: 'GET',
	        data: {
	        	id: params['id']
	        }
	    })
	}

	else{
		return axios({
	        url:'/purchase/special/index',
	        method: 'GET',
	        data: {
	        	...params,
	        }
	    })
	}
}

export const saveSpecial = (params={}) => {
    //编辑
    // let file = params['uploads']
    // delete(params['uploads'])
	if (params['id']) {
		return axios({
	        url:'/purchase/special/update',
	        method: 'POST',
	        data: {
	        	...params
            },
	    })
	}
	//新建
	else{
		return axios({
	        url:'/purchase/special/save',
	        method: 'POST',
	        data: {
	        	...params,
            },            
	    })
	}
}

// export const likeAsk = (params={}) => {
// 	return axios({
//         url:'/purchase/ask/like',
//         method: 'POST',
//         data: {
//         	...params
//         }
//     })
// }

// export const unlikeAsk = (params={}) => {
// 	return axios({
//         url:'/purchase/ask/unlike',
//         method: 'POST',
//         data: {
//         	...params
//         }
//     })
// }

export const deleteSpecial = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/special/delete',
	        method: 'POST',
	        data: {
	        	...params
	        }
	    })
	}
	return new Promise((res,rej)=>{rej()}) 
}

export const mySpecial = (params={}) => {
	return axios({
        url:'/purchase/special/my',
        method: 'GET',
        data: {
        	...params
        }
    })
}

export const getMySpecial = () => {
	return axios({
		url:'/purchase/special/my',
		method: 'GET',
	})
}
export const myLikeSpecial = () => {
	return axios({
		url:'/purchase/special/my_like',
		method: 'GET',
	})
}