// import storage from './storage.js'
import cookie from './cookie.js'
import store from '@/store'
import {REQUEST_HOST} from '@/config/common'
export default (config) => {
  let BASE_URL = REQUEST_HOST
  let {
    url,
    data,
    header,
    method,
    // dataType,
    // responseType,
    // success,
    // fail,
    // complete,
    // 额外参数
    all,
    absolute, /* 绝对路径 */
    nowait,
    upload,
    name,
    filePath
  } = config
  let uid = wx.getStorageSync('pt_tk')

  if (!header) {
    header = {}
  }
  // 存在X-putao签名，带上头
  let sign = cookie.get('X-Putao-Signature')
  let session = store.state.sessionKey
  if (sign) {
    header['X-Putao-Signature'] = sign
  }

  if (session) {
    header['X-Putao-Session'] = session
  }

  if (method && method.toLowerCase() === 'POST') {
    header['Content-Type'] = 'application/json, text/plain, */*'
  }
  // 获取用户登录的openid,并setheader
  if (uid) {
    header['Cookie'] = 'pt_tk=' + uid + ''
  }

  // console.log(header)
  if (!nowait) {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
  }

  if (!upload) {
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: absolute ? url : BASE_URL + url,
        data: data,
        header: header,
        method: method || 'GET',
        success (data) {
          wx.hideLoading()
          if (!all) {
            resolve(data.data)
          } else {
            resolve(data)
          }
        },
        failed (res) {
          wx.hideLoading()
          reject(res)
        },
        complete () {
          wx.hideLoading()
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      mpvue.uploadFile({
        url: absolute ? url : BASE_URL + url,
        filePath: filePath,
        name: name,
        formData: data,
        header,
        success (data) {
          wx.hideLoading()
          if (!all) {
            try {
              resolve(JSON.parse(data.data))
            } catch (e) {
              resolve(data.data)
            }
          } else {
            resolve(data)
          }
        },
        failed (res) {
          wx.hideLoading()
          reject(res)
        },
        complete () {
          wx.hideLoading()
        }
      })
    })
  }
}
