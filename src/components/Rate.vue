<template>
<!-- 利用星星覆盖显示 -->
<div class="rate">
  <span>☆☆☆☆☆</span>
  <div class="hollow" :style="style">
    ★★★★★
  </div>
</div>
</template>

<script>
export default {
// props:['value']
  props: {
    value: {type: [Number, String], default: '0'}
  },
  computed: {
    style () {
      return `width:${this.value / 2}em`
    }
  }
}
</script>

<style lang='scss' scoped>
.rate{
  position: relative;
  display: inline-block;
  span{
    color:red;
  }
  .hollow{
    position: absolute;
    display: inline-block;
    top:0;
    left:0;
    width:2em;  //显示几个星就是这个决定
    overflow: hidden;
    color:red
  }
}
</style>
