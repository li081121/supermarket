import Axios from 'axios'
import Qs from 'querystring'


export function request(config) {
  
    //1、创建axios的实例
    const instance1 = Axios.create({
      baseURL:'http://123.207.32.32:8000/api/hy',
      // bsseURL:'http://106.54.54.237:8000/api/hy',
      timeout:5000,
      transformRequest: [
        function(data) {
          return Qs.stringify(data)
        }
      ]
    })

    //2、axios的拦截器
    //2.1 请求拦截的作用
    instance1.interceptors.request.use(config => {//这里是响应成功的
      // console.log(config)

      return config //拦截到之后必须返回出去，不然就是undefind
    },err => {//这里是响应失败的
      // console.log(err)
    })

    //2.2响应拦截
    instance1.interceptors.response.use(res => {//这里面是响应成功的
      // console.log(res)
      return res.data //拦截到之后必须返回出去，不然就是undefind
    },err => {//这里是响应失败的
      // console.log(err)
    })

    //发送真正的网络请求
    return instance1(config)
}