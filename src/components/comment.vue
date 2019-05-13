<template>
  <div class="market" @click="showAction = false">
    <!-- 左边 -->
    <div class="market-left">
      <div class="market__face">
        <img :src="one.logo" mode="aspectFill" class="market__face_img">
      </div><!-- 左边 -->
    </div>

    <!-- 右边 -->
    <div class="market-right">
      <!-- 用户信息 -->
      <div class="font-blue market__title">{{one.nickname}}</div>
      <div>{{one.market}}</div>

      <!-- 车源 -->
      <div class="market__content">
        <div v-for="(item,index) in market" :key="index">
          {{item}}
        </div>
      </div>
      <!-- 时间+操作 -->
      <div class="market__time">
        <div>{{create_time}}</div>
        <div class="iconfont icon-more-menu market__time_action" @click.stop="showAction = !showAction">
          <div class="market__time_action_list" v-if="showAction">
            <div class="market__time_action_list_item">
              <div class="border-right">点赞</div>
            </div>
            <div class="market__time_action_list_item">
              <div>评论</div>
            </div>
          </div>
        </div>
      </div>


      <!-- 评论 -->
      <div class="comment">
        <!-- 姓名+内容 -->
        <div class="comment__item" 
        v-for="(item,index) in one.comment" 
        :key="index"
        >
          <span class="font-blue">{{item.comment_uname}}</span>
          : {{item.content}}
        </div><!-- 姓名+内容 -->
      </div><!-- 评论 -->
    </div><!-- 右边 -->
  </div>
</template>

<script>
import {wxtime} from '@/utils/time.js'
export default {
  props: ['one'],
  mounted () {
    if (this.one.market) {
      this.market = this.one.market.split(/\n|\\n|\\\n/)
    }
  },
  data () {
    return {
      showAction: false,
      market: []
    }
  },
  computed: {
    create_time () {
      let time = this.one.create_time || 0
      return wxtime(time)
    }
  }
}
</script>

<style>

/* 布局 */
.market{
  /* background-color: #ddd; */
  display: flex;
  padding: 24rpx 27rpx;
  font-size: 35rpx;
  color: #222;
  border-bottom: 1rpx solid #ebebeb;
}
.market-left{
  margin-right: 17rpx;
}

/* 头像 */
.market__face_img{
  width: 85rpx;
  height: 85rpx;
  border-radius: 5rpx;
}

/* 信息 */
.market__title{
  margin-bottom: 20rpx; 
}

/* 时间+操作 */
.market__time{
  margin-bottom: 25rpx;
  margin-top: 40rpx;
  color: #888;
  font-size: 25rpx;
  display: flex;
  justify-content: space-between;
}
.market__time_action{
  padding: 5rpx 20rpx;
  border-radius: 10rpx;
  background-color: #f2f2f2;
  position: relative;
}
.market__time_action_list{
  position: absolute;
  left:-360rpx;
  display: flex;
  background-color: #2F2F2F;
  font-size: 30rpx;
  border-radius:10rpx;
  color: #f8f8f8;
  top: -13rpx;
}
.market__time_action_list::after{
  content: "";
  position: absolute;
  right: -40rpx;
  top: 15rpx;
  display: block;
  border-right: 25rpx solid transparent;
  border-left: 25rpx solid #2f2f2f;
  border-bottom: 25rpx solid transparent;
  border-top: 25rpx solid transparent;
}
.market__time_action_list_item{
  /* padding: 20rpx 35rpx; */
  width: 160rpx;
  height: 80rpx;
  display: flex;
  align-items:center;
  justify-content: center;
}
.market__time_action_list_item:active{
  background-color: #222;
  border-radius: 10rpx;
}
.border-right{
  width: 100%;
  text-align: center;
  border-right: 1rpx solid #fff;
}
.market__time_action_list_item:last-child{
  border: none;
}

/* 评论 */
.comment {
  margin-top: 48rpx;
  padding-bottom: 20rpx;
  padding-top: 10rpx;
  padding-left: 17rpx;
  padding-right: 17rpx;
  background-color: #f2f2f2;
  font-size: 30rpx;
  position: relative;
}
.comment::before{
  display: block;
  position: absolute;
  content: '';
  top: -18rpx;
  left: 15rpx;
  border-bottom: 20rpx solid #f2f2f2;
  border-left: 25rpx solid transparent;
  border-right: 25rpx solid transparent;
  border-top: 20 solid transparent;
}
.comment__item{
  padding: 8rpx 0;
}
.comment__item:active,.market__time_action:active{
  background-color: #ddd;
}
</style>
