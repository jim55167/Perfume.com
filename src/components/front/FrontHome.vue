<template>
  <div>
    <div class="home-container">
      <img src="~@/assets/home/banner.jpg" style="width: 100%" />
      <div class="text-block">
        <h4>Perfume your day</h4>
        <p>
          A perfume is like a piece of clothing, a message, a way of presenting
          oneself a costume that according to the person who wears it.
        </p>
        <router-link href="#" to="/front_products"><button class="btn default">Shop now</button></router-link>
      </div>
    </div>

    <div class="home-banner">
        <div class="home-item">
          <div class="home-box-text">
              <h4>Gabrielle CHANEL</h4>
              <p>全新嗅覺體驗，花香四溢、明亮馥郁。結合茉莉、依蘭依蘭、橙花和最迷人的格拉斯晚香玉之花香，呈現出夢幻花香氣息。 極具女性特質的香奈兒嘉柏麗香水，專為光芒四射的她而生。</p>
              <a href="#">查看更多</a>
          </div>
          <div>
              <img src="~@/assets/home/home1.png">
          </div>
        </div>
        <div class="home-item">
          <div>
              <img src="~@/assets/home/home2.png">
          </div>
          <div class="home-box-text2">
              <h4>Five O’clock Au Gingembre</h4>
              <p>生薑與溫醇的肉桂香、紅糖的香甜摻和成一氣，溫暖微辛的氣息反倒形成一股輕煙氤氳開來，還帶點微微煙醺感漫溢在整個鼻息之間，細聞之下,又還有溫溫淡淡的木香，溫和而暖心。</p>
              <a href="#">查看更多</a>
          </div>         
        </div>
        <div class="home-item">
          <div class="home-box-text">
              <h4>CHANEL N°5</h4>
              <p>N°5，女性魅力的極致精髓。散發柔美澄透的乙醛花束香氣。經典傳奇香氛，蘊藏於極簡設計的獨特瓶身。</p>
              <a href="#">查看更多</a>
          </div>
          <div>
              <img src="~@/assets/home/home3.png">
          </div>
        </div>
        <div class="home-item">
          <div>
              <img src="~@/assets/home/home4.png">
          </div>
          <div>
            <div class="home-box-text3">
                <h4>1. <br>Levels of Preventive Maintenance Compliance</h4>
                <p>The core idea of preventative maintenance is the performance of proactive actions against unscheduled downtime in order to identify potential defects before they evolve into something more severe.</p>
            </div>
            <div class="home-box-text3">
                <h4>2. <br>Percentage of Planned Maintenance</h4>
                <p>The planned maintenance percentage is the total planned maintenance time in your CMMS software over a date range over the total number of hours of a service performed by the technicians.</p>
            </div>
            <div class="home-box-text3">
                <h4>3. <br>Critical percentage of planned maintenance</h4>
                <p>Calculating the critical percentage of planned maintenance will help you prioritize the most important operations that should be performed immediately.</p>
                <button class="btn default"><a>Plan a free online training</a></button>
            </div>           
          </div>         
        </div>
    </div>
    <div class="home-products">
        <div class="home-item-box">
            <div style="padding-top:40px; padding-bottom:40px;">
                <img src="~@/assets/home/p1.png">
                <h4>Poppy & Barley</h4>
                <p>Jo Malone</p>
                <tr style="display:flex;">
                    <td>NT$1,380</td>
                    <td style="text-decoration:line-through;color:#8D8D8D;">NT$1,580</td>
                </tr>
            </div>
            <div style="padding:40px 30px;">
                <img src="~@/assets/home/p2.png">
                <h4>Body Wash</h4>
                <p>Curology</p>
                <p>NT$1,580</p>
            </div>
            <div style="padding-top:40px; padding-bottom:40px;">
                <img src="~@/assets/home/p3.png">
                <h4>Apple Cider Vinegar Capsule</h4>
                <p>Tonik</p>
                <p>NT$1,580</p>
            </div>
        </div>
    </div>
    <div class="home-bottle">
      <div class="home-bottle-box">
        <div>
          <img src="~@/assets/home/home5.png">
        </div>
        <div class="home-bottle-text">
          <h4>Bottle-Recycling</h4>
          <p>Recycle your used empty bottles and be rewarded!</p>
          <i>For the past 10 years, we have collected over 800,000 bottles through Empty Bottle Recycling Campaign and planted more than 860 pine trees for a better environment.For the past 10 years, we have collected over 800,000 bottles through Empty Bottle Recycling Campaign and planted more than 860 pine trees for a better environment.</i>
          <a href="#">查看更多</a>
        </div>
      </div>
    </div>
  </div>
</template>