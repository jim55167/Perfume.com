<template>
  <div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            love: [],
        }
    },
    methods:{


    },
    created(){
    this.productId = this.$route.params.productID;
    this.localCateProducts = JSON.parse(
      localStorage.getItem("cateFilteredList")
    );
    }
}
</script>
