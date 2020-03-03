<template>
  <div class="sharelist">
    <scroll class="content" ref="scroll">
      <sharelistitem v-for="(item,index) in cartList" :itemInfo="item" :key="index"></sharelistitem>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
import Sharelistitem from './sharelistitem'
export default {
  name:'sharelist',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    Sharelistitem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.sharelist {
  height: calc(100% - 44px - 49px);
}
  .content {
    height: 100100%;
    overflow: hidden;
  }
</style>