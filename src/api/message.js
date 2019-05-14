import axios from "@/utils/axios";
export const getMessageTip = (params={}, role) => {
    switch(role) {
        case 'trader':
        case 'putao':
            return axios({
                url:'/purchase/message/quote_tip',
                method: 'GET',
            })
        break;
        case 'supplier':
            return axios({
                url:'/purchase/message/ask_tip',
                method: 'GET',
            })
        break;
        // case 'putao':
        //     let promises = [
        //         axios({
        //             url:'/purchase/message/quote_tip',
        //             method: 'GET',
        //         }),
        //         axios({
        //             url:'/purchase/message/ask_tip',
        //             method: 'GET',
        //         })
        //     ];
        //     return Promise.all(promises)
        // break;
        default:
        return Promise.reject()
        break;
    }
}

export const getMessage = (params={},role) => {

    switch(role) {
        case 'putao':
        case 'trader':
            return axios({
                url:'/purchase/message/quote',
                method: 'GET',
            })
        break;
        case 'supplier':
            return axios({
                url:'/purchase/message/ask',
                method: 'GET',
            })
        break;
        default:
            return Promise.reject()
        break;

    }
}

export const readMessage = (params={},role) => {
    switch(role) {
        case 'putao':
        case 'trader':
            return axios({
                url:'/purchase/message/quote_read',
                method: 'GET',
                data:{
                    ...params
                }
            })
        break;
        case 'supplier':
            return axios({
                url:'/purchase/message/ask_read',
                method: 'GET',
                data:{
                    ...params
                }
            })
        break;
        default:
            return Promise.reject()
        break;
    }
}

export const marketAskTip = (params={},role) => {
    if(role == 'supplier'){
        return axios({
            url:'/purchase/message/market_ask_tip',
            method: 'GET',
            data:{
                ...params
            }
        })
    }
    return Promise.reject()
}

export const readMarketAsk = (params={})=> {
    // if(role == 'supplier') {
        return axios({
            url:'/purchase/message/market_ask_read',
            method: 'GET',
            data:{
                ...params
            }
        })
    // }
    // return Promise.reject()
}
