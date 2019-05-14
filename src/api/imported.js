import axios from "@/utils/axios";

export const getImported = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/imported/read',
	        method: 'GET',
	        data: {
	        	id: params['id']
	        }
	    })
	}

	else{
		return axios({
	        url:'/purchase/imported',
	        method: 'GET',
	        data: {
	        	...params,
	        }
	    })
	}
}

export const saveImported = (params={}) => {
    //编辑
    let file = params['uploads']
    delete(params['uploads'])
	if (params['id']) {
		return axios({
	        url:'/purchase/imported/update',
	        method: 'POST',
	        data: {
	        	...params
            },
	    })
	}
	//新建
	else{
		return axios({
	        url:'/purchase/imported/save',
	        method: 'POST',
	        data: {
	        	...params,
            },
            // name:'uploads',
            // filePath:file,
            // upload:true
            
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

export const deleteImported = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/imported/delete',
	        method: 'POST',
	        data: {
	        	...params
	        }
	    })
	}
	return new Promise((res,rej)=>{rej()}) 
}

export const myImported = (params={}) => {
	return axios({
        url:'/purchase/imported/my',
        method: 'GET',
        data: {
        	...params
        }
    })
}

export const getMyImported = () => {
	return axios({
		url:'/purchase/imported/my',
		method: 'GET',
	})
}
export const myLikeImported = () => {
	return axios({
		url:'/purchase/imported/my_like',
		method: 'GET',
	})
}