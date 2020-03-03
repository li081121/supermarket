<template>
<div class="wrapper" ref="wrapper">
   <ul>
     <button @click="btnclick">点击</button>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
     <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
     <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
     <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
     <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
  </ul>
</div>
 
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'search',
  components: {
   
  },
  data() {
    return {
      scroll:null
    }
  },
  created() {
  
  },
  mounted() {

    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType:3,
      pullUpLoad:true,
      click:false
    })
    this.scroll.on('scroll',(position) => {
      console.log(position)
    })
    this.scroll.on('pullingUp',() => {
      setTimeout(() => {
        console.log('上拉加载更多')
      },2000)
    })
  },
  methods: {
    btnclick() {
      console.log('可以监听')
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>
