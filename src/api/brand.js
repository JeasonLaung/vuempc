import axios from "@/utils/axios";

export const allBrands = () => {
    return axios({
        url:'/purchase/brand',
        method: 'GET'
    })
}

export const typeOfBrand = (params={}) => {
    console.log(params)
    return axios({
        url:'/purchase/brand/type',
        method: 'GET',
        data: {
            ...params
        }
    })
}

export const followBrand = (params={}) => {
    console.log(params)
    return axios({
        url:'/purchase/brand/follow',
        method: 'POST',
        data: {
            ...params
        }
    })
}
export const unfollowBrand = (params={}) => {
    console.log(params)
    return axios({
        url:'/purchase/brand/unfollow',
        method: 'POST',
        data: {
            ...params
        }
    })
}
export const getFollowBrand = () => {
    return axios({
        url:'/purchase/brand/get_follow',
        method: 'GET'
    })
}