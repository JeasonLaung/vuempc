
import axios from "@/utils/axios";
export const changeInfo = (params={}) =>{
    return axios({
        url: '/purchase/user/change_info',
        method: 'POST',
        data:{
            ...params,
        }
    })
} 