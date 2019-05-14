import axios from '@/utils/axios'

export const getMarket = (params = {}) => {
  if (params['id']) {
    return axios({
      url: '/purchase/market/read',
      method: 'GET',
      data: {
        id: params['id']
      }
    })
  } else {
    return axios({
      url: '/purchase/market',
      method: 'GET',
      data: {
        ...params
      }
    })
  }
}

export const saveMarket = (params = {}) => {
  // 编辑
  if (params['id']) {
    return axios({
      url: '/purchase/market/update',
      method: 'POST',
      data: {
        ...params
      }
    })
  } else {
    return axios({
      url: '/purchase/market/save',
      method: 'POST',
      data: {
        ...params
      }
    })
  }
}

export const likeMarket = (params = {}) => {
  return axios({
    url: '/purchase/market/like',
    method: 'POST',
    data: {
      ...params
    }
  })
}

export const unlikeMarket = (params = {}) => {
  return axios({
    url: '/purchase/market/unlike',
    method: 'POST',
    data: {
      ...params
    }
  })
}

export const deleteMarket = (params = {}) => {
  if (params['id']) {
    return axios({
      url: '/purchase/market/delete',
      method: 'POST',
      data: {
        ...params
      }
    })
  }
  return Promise.reject
}

export const getMyMarket = () => {
  return axios({
    url: '/purchase/market/my',
    method: 'GET'
  })
}

export const myLikeMarket = () => {
  return axios({
    url: '/purchase/market/my_like',
    method: 'GET'
  })
}

// 新建一个车源的需求
export const saveMarketAsk = (params = {}) => {
  return axios({
    url: '/purchase/market/add_ask',
    method: 'POST',
    data: {
      ...params
    }
  })
}
// 获取我发出车源的下面的需求（供应商看）
export const getMarketAsk = (params = {}) => {
  return axios({
    url: '/purchase/market/read_ask',
    data: {
      ...params
    }
  })
}

// 获取在车源下发起我的需求(销售看)
export const getMyMarketAsk = (params = {}) => {
  return axios({
    url: '/purchase/market/my_ask',
    data: {
      ...params
    }
  })
}

// 删除在车源下发起我的需求（销售删）
export const deleteMarketAsk = (params = {}) => {
  return axios({
    url: '/purchase/market/delete_ask',
    params: {
      ...params
    }
  })
}
