// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '@/config/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    msgTimer: null,
    msgTip: 0,
    marketAskTip: 0,
    currentTabBar: 'my',
    sessionKey: '',
    role: '',
    count: 0,

    brand: {
      id: '',
      name: '',
      img: '',
      letter: ''
    },

    askBrand: {
      id: '',
      name: '',
      img: '',
      letter: ''
    },

    userInfo: {
      id: '17086',
      name: '盛盛',
      nickname: '盛盛夺人',
      phone: '',
      role: '',
      company_name: '',
      is_admin: '',
      shotcut: ''
    },

    config: {
      'model': '',
      'pixelRatio': '',
      'windowWidth': '',
      'windowHeight': '',
      'system': '',
      'language': '',
      'version': '',
      'screenWidth': 0,
      'screenHeight': 0,
      'SDKVersion': '',
      'brand': '',
      'fontSizeSetting': 0,
      'batteryLevel': 0,
      'statusBarHeight': 0,
      'platform': ''
    }
  },
  mutations: {
    // 设置主页的品牌
    setBrand (state, param) {
      state.brand = {...param}
    },

    setConfig (state) {
      state.config = {
        ...wx.getSystemInfoSync()
      }
    },

    setMarketAskTip (state, value) {
      state.marketAskTip = value || 0
      if (value) {
        mpvue.setTabBarBadge({
          index: 1,
          text: String(value)
        })
      }
    },

    marketAskDecrement (state) {
      state.marketAskTip -= 1
      /* 小于等于0时移除 */
      if (state.marketAskTip <= 0) {
        state.marketAskTip = 0
        mpvue.removeTabBarBadge({
          index: 1
        })
        return false
      }
      mpvue.setTabBarBadge({
        index: 1,
        text: String(state.msgTip)
      })
    },

    msgTipDecrement (state) {
      state.msgTip -= 1
      /* 小于等于0时移除 */
      if (state.msgTip <= 0) {
        mpvue.removeTabBarBadge({
          index: 2
        })
        return false
      }
      mpvue.setTabBarBadge({
        index: 2,
        text: String(state.msgTip)
      })
    },

    setMsgTip (state, value) {
      state.msgTip = value || 0
    },

    clearMsgTimer (state) {
      clearInterval(state.msgTimer)
    },

    setCurrentTabBar (state, params) {
      for (let i in params) {
        state.currentTabBar = params[i]
      }
    },
    setSessionKey (state, params) {
      let {sessionKey} = params
      state.sessionKey = sessionKey
    },
    changeInfo (state, params) {
      console.log(params)
      for (let i in params) {
        state.userInfo[i] = params[i]
      }
    },
    setUserInfo (state, params) {
      state.userInfo = {
        ...params
      }
      state.role = auth[params['role']] || ''
    },
    setAskBrand (state, params) {
      console.log(params)
      state.askBrand = {
        ...params
      }
    },
    increment (state) {
      const obj = state
      obj.count += 1
    },
    decrement (state) {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store
