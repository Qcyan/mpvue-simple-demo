<template>
<div class="bookInfo">
  <div class="thumb">
    <img :src="info.image" alt="" class="back">   <!-- 背景模糊图 -->
    <img :src="info.image" alt="" class="img" mode='aspectFit'>
    <div class="info">
      <div class="title">{{info.title}}</div>
      <div class="author">{{info.author}}</div>
    </div>
  </div>
  <div class="detail">
    添加人
    <!-- <img src="userinfo.avatar"  class="avatar" alt="" mode='aspectFit'>
    {{userinfo.name}} -->
    <div class="right">
      {{info.rate}}分
       <Rate :value='info.rate'></Rate>
    </div>
  </div>
  <div class="detail">
    {{info.publisher}}
    <div class="right">{{info.price}}元</div>
  </div>
  <!-- 
    标签
  <div class="tags">
    <div class="badge" v-for="tag in info.tags" :key='tag'>{{tag}}</div>
  </div>
    简介
  <div class="summary">
    <p v-for="(sum,i )in info.summary" :key='i'>{{sum}}</p>
  </div> -->
</div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  components: {
    Rate
  },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  },
  mounted () {
    console.log(this.info)
  }
}
</script>

<style lang='scss'>
.bookInfo{
  .badge{
    display: inline-block;
    margin:5px;
    border-radius: 10rpx;
    border:1px #ea5a49 solid;
    color:#ea5a49;
    padding:5px;
  }
  .summary{
    margin-top:10rpx;
    padding:0 10rpx;
    p{
      text-indent: 2em;
      font-size:16px;
    }
  }
  font-size: 16px;
  .right{
    float:right
  }
  .detail{
    padding:5rpx 10rpx;
    .avatar{
      width:220rpx;
      height:20rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb{
    width:750rpx;
    height:500rpx;
    // overflow: hidden;
    position: relative;
    .back{
      width:100%;
      height:100%;
      filter:blur(15rpx);
    }
    .img{
      position: absolute;
      width:100%;
      height:300rpx;
      left:0;
      top:30rpx;
    }
    .info{
      color:#fff;
      position: absolute;
      width:100%;
      left:0;
      top:340rpx;
      text-align: center;
    }
    .title{
      font-size:20px;
    }
    .author{
      font-size: 16px
    }
  }
}
</style>
