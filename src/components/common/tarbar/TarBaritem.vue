<template>
  <div class="tar-bar-item" @click="itemclick">
    <div v-if="isActived">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="clickStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  props:{
    path:String,
    activeStyle: {
      type:String,
    },
    qswe:String
  },
  data() {
    return{
      
    }
  },
  computed:{
    isActived() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    clickStyle() {
      return this.isActived ? {color:this.activeStyle} : {}
    }
  },
  components: {
  
  },
  methods:{
    itemclick() {
      this.$router.push(this.path)
      console.log(this.qswe)
    }
  }
}
</script>

<style>
 .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tar-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: red
  }
</style>
