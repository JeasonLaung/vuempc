// import storage from './storage.js';
import cookie from './cookie.js'
import store from '@/store'
import {REQUEST_HOST} from '@/config/common'
export default (config)=>{
	let BASE_URL = REQUEST_HOST;
	let {
		url,
		data,
		header,
		method,
		dataType,
		responseType,
		success,
		fail,
		complete,
		
		all,
		absolute,/*绝对路径*/
		nowait,
		upload,
		name,
		filePath
	} = config;
	
	let uid = wx.getStorageSync('pt_tk');

	// header = {}
	// header['X-Putao-Signature'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqZWFzb24ueHl6IiwiYXVkIjoiamVhc29uLnh5eiIsInVpZCI6IjMiLCJwX3JvbGUiOiIyIiwiaWF0IjoxNTUyNzkwMjM4fQ.JT96Jr55rYBkcEfM5XnuNLQNMCKCyV5xCfuqC_1D_OHtcrMhp2qpzoX8tPr2lPUFHp9mh2qKjL5b-gCBDWtGEpXwRtDf4wzzro0vY47QBlztjxOb195egBj2FCcARz2C4Tul5F57czy8q9TBxldYY026XfJNhAekZu8LWsxK4EM'

	if(!header){
		header = {};
	}
	// 存在X-putao签名，带上头
	let sign = cookie.get('X-Putao-Signature');
	let session = store.state.sessionKey
	if (sign) {
		header['X-Putao-Signature'] = sign;
	}

	if (session) {
		header['X-Putao-Session'] = session;
	}

	if(method && method.toLowerCase() == 'POST'){
		header['Content-Type'] = 'application/json, text/plain, */*';
	}
	// 获取用户登录的openid,并setheader
	if(uid){
		header['Cookie'] = 'pt_tk='+uid+';';
	}
	// console.log(header)
	if (!nowait) {
		wx.showLoading({
			title:'数据加载中',
			mask: true
		})
	}
	

	if(!upload){
		return new Promise((resolve,reject)=>{
			mpvue.request({
				url: absolute ? url : BASE_URL+url,
				data:data,
				header: header,
				method: method || 'GET',
				success: (data)=>{
					wx.hideLoading();
					if (!all) {
						resolve(data.data);
					}else{
						resolve(data);
					}
	
				},
				failed: (res)=>{
					wx.hideLoading();
					reject(res);
				},
				complete: ()=>{
					wx.hideLoading();
				}
			})
		})
	}
	else{
		return new Promise((resolve,reject)=>{
			mpvue.uploadFile({
				url: absolute ? url : BASE_URL+url,
				filePath: filePath,
				name: name,
				formData:data,
				header,
				success: (data)=>{
					wx.hideLoading();
					if (!all) {
						try{
							resolve(JSON.parse(data.data))
						}
						catch(e){
							resolve(data.data);
						}
					}else{
						resolve(data);
					}
	
				},
				failed: (res)=>{
					wx.hideLoading();
					reject(res);
				},
				complete: ()=>{
					wx.hideLoading();
				}
			})
		})
	}
	
}