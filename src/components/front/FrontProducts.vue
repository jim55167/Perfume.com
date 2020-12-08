<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="products-navbar">
      <div class="products-navbar-item">
        <a href="#" :class="{ active: currentFilter === 'All'}"
         @click="setFilter('All')">All</a>
        <a href="#" :class="{ active: currentFilter === 'Jo Malone'}"
         @click="setFilter('Jo Malone')">Jo Malone</a>
        <a href="#" :class="{ active: currentFilter === 'Dior'}"
         @click="setFilter('Dior')">Dior</a>
        <a href="#" :class="{ active: currentFilter === 'CHANEL'}"
         @click="setFilter('CHANEL')">CHANEL</a>
        <a href="#" :class="{ active: currentFilter === 'YSL'}"
         @click="setFilter('YSL')">YSL</a>
        <a href="#" :class="{ active: currentFilter === 'Penhaligon'}"
         @click="setFilter('Penhaligon')">Penhaligon</a>
        <a href="#" :class="{ active: currentFilter === 'Chloe'}"
         @click="setFilter('Chloe')">Chloe</a>
      </div>
    </div>
    <div class="products-box">
      <div class="products-item">
        <div class="products-list" v-for="(item, key) in products.slice(pageStart, pageStart + countPage)" :key="key">         
          <div class="products">
            <a href="#" @click.prevent="getProduct(item.id)" style="text-decoration: none;">
              <img :src="item.imageUrl">
              <h4>{{ item.title }}</h4>
              <p>{{ item.category }}</p>
              <p style="display:flex">NT{{ item.price | currency}}
                <span style="text-decoration:line-through;">NT{{ item.origin_price | currency}}</span>
              </p>
            </a>
              <a href="#">
                <i class="fas fa-heart"></i>
              </a>
              <a href="#">
                <i class="fas fa-shopping-cart"></i>
              </a>           
          </div>
        </div>
      </div>
    </div>
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
    <GoTop></GoTop>
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
    getCategory() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);

      });
      vm.categories = Array.from(categories);
      console.log(vm.categories);
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
  },
  computed: {
    categoryData(){
      
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
    cart(){
      return this.$store.state.cart;
    },
    pageStart() {
      return (this.current_page - 1) * this.countPage;
    },
    totalPage() {
      return Math.ceil( this.products.length / this.countPage);
    },
  },
  created() {
    this.getAllProducts();
  },
}
</script>

