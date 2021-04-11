<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="products-navbar">
      <div class="products-navbar-item">
        <a href="#" :class="{ 'active': visibility === 'All' }"
        @click.prevent="visibility='All'">All</a>
        <a href="#" :class="{ 'active': visibility === 'Jo Malone' }"
        @click.prevent="visibility='Jo Malone'">Jo Malone</a>
        <a href="#" :class="{ 'active': visibility === 'Dior' }"
        @click.prevent="visibility='Dior'">Dior</a>
        <a href="#" :class="{ 'active': visibility === 'CHANEL' }"
        @click.prevent="visibility='CHANEL'">CHANEL</a>
        <a href="#" :class="{ 'active': visibility === 'YSL' }"
        @click.prevent="visibility='YSL'">YSL</a>
        <a href="#" :class="{ 'active': visibility === 'Penhaligon' }"
        @click.prevent="visibility='Penhaligon'">Penhaligon</a>
        <a href="#" :class="{ 'active': visibility === 'Chloe' }"
        @click.prevent="visibility='Chloe'">Chloe</a>
      </div>
    </div>
    <div class="products-box">
      <div class="products-item d-flex">
        <div class="products-list d-flex" v-for="(item, key) in categoryData.slice(pageStart, pageStart + countPage)" :key="key">
          <div class="products">
            <a href="#" @click.prevent="getProduct(item.id)" style="text-decoration: none;">
              <img alt="圖一" :src="item.imageUrl">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category }}</p>
              <p class="d-flex">NT{{ item.price | currency }}
                <del>NT{{ item.origin_price | currency }}</del>
              </p>
            </a>
            <div class="products-add d-flex">
              <a href="#" title="加入收藏" @click.prevent="addLove(item.id)">
                <i :class="showLove(item.id)"></i>
              </a>
              <a href="#" title="加入購物車" @click.prevent="addToCart(item.id)">
                <i class="fas fa-shopping-cart"></i>
              </a>
              <Star :product-item="item" @update="changeStar" v-model="starLocal"></Star>
            </div>
          </div>
          <div class="screen" v-if="lightBox">
            <div class="view-box">
              <div class="box">已加入購物車</div>
              <div class="cancel" @click.prevent="cancelLocation">X</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- pagination -->
    <div class="d-flex">
      <nav aria-label="Page navigation example" style="margin:0 auto 15px">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': current_page === 1 }">
            <a class="page-link" href="#" aria-label="Previous"
              @click.prevent="getPage(current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
              </a>
          </li>
          <li class="page-item" v-for="page in totalPage" :key="page"
            :class="{ 'active': current_page === page }">
            <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': current_page === totalPage }">
            <a class="page-link" href="#" aria-label="Next"
            @click.prevent="getPage(current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="footer-box-product">
      <div class="footer-box-item">
        <div class="footer-text">
          <h4>
            記得<br />
            訂閱以獲取更多資訊！
          </h4>
          <form action="#">
            <div class="d-flex form-color">
              <input class="form-control" type="email"
                name="subscribeEmail" placeholder="Your email address"/>
              <input class="form-control-btn" type="submit" value="Subscribe">
            </div>
          </form>
        </div>
      </div>
    </div>
    <GoTop></GoTop>
  </div>
</template>

<script>
import GoTop from '@/components/GoTop'
import Star from '@/components/Star'
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    return {
      current_page: 1,
      countPage: 12,
      visibility: 'All',
      love: JSON.parse(localStorage.getItem('loveList')) || [],
      starLocal: JSON.parse(localStorage.getItem('starList')) || [],
      flag: false,
      isActive: true
    }
  },
  methods: {
    getAllProducts () {
      this.$store.dispatch('getAllProducts')
    },
    getProduct (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading', true)
      localStorage.setItem('cateFilteredList', JSON.stringify(this.products))
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false)
          this.$router.push(`../front_single_product/${response.data.product.id}`).catch(err => err)
        }
      })
    },
    getPage (page) {
      $('html, body').animate({ scrollTop: 0 }, 600)
      if (page <= 0 || page > this.totalPage) {
        return
      };
      this.current_page = page
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    addToCart (id, qty = 1) {
      if (this.flag) {
        return
      }
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$store.dispatch('updateLoading', true)
      this.$store.dispatch('getCart').then(cartItem => {
        const cartProducts = cartItem.filter(item => {
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
      this.$store.dispatch('isLightBox', true)
    },
    cancelLocation () {
      this.$store.dispatch('isLightBox', false)
    },
    addLove (id) {
      const index = this.love.findIndex(element => {
        return id === element
      })
      if (this.love.indexOf(id) < 0) {
        this.love.push(id)
      } else {
        this.love.splice(index, 1)
      }
      localStorage.setItem('loveList', JSON.stringify(this.love))
    },
    changeStar (value) {
      const newProducts = JSON.parse(JSON.stringify(this.products))
      newProducts.forEach(item => {
        if (item.id === value.id) {
          item.star = value.star
          if (this.starLocal.indexOf(item.id) === -1) {
            const demo = {
              id: item.id,
              total: item.star
            }
            this.starLocal.push(demo)
          }
        }
      })
      this.$store.dispatch('updateProduct', newProducts)
      localStorage.setItem('starList', JSON.stringify(this.starLocal))
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
    categoryData () {
      let data = []
      if (this.visibility === 'All') {
        data = this.products
      } else if (this.visibility === 'Jo Malone') {
        const categoryList = []
        this.products.forEach((item) => {
          if (item.category === 'Jo Malone') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === 'Dior') {
        const categoryList = []
        this.products.forEach((item) => {
          if (item.category === 'Dior') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === 'CHANEL') {
        const categoryList = []
        this.products.forEach((item) => {
          if (item.category === 'CHANEL') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === 'YSL') {
        const categoryList = []
        this.products.forEach((item) => {
          if (item.category === 'YSL') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === 'Penhaligon') {
        const categoryList = []
        this.products.forEach((item) => {
          if (item.category === 'Penhaligon') {
            categoryList.push(item)
          }
        })
        data = categoryList
      } else if (this.visibility === 'Chloe') {
        const categoryList = []
        this.products.forEach((item) => {
          if (item.category === 'Chloe') {
            categoryList.push(item)
          }
        })
        data = categoryList
      }
      return data
    },
    products () {
      return this.$store.state.products
    },
    categories () {
      return this.$store.state.categories
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    lightBox () {
      return this.$store.state.lightBox
    },
    cart () {
      return this.$store.state.cart
    },
    pageStart () {
      return (this.current_page - 1) * this.countPage
    },
    totalPage () {
      return Math.ceil(this.categoryData.length / this.countPage)
    }
  },
  mounted () {
    this.getAllProducts()
    this.getCart()
  },
  components: {
    GoTop,
    Star
  }
}
</script>
