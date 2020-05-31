<template>
    <div class="header">
      <div class="header-wraper clearfix">
        <div class="header-logo fl"></div>
        <div class="header-cart fr">
          <span class="icon-moon icon-cart"></span>
        </div>
        <div class="header-user fr">
          <span class="icon-moon icon-user"></span>
        </div>
        <div class="header-search fr">
          <input type="text" class="header-input" placeholder="购物车">
          <span class="header-icon icon-moon icon-search"></span>
        </div>
        <ul class="header-nav fr" >
          <li v-for="(item,index) in navData" :key="index">
            <a href="javascript:;" @click="goToCategory" class="nav-item"  @mouseover="showChildren(item)">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <transition name="nav">
        <div class="nav-children" v-show="childrenShow" @mouseleave="hideChildren">
          <transition-group class="children-wraper" tag="ul" @enter="enter">
            <li class="children-item" v-for="(item,index) in childrenData" :key="item.pic" :data-index="index">
              <img :src="item.pic" alt="">
              <p>{{item.name}}</p>
              <p>{{item.price}}</p>
            </li>
          </transition-group>
        </div>
      </transition>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import velocity from 'velocity-animate'
export default {
  data () {
    return {
      navData: [],
      childrenData: [],
      childrenShow: false
    }
  },
  mounted () {
    this.getNavData()
  },
  methods: {
    async getNavData () {
      const { data } = await axios.get('/api/nav')
      this.navData = data
    },
    showChildren (item) {
      this.childrenShow = true
      this.childrenData = item.children
    },
    hideChildren () {
      this.childrenShow = false
      this.childrenData = []
    },
    enter (el) {
      const timeOut = el.dataset.index * 150
      setTimeout(() => {
        velocity(el, {
          'opacity': 1,
          'translateX': '-50px'
        })
      }, timeOut)
    },
    goToCategory () {
      this.$router.push({
        name: 'Category'
      }).catch(err => {
        console.log('输出报错', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  background-color: white;
  position:relative;

  .header-wraper{
    width:1240px;
    margin:0 auto;

    .header-logo{
      width:140px;
      height:26px;
      margin:28px 0;
      background: url(../assets/imgages/logo.png) no-repeat center;
    }

    .header-cart, .header-user{
      font-size:24px;
      margin:29px 10px;
      line-height:1
    }

    .header-user{
      margin:29px 20px
    }

    .header-search{
      width:172px;
      height:32px;
      border:1px solid #ddd;
      border-radius:2px;
      margin:25px 0 0 10px;
      position: relative;
      cursor:pointer;

      .header-input{
        weith:127px;
        height:20px;
        font-size:12px;
        position:absolute;
        top:6px;
        left:5px;
        border:none;
        outline:none;
      }

      .header-icon{
        font-size:16px;
        position:absolute;
        right:10px;
        top:8px
      }
    }

    .header-nav{
      li{
        display:inline-block
      }
      a.nav-item{
        display:inline-block;
        font-size:16px;
        color:#515151;
        padding:32px 20px;
        line-height: 1;
        transition:color 0.1s ease;
        cursor:pointer;

        &:hover{
          color:#31a5e7
        }
      }
    }
  };

  .nav-children{
    width:100%;
    height:156px;
    background-color:white;
    position: absolute;
    top:82px;
    border-bottom: 1px solid #e9e9e9;
    z-index:1;

    .children-wraper{
      width:1240px;
      padding-left:150px;
      margin:0 auto;
    }

    .children-item{
      opacity:0;
      display: inline-block;
      width:136px;
      height:145px;
      text-align:center;
      color:#666;
      font-size:12px;
      cursor:pointer;

      img{
        width:100px;
        height:100px;
      }
    }
  }

  .nav-enter{
       height:0;
     }

  .nav-enter-active{
    transition:height .15s ease-in-out;
  }
}
</style>
