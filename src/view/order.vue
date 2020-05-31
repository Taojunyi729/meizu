<template>
    <div>
      <Vheader></Vheader>
      <div class="order-wraper">
        <div class="order-item">
          <div class="item-title">收货人信息</div>
          <ul class="address-list clearfix">
            <li class="address-item item-title-border fl" :class="{'active':item.checked}" v-for="(item, index) in addressData" :key="index" @click="choseAddress(item)">
              <div class="clearfix address-title">
                <div class="fl">{{item.name}}</div>
                <div class="fr">{{item.phone}}</div>
              </div>
              <div class="address-content">
                {{item.province}}{{item.city}}{{item.district}}{{item.street}}
              </div>
              <div class="address-checked" v-show="item.checked">
                <i class="icon-font icon-check address-checked-icon"></i>
              </div>
            </li>
            <li class="address-item address-add fl">
              <div class="address-add-icon">+</div>
              <div>添加新地址</div>
            </li>
          </ul>
        </div>
        <div class="order-item">
          <div class="item-title">确认订单信息</div>
          <table class="goods-wraper">
            <thead>
              <tr>
                <th class="goods-name">商品</th>
                <th class="goods-price">单价</th>
                <th class="goods-num">数量</th>
                <th class="goods-total">小计</th>
                <th class="goods-postage">配送方式</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in orderData" :key="index">
                <td class="goods-name">
                  <img :src="item.imageUrl" alt="">
                  <div class="goods-desc">
                    <p>{{item.goodsName}}</p>
                    <p class="goods-slogan">{{item.goodsDesc}}</p>
                  </div>
                </td>
                <td class="goods-price">￥{{item.goodsPrice}}</td>
                <td class="goods-num">{{item.count}}</td>
                <td class="goods-total">￥{{item.goodsPrice * item.count}}</td>
                <td v-if="index === 0" class="goods-postage" :rowspan="orderData.length">快递配送：运费<span class="red">￥0.00</span></td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="memo">
                <td class="memo-content" colspan="4">
                  备注：<textarea name="" id="" cols="30" rows="10" placeholder="备注..."></textarea>
                </td>
                <td class="goods-amount">合计：<span>￥{{checkedGoodsPrice}}</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="order-item clearfix">
          <div class="item-title">选择支付方式</div>
          <div class="order-pay">
            <div class="pay-item clearfix">
              <h1 class="pay-title fl">支付宝</h1>
              <ul class="pay-content fl clearfix">
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="huabei">
                  <img src="../assets/imgages/banks/huabei.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="alipay">
                  <img src="../assets/imgages/banks/alipay.png" alt="">
                </li>
              </ul>
            </div>
            <div class="pay-item clearfix">
              <h1 class="pay-title fl">微信</h1>
              <ul class="pay-content fl clearfix">
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="wechat">
                  <img src="../assets/imgages/banks/wechat.png" alt="">
                </li>
              </ul>
            </div>
            <div class="pay-item clearfix">
              <h1 class="pay-title fl">网上银行</h1>
              <ul class="pay-content pay-bank fl clearfix">
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="zhongguo">
                  <img src="../assets/imgages/banks/zhongguo.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="jianshe">
                  <img src="../assets/imgages/banks/jianshe.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="nongye">
                  <img src="../assets/imgages/banks/nongye.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="gongshang">
                  <img src="../assets/imgages/banks/gongshang.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="jiaotong">
                  <img src="../assets/imgages/banks/jiaotong.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="zhaoshang">
                  <img src="../assets/imgages/banks/zhaoshang.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="youzheng">
                  <img src="../assets/imgages/banks/youzheng.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="xingye">
                  <img src="../assets/imgages/banks/xingye.png" alt="">
                </li>
                <li>
                  <input type="radio"  v-model="payMode" name="pay" value="shanghai">
                  <img src="../assets/imgages/banks/shanghai.png" alt="">
                </li>
              </ul>
            </div>
          </div>
          <ul class="order-total fr">
            <li class="clearfix">
              <div class="fl">总金额</div>
              <div class="fr">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="clearfix">
              <div class="fl">运费</div>
              <div class="fr">￥0.00</div>
            </li>
            <li class="order-line"></li>
            <li class="clearfix">
              <div class="fl">应付</div>
              <div class="fr order-price">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="clearfix">
              <a href="javaScript:;" class="btn success fr" @click="pushOrder">下单并支付</a>
            </li>
          </ul>
        </div>
      </div>
      <Vfooter></Vfooter>
      <Vdialog :show.sync="dialogShow" :width="360" :height="60" :buttonConfirmShow="false" :buttonCancelShow="false">
        <div>
          <i class="icon-font icon-check-circle add-success"></i>成功支付订单！
        </div>
        <a href="javaScript:;" class="go-shopCart" @click="goToIndex">返回首頁</a>
      </Vdialog>
    </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import Vheader from '../components/Header'
