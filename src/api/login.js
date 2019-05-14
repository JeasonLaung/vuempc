import cookie from '@/utils/cookie'
import axios from '@/utils/axios'
import store from '@/store'

export const getPhone = (params={}) => {
    return axios({
        url: '/purchase/login/get_phone',
        method: 'post',
        data:{
            ...params
        }
    })
}

export const info = ()=>{
    return axios({
        url: '/purchase/login/info',
        method: 'post'
    })
}
// 失败要报错
export const register = (params) => {
    return axios({
        url: '/purchase/login/register',
        method: 'POST',
        data:{
            ...params,
        },
        all:true
    })
}

export const captcha = (params) => {
    return axios({
        url: '/purchase/login/captcha',
        method: 'POST',
        data:{
            ...params,
        }
    })
}

export const registerByPhone = (params={}) => {
    return axios({
        url: '/purchase/login/register_by_phone',
        method: 'POST',
        data:{
            ...params,
        },
        all:true
    })
}

export const login = (params={}) => {
    return axios({
        url: '/purchase/login/login',
        method: 'POST',
        data:{
            ...params,
        },
        all:true
    })
    // .then(data=>{
    //     try{const sign = data['header']['X-Putao-Signature']}
    //     catch(e){}
    //     if(!sign){

    //     }

    //     cookie.set('X-Putao-Signature',data['header']['X-Putao-Signature'])

    //     // var pages = getCurrentPages()    //获取加载的页面
    //     // var currentPage = pages[pages.length-1]    //获取当前页面的对象
    //     // var url = currentPage.route    //当前页面url
        
    //     // info().then(({data})=>{
    //     //     store.commit('setUserInfo',data)
    //     // })

        
    //     // // console.log(getCurrentPages())
    //     // console.log(url)

    //     mpvue.reLaunch({url})

    // })
}


export const aLogin = (params) => {
    return axios({
        url: '/purchase/login/alogin',
        method: 'POST',
        data: {
            ...params
        },
        all:true
    })
}



