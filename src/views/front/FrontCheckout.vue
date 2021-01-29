<template>
  <div class="checkout-wrap">
    <Loading :active.sync="isLoading"></Loading>
    <form @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="180px">訂單ID</th>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <th>EMAIL</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>留言</th>
            <td>{{ order.message }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <input type="submit" class="btn btn-danger" value="確認付款去">
      </div>
    </form>
    <!-- Modal -->
    <div
      class="modal fade"
      id="paymentCompeleted"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body" style="padding:0">
            <img src="~@/assets/all/ok.png">
            <p>已完成訂單</p>
            <input type="submit" class="btn btn-primary" @click.prevent="goToProducts" value="返回首頁!">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.orderId}`
      this.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        this.order = response.data.order
        this.$store.dispatch('updateLoading', false)
      })
    },
    payOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`
      this.$store.dispatch('updateLoading', true)
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.getOrder()
          $('#paymentCompeleted').modal('show')
        }
        this.$store.dispatch('updateLoading', false)
      })
    },
    goToProducts () {
      $('#paymentCompeleted').modal('hide')
      this.$router.push('/home').catch(err => err)
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
