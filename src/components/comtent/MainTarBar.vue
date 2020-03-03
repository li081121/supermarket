<template>
    <Tar-bar>
      <tar-baritem path="/home" activeStyle="blue" qswe="qwe">
        <div slot="item-icon" class="iconfont">&#xe623;</div>
        <div slot="item-icon-active" class="iconfont">&#xe62a;</div>
        <div slot="item-text">首页</div>
      </tar-baritem>
      <tar-baritem path="/serach" activeStyle="red">
        <div slot="item-icon" class="iconfont">&#xe60c;</div>
        <div slot="item-icon-active" class="iconfont">&#xe627;</div>
        <div slot="item-text">搜索</div>
      </tar-baritem>
      <tar-baritem path="/share" activeStyle="green">
        <div slot="item-icon" class="iconfont">&#xe626;</div>
        <div slot="item-icon-active" class="iconfont">&#xe628;</div>
        <div slot="item-text">分享</div>
      </tar-baritem>
      <tar-baritem path="/myselif" activeStyle="yellow">
        <div slot="item-icon" class="iconfont">&#xe629;</div>
        <div slot="item-icon-active" class="iconfont">&#xe614;</div>
        <div slot="item-text">我的</div>
      </tar-baritem>
    </Tar-bar>
</template>

<script>
import TarBar from '../common/tarbar/TabBar'
import TarBaritem from '../common/tarbar/TarBaritem'

export default {
  name: 'App',
  components: {
   TarBar,
   TarBaritem
  },
  data() {
    return{
      qwe:222
    }
  }
}
</script>

<style>
 
</style>
