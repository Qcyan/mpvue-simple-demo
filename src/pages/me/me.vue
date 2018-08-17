<template>
<div class="container">
   个人中心
  <div class="userinfo" @click="login">
    <img  :src="userInfo.avatarUrl" alt="">
    <p>{{userInfo.nickName}}</p>
  </div>
  <YearProgress></YearProgress>

  <!-- <button  @click='scanBook' class="btn">添加图书</button> -->

  <button v-if="!userInfo.openId" open-type="getUserInfo" lang="zh_CN" @click="doLogin">获取用户信息</button>
  <button v-if='userInfo.openId' @click='scanBook' class="btn">添加图书</button>
</div>
    
</template>

<script>
import YearProgress from '@/components/YearProgress'
import { login, showSuccess, showModel, post, getUserInfo, getSetting } from '@/utils/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/utils/config'
export default {
  data () {
    return {
      userInfo: {
        avatarUrl: '../../static/images/timg.png/',
        nickName: '点击登陆',
        openId: ''
      }
    }
  },
  components: {
    YearProgress
  },
  methods: {
    doLogin () {
      qcloud.setLoginUrl('http://localhost:5757/weapp/login')
    },
    async addBook (isBook) {
      const res = await post('/weapp/addbook', {
        isBook,
        openid: this.userInfo.openId
      })
      console.log(res)
      showModel('添加成功', `${res.title}添加成功`)
      // if (res.data.code === 0 && res.title) {
      //   showSuccess('添加成功', `${res.title}添加成功`)
      // }
    },
    scanBook () {
      // 扫码
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
          console.log(res)
        }
      })
    },
    getUser () {
      var that = this
      getSetting().then(res => {
        console.log(res)
        that.userInfo = res.userInfo
        if (res.authSetting['scope.userInfo']) {
          getUserInfo().then(ress => {
            that.userInfo = ress.userInfo
            console.log(ress.userInfo)
          })
        }
      })
    },
    login () {
      let user = wx.getStorageSync('userInfo')
      const self = this
      if (!user) {
        // 微信提供的方法获取用户信息，进行授权操作
        qcloud.setLoginUrl('http://localhost:5757/weapp/login')
        // 只要调用它的 login 方法就可以实现登录了
        console.log(qcloud)
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo)
            // 1.能获取到opendId，要再走接口
            // qcloud.request({
            //   url: config.userUrl,
            //   login: true,
            //   success (userRes) {
            //     showSuccess('登陆成功')
            //     console.log(userRes)
            //     wx.setStorageSync('userInfo', userRes.data.data)
            //     self.userInfo = userRes.data.data
            //   },
            //   fail (err) {
            //     console.log('登录失败', err)
            //   }
            // })

            // 2.这种是前端获取不到opendId,userInfo里面没有
            showSuccess('登陆成功')
            wx.setStorageSync('userInfo', userInfo)
            self.userInfo = userInfo
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userInfo = userinfo
    }
  }
  // mounted () {
  //   if (!wx.getStorageSync('userInfo')) {
  //     login().then(res => {
  //       wx.getUserInfo({
  //         success: function (res) {
  //           wx.setStorageSync('userInfo', res.userInfo)
  //           this.userInfo = res.userInfo
  //           console.log(this.userInfo)
  //         }
  //       })
  //     })
  //   }
  // }
}
</script>

<style lang='scss'>
.container {
	padding: 0 30rpx;
	box-sizing: border-box;
	.userinfo {
		text-align: center;
		img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}
	}
}
</style>
