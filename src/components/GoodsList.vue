<template>
  <ul class="clearfix">
    <li class="goods-list" v-for="(item, index) in data" :key="index" :class="{'last-child':(index+1) % 4 === 0}">
      <a :href="item.href">
        <div v-if="item.newProduct" class="new-product">新品</div>
        <img :src="item.goodsUrl" alt="">
        <div class="goods-name">{{item.goodsName}}</div>
        <div class="goods-desc">{{item.goodsDesc}}</div>
        <div class="goods-price">
          <i>￥</i>
          {{item.goodsPrice}}
          <span v-if="item.lower" class="goods-lower">起</span>
          <span v-if="item.oldPrice" class="goods-oldprice">￥{{item.oldPrice}}</span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script type="text/javascript">
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang='less' scoped>
.goods-list{
  width:303px;
  height:400px;
  background-color: #fff;
  text-align:center;
  margin-top:10px;
  margin-right:9px;
  float:left;
  overflow: hidden;
  cursor:pointer;
  transition:all .3s ease;
  position:relative;

  &:hover{
    box-shadow:0 10px 30px rgba(0, 0, 0, 0.3)
  }

  &.last-child{
    margin-right:0
  }

  img{
    height:230px;
    margin-top:30px
  }

  .goods-name{
    font-size:16px;
    color:#333;
    margin:30px 0 2px
  }

  .goods-desc{
    font-size: 14px;
    color: #999
  }

  .goods-price{
    display: inline-block;
    position:relative;
    font-size:22px;
    color:#c00;
    padding-left:14px;

    i{
      font-style:normal;
      font-size:14px;
      position:absolute;
      left:0;
      top:5px
    }

    .goods-lower{
      font-size:16px;
    }

    .goods-oldprice{
      font-size:14px;
      color: #666;
      margin-left:8px;
      text-decoration:line-through;
    }
  }

  .new-product{
    width:60px;
    height:60px;
    border-radius: 50%;
    font-size:16px;
    line-height:60px;
    text-align: center;
    color:#fff;
    background: linear-gradient(120deg, #2e74f6, #56bdf9);
    position:absolute;
    top:30px;
    left:30px
  }
}
</style>
