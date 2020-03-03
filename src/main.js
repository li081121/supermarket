import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index'


Vue.config.productionTip = false

//安装插件
Vue.use(toast)

//解决移动端300ms延迟
// Vue.use(Lazyoad,{
//   loading: require('assets/img/common/placeholder.png')
// })
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
