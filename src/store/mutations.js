import {
  ADD_COUNTER,
  ADD_TP_CART
} from './mutations-Types'

export default {
  [ADD_COUNTER](state,payload) {
    payload.count ++
  },
  [ADD_TP_CART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}