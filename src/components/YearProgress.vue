<template>
<div class="progressbar">
  <p>进度条</p>
  <progress :percent="percent" activeColor='#ea5a49'/>
  <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
</div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start是今年第一天
      // 现在的时间戳 - 0月第一天的时间戳
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style lang='scss'>
.progressbar {
	width: 100%;
  margin-bottom:40rpx;
	progress {
		margin-bottom: 20rpx;
   
	}
}
</style>
