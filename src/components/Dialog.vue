<template>
  <transition name="dialog">
    <div class="dialog-backdrop" v-show="show">
      <div class="dialog-box">
        <div class="dialog-wrapper" :style="dialogWidth">
          <div class="dialog-header" :class="{'dialog-header-border': title}">
            {{title}}
            <i class="dialog-close icon-font icon-close" @click="close"></i>
          </div>
          <div :style="dialogContent">
            <slot></slot>
          </div>
          <div class="dialog-footer" v-if="buttonConfirmShow || buttonCancelShow">
            <button v-show="buttonConfirmShow" class="btn success wd100 mr20" @click="confirm">{{buttonConfirmContent}}</button>
            <button v-show="buttonCancelShow" class="btn cancel wd100" @click="cancel">{{buttonCancelContent}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 760
    },
    height: {
      type: Number,
      default: 280
    },
    title: {
      type: String,
      default: ''
    },
    buttonConfirmShow: {
      type: Boolean,
      default: true
    },
    buttonConfirmContent: {
      type: String,
      default: '确定'
    },
    buttonCancelShow: {
      type: Boolean,
      default: true
    },
    buttonCancelContent: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
    },
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    dialogWidth () {
      return {
        width: `${this.width}px`
      }
    },
    dialogContent () {
      return {
        height: `${this.height}px`
      }
    }
  }
}
</script>

<style lang='less' scoped>
.dialog-backdrop{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(156,156,156,0.6);
  display: table;

  .dialog-box{
    display: table-cell;
    vertical-align: middle;

    .dialog-wrapper{
      margin:0 auto;
      background-color: #fff;
      text-align: center;

      .dialog-header{
        height:50px;
        line-height: 50px;
        color:#333;
        font-size:18px;
        font-weight:bold;
        border-radius:4px 4px 0 0;
        position:relative;

        .dialog-close{
          position: absolute;
          right:26px;
          top:16px
        }
      }

      .dialog-header-border{
        border-bottom: 1px solid #bdbdbd;
      }

      .dialog-footer{
        padding-bottom: 30px;

        .mr20{
          margin-right: 20px;
        }

        .wd100{
          width:100px
        }
      }
    }
  }
}
.dialog-enter-active{
  transition:0.3s opacity ease-in-out;
}
.dialog-enter{
  opacity: 0
}
</style>
