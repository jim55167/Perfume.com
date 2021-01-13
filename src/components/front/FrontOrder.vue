<template>
  <div class="orderList-wrap">
    <Loading :active.sync="isLoading"></Loading>
      <validation-observer class="col-md-6" v-slot="{ invalid }">
        <form @submit.prevent="createOrder">
          <validation-provider
            rules="required|email"
            v-slot="{ errors, classes }">
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="email">EMAIL</label>
              <input
                id="email"
                type="email"
                name="email"
                v-model="form.user.email"
                class="form-control"
                :class="classes"
                placeholder="PLEASE INPUT EMAIL"
              />
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="username">姓名</label>
              <input
                type="text"
                class="form-control"
                name="此欄位"
                id="username"
                :class="classes"
                v-model="form.user.name"
                placeholder="PLEASE INPUT NAME"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider
            rules="required|numeric"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="usertel">電話</label>
              <input
                type="tel"
                class="form-control"
                :class="classes"
                id="usertel"
                v-model="form.user.tel"
                placeholder="PLEASE INPUT PHONE NUMBER"
                name="此欄位"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="useraddress">地址</label>
              <input
                type="text"
                class="form-control"
                name="此欄位"
                id="useraddress"
                v-model="form.user.address"
                :class="classes"
                placeholder="PLEASE INPUT ADDRESS"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name=""
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>

          <div class="d-flex justify-content-between mt-4 step-control">
            <router-link class="btn btn-primary" to="front_cart_items">返回購物車</router-link>
            <button class="btn btn-danger" :disabled="invalid" @click.prevent="createOrder">送出訂單</button>
          </div>
        </form>
      </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
      createOrder() {
      const url = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/order`;
      const order = this.form;
      this.$store.dispatch('updateLoading',true);
      this.$http.post(url, { data: order }).then(response => {
        console.log("訂單已建立", response);
        if (response.data.success) {
          this.$router.push(`../shopping_cart/front_checkout/${ response.data.orderId }`);
        }
        this.$store.dispatch('updateLoading',false);
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>