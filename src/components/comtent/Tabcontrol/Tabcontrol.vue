<template>
  <div class="tab-control">
    <div 
    v-for="(item,index) in titles" 
    :key="index" 
    class="tab-con-item" 
    :class="{active: index === currentIndex}" @click="itemclick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'Tabcontrol',
  props:{
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit('tabclick',index)

    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
    background-color: white;
  }

  .tab-con-item {
    flex: 1;
  }

  .tab-con-item span {
    padding: 5px;
  }

  .active {
    color: pink;
  }

  .active span {
    border-bottom: 2px solid pink;
  }
</style>