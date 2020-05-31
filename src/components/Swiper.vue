<template>
    <div class="swiper" :style="swiperSize">
      <ul :style="listWraper" @transitionend="setDuration">
        <li class="swiper-list" v-for="(item, index) in data" :key="index">
          <a :href="item.href">
            <img :src="item.imgUrl" :style="swiperSize" alt="">
          </a>
        </li>
        <li v-if="data.length>1" class="swiper-list" :key="data.length">
          <a :href="data[0].href">
            <img :src="data[0].imgUrl" :style="swiperSize" alt="">
          </a>
        </li>
      </ul>
      <ul class="swiper-pagination">
        <li :class="{'isShow':activeIndex===index}" v-for="(item, index) in data" :key="index" @mouseenter="changeImg(index)" @mouseleave="restartTimer"></li>
      </ul>
    </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      activeIndex: 0,
      timer: null,
      sk: true
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: Number,
      default: 1240
    },
    height: {
      type: Number,
      default: 500
    },
    delay: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    swiperSize () {
      return {
        width: ` ${this.width} px`,
        height: `${this.height}px`
      }
    },
    listWraper () {
      return {
        width: `${this.width * (this.data.length + 1)}px`,
        transform: `translateX(-${this.width * this.activeIndex}px)`,
        transitionDuration: this.sk ? '0.3s' : '',
        fontSize: 0
      }
    }
  },
  mounted () {
    this.setTimer()
  },
  methods: {
    setTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.sk = true
        this.activeIndex++
      }, this.delay)
    },
    changeImg (index) {
      this.activeIndex = index
      clearInterval(this.timer)
    },
    restartTimer () {
      this.setTimer()
    },
    setDuration () {
      if (this.activeIndex === this.data.length) {
        this.sk = false
        this.activeIndex = 0
      }
    }
  }
}
</script>

<style lang='less' scoped>
.swiper{
  overflow: hidden;
  position: relative;

  .swiper-list{
    display: inline-block;
  }
  .swiper-pagination{
    position: absolute;
    left: 30%;
    bottom: 20px;

    li{
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 5px;
      background-color: #fff;
      cursor: pointer;

      &.isShow{
        border: 1px solid #fff;
        background-color: transparent;
      }
    }
  }
}
</style>
