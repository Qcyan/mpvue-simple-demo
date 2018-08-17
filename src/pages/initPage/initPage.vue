<template>
<div>
  <!-- <div class="hd" style="transform:rotateZ({{angle}}deg);">  -->
    <!-- <image class="logo" src="{{userInfo.avatarUrl}}"></image>
    <image class="wave" src="../../images/wave.png" mode="aspectFill"></image> -->
    <image class="wave wave-bg" src="/static/images/wave.png" mode="aspectFill"></image>
  <!-- </div> -->
  <button open-type="getUserInfo" class="btn"  @click="doLogin">开启美好一天</button>
  <!-- <div @click='changePage' class="btn">开启美好一天</div> -->
</div>

</template>

<script>
// import qcloud from 'wafer2-client-sdk'
// import { getSetting } from '@/utils/util'
export default {
  data () {
    return {
      resInit: {
        authSetting: {}
      }
    }
  },
  methods: {
    changePage () {
      console.log('ssss')
      wx.switchTab({
        url: '../me/main'
      })
    },
    doLogin () {
      wx.authorize({
        scope: 'scope.userInfo',
        success () {
          wx.getUserInfo({
            success: function (res) {
              console.log('******')
              console.log(res.userInfo)
              wx.setStorageSync('userInfo', res.userInfo)
              wx.switchTab({
                url: '../me/main'
              })
            }
          })
        }
      })
    }
  },
  created () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('vvvvvvvvv')
          wx.switchTab({
            url: '../me/main'
          })
        }
      }
    })
  }
}
</script>

<style scoped lang='scss'>
.btn{
  width: 120px;
  height:50px;
  background-color: #40486d;
  text-align: center;
  margin: 200px auto 0;
  line-height: 50px;
  color:#fff
}
.hd {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1000rpx;
  margin-left: -500rpx;
  height: 200rpx;
  transition: all .35s ease;
}
.logo {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 200rpx;
  width: 160rpx;
  height: 160rpx;
  margin-left: -80rpx;
  border-radius: 160rpx;
  animation: sway 10s ease-in-out infinite;
  opacity: .95;
}
@keyframes sway{
  0% {transform: translate3d(0,20rpx,0) rotate(-15deg); }
  17% {transform: translate3d(0,0rpx,0) rotate(25deg); }
  34% {transform: translate3d(0,-20rpx,0) rotate(-20deg); }
  50% {transform: translate3d(0,-10rpx,0) rotate(15deg); }
  67% {transform: translate3d(0,10rpx,0) rotate(-25deg); }
  84% {transform: translate3d(0,15rpx,0) rotate(15deg); }
  100% {transform: translate3d(0,20rpx,0) rotate(-15deg); }
}
.wave {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  opacity: 0.725;
  height: 260rpx;
  width: 2250rpx;
  animation: wave 10s linear infinite;
}
.wave-bg {
  z-index: 1;
  animation: wave-bg 10.25s linear infinite;
}
@keyframes wave{
  from {transform: translate3d(125rpx,0,0);}
  to {transform: translate3d(1125rpx,0,0);}
}
@keyframes wave-bg{
  from {transform: translate3d(375rpx,0,0);}
  to {transform: translate3d(1375rpx,0,0);}
}
</style>
