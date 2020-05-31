<template>
    <div>
      <Header></Header>
      <div v-if="shopCartData.length > 0" class="shopCart-wraper">
        <table class="cart-header">
          <tr>
            <td class="cart-select">
              <input type="checkbox" class="cart-checkbox" :checked="isAllChecked" @click="checkAllGoods">
              <span>全选</span>
            </td>
            <td class="cart-name">商品</td>
            <td class="cart-price">单价(元)</td>
            <td class="cart-num">数量</td>
            <td class="cart-total">小计(元)</td>
            <td class="cart-operation">操作</td>
          </tr>
        </table>
        <table class="shopCart-list">
          <tr v-for="(item, index) in shopCartData" :key="index" class="cart-product">
            <td class="cart-select">
              <input type="checkbox" class="cart-checkbox" :checked="item.checked" @click="checkGoods(item.id)">
              <img class="cart-img" :src="item.imageUrl" alt="">
            </td>
            <td class="cart-name">
              <span class="cart-title">{{item.goodsName}}</span>
              <span class="cart-desc">{{item.goodsDesc}}</span>
            </td>
            <td class="cart-price">
              ￥{{item.goodsPrice}}
            </td>
            <td class="cart-num">
              <div class="cart-input clearfix">
                <button class="fl" @click="decrease(item.id)">-</button>
                <input type="number" v-model="item.count" class="fl">
                <button class="fl" @click="increase(item.id)">+</button>
              </div>
            </td>
            <td class="cart-total">
              ￥{{item.goodsPrice*item.count}}
            </td>
            <td class="cart-operation">
              <i class="icon-font icon-close" @click="delGoods(item.id)"></i>
            </td>
          </tr>
        </table>
        <div class="shopCart-footer clearfix">
          <div class="fl">
            <input type="checkbox" class="cart-checkbox" :checked="isAllChecked" @click="checkAllGoods">
            <span class="cart-remove">全选</span>
            <span>删除选中的商品</span>
            <span>共<span class="footer-num black">{{shopCartTotal}}</span>件商品，已选<span class="footer-num blue">{{checkedGoodsTotal}}</span>件商品</span>
          </div>
          <div class="fr">
            <span>已优惠<span class="footer-num red">0.00</span>元，合计(不含运费):<span class="footer-num red footer-total">{{checkedGoodsPrice}}</span></span>
            <a href="javaScript:;" class="btn success" :class="{'cancel':checkedGoodsTotal <= 0}" @click="goToOrder">去结算</a>
          </div>
        </div>
      </div>
      <div v-else class="shopCart-empty">
        <div class="empty-content">
          <div class="empty-left"></div>
          <div class="empty-right">
            <p class="empty-desc">购物车内还没有商品，赶紧去选购吧~</p>
            <a href="javaScript:;" class="btn success" @click="goToIndex">返回商城首页</a>
          </div>
        </div>
      </div>
      <Vfooter></Vfooter>
      <Vdialog :show.sync="dialogShow" :width="500" :height="120" :title="'删除'" @confirm="confirmDel" @cancel="dialogShow = false">
        <div style="line-height: 120px">你确定要删除商品吗？</div>
      </Vdialog>
    </div>
</template>

<script type="text/javascript">
import { mapMutations, mapGetters } from 'vuex'
import Header from '../components/Header'
import Vfooter from '../components/Vfooter'
import Vdialog from '../components/Dialog'
export default {
  data () {
    return {
      dialogShow: false,
      activeId: null
    }
  },
  computed: {
    shopCartData () {
      return this.$store.state.shopCartData
    },
    ...mapGetters([
      'isAllChecked',
      'shopCartTotal',
      'checkedGoodsTotal',
      'checkedGoodsPrice'
    ])
  },
  components: {
    Header: Header,
    Vfooter: Vfooter,
    Vdialog
  },
  methods: {
    ...mapMutations([
      'INCREASE_SHOPCART',
      'DECREASE_SHOPCART',
      'CHECK_GOODS',
      'CHECK_ALL_GOODS',
      'DEL_GOODS'
    ]),
    goToIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    goToOrder () {
      this.$router.push({
        name: 'Order'
      })
    },
    increase (id) {
      this.INCREASE_SHOPCART(id)
    },
    decrease (id) {
      this.DECREASE_SHOPCART(id)
    },
    checkGoods (id) {
      this.CHECK_GOODS(id)
    },
    checkAllGoods () {
      this.CHECK_ALL_GOODS(this.isAllChecked)
    },
    delGoods (id) {
      this.dialogShow = true
      this.activeId = id
    },
    confirmDel () {
      this.DEL_GOODS(this.activeId)
      this.dialogShow = false
    }
  }
}
</script>

