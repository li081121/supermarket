<template>
    <div id="tar-bar">
      <slot></slot>
    </div>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
  
  #tar-bar{
    display: flex;
    background-color: gray;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0px -3px 1px rgba(100, 100, 100, 0.7);
    line-height: 22px;
  }
  
</style>
