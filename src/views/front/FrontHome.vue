<template>
  <div>
    <section class="home-container d-flex">
      <div class="text-block">
        <h4>Perfume your day</h4>
        <p>
          A perfume is like a piece of clothing, a message, a way of presenting
          oneself a costume that according to the person who wears it.
        </p>
        <div class="bt-center d-flex">
          <router-link to="/front_products">
            <input type="button" class="btn default mx-auto" value="Shop now">
          </router-link>
        </div>
      </div>
    </section>

    <div class="home-banner">
      <section class="home-item scroll_item1">
        <div class="home-box-text d-flex">
          <div class="home-text scroll_text1">
            <h4>Gabrielle CHANEL</h4>
            <p>
              全新嗅覺體驗，花香四溢、明亮馥郁。結合茉莉、依蘭依蘭、橙花和最迷人的格拉斯晚香玉之花香，呈現出夢幻花香氣息。
              極具女性特質的香奈兒嘉柏麗香水，專為光芒四射的她而生。
            </p>
            <a href="https://www.chanel.com/tw/" target="_blank" rel=”nofollow”>查看更多</a>
          </div>
        </div>
        <div class="scroll_img1">
          <img alt="圖一" src="~@/assets/home/home1.png" />
        </div>
      </section>
      <section class="home-item home-item-reverse scroll_item2">
        <div class="scroll_img2">
          <img alt="圖二" src="~@/assets/home/home2.jpg" />
        </div>
        <div class="home-box-text2 d-flex scroll_text2">
          <div class="home-text">
            <h4>JLo Still</h4>
            <p>
              這款香水以呈現成熟、優雅的韻味為訴求，性感的的花香調，融入了柑橘、玫瑰、茉莉、小蒼蘭、橙花等元素，表現出女性的性感與韻味。
            </p>
            <a href="https://www.beauty321.com/post/22460#p2" target="_blank" rel=”nofollow”
              >查看更多</a
            >
          </div>
        </div>
      </section>
      <section class="home-item d-flex scroll_item3">
        <div class="home-box-text d-flex scroll_text3">
          <div class="home-text">
            <h4>CHANEL N°5</h4>
            <p>
              N°5，女性魅力的極致精髓。散發柔美澄透的乙醛花束香氣。經典傳奇香氛，蘊藏於極簡設計的獨特瓶身。
            </p>
            <a
              href="https://www.chanel.com/tw/fragrance/chanel-number-5/"
              target="_blank" rel=”nofollow”
              >查看更多</a
            >
          </div>
        </div>
        <div class="scroll_img3">
          <img alt="圖三" src="~@/assets/home/home3.png" />
        </div>
      </section>
      <div class="home-item home-item-reverse scroll_item4">
        <div class="scroll_img4">
          <img alt="圖四" src="~@/assets/home/home4.png" />
        </div>
        <section class="home-box-text3 d-flex">
          <div class="home-text scroll_nav1">
            <h4>1. <br />Levels of Preventive Maintenance Compliance</h4>
            <p>
              The core idea of preventative maintenance is the performance of
              proactive actions against unscheduled downtime in order to
              identify potential defects before they evolve into something more
              severe.
            </p>
          </div>

          <section class="home-text scroll_nav2">
            <h4>2. <br />Percentage of Planned Maintenance</h4>
            <p>
              The planned maintenance percentage is the total planned
              maintenance time in your CMMS software over a date range over the
              total number of hours of a service performed by the technicians.
            </p>
          </section>

          <section class="home-text scroll_nav3">
            <h4>3. <br />Critical percentage of planned maintenance</h4>
            <p>
              Calculating the critical percentage of planned maintenance will
              help you prioritize the most important operations that should be
              performed immediately.
            </p>
          </section>

          <div class="btn-box scroll_btn">
            <button type="button" class="btn default">
              <a
                href="https://uk.lush.com/?gclid=CjwKCAiAiML-BRAAEiwAuWVgglmqlvvT6eUCpujr6rRLWwg8norkCerZWOCXMTUwXAyavs_Fr7JiIxoCpRsQAvD_BwE"
                target="_blank" rel=”nofollow”
                >Plan a free online training</a
              >
            </button>
          </div>
        </section>
      </div>
    </div>
    <div class="home-products">
      <div class="home-item-box">
        <div
          class="home-products-item"
          v-for="(item, index) in recommandProducts"
          :key="index"
        >
          <a href="#" @click.prevent="getRandomProduct(item.id)">
            <div class="home-willlike">
              <img alt="商品圖" :src="item.imageUrl2" />
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
    <section class="home-bottle">
      <div class="home-bottle-box">
        <div class="home-bottle-box-img">
          <img alt="圖五" src="~@/assets/home/home5.jpg" />
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
          <a href="https://www.dior.com/en_at" target="_blank" rel=”nofollow”>查看更多</a>
        </div>
      </div>
    </section>
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
      $('html, body').animate({ scrollTop: 0 }, 600)
      const arrIndex = []
      const randomIndex = []
      arr.forEach((item, i) => {
        arrIndex.push(i)
      })
      for (let i = 0; i < num; i++) {
        const index = Math.floor(Math.random() * arrIndex.length)
        randomIndex.push(arrIndex.splice(index, 1)[0])
      }
      randomIndex.forEach(item => {
        newArr.push(arr[item])
      })
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
    const scroll = this.$gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll_item1',
        start: 'center bottom',
        end: 'center center',
        toggleActions: 'play none none none'
      }
    })
    scroll
      .fromTo('.scroll_img1',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1 }
      )
      .fromTo('.scroll_text1',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.2 }
      )
    const scroll2 = this.$gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll_item2',
        start: 'top center',
        end: 'center center',
        toggleActions: 'play none none none'
      }
    })
    scroll2
      .fromTo('.scroll_img2',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1 }
      )
      .fromTo('.scroll_text2',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.2 }
      )
    const scroll3 = this.$gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll_item3',
        start: 'top center',
        end: 'center center',
        toggleActions: 'play none none none'
      }
    })
    scroll3
      .fromTo('.scroll_img3',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1 }
      )
      .fromTo('.scroll_text3',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.2 }
      )
    const scroll4 = this.$gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll_item4',
        start: 'top center',
        end: 'center center',
        toggleActions: 'play none none none',
        markers: true
      }
    })
    scroll4
      .fromTo('.scroll_img4',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1 }
      )
      .fromTo('.scroll_text4',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 0.5, duration: 1 }
      )
      .fromTo('.scroll_nav1',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.1 }
      )
      .fromTo('.scroll_nav2',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.1 }
      )
      .fromTo('.scroll_nav3',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.1 }
      )
      .fromTo('.scroll_btn',
        { y: '50%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.1 }
      )
  }
}
</script>