<style lang='less' scoped>
.shopCart-wraper{
  width:1240px;
  margin:10px auto;

  .cart-header{
    height:49px;
    background-color: #fff;
    color:#333;
    border-bottom: 1px solid #efefef;
  }

  .cart-select{
    width:220px;
    padding-left:45px;
    text-align:left;

    .cart-img{
      width:100px;
      height:100px;
      margin-left:27px;
      vertical-align: middle;
    }
  }

  .cart-checkbox{
    position: relative;
    width:12px;
    height:12px;
    border:1px solid #bdbdbd;
    border-radius: 2px;
    margin-right:8px;
    display: inline-block;

    &:after{
      position: absolute;
      top:0;
      left:0;
      width:12px;
      height:12px;
      border:1px solid #bdbdbd;
      background-color: #fff;
      border-radius: 2px;
      content: '';
      display: inline-block;
    }

    &:checked:after{
      content: '✔';
      font-size:10px;
      background-color: #589cf7;
      color:#fff;
      text-align: center;
      line-height: 12px;
    }
  }

  .cart-name{
    width:270px;
    text-align: left;

    .cart-title{
      display: inline-block;
      width:100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cart-desc{
      color:#999
    }
  }

  .cart-price{
    width:220px;
    text-align: center;
  }

  .cart-num{
    width:200px;
    text-align: center;

    .cart-input{
      width:138px;
      border:1px solid #efefef;
      border-radius: 3px;
      margin:0 auto;

      button{
        width:38px;
        height:38px;
        font-size:20px;
        background:transparent;
        border:none;
        cursor:pointer
      }

      input{
        width:58px;
        height:38px;
        border:none;
        border-right:1px solid #efefef;
        border-left:1px solid #efefef;
        text-align: center;
      }
    }
  }

  .cart-total{
    width: 160px;
    text-align: center;
  }

  .cart-operation{
    width:170px;
    padding-right: 40px;
    text-align: right;
  }

  .shopCart-list{
    background-color: #fff;
    margin-bottom:10px;

    .cart-product{
      height:150px;
      border-top:1px solid #efefef;

      &:last-child{
        border-bottom:1px solid #efefef
      }
    }
  }

  .shopCart-footer{
    height:70px;
    line-height:70px;
    background-color: #fff;
    padding:0 45px;
    color:#666;

    .cart-remove{
      margin:0 30px 0 20px;
      color:#999
    }

    .footer-num{
      font-weight: bold;
      margin:0 5px
    }

    .black{
      color:#333
    }

    .blue{
      color:#00c3f5;
    }

    .red{
      color:#e02b41;
    }

    .footer-total{
      font-size:20px;
      font-weight:bolder;
      margin-right:35px
    }
  }
}
.shopCart-empty{
  width:1240px;
  height:360px;
  background-color: #fff;
  margin:10px auto;
  display: table;

  .empty-content{
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    .empty-left{
      display: inline-block;
      width:100px;
      height:114px;
      margin-right: 30px;
      background: url('../assets/imgages/shopcart.png');
      vertical-align: middle;
    }

    .empty-right{
      display: inline-block;
      vertical-align: middle;
      text-align: left;

      .empty-desc{
        font-weight:bold;
        font-size:18px;
        color:#666;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
