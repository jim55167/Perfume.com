<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="products-navbar">
      <div class="products-navbar-item">
        <a href="#" :class="{ 'active': visibility === 'All'}"
         @click="visibility='All'">All</a>
        <a href="#" :class="{ 'active': visibility === 'Jo Malone'}"
         @click="visibility='Jo Malone'">Jo Malone</a>
        <a href="#" :class="{ 'active': visibility === 'Dior'}"
         @click="visibility='Dior'">Dior</a>
        <a href="#" :class="{ 'active': visibility === 'CHANEL'}"
         @click="visibility='CHANEL'">CHANEL</a>
        <a href="#" :class="{ 'active': visibility === 'YSL'}"
         @click="visibility='YSL'">YSL</a>
        <a href="#" :class="{ 'active': visibility === 'Penhaligon'}"
         @click="visibility='Penhaligon'">Penhaligon</a>
        <a href="#" :class="{ 'active': visibility === 'Chloe'}"
         @click="visibility='Chloe'">Chloe</a>

      </div>
    </div>
    <div class="products-box">
      <div class="products-item">
        <div class="products-list" v-for="(item, key) in categoryData.slice(pageStart, pageStart + countPage)" :key="key">         
          <div class="products">
            <a href="#" @click.prevent="getProduct(item.id)" style="text-decoration: none;">
              <img :src="item.imageUrl">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category }}</p>
              <p style="display:flex">NT{{ item.price | currency}}
                <span style="text-decoration:line-through;">NT{{ item.origin_price | currency}}</span>
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
    </div>
    <!-- pagination -->
    <div style="display: flex;"> 
      <nav aria-label="Page navigation example" style="margin:0 auto 15px">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': current_page === 1 }">
            <a class="page-link" href="#" aria-label="Previous"
              @click="getPage(current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
              </a>
          </li>
          <li class="page-item" v-for="page in totalPage" :key="page"
            :class="{'active': current_page === page}"> 
            <a class="page-link" href="#" @click="getPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': current_page === totalPage}">
            <a class="page-link" href="#" aria-label="Next"
            @click="getPage(current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav> 
    </div>
    <div class="footer-box">
      <div class="footer-box-item">
        <div class="footer-text">
          <h4>
            記得<br />
            訂閱以獲取更多資訊！
          </h4>
          <div class="footer-mail">
            <input type="email" placeholder="Your email address" />
            <a role="button">Subscribe</a>
          </div>
        </div>
      </div>
    </div>
    <GoTop></GoTop>
    <div class="screen" v-if="lightBox">
      <div class="view-box">
        <div class="box">已加入購物車</div>
        <div class="cancel" @click="cancelLocation">X</div> 
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';
import GoTop from '../GoTop';

export default {
  data(){
    return{
      current_page: 1,
      countPage: 12, 
      visibility: 'All',
      love: JSON.parse(localStorage.getItem('cateFilteredList')) || [],
    }
  },
   components: {
    GoTop,
  },
  methods: {
    getAllProducts() {
      this.$store.dispatch('getAllProducts');
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$store.dispatch('updateLoading',true);
      localStorage.setItem('cateFilteredList', JSON.stringify(this.products));
      this.$http.get(api).then((response) => {
        console.log(response);
        if(response.data.success){
          this.$store.dispatch('updateLoading',false);
          this.$router.push(`../front_single_product/${response.data.product.id}`).catch(err => {});
        }
      });
    },
    getPage(page) {
      if (page <= 0 || page > this.totalPage) {
        return;
      };
      this.current_page = page;
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch('addToCart', { id, qty});
      this.$store.dispatch('isLightBox',true);
    },
    cancelLocation(){
      this.$store.dispatch('isLightBox',false);
    },
    addLove(id) {
      const vm = this;
      let index = vm.love.findIndex((element) => {
        return id === element
      });
      if(vm.love.indexOf(id) < 0) {
        vm.love.push(id)
      } else {
        console.log(vm.love)
        vm.love.splice(index, 1);
      }
      localStorage.setItem('cateFilteredList', JSON.stringify(vm.love));
    }
  }, 
  computed: {
    showLove() {
      return function(id) {
        if(this.love.indexOf(id) > -1) {
          return 'far fa-heart'
        } else {
          return 'fas fa-heart'
        }
      }
    },

    categoryData(){
      if (this.visibility == 'All') {
        return this.products;
        console.log(this.products);
      }else if(this.visibility == 'Jo Malone'){
        let categoryList = [];
        this.products.forEach(function(item) {
          if (item.category == 'Jo Malone'){
            categoryList.push(item)
            console.log(categoryList);
          }
        })
        return categoryList;
      } else if(this.visibility == 'Dior'){
        let categoryList = [];
        this.products.forEach(function(item) {
          if (item.category == 'Dior'){
            categoryList.push(item)
          }
        })
        return categoryList;
      } else if(this.visibility == 'CHANEL'){
        let categoryList = [];
        this.products.forEach(function(item) {
          if (item.category == 'CHANEL'){
            categoryList.push(item)
          }
        })
        return categoryList;
      } else if(this.visibility == 'YSL'){
        let categoryList = [];
        this.products.forEach(function(item) {
          if (item.category == 'YSL'){
            categoryList.push(item)
          }
        })
        return categoryList;
      } else if(this.visibility == 'Penhaligon'){
        let categoryList = [];
        this.products.forEach(function(item) {
          if (item.category == 'Penhaligon'){
            categoryList.push(item)
          }
        })
        return categoryList;
      } else if(this.visibility == 'Chloe'){
        let categoryList = [];
        this.products.forEach(function(item) {
          if (item.category == 'Chloe'){
            categoryList.push(item)
          }
        })
        return categoryList;
      }       
    },
    products(){
      return this.$store.state.products;
    },
    categories(){
      return this.$store.state.categories;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    lightBox(){
      return this.$store.state.lightBox;
    },
    cart(){
      return this.$store.state.cart;
    },
    pageStart() {
      return (this.current_page - 1) * this.countPage;
    },
    totalPage() {
      return Math.ceil( this.categoryData.length / this.countPage);
    },
  },
  created() {
    this.getAllProducts();
    this.getCart();
  },
}
</script>

