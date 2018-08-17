<script>
import { get, login } from './utils/util'
// import qcloud from 'wafer2-client-sdk'
// import config from './utils/config'
export default {
  async created () {
    console.log('小程序启动了')
  	// qcloud.setLoginUrl('http://localhost:5757/weapp/login')
    // await qcloud.login({
    //   success: function (userInfo) {
    //     console.log('登录成功', userInfo)
    //   },
    //   fail: function (err) {
    //     console.log('登录失败', err)
    //   }
    // })

    // 测试get请求的成功
    const res = await get('/weapp/demo')
    console.log(res)

      // 调用API从本地缓存中获取数据
      // const logs = wx.getStorageSync('logs') || []
      // logs.unshift(Date.now())
      // wx.setStorageSync('logs', logs)
  },
  mounted () {
    login().then(res => {
      console.log(res)
    })
  }
}
</script>

<style>
/* .container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 200rpx 0;
	box-sizing: border-box;
} */
/* this rule will be remove */
* {
	transition: width 2s;
	-moz-transition: width 2s;
	-webkit-transition: width 2s;
	-o-transition: width 2s;
}
.text-footer {
	text-align: center;
	font-size: 12px;
}
.text-primary {
	color: #ea5149;
}
.right {
	float: right;
}
.page-title {
	padding-left: 20rpx;
	background-color: #ccc;
	line-height: 40rpx;
	font-size: 14px;
}
.btn {
	color: white;
	background: #ea5a49;
	margin-bottom: 10px;
	padding: 0 15px;
	border-radius: 2px;
	font-size: 16px;
	line-height: 40px;
	height: 40px;
	width: 100%;
}
.btn:active {
	background: #fa5a49;
}
</style>
