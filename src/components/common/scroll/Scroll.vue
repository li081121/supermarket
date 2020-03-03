<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot class="s"></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll:null,
      
    }
  },
  mounted() {
    //1、创建BSscroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpload:this.pullUpload
    })

    //2、监听滚动的位置
    if(this.probeType === 2 || this.probeType ===3) {
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
    }

    //3、监听滚动事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=1000) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  /* .s{
    position: sticky;
    top: 40px;
  } */
</style>