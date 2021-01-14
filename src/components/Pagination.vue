<template>
  <div>
    <nav aria-label="Page navigation example" class="d-flex">
      <ul class="pagination" style="margin:0 auto;">
        <li class="page-item" :class="{ 'disabled' : !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="changePage(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{ 'active' : pagination.current_page == page }"
        >
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled' : !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="changePage(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  data () {
    return {}
  },
  methods: {
    changePage (targetPage) {
      this.$emit('changePage', targetPage)
    }
  }
}
</script>
