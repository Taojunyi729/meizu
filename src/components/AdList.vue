<template>
    <div class="clearfix">
      <div class="ad-left fl">
        <a :href="data[0] && data[0].href">
          <img :src="data[0] && data[0].imgUrl" class="ad-img" alt="">
        </a>
      </div>
      <div class="fr">
        <div class="ad-right-top">
          <a :href="data[1] && data[1].href">
            <img :src="data[1] && data[1].imgUrl" class="ad-img" alt="">
          </a>
        </div>
        <div class="clearfix">
          <div class="ad-right-bottom fl">
            <a :href="data[2] && data[2].href">
              <img :src="data[2] && data[2].imgUrl" class="ad-img" alt="">
            </a>
          </div>
          <div class="ad-right-bottom fr">
            <a :href="data[3] && data[3].href">
              <img :src="data[3] && data[3].imgUrl" class="ad-img" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
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
  }
}
</script>

<style lang='less' scoped>
  .ad-left{
    width:615px;
    height:450px;
    margin-top:10px
  }
  .ad-right-top{
    width:616px;
    height:220px;
    margin-top:10px
  }
  .ad-right-bottom{
      width:303px;
      height:220px;
      margin-top:10px
  }
  .ad-img{
    width:100%;
    height:100%;
    transition:all .3s ease;

    &:hover{
      box-shadow:0 10px 20px rgba(0, 0, 0, 0.3)
    }
  }
</style>
