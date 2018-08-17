<template>
<div>
  <!-- 图书信息-->
  <BookInfo :info='info'></BookInfo>
  <CommentLitst :comments='comments'></CommentLitst>
  <div class="comment" v-if="showAdd">
    <textarea 
    v-model='comment' 
    class="textarea" 
    :maxlength='100'
    placeholder="请输入图书评论"></textarea>
    <div class="location">
      地理位置：
      <switch color='#ea5a49' @change='getGeo' :checked='location'/>
      <span class='text-primary'>{{location}}</span>
    </div>
    <div class="phone">
      手机型号：
       <switch color='#ea5a49' @change='getPhone' :checked='phone'/>
      <span class='text-primary'>{{phone}}</span>
    </div>
    <button class="btn" @click='addComment'>评论</button>

  </div>
  <div v-else>
    未登录或者已经评论过了
  </div>
  <button class="btn" open-type='share'>转发给好友</button>
</div>
</template>

<script>
import { get, post } from '@/utils/util'
import BookInfo from '@/components/BookInfo'
import CommentLitst from '@/components/CommentLitst'
import { showModel, showSuccess } from '../../utils/util'
export default {
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {}, // 图书的具体详情
      comment: '',
      location: '',
      phone: '',
      comments: []
    }
  },
  components: {
    BookInfo,
    CommentLitst
  },
  computed: { // 评论过或者没登陆的不显示评论框
    showAdd () {
      // 没登陆
      if (!this.userinfo.openId) {
        return false
      }
      // 评论列表查到有自己的openid不显示
      // if (this.comments.list.filter(v => v.openid == this.userinfo.openId).length) {
      //   return false
      // }
      return true
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {
        id: this.bookid
      })
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
      console.log(info)
    },
    getGeo (e) {
      const ak = 'RmKXCpjklwyFUVVXSCXcLF4KUs0imuuy'
      const url = 'http://api.map.baidu.com/geocoder/v2/'
      console.log(e)
      // http://api.map.baidu.com/geocoder/v2/?
      // callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: res => {
            // 拿到获取到经纬度   res.latitude   res.longitude 转换成地址
            wx.request({
              url,
              data: {
                ak,
                location: `${res.latitude},${res.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        //  没选中
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
        console.log(phoneInfo)
      } else {
        //  没选中
        this.phone = ''
      }
    },
    async addComment () {
      if (!this.comment) {
        showModel('失败', '请完善信息')
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      console.log(data)
      try {
        await post('/weapp/addcomment', data)  // 添加评论完后重新置空
        showSuccess('评论成功', `评论成功`)
        this.comment = ''
        this.getComment() // 获取评论列表
      } catch (e) {
        showModel('失败', e.msg)
      }
    },
    async getComment () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.list || []
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComment() // 获取评论列表
    const userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss' scoped>
.comment {
  margin-top:10rpx;
	textarea {
		background-color: #eee;
    padding:10rpx;
		width: 730rpx;
		height: 220rpx;
	}
  .location{
    margin-top:10rpx;
  }
  .phone{
     margin-top:10rpx;
  }
}
</style>
