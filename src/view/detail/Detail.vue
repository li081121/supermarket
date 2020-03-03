<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-baseinfo :goods="goods"></detail-baseinfo>
      <detail-shopinfo :shop="shop"></detail-shopinfo>
      <detail-goodsinfo :detail-info="detailInfo" @imageLoad="imageLoad" @detailImageLoad="detailImageLoad"></detail-goodsinfo>
      <detail-paraminfo :paramInfo="paramsInfo" ref="params"></detail-paraminfo>
      <detail-commentinfo :commentInfo="commentInfo" ref="comment"></detail-commentinfo>
      <goodslist :good="recommends" ref="recommend"></goodslist>
    </scroll>
    <detail-bottom-bar @addCart="addTocart"></detail-bottom-bar>
    <backtop @click.native="backClick" v-show="isshowBacktop" ></backtop>
    <!-- <tosat :message="message" :v-show="show"></tosat> -->
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from '../../network/detail.js'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseinfo from './childComps/DetailBaseInfo'
import DetailShopinfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsinfo from './childComps/DetailGoodsInfo'
import DetailParaminfo from './childComps/DetailParamInfo'
import DetailCommentinfo from './childComps/DetailCommentinfo'
import Goodslist from 'components/comtent/goods/Goodslist'
import {debounce} from '../../common/utils'
import {itemListenerMixin,backTopMixin} from '../../common/mixin'
import DetailBottomBar from './childComps/DetailBottomBar'
import Backtop from 'components/comtent/backtop/Backtop'
import {mapActions} from 'vuex'
// import Tosat from 'components/common/toast/Tosat'
export default {
  name:'Detail',
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommends:[],
      currentIndex:0,
      themeTopYs:[],
      getThemeTopY:null,
      // message:'',
      // show:false
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseinfo,
    DetailShopinfo,
    Scroll,
    DetailGoodsinfo,
    DetailParaminfo,
    DetailCommentinfo,
    Goodslist,
    DetailBottomBar,
    Backtop,
    // Tosat
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid

    //2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //1、获取顶部的图片轮播数据
      console.log(res)
      this.topImages = data.itemInfo.topImages

      //2、获取商品信息
      this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)

      //3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //4、保存商品详情数据
      this.detailInfo = data.detailInfo

      //5、获取参数的信息
      this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6、取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //3、请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //给getThemeTopY赋值（对给this.getThemeTopYs赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    })
  },
  methods: {
    ...mapActions(['addCart']),
    addTocart() {
      console.log(5849841)
      //1、获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //2、将商品添加到购物车页面(1、Promise 2、mapActions)
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res)
      // })

      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res

        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''  
        // },1500)
        this.$toast.show(res,2000)
        console.log(res)
      })
      console.log(product)
      // this.addCart(product).then(res => {
      //   console.log(res)
      // })
    },
    
    imageLoad() {
      this.newRefresh()
    },
    detailImageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position) {
      //1、获取Y值
      const positionY = -position.y

      //2、positionY和主题中值进行对比
      let length = this.themeTopYs.length
      for(let i = 0;i < length - 1;i ++) {
        // if(this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1] || (i === length - 1 && positionY >= this.getThemeTopY[i])))) {
        //   this.currentIndex = i
        //   console.log(i)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        if(this.currentIndex !== i && (positionY >= this.currentIndex[i] && positionY < this.currentIndex[i + 1])) {
          this.currentIndex = i
          console.log(i)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //3、是否回到顶部
      this.listenShoBackTop(position  )
    },
    
  },
  mounted() {
   
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  updated() {
    // this.themeTopYs = []

    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

    // console.log(themeTopYs)
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>