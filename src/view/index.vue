<template>
    <div>
      <Header></Header>
      <div class="swiper-wraper">
        <Swiper :data="swiperData"></Swiper>
        <ul class="menus">
          <li v-for="(item, index) in menusData" :key="index">
            <a :href="item.href">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <ul class="post-wraper clearfix">
        <li v-for="(item, index) in postData" :key="index">
          <a :href="item.href">
            <img :src="item.imgUrl" alt="">
          </a>
        </li>
      </ul>
      <div class="index-container">
        <div>
          <h3 class="title">热卖商品</h3>
          <GoodsList :data="hotSaleData"></GoodsList>
        </div>
        <div>
          <h3 class="title">手机</h3>
          <AdList :data="phoneRecommendData"></AdList>
          <GoodsList :data="phoneSaleData"></GoodsList>
        </div>
        <div>
          <h3 class="title">智能配件</h3>
          <AdList :data="smartRecommendData"></AdList>
          <GoodsList :data="smartSaleData"></GoodsList>
        </div>
      </div>
      <Vfooter></Vfooter>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import Header from '../components/Header'
import Swiper from '../components/Swiper'
import GoodsList from '../components/GoodsList'
import AdList from '../components/AdList'
import Vfooter from '../components/Vfooter'
export default {
  data () {
    return {
      swiperData: [],
      menusData: [],
      postData: [],
      hotSaleData: [],
      phoneSaleData: [],
      smartSaleData: [],
      phoneRecommendData: [],
      smartRecommendData: []
    }
  },
  components: {
    Header: Header,
    Swiper: Swiper,
    GoodsList: GoodsList,
    AdList: AdList,
    Vfooter: Vfooter
  },
  mounted () {
    this.getSwiperData()
    this.getMenusData()
    this.getPostData()
    this.getHotSaleData()
    this.getPhoneSaleData()
    this.getSmartSaleData()
    this.getPhoneRecommendData()
    this.getSmartRecommendData()
  },
  methods: {
    async getSwiperData () {
      const { data } = await axios.get('/api/advertise')
      this.swiperData = data
    },
    async getMenusData () {
      const { data } = await axios.get('/api/menu')
      this.menusData = data
    },
    async getPostData () {
      const { data } = await axios.get('/api/post')
      this.postData = data
    },
    async getHotSaleData () {
      const { data } = await axios.get('/api/hotSale')
      this.hotSaleData = data
    },
    async getPhoneSaleData () {
      const { data } = await axios.get('/api/phoneSale')
      this.phoneSaleData = data
    },
    async getSmartSaleData () {
      const { data } = await axios.get('/api/smartSale')
      this.smartSaleData = data
    },
    async getPhoneRecommendData () {
      const { data } = await axios.get('/api/phoneRecommend')
      this.phoneRecommendData = data
    },
    async getSmartRecommendData () {
      const { data } = await axios.get('/api/smartRecommend')
      this.smartRecommendData = data
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-wraper{
  width:1240px;
  margin:0 auto;
  position:relative;

  .menus{
    position: absolute;
    top:0;
    bottom:0;
    width:303px;
    padding:17px 0 0 40px;
    background-color: rgba(0,0,0,0.5);

    li{
      line-height:57px;
      font-size:16px;
      color: #fff;
      transition:color .3s;

      &:hover{
        color: #31a5e7;
      }
    }
  }
}
.post-wraper{
  margin:10px auto 50px;
  width:1240px;

  li{
    width:303px;
    height:180px;
    float:left;
    margin-right:9px;

    &:last-child{
      margin-right:0
    }

    a{
      transition:opacity .3s ease-in-out;

      &:hover{
        opacity: 0.85;
      }
    }
  }
}
.index-container{
  width:1240px;
  margin:0 auto;

  .title{
    font-size:30px;
    font-weight:400;
    margin-top:50px
  }
}
</style>
