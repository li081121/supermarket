<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  name: 'HomeSwiper',
  data() {
    return{
      isload: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageload() {
      if(!this.isload) {
        this.$emit('swiperImageLoad')
        this.isload = true
      }
    }
  }
}
</script>

<style scoped>
  
</style>
