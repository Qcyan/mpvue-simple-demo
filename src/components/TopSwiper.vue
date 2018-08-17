<template>
<div>
  <swiper 
  :indicator-dots="true"
  :autoplay="true" 
  :interval="3000"
  :duration="1000"
  class="swiper"
  >
  <div v-for="(top,imgindex) in imgUrls" :key='imgindex'>
    <swiper-item>
      <img  
      @click="bookDetail(img)" class="slide-image"
      v-for="img in top" :key="img.id" 
      :src="img.image" alt="" 
      mode='aspectFit'>
    </swiper-item>
  </div>
  </swiper>
</div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      // 如果通用 用chunk函数 比如lodash的chunk方法
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6.9)]
    }

  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.swiper{
  margin-top: 5rpx;
  .slide-image{
    width:33%;
    height:250rpx;
  }
}
</style>
