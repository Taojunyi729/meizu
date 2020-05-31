<template>
    <div class="sort-box clearfix">
      <div class="sort-order fl">
        <a href="javascript:;" @click="setSortKey('recommend')" :class="{'active': activeSortKey === 'recommend'}">推荐</a>
        <a href="javascript:;" @click="setSortKey('news')" :class="{'active': activeSortKey === 'news'}">新品</a>
        <a href="javescript:;" @click="changePrice" :class="{'active':activeSortKey === 'low' || activeSortKey === 'high'}">价格<i class="arrow icon-moon"  :class="[priceStatus]"></i></a>
      </div>
      <div class="sort-check fr">
        <input type="checkbox" v-model="haveStock">
        <span>仅显示有货商品</span>
      </div>
    </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      activeSortKey: 'recommend',
      activePrice: 'high',
      haveStock: false
    }
  },
  watch: {
    haveStock () {
      this.$emit('setHaveStock', this.haveStock)
    }
  },
  mounted () {
    this.setSortKey(this.activeSortKey)
  },
  computed: {
    priceStatus () {
      if (this.activePrice === 'low') {
        return 'icon-up'
      } else {
        return 'icon-down'
      }
    }
    // activeArrow () {
    //   if (this.activeSortKey === 'low' || this.activeSortKey === 'high') {
    //     return 'active'
    //   }
    // }
  },
  methods: {
    setSortKey (val) {
      this.activeSortKey = val
      this.$emit('getkey', this.activeSortKey)
    },
    changePrice () {
      this.activePrice = this.activePrice === 'low' ? 'high' : 'low'
      this.setSortKey(this.activePrice)
    }
  }
}
</script>

<style lang='less' scoped>
.sort-box{
  margin:30px 0 20px;
  color:#666;

  .sort-order{

    a{
      margin-right:50px;
      transition:all .2s ease;

      &:hover, &.active{
        color: #00c3f5;
      }

      &:hover .arrow{
        display: inline;
      }

      .arrow{
        display: none;
      }

      &.active .arrow{
        display: inline;
      }
    }
  }

  .sort-check{
    input, span{
      vertical-align: middle;
    }
  }
}
</style>
