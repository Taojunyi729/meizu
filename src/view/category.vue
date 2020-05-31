<template>
  <div>
    <Header></Header>
    <div class="category-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="last-bread"> > </span>
        <span>全部商品</span>
        <span class="last-bread"> > </span>
        <span class="last-bread">手机</span>
      </div>
      <FilterList :data="queryListData" @changeFilter="changeFilter"></FilterList>
      <SortBox @getkey="getSortKey" @setHaveStock="getStock"></SortBox>
      <CategoryList @clickItem="goToDetail" :data="categoryListData"></CategoryList>
      <RecommendList :data="recommendListData"></RecommendList>
    </div>
    <Vfooter></Vfooter>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import Header from '../components/Header'
import Vfooter from '../components/Vfooter'
import CategoryList from '../components/CategoryList'
import FilterList from '../components/FilterList'
import SortBox from '../components/SortBox'
import RecommendList from '../components/RecommendList'
export default {
  data () {
    return {
      categoryListData: [],
      categoryListDataCopy: [],
      queryListData: [],
      recommendListData: [],
      filterData: null,
      stockData: null,
      keyData: null
    }
  },
  components: {
    Header: Header,
    Vfooter: Vfooter,
    CategoryList: CategoryList,
    FilterList: FilterList,
    SortBox: SortBox,
    RecommendList: RecommendList
  },
  mounted () {
    this.getCategoryListData()
    this.getQueryListData()
    this.getRecommendListData()
  },
  methods: {
    async getCategoryListData () {
      const { data } = await axios.get('/api/categoryList')
      this.categoryListData = data
      this.categoryListDataCopy = data
    },
    async getQueryListData () {
      const { data } = await axios.get('/api/queryList')
      this.queryListData = data
    },
    async getRecommendListData () {
      const { data } = await axios.get('api/smartSale')
      this.recommendListData = data
    },
    changeFilter (res) {
      this.filterData = res
      this.resetSort()
    },
    getSortKey (key) {
      this.keyData = key
      this.resetSort()
    },
    getStock (val) {
      this.stockData = val
      this.resetSort()
    },
    resetSort () {
      this.categoryListData = this.categoryListDataCopy.concat([])
      if (this.filterData) {
        Object.keys(this.filterData).forEach((item) => {
          if (this.filterData[item]) {
            this.categoryListData = this.categoryListData.filter((val) => {
              return val['features'].indexOf(this.filterData[item]) >= 0
            })
          }
        })
      }
      if (this.stockData) {
        this.categoryListData = this.categoryListData.filter((val) => {
          return val.available
        })
      }
      if (this.keyData === 'recommend') {
        this.categoryListData.sort((a, b) => {
          return b.shelveTime - a.shelveTime
        })
      } else if (this.keyData === 'news') {
        this.categoryListData.sort((a, b) => {
          return b.publishedTime - a.publishedTime
        })
      } else if (this.keyData === 'low') {
        this.categoryListData.sort((a, b) => {
          return a.goodsPrice - b.goodsPrice
        })
      } else {
        this.categoryListData.sort((a, b) => {
          return b.goodsPrice - a.goodsPrice
        })
      }
    },
    goToDetail (item) {
      this.$router.push({
        name: 'Detail',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .category-wrapper{
    width:1240px;
    margin:0 auto;

    .bread{
      height:40px;
      line-height:40px;

      .last-bread{
        color:#999
      }
    }
  }
</style>
