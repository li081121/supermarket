import Vue from 'vue'
import Router from 'vue-router'

//1、安装插件
Vue.use(Router)

const Home = () => import('../view/home/home')
const Myselif = () => import('../view/myselif/myselif')
const Serach = () => import('../view/serach/serach')
const Share = () => import('../view/share/share')
const Detail = () => import('../view/detail/Detail')

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/myselif',
    component:Myselif
  },
  {
    path:'/serach',
    component:Serach
  },
  {
    path:'/share',
    component:Share
  },
  {
    path:'/Detail/:iid',
    component:Detail
  }
]
//2、创建对象
const router = new Router({
  routes,
  
})

//3、导出
export default router