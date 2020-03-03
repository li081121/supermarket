<template>
<div id="home">
  <nav-bar class="homenav">
    <div slot="center">购物街</div>
  </nav-bar>
  <tab-control class="tab-control" v-show="isTabFixed"  ref="tabControl1"  :titles="['流行','经典','爆炸']" @tabclick="tabClick"></tab-control>
  <scroll class="content"
   ref="scroll" 
   :probe-type="3" 
   @scroll="contentscroll" 
   :pull-uo-load="true" @pullingUp="loadmore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommend="recommends"></recommend-view>
    <feature></feature>
    <tab-control  ref="tabControl2"  :titles="['流行','经典','爆炸']" @tabclick="tabClick"></tab-control>
    <goodslist :good="showlist"></goodslist>
  </scroll>
  <!-- 监听组件根元素点击事件的话要加个native -->
  <backtop @click.native="backClick" v-show="isshowBacktop"></backtop>
  
</div>

</template>

<script>
import HomeSwiper from './childcompts/HomeSwiper'
import RecommendView from './childcompts/RecommondView'
import Feature from './childcompts/Feature'

import TabControl from 'components/comtent/Tabcontrol/Tabcontrol'
import NavBar from 'components/common/navbar/Navbar'
import Goodslist from 'components/comtent/goods/Goodslist'
import Scroll from 'components/common/scroll/Scroll'
import Backtop from 'components/comtent/backtop/Backtop'


import {getHomeMultidata,getgoods} from '../../network/home'
import {debounce} from '@/common/utils.js'
import {itemListenerMixin,backTopMixin} from '../../common/mixin'

export default {
  name: 'home',
  data() {
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
      },
      currindextype:'pop',
      taboffsetTop:0,
      saveY:0,
      isTabFixed:false
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  computed: {
    showlist() {
      return this.goods[this.currindextype].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    Goodslist,
    Scroll,
    Backtop
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata()

    //2、请求商品数据
    this.getgoods('pop')
    this.getgoods('new')
    this.getgoods('sell')
  },
  destroyed() {
    console.log('home destroy')
  },
  activated() {
    console.log('activated')
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.newRefresh()
  },
  deactivated() {
    //1、保存Y值
    this.saveY = this.$refs.scroll.scroll.y
    //2、取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  mounted() {
    //1、图片加载完的事件监听

    //2、获取offsettop
    //所有的组件都有一个属性$el：用于获取组件中的元素

  },
  methods: {
    loadmore() {
      this.getgoods(this.currindextype)
    },

    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 事件监听相关的方法
    tabClick(index) {
      console.log(index)
      switch(index) {
        case 0:
          this.currindextype = 'pop'
          break
        case 1:
          this.currindextype = 'new'
          break
        case 2:
          this.currindextype = 'sell'
          break
      }
      this.$refs.tabControl1.currindextype = index
      this.$refs.tabControl2.currindextype = index
    },
   
    contentscroll(position) {
      // console.log(position)
      this.isshowBacktop = (- position.y) > 1000

      this.isTabFixed = (-position.y) > this.taboffsetTop
    },
    loadMare() {
      this.getgoods(this.currindextype)
      this.$refs.scroll.scroll.refresh()
    },
    

    // 网络请求相关的方法
    getHomeMultidata() {
      //1、请求多个数据
      getHomeMultidata().then(res => {

        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list

      })
    },
    getgoods(type) {
      //2、请求商品数据
      const page = this.goods[type].page + 1
      getgoods(type,page).then(res => {
        console.log(res.data.list)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
 
  .content {
    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* height: calc(100% - 50px);
    overflow: hidden;
    margin-top: 40px; */
  }
  #home {
    /* vh是视口高度 */
    height: 100vh;
  }
  .homenav {
    background-color: var(--color--tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0; 
    z-index: 10;
  }
  /* .tab-control {
    position: sticky;
    top: 40px;
    z-index: 9
  } */
  /* .fixed {
    position: fixed;
    left: 0;
    top: 40px;
    right: 0;
  } */
  .tab-control {
    position: relative;
    z-index: 11;
    top: 40px;
  }
 
</style>
