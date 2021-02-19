<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="single-box">
      <div class="single-item">
          <div class="single-img">
              <div class="single-img-nav">
                  <img alt="圖一" :src="product.imageUrl">
              </div>
              <div class="single-img-nav2">
                  <img alt="圖二" :src="product.imageUrl2">
                  <img alt="圖三" :src="product.imageUrl3">
              </div>
          </div>
          <div class="single-nav">
            <h3>{{ product.title }}</h3>
            <pre>{{ product.content }}</pre>
            <p>NT{{ product.price | currency }}</p>
            <div class="single-num">
              <select name="" class="form-control" v-model="product.num">
                <option :value="num" v-for="num in 10" :key="num">
                  {{ num }} {{ product.unit }}
                </option>
              </select>
              <button type="button" class="btn" @click.prevent="addToCart(product.id, product.num)">
                <i class="fas fa-circle-notch fa-spin" v-if="product.id === loadingItem"></i>加入購物車
              </button>
            </div>
            <div class="single-heart">
              <a href="#" title="加入收藏" @click.prevent="addLove(product.id)">
                <i :class="showLove(product.id)"></i>加入我的收藏
              </a>
            </div>
            <div class="single-native">
              <pre>{{ product.description }}</pre>
              <h5>商品購買須知</h5>
              <p>產品因拍攝關係顏色可能略有差異，實際以廠商出貨為主。 商品情境照為示意用，僅商品主體不包含其他配件，請以規格內容物為主。盡可能確保所列商品備貨充足，但偶爾仍會有產品售罄的情況。如您所訂購的商品庫存不足，我們將盡快以電子郵件通知您。任何訂單變動均會在訂單總額與出貨訊息內更新。</p>
              <h5>退換貨須知</h5>
              <p>依《消費者保護法》的規定，於全站購物皆享有商品到貨【七日猶豫期】（含例假日）之權益。若收到的商品有任何問題，可於猶豫期內申請退貨。</p>
            </div>
          </div>
          <div class="single-img-nav3">
            <img alt="圖二" :src="product.imageUrl2">
            <img alt="圖三" :src="product.imageUrl3">
          </div>
      </div>
    </div>
    <GoTop></GoTop>
    <div class="screen" v-if="lightBox">
      <div class="view-box">
        <div class="box">已加入購物車</div>
        <div class="cancel" @click.prevent="cancelLocation">X</div>
      </div>
    </div>
  </div>
</template>

<script>
import GoTop from '@/components/GoTop'
import axios from 'axios'
export default {
  data () {
    return {
      productId: '',
      product: {
        num: 1
      },
      love: JSON.parse(localStorage.getItem('loveList')) || [],
      flag: false
    }
  },
  watch: {
    $route (to, from) {
      this.productId = this.$route.params.productID
      this.getSingleProduct()
    }
  },
  methods: {
    getSingleProduct () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productId}`
      this.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.product = response.data.product
          this.$set(this.product, 'num', 1)
          this.$store.dispatch('updateLoading', false)
        }
      })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    addToCart (id, qty = 1) {
      if (this.flag) {
        return
      }
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$store.dispatch('isLightBox', true)
      this.$store.dispatch('updateLoading', true)
      this.$store.dispatch('getCart').then(cartItem => {
        const cartProducts = cartItem.filter(item => {
          console.log(item)
          return item.product_id === id
        })
        let cart = {
          product_id: id,
          qty
        }
        if (cartProducts.length > 0) {
          this.flag = true
          const totalNum = cartProducts[0].qty
          cart = {
            product_id: id,
            qty: qty + totalNum
          }
          const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartProducts[0].id}`
          Promise.all([axios.post(addApi, { data: cart }), axios.delete(deleteApi)])
            .then(() => {
              this.flag = false
            })
        } else if (cartProducts.length === 0) {
          this.$http.post(addApi, { data: cart }).then(response => {
            this.flag = false
            if (response.data.success) {
              this.$store.dispatch('getCart')
              this.$store.dispatch('updateLoading', false)
            }
          })
        }
      })
    },
    cancelLocation () {
      this.$store.dispatch('isLightBox', false)
    },
    addLove (id) {
      const vm = this
      const index = vm.love.findIndex((element) => {
        return id === element
      })
      if (vm.love.indexOf(id) < 0) {
        vm.love.push(id)
      } else {
        vm.love.splice(index, 1)
      }
      localStorage.setItem('loveList', JSON.stringify(vm.love))
    }
  },
  computed: {
    showLove () {
      return function (id) {
        if (this.love.indexOf(id) > -1) {
          return 'far fa-heart'
        } else {
          return 'fas fa-heart'
        }
      }
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    cart () {
      return this.$store.state.cart
    },
    loadingItem () {
      return this.$store.state.loadingItem
    },
    lightBox () {
      return this.$store.state.lightBox
    }
  },
  created () {
    this.productId = this.$route.params.productID
    this.getSingleProduct()
    this.getCart()
  },
  components: {
    GoTop
  }
}
</script>
