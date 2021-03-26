<template>
  <div>
    <footer class="footer-box">
      <nav class="footer-navbar navbar-expand-lg navbar-light">
        <div class="footer-navbar-item">
          <div class="footer-navbar-logo">
            <router-link href="#" to="/home">
              <img alt="LOGO" src="~@/assets/footer/logo.png" />
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
    </footer>
  </div>
</template>
