<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" @click.native="checkClick" class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/comtent/checkbutton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name:'shareButtonBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((praValue,item) => {
        return praValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked 
      }).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
  }
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;

    display: flex;
    line-height: 40px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;

  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 20px;
    width: 60px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>