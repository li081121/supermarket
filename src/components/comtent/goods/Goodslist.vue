<template>
  <div class="goods">
    <goodslistitem v-for="(item,index) in good" :key="index" :goodsitem="item"></goodslistitem>
  </div>
</template>

<script>
import Goodslistitem from './Goodslistitem'
export default {
  name:'goodslist',
  props:{
    good: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Goodslistitem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    /* 这个属性是根据子盒子的宽度来决定一行要设置多少个盒子 */
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>