import Vfooter from '../components/Vfooter'
import Vdialog from '../components/Dialog'
export default {
  components: {
    Vheader,
    Vfooter,
    Vdialog
  },
  data () {
    return {
      addressData: [],
      payMode: '',
      dialogShow: false
    }
  },
  computed: {
    orderData () {
      const data = this.$store.state.shopCartData.filter(item => item.checked)
      return data
    },
    ...mapGetters([
      'checkedGoodsPrice'
    ])
  },
  mounted () {
    this.getAddressData()
  },
  methods: {
    ...mapMutations([
      'CLEAR_GOODS'
    ]),
    async getAddressData () {
      const { data } = await axios.get('/api/addressData')
      this.addressData = data
    },
    choseAddress (add) {
      this.addressData.forEach(item => {
        item.checked = false
        if (item.id === add.id) {
          item.checked = true
        }
      })
    },
    goToIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    pushOrder () {
      this.dialogShow = true
      const date = new Date()
      const address = this.addressData.filter(item => item.checked)[0]
      const data = {
        orderId: date.getTime(),
        address: address,
        orderData: this.orderData,
        orderPrice: this.checkedGoodsPrice,
        time: date,
        payMode: this.payMode
      }
      console.log(data)
      this.CLEAR_GOODS()
    }
  }
}
</script>

<style lang='less' scoped>
.order-wraper{
  width:1240px;
  margin:0 auto;

  .order-item{
    background-color: #fff;
    margin-top:10px;
    padding:0 40px 10px;

    .item-title{
      padding:20px 0;
      font-size:18px;
      font-weight:bold;
      text-indent:10px;
      font-color: #333;
    }

    .item-title-border{
      border-bottom:1px solid #efefef
    }

    .address-list{
      margin-top:30px;

      .address-item{
        width:275px;
        height:144px;
        border:1px solid #efefef;
        margin:0 0 30px 12px;
        padding:15px;
        position:relative;
        transition: border 0.8s;
        cursor:pointer;

        &:hover, &.active{
          border:1px solid #00c3f5;
        }

        .address-title{
          height:25px;
          color:#333;
          font-size:12px;
          font-weight:bold;
          border-bottom:1px solid #efefef;
        }

        .address-content{
          font-size:12px;
          padding-top:10px;
          word-break: break-all;
          word-wrap:break-word;
        }

        .address-checked{
          position:absolute;
          right:0;
          bottom:0;
          border-right:30px solid #00c3f5;
          border-top:30px solid transparent;

          .address-checked-icon{
            position: absolute;
            right:-30px;
            bottom:3px;
            color:#fff;
            font-size:12px;
          }
        }
      }

      .address-add{
        transition:all 0.8s;
        text-align: center;

        &:hover, &.active{
          color:#00c3f5;
        }

        .address-add-icon{
          padding:30px 0 10px;
          font-size:30px;
          line-height: 1;
        }
      }
    }
  }

  .goods-wraper{
    margin-top:12px;
    border:1px solid #efefef;

    .goods-name{
      width:438px;
      padding-left:10px;
      text-align: left;
      cursor:pointer;

      img{
        width:120px;
        height:120px;
        vertical-align: middle;
      }

      .goods-desc{
        display: inline-block;
        vertical-align: middle;
        font-size:16px;
        width:300px;

        .goods-slogan{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .goods-price{
      width:225px;
      text-align:center;
      font-weight:bold;
      font-size:18px;
      color:#333;
    }

    .goods-num{
      width:139px;
      text-align:center;
      font-weight:bold;
    }

    .goods-total{
      width:173px;
      text-align:right;
      font-weight:bold;
      padding-right:10px;
    }

    .goods-postage{
      width:184px;
      font-weight:bold;
      text-align:center;
      border-left:1px solid #efefef;
      color:#999;
    }

    thead tr{
      height:63px;
      border-bottom: 1px solid #efefef;

      .goods-num, .goods-total, .goods-postage{
        font-size:18px;
        color:#333;
      }

      .goods-name{
        font-size:12px;
        color:#666;
        font-weight:400
      }
    }

    tbody tr{
      border-bottom: 1px solid #efefef;

      .goods-price{
        font-size:18px;
      }

      .goods-total{
        color:#e02b41;
        font-size:18px
      }

      .red{
        color:#e02b41;
      }
    }

    .memo{
      background-color: #efefef;

      .memo-content{
        padding:15px 20px;
        font-size:12px;
      }

      textarea{
        width:552px;
        height:48px;
        padding:5px;
        margin-left:5px;
        resize:none;
        vertical-align: middle;
        border:1px solid #efefef;
        outline:0;
      }

      .goods-amount{
        text-align: right;
        color:#e02b41;
        padding-right:20px;
        font-weight: bold;

        span{
          font-size:22px
        }
      }
    }
  }

  .order-pay{
    margin:12px 0 30px;
    padding:40px 0 0 26px;
    border:1px solid #efefef;

    .pay-item{
      margin-bottom:24px;

      .pay-title{
        width:60px;
        line-height:40px;
        font-size:14px;
        color:#333;
        margin:0;
      }

      .pay-content{
        margin-left:20px;

        li{
          float:left;
          padding-bottom:26px;
        }

        input{
          vertical-align: middle;
          margin-right:20px;
        }

        img{
          vertical-align: middle;
          margin-right:40px;
          height:40px;
        }
      }

      .pay-bank{
        width:1050px
      }
    }
  }

  .order-total{
    width:318px;

    li{
      margin-bottom:20px;
    }

    .order-line{
      height:1px;
      background-color: #efefef;
    }

    .order-price{
      font-size:20px;
      color:#e02b41;
      font-weight:bold
    }
  }
}
.add-success{
  color: #00c3f5;
  margin-right:5px
}
.go-shopCart{
  color:#00c3f5;
  text-decoration: underline;
}
</style>
