<template>
  <div class="market" @click="showAction = false;inputHide = true">
    <!-- 评论输入框 -->
    <div class="comment-input" v-if="inputHide == false">
      <textarea auto-height maxlength="0"  cursor-spacing="25rpx" auto-focus/>
      <button class="comment-input_btn">发送</button>
    </div>

    <!-- 左边 -->
    <div class="market-left">
      <div class="market__face">
        <img :src="one.logo" mode="aspectFill" class="market__face_img">
      </div><!-- 左边 -->
    </div>

    <!-- 右边 -->
    <div class="market-right">
      <!-- 用户信息 -->
      <div class="market__header">
        <div class="font-blue font-bolder">
          {{one.nickname}}
        </div>
        <!-- 关注日后开发 -->
        <!-- <div class="market__header_follow">
          关注
        </div> -->
      </div>
      

      <!-- 车源 -->
      <div class="market__content">
        <div 
         v-if="marketType === 'array'"
         v-for="(item,index) in market" 
         :key="index" 
         >
          {{item}}
        </div>
        <div 
         v-if="marketType === 'string'"
         >
          {{market}}
        </div>
        <!-- 更多 -->
        <div class="font-blue market__content_more" 
         v-if="marketOver && marketHide"
         @click="toggle"
         >
          更多 <i class="iconfont icon-bottom"></i>
        </div>
        <div class="font-blue market__content_more" 
         v-if="marketOver && !marketHide"
         @click="toggle"
         >
          收起 <i class="iconfont icon-top"></i>
        </div>
      </div>
      <!-- 时间+操作 -->
      <div class="market__time">
        <div>{{create_time}}</div>
        <div style="display:flex;">
          <div class="iconfont icon-heart1" v-if="liked" style="margin-right: 10rpx;"></div>
          <div class="iconfont icon-more-menu market__time_action" @click.stop="tell">
            <div class="market__time_action_list" v-if="showAction">
              <div 
                class="market__time_action_list_item" 
                @click="liked = !liked"
                >
                  <i class="iconfont icon-heart1"></i>
                  {{ liked ? '取消' : '赞'}}
              </div>
              <div 
                class="market__time_action_list_item"
                @click="inputHide = false"
                >
                  <i class="iconfont icon-message2"></i>
                  评论
              </div>
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
          <span class="font-blue font-bolder">{{item.comment_uname}}</span>
          : {{item.content}}
        </div><!-- 姓名+内容 -->
      </div><!-- 评论 -->
    </div><!-- 右边 -->
  </div>
</template>

<script>
import {wxtime} from '@/utils/time.js'

const config = {
  overLine: 7 // 超出隐藏
}

export default {
  props: ['one'],
  mounted () {
    let tmp = []
    // 车源处理
    if (this.one.market) {
      // 112字一行16个子，只显示7行
      if (this.one.market.length > 16 * config.overLine) {
        this.market = this.one.market.slice(0, 16 * config.overLine)
        this.marketOver = true
        this.marketType = 'string'
      } else {
        tmp = this.one.market.split(/\n|\\n|\\\n/)
        if (tmp.length > config.overLine) {
          // 超出行数设定
          this.market = tmp.slice(0, config.overLine)
          this.marketOver = true
        } else {
          this.market = tmp
          this.marketOver = false
        }
        this.marketType = 'array'
      }
    }
    // 点赞处理
    this.liked = this.one.liked
  },
  data () {
    return {
      // status状态值
      showAction: false,
      marketOver: false,
      marketHide: true,
      inputHide: true,
      marketType: '',
      liked: false,

      // 车源
      market: [],
      emarket: '' // 前一个状态
    }
  },
  computed: {
    create_time () {
      let time = this.one.create_time || 0
      return wxtime(time)
    }
  },
  methods: {
    tell () {
      this.showAction = !this.showAction
      console.log(this.showAction)
    },
    toggle () {
      if (!this.emarket) {
        // 前一个状态不存在证明这时为第一次渲染，到第二次渲染时则存在，所以这时marketHide=true，则点击显示更多
        this.emarket = this.market
        this.market = this.one.market.split(/\n|\\n|\\\n/)
        this.marketType = 'array'
        this.marketHide = false
      } else {
        // 第二次渲染过了
        [this.emarket, this.market] = [this.market, this.emarket]
        this.marketHide = !this.marketHide
        this.marketType = (this.market instanceof Array) ? 'array' : 'string'
      }
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
.market__header{
  margin-bottom: 20rpx; 
  display: flex;
  justify-content: space-between;
}

/* 车源 */
.market__content_more{
  display: flex;
  align-items: center;
  font-size: 30rpx;
}
.market__content_more .iconfont {
  margin-left: 10rpx;
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
.market__time_action_list_item .iconfont{
  margin-right: 10rpx;
}
.border-right{
  width: 100%;
  text-align: center;
  border-right: 1rpx solid #222;
}
.market__time_action_list_item:last-child{
  border: none;
}

/* 评论输入框 */
.comment-input{
  border-top: 1rpx solid #ddd;
  min-height: 50rpx;
  display: flex;
  align-items: center;
  /* width: 100%; */
  position: fixed;
  padding: 15rpx 24rpx;
  width: calc(100% - 48rpx);
  bottom: 0;
  left: 0;
  background-color: #f1f1f1;
  z-index:99;
}
.comment-input textarea{
  padding: 10rpx 15rpx;
  background: #fff;
  /* width: calc(100% - 70rpx); */
  flex:1;
  border-radius: 10rpx;
}
.comment-input_btn{
  font-size: 30rpx;
  color: #fff;
  background-color: rgba(7, 197, 99, .9);
  padding: 0;
  border: none;
  padding: 0 20rpx;
  margin-left: 20rpx;
  align-self:flex-end;
}
.comment-input_btn::after{
  border: none;
}
.comment-input_btn .disable{
  color: #ddd;
  background: #f2f2f2;
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
