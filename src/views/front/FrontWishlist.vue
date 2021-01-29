<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="products-box">
      <div class="products-item">
        <div class="products-list" v-for="(item, key) in loveList.slice(pageStart, pageStart + countPage)" :key="key">
          <div class="products" v-if="loveItem">
            <a href="#" @click.prevent="getProduct(item.id)" style="text-decoration: none;">
              <img :src="item.imageUrl">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category }}</p>
              <p class="d-flex">NT{{ item.price | currency }}
                <del>NT{{ item.origin_price | currency }}</del>
              </p>
            </a>
            <div class="products-add">
              <a href="#" title="加入收藏" @click.prevent="addLove(item.id)">
                <i :class="showLove(item.id)"></i>
              </a>
              <a href="#" title="加入購物車" @click.prevent="addToCart(item.id)">
                <i class="fas fa-shopping-cart"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="emptyCart-wrap" v-if="!loveItem">
        <h4>收藏欄位空空的！</h4>
        <router-link class="btn btn-primary shopping-link" to="/home">Shopping Now</router-link>
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
import $ from 'jquery'
export default {
  data () {
    return {
      current_page: 1,
      countPage: 12,
      love: JSON.parse(localStorage.getItem('loveList')) || []
    }
  },
  methods: {
    getAllProducts () {
      this.$store.dispatch('getAllProducts')
    },
    getProduct (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading', true)
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
      this.$store.dispatch('addToCart', { id, qty })
      this.$store.dispatch('isLightBox', true)
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
    loveList () {
      const vm = this
      return vm.products.filter((item) => {
        return vm.love.indexOf(item.id) > -1
      })
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
      return Math.ceil(this.loveList.length / this.countPage)
    },
    loveItem () {
      if (this.loveList === undefined) {
        return false
      } else {
        if (this.loveList.length === 0) {
          return false
        } else {
          return true
        }
      }
    }
  },
  created () {
    this.getAllProducts()
    this.getCart()
  },
  components: {
    GoTop
  }
}
</script>
