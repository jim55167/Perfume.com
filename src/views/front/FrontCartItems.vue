<template>
  <div class="item-wrap">
    <Loading :active.sync="isLoading"></Loading>
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell">縮圖</th>
          <th>品項</th>
          <th class="d-sm-table-cell d-none" width="120px">數量</th>
          <th width="25%">總計</th>
          <th width="60px">刪除</th>
        </tr>
      </thead>
      <tbody class="cart-items">
        <tr v-for="item in cart.carts" :key="item.id">
          <td class="align-middle d-md-table-cell">
            <div class="product-preview d-md-block"
              :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
          </td>
          <td class="align-middle text-center">
            {{ item.product.title }}
            <div class="text-primary" v-if="item.coupon">已套用優惠券</div>
          </td>
          <td class="align-middle d-sm-table-cell d-none qty-adjust">
            <select v-model="item.qty" @change="updateCart(item.id, item.product.id, item.qty)">
              <option :value="num" v-for="num in 10" :key="num">{{ num }}</option>
            </select>
            {{ item.product.unit }}
          </td>
           <td class="align-middle">
            {{ item.total | currency }}
            <div class="text-primary" v-if="item.coupon">{{ item.final_total | currency }}</div>
          </td>
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm"
              @click="removeCart(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total | currency }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-right" style="color:red;">折扣價</td>
          <td class="text-right" style="color:red;">{{ cart.final_total | currency }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼"/>
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addCouponCode">套用優惠碼</button>
        <div class="coupon-message">{{ this.focus }}</div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4 step-control">
      <router-link class="btn btn-primary" to="/home">返回商場</router-link>
      <router-link class="btn btn-danger" to="front_order" v-if="nextPage">下一步</router-link>
    </div>
    <GoTop></GoTop>
  </div>
</template>

<script>
import GoTop from '@/components/GoTop'
export default {
  name: 'FrontCartItems',
  data () {
    return {
      coupon_code: '',
      focus: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    updateCart (id, productId, qty) {
      this.$store.dispatch('updateCart', { id, productId, qty })
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$store.dispatch('updateLoading', true)
      this.$http.post(url, { data: coupon }).then(response => {
        this.focus = response.data.message
        this.getCart()
        this.$store.dispatch('updateLoading', false)
      })
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    nextPage () {
      if (this.cart.carts === 0) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.getCart()
  },
  components: {
    GoTop
  }
}
</script>
