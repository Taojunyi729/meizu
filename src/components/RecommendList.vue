<template>
    <div>
      <div class="recommend-header clearfix">
        <h3 class="title fl">推荐商品</h3>
        <div class="fr">
          <i class="pagination icon-font icon-left" :class="{'disabled':activeIndex === 0}" @click="prev"></i>
          <i class="pagination icon-font icon-right" :class="{'disabled':activeIndex === listSize}" @click="next"></i>
        </div>
      </div>
      <div class="recommend-cont">
        <ul class="clearfix" :style="listWraper">
          <li class="goods-list" :class="{'last-child':(index+1) % 5 === 0}" v-for="(item, index) in data" :key="index">
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
      </div>
    </div>
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
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    listWraper () {
      return {
        width: `${this.data.length * 250}px`,
        transform: `translateX(-${this.activeIndex * 1240}px)`,
        transitionDuration: `.3s`
      }
    },
    listSize () {
      return Math.floor(this.data.length / 5)
    }
  },
  methods: {
    prev () {
      if (this.activeIndex === 0) return
      this.activeIndex--
    },
    next () {
      if (this.activeIndex === this.listSize) return
      this.activeIndex++
    }
  }
}
</script>

<style lang='less' scoped>
.recommend-header{
  margin:30px auto 10px;
  vertical-align: middle;

  .title{
    font-size:30px;
    font-weight:400
  }

  .pagination{
    margin-top:10px;
    display: inline-block;
    width:24px;
    height:24px;
    border:1px solid #00c3f5;
    font-size: 12px;
    color: #00c3f5;
    text-align: center;
    line-height:24px;
    cursor:pointer;

    &.disabled{
      color:#efefef;
      border-color:#dcdcdc
    }
  }
}
.recommend-cont{
  background-color: #fff;
  overflow: hidden;
  margin-top:10px;

  .goods-list{
    width:220px;
    background-color: #fff;
    text-align:center;
    margin:0 15px;
    padding:34px 0 15px;
    float:left;
    overflow: hidden;
    cursor:pointer;
    position:relative;

    img{
      height:180px;

      &:hover{
        transform:scale(1.2);
        transition-duration: .3s;
      }
    }

    &.last-child{
      margin-right:0
    }

    .goods-name{
      font-size:14px;
      color:#555757;
      margin:20px 0 2px
    }

    .goods-desc{
      font-size: 12px;
      color: #999
    }

    .goods-price{
      display: inline-block;
      position:relative;
      font-size:16px;
      color:#c00;
      padding-left:12px;
      margin-top:8px;

      i{
        font-style:normal;
        font-size:12px;
        position:absolute;
        left:0;
        top:2px
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
      width:40px;
      height:40px;
      border-radius: 50%;
      font-size:12px;
      line-height:40px;
      text-align: center;
      color:#fff;
      background: linear-gradient(120deg, #2e74f6, #56bdf9);
      position:absolute;
      top:15px;
      left:15px
    }
  }
}
</style>
