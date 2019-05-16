<template>
  <div class="market" @click="showAction = false;inputHide = true">
    <!-- 评论输入框 -->
    <div 
      class="comment-input"
      :class="[system]"
      v-if="inputHide == false"
      @click.stop="">
      <textarea 
        auto-height 
        fixed
        maxlength="0"  
        cursor-spacing="35rpx" 
        placeholder="评论"
        :focus="inputHide == false"
        :value="form.content"
        @blur="inputHide == true"
        @input="form.content = $event.mp.detail.value"
        @confirm="commentSubmit"/>
      <button 
        class="comment-input_btn" 
        :class="{'disabled': !form.content, 'active': form.content}"
        @click.stop='commentSubmit'>发送</button>
    </div>

    <!-- 左边 -->
    <div class="market__header">
      <div class="market__header_left">

        <img 
          v-if="one.shotcut"
          :src="one.shotcut"
          mode="aspectFill" 
          class="market__header_face">
        <img 
          v-else
          class="market__header_face"
          :src="DEFAULT_MAN"
          mode="aspectFill"/>
        
        <div class="market__header_info">
          <div class="font-blue font-bolder">
            {{one.name}}
          </div>
          <div class="market__header_little">
            {{one.company_name}}
          </div>
        </div>
      </div>
      <!-- 暂时不做 -->
      <!-- 关注api -->
      <!-- <form report-submit @submit="handleFollow" v-if="!followed">
        <button form-type="submit" class="market__header_follow font-primary">关注</button>
      </form> -->
      
    </div><!-- 左边 -->

    <!-- 车源 -->
    <div 
        class="market__content"
        @click="marketOver && marketHide ? toggle() : false"
        >
      <img :src="LOGO_PATH + one.logo" class="market__content_logo" mode="aspectFill">
      <div v-if="marketType === 'array'">
        <div
        @longpress="actionMarket"
        v-for="(item,index) in market" 
        :key="index" >
        {{item}}
        </div>
      </div>
      <div 
        v-if="marketType === 'string'"
        >
        {{market}}
      </div>
      <!-- 更多 -->
      <div class="font-blue market__content_more" 
        v-if="marketOver && marketHide"
        @click.stop="toggle"
        @longpress="actionMarket"
        >
        全文
      </div>
      <div class="font-blue market__content_more" 
        v-if="marketOver && !marketHide"
        @click.stop="toggle"
        >
        收起
      </div>
    </div>
    
    <!-- 图片 -->
    <div class="market__photo" v-if="one.photos != false">
      <div 
        class="market__photo_item"
        :class="{'market__photo_item-one': one.photos.length === 1}"
        v-for="(item,index) in one.photos"
        :key="index">
        <img 
          v-if="item"
          :class="{'market__photo_item-img': one.photos.length > 1,'market__photo_item-one': one.photos.length === 1}"
          :src="UPLOAD_PATH + item"
          :mode="one.photos.length > 1 ? 'aspectFill' : 'aspectFit'"
          @click="preview(index)"/>
      </div>
    </div>




    <!-- 时间+操作 -->
    <div class="market__time">
      <div>{{create_time}}</div>
      <div style="display:flex;">
        <div 
          class="iconfont icon-heart" 
          v-if="liked" 
          style="margin-right: 20rpx;color:#df5064"></div>
        <div 
          class="iconfont icon-more-menu market__time_action" 
          @click.stop="showAction = !showAction">
          <div class="market__time_action_list" v-if="showAction">
            <div 
              class="market__time_action_list_item" 
              @click.stop="likeMarket"
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
    <div class="comment" v-if="comment != false">
      <!-- 姓名+内容 -->
      <div 
        class="comment__item"
        v-for="(item,index) in comment" 
        :key="index"
        >
        <!-- 葡挞提醒 -->
        <span class="font-blue font-bolder" v-if="item.type === 2" style="color: rgba(255,153,0,.8)"><icon class="iconfont icon-tixing"></icon> 葡萄提醒</span>
        <span class="font-blue font-bolder" v-else>{{item.nickname}}</span>
        : {{item.content}}
      </div><!-- 姓名+内容 -->
    </div><!-- 评论 -->
  </div>
</template>

<script>
import {wxtime} from '@/utils/time.js'
import store from '@/store'
import {UPLOAD_PATH, LOGO_PATH, DEFAULT_MAN} from '@/config/common'

// 兼容
import compatible from '@/mixins/compatible'

const config = {
  overLine: 15 // 超出隐藏
}

const initForm = {
  content: ''
}

