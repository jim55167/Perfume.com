<template>
  <div>
    <div class="footer-box">
      <div class="footer-box-item">
        <img src="~@/assets/home/foot.jpg" style="width: 100%" />
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

      <nav class="footer-navbar navbar-expand-lg navbar-light">
        <div class="footer-navbar-item">
          <div class="footer-navbar-logo">
            <router-link href="#" to="/home">
              <img src="~@/assets/footer/logo.png" />
            </router-link>
            <p>© 2020. All Rights Reserved.</p>
          </div>
          <ul class="footer-navbar-nav">
            <li class="footer-nav-item">
              <router-link href="#" to="/front_products"
                >Product
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="footer-nav-item">
              <a href="#">Blog</a>
            </li>
            <li class="footer-nav-item">
              <router-link href="#" to="/admin/products">Setting</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>