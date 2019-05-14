import axios from "@/utils/axios";

export const joinCompany = (params={}) => {
    return axios({
        url: '/purchase/company/join',
        method: 'POST',
        data: {
            ...params
        }
    })
}
export const quitCompany = (params={}) => {
    return axios({
        url: '/purchase/company/quit',
        method: 'POST',
        data: {
            ...params
        }
    })
}

export const fastJoin = (params={}) => {
    return axios({
        url: '/purchase/company/fast_join',
        method: 'POST',
        data: {
            ...params
        }
    })
    
}

export const registerCompany = (params={}) => {
    return axios({
        url: '/purchase/company/register',
        method: 'POST',
        data: {
            ...params
        }
    })
}

export const joinPerson = (params={}) => {
    return axios({
        url: '/purchase/company/add_person',
        method: 'POST',
        data: {
            ...params
        }
    })
}

export const getCompany = (params={}) => {
    if(params['id']){
        return axios({
            url: '/purchase/company/read',
            method: 'get',
            data: {
                ...params
            }
        })
    }
    else{
        return axios({
            url: '/purchase/company/index',
            method: 'get',
            data: {
                ...params
            }
        })
    }
    
}

export const saveCompany = (params={}) => {
    return axios({
        url: '/purchase/company/update',
        method: 'post',
        data: {
            ...params
        }
    })
}

export const myCompany = () => {
    return axios({
        url: '/purchase/company/my',
        method: 'get',
    })
}

export const staffCompany = (params={}) => {
    return axios({
        url: '/purchase/company/staff',
        method: 'get',
        data: {
            ...params
        }
    })
}


export const waitCompany = () => {
    return axios({
        url: '/purchase/company/wait',
        method: 'get',
    })
}