export default {
  props: ['one'],
  mounted () {
    // console.log(wx.getSystemInfoSync())
    let tmp = []
    // 车源处理
    if (this.one.market) {
      // 112字一行16个子，只显示7行
      if (this.one.market.length > 18 * config.overLine) {
        // this.market = this.one.market.slice(0, 18 * config.overLine)
        // this.marketOver = true
        // this.marketType = 'string'

        this.market = this.one.market.slice(0, 18 * config.overLine).split(/\n|\\n|\\\n/)
        this.marketOver = true
        this.marketType = 'array'
        console.log(this.market)
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

    this.comment = this.one.comment
    console.log(this.market)
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
      followed: false,
      timer: null,
      UPLOAD_PATH,
      LOGO_PATH,
      DEFAULT_MAN,

      // 内存
      comment: [],
      // 车源
      market: [],
      // 前一个状态
      emarket: '',

      // 表单
      form: {...initForm}

    }
  },
  computed: {
    create_time () {
      let time = this.one.create_time || 0
      return wxtime(time)
    }
  },
  methods: {
    handleFollow (e) {
      console.log('关注发起的数据', e.mp.detail)
      this.followed = true
    },
    preview (id) {
      wx.previewImage({
        current: UPLOAD_PATH + this.one.photos[id],
        urls: [...this.one.photos.map(item => UPLOAD_PATH + item)]
      })
      console.log(this.comment)
    },
    actionMarket () {
      let self = this
      // 操作车源
      wx.showActionSheet({
        itemList: ['复制', '举报'],
        success (res) {
          // console.log(res.tapIndex)
          switch (res.tapIndex) {
            case 0:
              wx.setClipboardData({
              // 准备复制的数据
                data: self.one.market,
                success: function (res) {
                  wx.showToast({
                    title: '复制成功'
                  })
                }
              })
          }
        },
        fail (res) {
          // console.log(res.errMsg)
        }
      })
    },
    commentSubmit () {
      if (!this.form.content) {
        return false
      }
      // 读取该车源
      // readMarket({})
      this.comment.push({
        user_id: store.state.userInfo.id,
        nickname: store.state.userInfo.nickname,
        content: this.form.content
      })
      this.form = {...initForm}
      this.inputHide = true
    },
    likeMarket () {
      this.liked = !this.liked
      this.timer = setTimeout(() => {
        this.showAction = false
      }, 500)
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
  },
  mixins: [compatible]
}
</script>

<style>

/* 布局 */
.market{
  /* background-color: #ddd; */
  /* display: flex; */
  padding: 24rpx 35rpx;
  font-size: 35rpx;
  color: #222;
  /* background-color: #ddd; */
  border-bottom: 1rpx solid #ebebeb;
}
.market-left{
  margin-right: 17rpx;
}

/* 头像 */
.market__logo{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40rpx;
}
.market__logo_img{
  width: 70rpx;
  height: 70rpx;
  border-radius: 25rpx;
}

/* 信息 */
.market__header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
  align-items: center;
}
.market__header_left{
  display: flex;

}
.market__header_info{
  flex-direction: column;
  justify-content: center;
  display: flex;
}
.market__header_follow{
  padding: 0;
  font-size: 30rpx;
  padding: 0 20rpx;
  border-width:1rpx;
  border-style:solid;
  background-color: #fff;
  border-radius:10rpx;
}
.market__header_face {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  margin-right: 35rpx;
}
.market__header_little{
  font-size: 27rpx;
  color: #aaa;
}

/* 车源 */
.market__content{
  position: relative;
}
.market__content_logo{
  width: 150rpx;
  height: 150rpx;
  opacity: .3;
  position: absolute;
  top: 0;
  right: 0;
}
/* .market__content:active{ */
  /* background-color: #f2f2f2; */
/* } */
.market__content_more{
  display: flex;
  align-items: center;
  font-size: 30rpx;
}
.market__content_more .iconfont {
  margin-left: 10rpx;
}

/* 图 */
.market__photo{
  margin-top: 30rpx;
  display: flex;
  flex-wrap: wrap;
}
.market__photo_item{
  width: 180rpx;
  height: 180rpx;
  margin-bottom: 20rpx;
  margin-right: 20rpx;
}
.market__photo_item-one{
  width: 250rpx;
  height: 250rpx;

}
.market__photo_item:nth-of-type(3n){
  margin-right: 0rpx;
}
.market__photo_item-img{
  width: 180rpx;
  height: 180rpx;
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
  left:-440rpx;
  display: flex;
  background-color: #2F2F2F;
  font-size: 30rpx;
  border-radius:10rpx;
  color: #f8f8f8;
  top: -20rpx;
}
.market__time_action_list::after{
  content: "";
  position: absolute;
  right: -40rpx;
  top: 20rpx;
  display: block;
  border-right: 25rpx solid transparent;
  border-left: 25rpx solid #2f2f2f;
  border-bottom: 25rpx solid transparent;
  border-top: 25rpx solid transparent;
}
.market__time_action_list_item{
  /* padding: 20rpx 35rpx; */
  width: 200rpx;
  height: 100rpx;
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
  padding: 20rpx 24rpx;
  width: calc(100% - 48rpx);
  bottom: 0;
  left: 0;
  background-color: #f1f1f1;
  z-index:99;
}
.comment-input textarea{
  padding: 0rpx 15rpx;
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
  padding: 0rpx 20rpx;
  margin-left: 20rpx;
  align-self:flex-end;
}
.comment-input_btn.active:active{
  background-color: rgb(7, 197, 99);
}
.comment-input_btn::after{
  border: none;
}
.comment-input_btn.disabled{
  background-color: #eee;
  color: #aaa;
  box-sizing: border-box;
}
.comment-input_btn.disabled::after{
  border: 1rpx solid #ccc;
  content: "";
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
