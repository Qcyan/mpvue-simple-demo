<template>
<div class="container">
  <!-- 图片滚动 -->
  <TopSwiper :tops='tops'></TopSwiper>
  <!-- 图书信息 -->
  <Card v-for="(item,index) in books" :key='item.id' :book='item'></Card>
  <p class="text-footer" v-if="!more">
    没有更多数据
  </p>
</div>
</template>

<script>
// 下拉加载更多
// 1. page=0 不能显示
// 2. page>0 数据长度<10 停止触底加载
import { get } from '@/utils/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  methods: {
    async getList (init) {  // init用来判断下拉刷新/初始加载  还是 上拉加载更多
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading() // 在当前页面显示导航条加载动画
      const books = await get('/weapp/bookList', {
        page: this.page
        // pageSize: 10
      })
      this.books = books.list
      console.log(books.list.length + '------------------' + this.page)
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stoppullDownRefresh() // 去掉下拉状态
      } else {
        this.books = this.books.concat(books.list)
      }

      wx.hideNavigationBarLoading() // 隐藏导航条加载动画
    },
    async getTop () {
      const tops = await get('/weapp/top')
      console.log(tops)
      this.tops = tops.list
    }
  },
  onpullDownRefresh () {
    console.log('下拉')
    this.getList(true)
    this.getTop()
  },
  onReachBottom () {
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page + 1
    this.getList()
  },
  onLoad () {
    this.getList(true)
    this.getTop() // 获取排行榜
  }
}
</script>

<style lang='scss'>
</style>
