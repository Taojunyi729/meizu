<template>
    <div class="footer">
      <div class="footer-wraper">
        <div class="clearfix">
          <ul class="fl service-link">
            <li v-for="(item, index) in serviceLinkData" :key="index">
              <img :src="item.icon" alt="">
              <a :href="item.href">{{item.name}}</a>
            </li>
          </ul>
          <div class="fr footer-contact">
            <span>周一至周日 7:30-24:00</span>
            <p>400-788-3333</p>
            <a href="">在线客服</a>
          </div>
        </div>
        <hr class="footer-hr">
        <div class="clearfix">
          <div class="fl">
            <ul>
              <li class="external-link" v-for="(item, index) in externalLinkData" :key="index">
                <a :href="item.href">{{item.name}}</a>
              </li>
            </ul>
            <div class="copyright">©2019 Meizu Telecom Equipment Co., Ltd. All rights reserved. 粤ICP备13003602号合字B2-20170010 营业执照法律声明</div>
          </div>
          <div class="wechat-wraper fr">
            <a class="icon-moon icon-weibo"></a>
            <a class="icon-moon icon-weixin"></a>
            <a class="icon-moon icon-qqzone"></a>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
export default {
  data () {
    return {
      serviceLinkData: [],
      externalLinkData: []
    }
  },
  mounted () {
    this.getServiceLinkData()
    this.getExternalLinkData()
  },
  methods: {
    async getServiceLinkData () {
      const { data } = await axios.get('/api/serviceLink')
      this.serviceLinkData = data
    },
    async getExternalLinkData () {
      const { data } = await axios.get('api/externalLink')
      this.externalLinkData = data
    }
  }
}
</script>

<style lang='less' scoped>
.footer{
  background-color: #fff;
  padding:48px 0 20px;
  margin-top:50px;

  .footer-wraper{
    width:1240px;
    margin:0 auto;

    .service-link{
      width:1000px;

      li{
        width:240px;
        height:57px;
        display: inline-block;
        font-size:12px;
        color:#999;

        img, a{
          vertical-align:middle;
        }

        &:hover{
          color:#31a5e7
        }
      }
    }
    .footer-contact{
      text-align: right;

      span{
        font-size: 12px;
        color:#999;
      }

      p{
        color:#00c3f5;
        font-size:30px;
        font-weight:400
      }
    }
  }

  .footer-hr{
    border:none;
    border-top:1px solid #eee;
    margin:20px 0 28px;
    height:1px;
  }

  .external-link{
    display: inline-block;
    border-right:1px solid #999;
    padding-right:15px;
    margin-right:15px;
    color: #999;
  }

  .copyright{
    padding-top: 8px;
    color: #999;
    font-size:12px
  }

  .wechat-wraper{
    padding-top:18px;

    a{
      color:#999;
      padding-right:10px;
      margin-right:10px;
      border-right:1px solid #999;
      font-size:16px;

      &:hover{
        color:#31a5e7
      }
    }
  }
}
</style>
