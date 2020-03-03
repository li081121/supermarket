import {
  ADD_COUNTER,
  ADD_TP_CART
} from './mutations-Types'

export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
        //payload新添加的商品
    let oldProduct = null
    for(let item of context.state.cartList){
      if(item.iid == payload.iid){
        oldProduct == item
      }
    }
    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('+1')
    }else {
      payload.count = 1 
      // state.cartList.push(payload)
      context.commit(ADD_TP_CART,payload)
      resolve('添加成功')
    }
    })
  }
}