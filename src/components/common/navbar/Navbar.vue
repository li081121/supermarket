<template>
    <div class="nav-bar">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
</template>

<script>


export default {
  name: 'Navbar',
  components: {
   
  }
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 40px;
    line-height: 44px;
    text-align: center;
  }
  .left, .right{
    width: 60px;
    background-color: blue;
  }
  .center{
    flex: 1;
    background-color: red;
    
  }
</style>
