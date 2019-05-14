import axios from "@/utils/axios";

export const getQuote = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/quote/read',
	        method: 'GET',
	        data: {
	        	id: params['id']
	        }
	    })
	}
	else{
		return axios({
	        url:'/purchase/ask/quote',
	        method: 'GET',
	        data: {
	        	...params
	        }
	    })
	}
}

export const saveQuote = (params={}) => {
	//编辑
	if (params['id']) {
		return axios({
	        url:'/purchase/quote/update',
	        method: 'POST',
	        data: {
	        	...params
	        }
	    })
	}
	//新建
	else{
		return axios({
	        url:'/purchase/quote/save',
	        method: 'POST',
	        data: {
	        	...params,
	        }
	    })
	}
}


export const deleteQuote = (params={}) => {
	if (params['id']) {
		return axios({
	        url:'/purchase/quote/delete',
	        method: 'POST',
	        data: {
	        	...params
	        }
	    })
	}
	return new Promise((res,rej)=>{rej()}) 
}

export const getMyQuote = (params={}) => {
	return axios({
        url:'/purchase/quote/my',
        method: 'GET',
        data: {
        	...params
        }
    })
}