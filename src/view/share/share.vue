<template>
  <div class="Cart">
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <share-list></share-list>
    <!-- 底部汇总 -->
    <share-button-bar></share-button-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/Navbar'
import shareList from './childcompts/sharelist'
import shareButtonBar from './childcompts/shareButtonBar'
import {mapGetters} from 'vuex'
export default {
  name: 'share',
  components: {
    NavBar,
    shareList,
    shareButtonBar
  },
  computed: {
    // ...mapGetters([
    //   'cartLength','cartList'
    // ])
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: pink;
    color: white;
  }
</style>
