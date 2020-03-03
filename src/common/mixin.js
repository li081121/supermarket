import {debounce} from './utils'
import Backtop from 'components/comtent/backtop/Backtop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh =debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    console.log('我时混入中的内容')
  }
}

export const backTopMixin = {
  data() {
    return {
      isshowBacktop:false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
      console.log(123)
    },
    listenShoBackTop(position) {
      this.isshowBacktop = (- position.y) > 1000
    }
  },
  components: {
    Backtop
  }
}