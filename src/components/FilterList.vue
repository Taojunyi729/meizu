<template>
    <ul class="filter-box">
      <li class="box-item clearfix" v-for="(item, index) in data" :key="index">
        <div class="title fl">{{item.name}}:</div>
        <ul class="fl">
          <li @click="getFilterRes(item.key, info.value)" :class="{'active':activeFilter[item.key] === info.value}" v-for="(info, ii) in item.queryList" :key="ii">{{info.name}}</li>
        </ul>
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
  },
  data () {
    return {
      activeFilter: {
        brand: null,
        size: null,
        memory: null
      }
    }
  },
  methods: {
    getFilterRes (itemKey, infoName) {
      this.$set(this.activeFilter, itemKey, infoName)
      this.$emit('changeFilter', this.activeFilter)
    }
  }
}
</script>

<style lang='less' scoped>
.filter-box{
  padding:15px 10px;
  background-color: #fff;
  border:1px solid #efefef;

  .box-item{
    line-height: 46px;
    padding-left:10px;

    .title{
      width:85px;
      overflow: hidden;
      white-space:nowrap;
      color:#333;
    }

    li{
      display:inline-block;
      margin-right:62px;
      cursor:pointer;

      &.active{
        color:#00c3f5
      }
    }
  }
}
</style>
