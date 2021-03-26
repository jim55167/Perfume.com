<template>
  <div class="star_box">
    <div class='star_line'>
      <span
        class="star"
        v-for="(star, key) in total"
        @click="changeValue(star)"
        :style="starStyle"
        :key="key"
      >☆</span>
    </div>
    <div class="star_line star_pointer">
      <span
        class="star"
        v-for="(star, key) in productItem.star"
        :class="{'active': isActive}"
        :style="starStyle"
        :key="key"
      >★</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true
    }
  },
  props: {
    total: {
      default: 3
    },
    size: {
      default: 30
    },
    productItem: {
      type: Object
    }
  },
  methods: {
    changeValue (star) {
      const starInfo = {
        star: star,
        id: this.productItem.id
      }
      this.$emit('update', starInfo)
    }
  },
  computed: {
    starStyle () {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        fontSize: this.size + 'px'
      }
    }
  }
}
</script>
<style scoped>
.star_box {
  position: relative;
}
.star_line {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
}
.star {
  display: block;
  cursor: pointer;
  line-height: 30px;
}
.star_pointer {
  pointer-events: none;
}
.active {
  color: orange;
}
</style>
