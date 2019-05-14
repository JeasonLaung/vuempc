import axios from "@/utils/axios";

export const getAsk = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/ask/read',
	        method: 'GET',
	        data: {
	        	id: params['id']
	        }
	    })
	}

	else{
		return axios({
	        url:'/purchase/ask',
	        method: 'GET',
	        data: {
	        	...params,
	        }
	    })
	}
}

export const saveAsk = (params={}) => {
	//编辑
	if (params['id']) {
		return axios({
	        url:'/purchase/ask/update',
	        method: 'POST',
	        data: {
	        	...params
	        }
	    })
	}
	//新建
	else{
		return axios({
	        url:'/purchase/ask/save',
	        method: 'POST',
	        data: {
	        	...params,
	        }
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

export const deleteAsk = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/ask/delete',
	        method: 'POST',
	        data: {
	        	...params
	        }
	    })
	}
	return new Promise((res,rej)=>{rej()}) 
}

export const getMyAsk = (params={}) => {
	return axios({
        url:'/purchase/ask/my',
        method: 'GET',
        data: {
        	...params
        }
    })
}