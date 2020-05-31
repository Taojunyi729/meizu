<template>
  <div>
    <ul v-if="data.length > 0" class="clearfix">
      <li @click="clickItem(item)" class="goods-list" v-for="(item, index) in data" :key="index" :class="{'last-child':(index+1) % 4 === 0}">
        <a :href="item.href">
          <ImgsList :data="item.colorImageUrls"></ImgsList>
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
    <div v-else class="empty clearfix">
      <div class="empty-bg fl"></div>
      <div class="empty-desc fr">
        <div class="title">抱歉没有找到相关商品</div>
        <p>
        建议您：<br>
        1.适当减少筛选条件<br>
        2.尝试其他条件
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import ImgsList from './ImgsList'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ImgsList: ImgsList
  },
  methods: {
    clickItem (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style lang='less' scoped>
  .goods-list{
    width:303px;
    height:416px;
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
      font-size:14px;
      color:#333;
      margin-bottom:2px
    }

    .goods-desc{
      font-size: 12px;
      color: #999
    }

    .goods-price{
      display: inline-block;
      position:relative;
      font-size:18px;
      color:#c00;
      padding-left:14px;

      i{
        font-style:normal;
        font-size:14px;
        position:absolute;
        left:0;
        top:4px
      }

      .goods-lower{
        font-size:12px;
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
/*  空页面部分*/
  .empty{
    width:335px;
    margin:120px auto 380px;

    .empty-bg{
      background: url(../assets/imgages/xiongmao.png) no-repeat;
      width:105px;
      height:135px;
    }

    .empty-desc{
      width:200px;

      .title{
        margin-top:15px;
        font-size:18px;
        color:#00c3f5;
      }

      p{
        margin-top:15px
      }
    }
  }
</style>
