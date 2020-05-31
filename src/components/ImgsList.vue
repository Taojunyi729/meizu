<template>
    <div :class="[{'imgs-wraper': type === 'small'},{'imgs-wraper_big': type === 'big'}]">
      <img class="img" :src="data[activeIndex]" alt="">
      <ul class="imgs">
        <li v-for="(item, index) in data" class="imgs-item" :class="{active:activeIndex===index}" :key="index">
          <img :src="item"  @click="changeActiveIndex(index)">
        </li>
      </ul>
    </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    changeActiveIndex (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.imgs-wraper{
  margin:20px 0 15px;
  text-align: center;

  .img{
    height:230px;
  }

  .imgs{
    margin-top:13px;
    overflow: hidden;

    .imgs-item{
      display: inline-block;
      width:40px;
      height:40px;
      border:1px solid #EFEFEF;
      border-radius: 4px;
      margin:0 4px;

      &.active{
        border-color: #bdbdbd;
      }

      img{
        width:40px;
        height:40px
      }
    }
  }
}
.imgs-wraper_big {
  text-align: center;

  .img {
    height: 375px;
    margin: 20px auto;
  }

  .imgs {
    overflow: hidden;

    .imgs-item {
      display: inline-block;
      width: 75px;
      height: 75px;
      border: 1px solid transparent;
      border-radius: 4px;
      margin: 10px;

      &.active {
        border-color: #bdbdbd;
      }

      img {
        width: 100%;
        height: 100%
      }
    }
  }
}
</style>
