<template>
<!-- 图书列表信息 -->
<a :href="detailUrl">
<div class="bookCard">
  <div class="thumb" @click.stop="preview">
    <img 
    :src="book.image" alt="" class="img" 
    mode='aspectFit'>
  </div>
  <div class="detail">
    <div class="row">
      <div class="right">
        <!-- 分数 -->
        {{book.rate}} <Rate :value='book.rate'></Rate>
      </div>
      <div class="left">
        {{book.title}}
      </div>
    </div>
    <div class="row">
      <div class="right">
         浏览量：{{book.count}}
      </div>
      <div class="left">
        作者：{{book.author}}
      </div>
    </div>
    <div class="row">
      <div class="right">
        {{book.publisher}}
      </div>
      <div class="left">
        <!-- 添加人{{book.user_info.nickName}} -->
      </div>
    </div>
  </div>
</div>
</a>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['book'],
  components: {
    Rate
  },
  methods: {
    preview () {
      // 预览图片
      wx.previewImage({
        current: this.book.img,
        urls: [this.book.image]
      })
    }
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  }
}
</script>

<style lang='scss' scoped>
.bookCard {
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size:14px;
  .thumb{
    width: 90px;
    height:90px;
    float:left;
    margin:0 auto;
    overflow: hidden;
    .img{
      max-width:100%;
      max-height:100%;
    }
  }
  .detail{
    margin-left:100px;
    .row{
      line-height: 20px;
      margin-bottom:3px;
    }
    .right{
      float:right;
    }
    .left{
      margin-right:80px
    }
  }
}
</style>
