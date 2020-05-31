<template>
  <div class="bg-white">
    <Header></Header>
    <div class="detail-wraper">
      <div class="bread">
        <span>首页</span>
        <span class="last-bread"> > </span>
        <span>全部商品</span>
        <span class="last-bread"> > </span>
        <span class="last-bread">手机</span>
      </div>
      <div class="clearfix">
        <div class="fl detail-img">
          <ImgsList :data="detailData.colorImageUrls" :type="'big'"></ImgsList>
        </div>
        <div class="fl detail-props">
          <h1 class="prop-title">{{detailData.goodsName}}</h1>
          <p class="prop-desc">{{detailData.goodsDesc}}</p>
          <div class="prop-sale">
            <span class="prop-name">价<span class="span-spacing"></span>格：</span>
            <span class="prop-price">￥{{detailData.goodsPrice}}</span>
          </div>
          <div>
            <span class="prop-name">支<span class="span-spacing"></span>持：</span>
            <ul class="prop-service">
              <li class="service-item"><i class="icon-font icon-check-circle"></i>百城速达</li>
              <li class="service-item"><i class="icon-font icon-check-circle"></i>顺丰包邮</li>
              <li class="service-item"><i class="icon-font icon-check-circle"></i>7天无理由退货</li>
            </ul>
          </div>
          <div>
            <span class="prop-name">服<span class="span-spacing"></span>务：</span>
            <span>本商品由 魅族 负责发货并提供售后服务</span>
          </div>
          <div>
            <span class="prop-name">数<span class="span-spacing"></span>量：</span>
            <div class="prop-number clearfix">
              <input type="number" class="prop-input fl" v-model="shopCartQuantity">
              <div class="change-box fl">
                <div class="change-value" @click="increase">+</div>
                <div class="change-value" @click="decrease">-</div>
              </div>
            </div>
          </div>
          <div class="prop-buy">
            <a href="javaScript:;" class="btn danger mr20" @click="purchase">立即购买</a>
            <a href="javaScript:;" class="btn success" @click="addShopCart">加入购物车</a>
          </div>
        </div>
      </div>
      <div class="detail-info-wraper">
        <div class="detail-info">
          <a href="" class="info-title">商品详情</a>
        </div>
        <img :src="item" alt="" v-for="(item, index) in detailData.information" :key="index" class="detail-images">
      </div>
    </div>
    <Vfooter></Vfooter>
    <Vdialog :show.sync="dialogShow" :width="360" :height="60" :buttonConfirmShow="false" :buttonCancelShow="false">
      <div>
        <i class="icon-font icon-check-circle add-success"></i>成功加入购物车！
      </div>
      <a href="javaScript:;" class="go-shopCart" @click="goToShopCart">进入购物车</a>
    </Vdialog>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import Header from '../components/Header'
import Vfooter from '../components/Vfooter'
import ImgsList from '../components/ImgsList'
import Vdialog from '../components/Dialog'
export default {
  data () {
    return {
      detailData: {},
      shopCartQuantity: 1,
      dialogShow: false
    }
  },
  components: {
    Header: Header,
    Vfooter: Vfooter,
    ImgsList: ImgsList,
    Vdialog
  },
  mounted () {
    this.getDetailData(this.$route.params.id)
  },
  methods: {
    async getDetailData (id) {
      const { data } = await axios.get(`/api/categoryList/${id}`)
      this.detailData = data
    },
    increase () {
      this.shopCartQuantity = parseInt(this.shopCartQuantity) + 1
    },
    decrease () {
      if (this.shopCartQuantity > 1) {
        this.shopCartQuantity = parseInt(this.shopCartQuantity) - 1
      }
    },
    addShopCart () {
      this.$store.commit('ADD_SHOPCART', {
        data: this.detailData,
        num: this.shopCartQuantity
      })
      this.dialogShow = true
    },
    purchase () {
      this.$store.commit('ADD_SHOPCART', {
        data: this.detailData,
        num: this.shopCartQuantity
      })
      this.goToShopCart()
    },
    goToShopCart () {
      this.$router.push({
        name: 'ShopCart'
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .bg-white{
    background-color: #fff;

    .detail-wraper{
      width:1240px;
      margin:0 auto;
      font-size:0;

      .bread{
        height:40px;
        line-height:40px;

        .last-bread{
          color:#999
        }
      }

      .detail-img{
        width:475px;
        margin-right:20px;
      }

      .detail-props{
        width:675px;
        font-size:12px;

        .prop-title{
          font-size:24px;
          font-weight:400;
          color:#000;
          margin-bottom: 10px;
        }

        .prop-desc{
          font-size:16px;
          color:#e22841;
          margin-bottom:15px
        }

        .prop-name{
          margin:0 10px;
          line-height:34px
        }

        .span-spacing{
          padding:0 12px;
        }

        .prop-sale{
          height:55px;
          background-color: #f5f5f5;
          margin-bottom:26px;
          line-height:55px;

          .prop-price{
            color:#e02b41;
            font-size:24px
          }
        }

        .prop-service{
          display:inline-block;

          .service-item{
            display: inline-block;
            margin-right:20px;

            i{
              margin-right:5px;
              color:#00c3f5;
            }
          }
        }

        .prop-number{
          display: inline-block;
          vertical-align: middle;

          .prop-input{
            width:53px;
            height:38px;
            border:1px solid #dcdcdc;
            line-height: 38px;
            text-align: center;
            color:#333
          }

          .change-box{
            margin-left:6px;

            .change-value{
              width:20px;
              height:16px;
              border:1px solid #dcdcdc;
              line-height: 16px;
              font-size:14px;
              color:#666;
              text-align: center;
              cursor:pointer;

              &:last-child{
                margin-top:6px
              }
            }
          }
        }

        .prop-buy{
          margin-top:17px;

          .mr20{
            margin-right: 20px;
          }
        }
      }

      .detail-info-wraper{
        margin-top:60px;

        .detail-info{
          height:62px;
          border-bottom:1px solid #dcdcdc;

          .info-title{
            font-size: 16px;
            display:inline-block;
            height:62px;
            padding:0 20px;
            border-bottom: 1px solid #00c3f5;
            color:#00c3f5;
            line-height: 62px;
            box-sizing: border-box;
            margin-bottom:-1px
          }
        }

        .detail-images{
          width:1240px;
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
  }
</style>
