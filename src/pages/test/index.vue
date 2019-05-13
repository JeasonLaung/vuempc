<template>
  <div>
    <comment :one="xdata"/>
  </div>
</template>

<script>
import comment from '@/components/comment'
const xdata = {
  nickname: '林建华',
  logo: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584659901,369569783&fm=111&gp=0.jpg',
  id: 1,
  market: `奥迪厂家直发车，全国4S店提车
A3 全系 优惠25.4%
A4L 全系 优惠21%
A6L 19款全系 优惠6%
Q2L 全系 优惠17%
Q3 典藏版 优惠26%
Q5L 全系优惠17%
注意事项：
1、发票低开1个点
2、美的/碧桂园员工必须提供工卡+社保证明
3、只接受上葡萄公司牌，不能上其他公户`,
  create_time: 1557741240,
  photos: [
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584659901,369569783&fm=111&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584659901,369569783&fm=111&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584659901,369569783&fm=111&gp=0.jpg'
  ],
  comment: [
    {
      id: 1,
      comment_uname: '两三岁',
      comment_uid: 2,
      content: `其神级两点包括：
      其神级两点包括：
      其神级两点包括：
      其神级两点包括：
      其神级两点包括：`
    },
    {
      id: 2,
      comment_uname: '林建华',
      comment_uid: 1,
      content: `其神级两点包括：
      其神级两点包括：
      其神级两点包括：
      其神级两点包括：
      其神级两点包括：`
    },
    {
      id: 3,
      comment_uname: '杀杀杀',
      comment_uid: 3,
      content: `其神级两点包括：
      其神级两点包括：
      其神级两点包括：
      其神级两点包括：
      其神级两点包括：`
    }
  ]
}
export default {
  data () {
    return {
      xdata
    }
  },

  components: {
    comment
  },

  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
</style>
