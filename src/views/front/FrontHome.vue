<template>
  <div>
    <div class="home-container d-flex">
      <div class="text-block">
        <h4>Perfume your day</h4>
        <p>
          A perfume is like a piece of clothing, a message, a way of presenting
          oneself a costume that according to the person who wears it.
        </p>
        <router-link href="#" to="/front_products"
          ><button type="button" class="btn default">Shop now</button></router-link
        >
      </div>
    </div>

    <div class="home-banner">
      <div class="home-item">
        <div class="home-box-text d-flex">
          <div class="home-text animated">
            <h4>Gabrielle CHANEL</h4>
            <p>
              全新嗅覺體驗，花香四溢、明亮馥郁。結合茉莉、依蘭依蘭、橙花和最迷人的格拉斯晚香玉之花香，呈現出夢幻花香氣息。
              極具女性特質的香奈兒嘉柏麗香水，專為光芒四射的她而生。
            </p>
            <a href="https://www.chanel.com/tw/" target="_blank">查看更多</a>
          </div>
        </div>
        <div class="animated-img">
          <img src="~@/assets/home/home1.png" />
        </div>
      </div>
      <div class="home-item home-item-reverse">
        <div class="animated-img">
          <img src="~@/assets/home/home2.jpg" />
        </div>
        <div class="home-box-text2 d-flex">
          <div class="home-text animated">
            <h4>JLo Still</h4>
            <p>
              這款香水以呈現成熟、優雅的韻味為訴求，性感的的花香調，融入了柑橘、玫瑰、茉莉、小蒼蘭、橙花等元素，表現出女性的性感與韻味。
            </p>
            <a href="https://www.beauty321.com/post/22460#p2" target="_blank"
              >查看更多</a
            >
          </div>
        </div>
      </div>
      <div class="home-item d-flex">
        <div class="home-box-text d-flex">
          <div class="home-text animated">
            <h4>CHANEL N°5</h4>
            <p>
              N°5，女性魅力的極致精髓。散發柔美澄透的乙醛花束香氣。經典傳奇香氛，蘊藏於極簡設計的獨特瓶身。
            </p>
            <a
              href="https://www.chanel.com/tw/fragrance/chanel-number-5/"
              target="_blank"
              >查看更多</a
            >
          </div>
        </div>
        <div class="animated-img">
          <img src="~@/assets/home/home3.png" />
        </div>
      </div>
      <div class="home-item home-item-reverse">
        <div class="animated-img">
          <img src="~@/assets/home/home4.png" />
        </div>
        <div class="home-box-text3 d-flex">
          <div class="home-text animated">
            <h4>1. <br />Levels of Preventive Maintenance Compliance</h4>
            <p>
              The core idea of preventative maintenance is the performance of
              proactive actions against unscheduled downtime in order to
              identify potential defects before they evolve into something more
              severe.
            </p>
          </div>

          <div class="home-text animated">
            <h4>2. <br />Percentage of Planned Maintenance</h4>
            <p>
              The planned maintenance percentage is the total planned
              maintenance time in your CMMS software over a date range over the
              total number of hours of a service performed by the technicians.
            </p>
          </div>

          <div class="home-text animated">
            <h4>3. <br />Critical percentage of planned maintenance</h4>
            <p>
              Calculating the critical percentage of planned maintenance will
              help you prioritize the most important operations that should be
              performed immediately.
            </p>
          </div>

          <div class="btn-box">
            <button type="button" class="btn default">
              <a
                href="https://uk.lush.com/?gclid=CjwKCAiAiML-BRAAEiwAuWVgglmqlvvT6eUCpujr6rRLWwg8norkCerZWOCXMTUwXAyavs_Fr7JiIxoCpRsQAvD_BwE"
                target="_blank"
                >Plan a free online training</a
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="home-products">
      <div class="home-item-box animated-img">
        <div
          class="home-products-item"
          v-for="(item, index) in recommandProducts"
          :key="index"
        >
          <a href="#" @click.prevent="getRandomProduct(item.id)">
            <div class="home-willlike">
              <img :src="item.imageUrl2" />
              <div class="glass d-flex justify-content-center">
                <span>查看更多</span>
              </div>
            </div>
          </a>
          <h4>{{ item.title }}</h4>
          <p>{{ item.category }}</p>
          <tr class="d-flex">
            <td>NT{{ item.price }}</td>
            <del>NT{{ item.origin_price }}</del>
          </tr>
        </div>
      </div>
    </div>
    <div class="home-bottle">
      <div class="home-bottle-box animated-img">
        <div class="home-bottle-box-img">
          <img src="~@/assets/home/home5.jpg" />
        </div>
        <div class="home-bottle-text">
          <h4>Bottle-Recycling</h4>
          <p>Recycle your used empty bottles and be rewarded!</p>
          <i
            >For the past 10 years, we have collected over 800,000 bottles
            through Empty Bottle Recycling Campaign and planted more than 860
            pine trees for a better environment.For the past 10 years, we have
            collected over 800,000 bottles through Empty Bottle Recycling
            Campaign and planted more than 860 pine trees for a better
            environment.</i
          >
          <a href="https://www.dior.com/en_at" target="_blank">查看更多</a>
        </div>
      </div>
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
              <input
                class="form-control"
                type="email"
                name="subscribeEmail"
                placeholder="Your email address"
              />
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
import $ from 'jquery'

export default {
  data () {
    return {
      productId: '',
      recommandProducts: [],
      localCateProducts: [],
      product: {
        num: 1
      }
    }
  },
  methods: {
    getSingleProduct () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productId}`
      this.$store.dispatch('updateLoading', true)
      this.randomProduct(this.localCateProducts, 3)
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.product = response.data.product
          this.$set(this.product, 'num', 1)
          this.$store.dispatch('updateLoading', false)
        }
      })
    },
    getRandomProduct (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.$store.dispatch('updateLoading', true)
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false)
          this.$router
            .push(`../front_single_product/${response.data.product.id}`)
            .catch(err => err)
        }
      })
    },
    randomProduct (arr, num) {
      const newArr = []
      if (arr.length <= num) {
        num = arr.length
      }
      rand(num)
      function rand (selectQty) {
        if (selectQty === 0) {
          return
        }
        const index = Math.floor(Math.random() * arr.length)
        let flag = true
        newArr.forEach(function (item) {
          if (item === arr[index]) {
            flag = false
          }
        })
        if (flag) {
          newArr.push(arr[index])
          selectQty--
        }
        rand(selectQty)
      }
      this.recommandProducts = newArr
    }
  },
  created () {
    this.productId = this.$route.params.productID
    this.localCateProducts = JSON.parse(
      localStorage.getItem('cateFilteredList')
    )
    this.getSingleProduct()
  },
  components: {
    GoTop
  },
  mounted () {
    $(document).ready(function () {
      $(window).scroll(function () {
        const scrollPos = $(window).scrollTop()
        const windowHeight = $(window).height()

        $('.animated').each(function () {
          const thisPos = $(this).offset().top
          if ((windowHeight + scrollPos) >= thisPos) {
            $(this).addClass('fadeIn')
          }
        })
        $('.animated-img').each(function () {
          const thisPos = $(this).offset().top
          if ((windowHeight + scrollPos) >= thisPos) {
            $(this).addClass('fadeIn-img')
          }
        })
      })
    })
  }
}
</script>
