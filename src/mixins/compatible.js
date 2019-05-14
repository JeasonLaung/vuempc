// 兼容
import store from '@/store'
export default {
  computed: {
    system () {
      let system = store.state.config.system
      return system.split(' ')[0]
    },
    statusBarHeight () {
      return store.state.config.statusBarHeight
    }
  }
}
