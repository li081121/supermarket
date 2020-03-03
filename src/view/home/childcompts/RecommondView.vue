<template>
  <div class="commend">
   <div v-for="(item,index) in recommend" :key="index" class="commenditem">
     <a :href="item.link">
       <img :src="item.image" alt="">
     </a>
     <div>{{item.title}}</div>
   </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommend:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .commend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 10px 0 20px;
    border-bottom: 8px solid gray
  }
  .commenditem {
    flex: 1;
  }
  .commend img {
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
  }
</style>