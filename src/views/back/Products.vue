<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click.prevent="openModal(true)"> 建立新產品 </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="180">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products.slice(pageStart, pageStart + countPage)"
         :key="key" style="line-height:2">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-left">{{ item.origin_price | currency }}</td>
          <td class="text-left">{{ item.price | currency }}</td>
          <td>
            <!-- 產品如果為啟用：is_enabled == 1 -->
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm" style="border-radius:0.2rem;"
              @click.prevent="openModal(false, item)">編輯</button>
             <button type="button" class="btn btn-outline-danger btn-sm" style="border-radius:0.2rem;"
              @click.prevent="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- bootstrap pagination -->
    <div class="d-flex">
      <nav aria-label="Page navigation example" style="margin:0 auto">
        <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': current_page === 1 }">
            <a class="page-link" href="#" aria-label="Previous"
              @click.prevent="getPage(current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in totalPage" :key="page"
            :class="{'active': current_page === page}">
            <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': current_page === totalPage}">
            <a class="page-link" href="#" aria-label="Next"
              @click.prevent="getPage(current_page + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Bootstrap edit Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        v-model="tempProduct.imageUrl"
                        placeholder="請輸入圖片連結">
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files" @change="uploadFile">
                  </div>
                  <img class="img-fluid" alt="圖一" :src="tempProduct.imageUrl">
              </div>

              <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        v-model="tempProduct.imageUrl2"
                        placeholder="請輸入圖片連結">
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files2" @change="infoImg">
                  </div>
                  <img class="img-fluid" alt="圖二" :src="tempProduct.imageUrl2">
              </div>

              <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        v-model="tempProduct.imageUrl3"
                        placeholder="請輸入圖片連結">
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files3" @change="infoSizeImg">
                  </div>
                  <img class="img-fluid" alt="圖三" :src="tempProduct.imageUrl3">
              </div>

              <div class="col-sm-8" style="margin:0 auto;">
                  <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                      v-model="tempProduct.title"
                      placeholder="請輸入標題">
                  </div>

                  <div class="form-row">
                  <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                  </div>

                  <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                  </div>
                  <hr>

                  <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                      v-model="tempProduct.content"
                      placeholder="請輸入產品說明內容"
                      style="height:12rem"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                        v-model="tempProduct.description"
                        placeholder="請輸入產品描述"
                        style="height:12rem">
                    </textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                        <!-- is_enabled：0是未啟用，1是啟用 -->
                        <input class="form-check-input" type="checkbox"
                          v-model="tempProduct.is_enabled"
                          :true-value="1"
                          :false-value="0"
                          id="is_enabled">
                        <label class="form-check-label" for="is_enabled">
                          是否啟用
                        </label>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
        </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click.prevent="deleteProduct">確認刪除</button>
        </div>
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
      products: [],
      current_page: 1,
      countPage: 12,
      tempProduct: {},
      isNew: false,
      isLoading: false,
      fileUploading: false
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.isLoading = false
        const obj = response.data.products
        const arr = Object.keys(obj).map((k) => obj[k])
        this.products = arr
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    deleteModal (item) {
      $('#delProductModal').modal('show')
      this.tempProduct = item
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          this.getProducts()
        } else {
          $('#productModal').modal('hide')
          this.getProducts()
        }
      })
    },
    deleteProduct () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api, { data: this.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#delProductModal').modal('hide')
          this.getProducts()
        }
      })
    },
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.fileUploading = true
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.fileUploading = false
        if (response.data.success) {
          this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    infoImg () {
      const uploadeImg = this.$refs.files2.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadeImg)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.fileUploading = true
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.fileUploading = false
        if (response.data.success) {
          this.$set(this.tempProduct, 'imageUrl2', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    infoSizeImg () {
      const infoSizeImgs = this.$refs.files3.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', infoSizeImgs)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.fileUploading = true
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.fileUploading = false
        if (response.data.success) {
          this.$set(this.tempProduct, 'imageUrl3', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    getPage (page) {
      $('html, body').animate({ scrollTop: 0 }, 600)
      if (page <= 0 || page > this.totalPage) {
        return
      }
      this.current_page = page
    }
  },
  computed: {
    pageStart () {
      return (this.current_page - 1) * this.countPage
    },
    totalPage () {
      return Math.ceil(this.products.length / this.countPage)
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    GoTop
  }
}
</script>
