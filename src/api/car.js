import axios from "@/utils/axios";

export const getCarList = () => {
    return axios({
        url:'/api/car/car_list',
        method: 'GET'
    })
}

export const getUpdateCarList = () => {
    return axios({
        url:'/api/car/update_time',
        method: 'GET',
        nowait:true
    })
}

export const getSpec = (params={}) => {
    return axios({
        url:'/api/car/get_spec',
        method: 'GET',
        data: {
            ...params
        }
    })
}