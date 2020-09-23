<template>
  <div class="wrapper"
       ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
/* BetterScroll插件 */
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    /* 下拉刷新 */
    pulldown: {
      type: Boolean,
      default: false
    },
    pullDownMsg: {
      type: String,
      default: '正在更新中'
    },
    pullDownEndMsg: {
      type: String,
      default: '更新完成'
    }

  },

  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    });
  },

  watch: {
    data () {
      setTimeout(() => {
        this.scroll.refresh()
      }, this.refreshDelay)
    },
  },
  /* updated () {  //当数据更新时，重新计算滑动值
    this.scroll.refresh()
  }, */

  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      //better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          let me = this
          if (pos.y > 50) {
            me.$emit('scroll', this.pullDownMsg)
          }
        })
      }
      //下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            this.$emit('pulldown', this.pullDownEndMsg)
          }
        })
      }
    },
    scrollTo (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>