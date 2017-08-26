<template>
  <ul class="pagination no-margin"
      :class="[sizeClass, alignClass]">
    <li><a href="#" @click="onPrevClick">{{prevText}}</a></li>
    <li v-for="page in pages" :key="page" :class="[isActive(page)]"><a href="#" @click="onPageClick(page)">{{page}}</a>
    </li>
    <li><a href="#" @click="onNextClick">{{nextText}}</a></li>
  </ul>
</template>

<script>
  export default {
    name: 'lte-pagination',
    data () {
      return {
        currentPage: 1
      }
    },
    props: {
      size: {type: String, default: ''},
      align: {type: String, default: 'right'},
      prevText: {type: String, default: '«'},
      nextText: {type: String, default: '»'},
      pageSize: {type: Number, default: 20},
      totalCount: {type: Number, default: 0},
      maxPage: {type: Number, default: 10}
    },
    computed: {
      sizeClass: function () {
        return this.size && 'pagination-' + this.size
      },
      alignClass: function () {
        return this.align.toLowerCase() === 'right' ? 'pull-right' : ''
      },
      totalPages: function () {
        let count = this.totalCount / this.pageSize
        if (Number.isNaN(count)) {
          return 0
        }
        return Math.ceil(count)
      },
      pages: function () {
        let count = this.totalPages
        let currentPage = this.currentPage
        let tmp = []
        let prev = currentPage
        let next = prev
        let i = 1
        if (count <= this.maxPage) {
          return count
        }
        while (i <= this.maxPage) {
          if (prev >= 1) {
            tmp.splice(0, 0, prev--)
            i++
          }
          if (++next <= count) {
            tmp.push(next)
            i++
          }
        }
        console.log(tmp)
        return tmp
      }
    },
    methods: {
      isActive (page) {
        return page === this.currentPage ? 'active' : ''
      },
      onPageClick (page) {
        if (this.currentPage !== page) {
          this.$emit('page', page)
        }
        this.currentPage = page
      },
      onPrevClick () {
        if (this.currentPage > 1) {
          this.currentPage--
          this.$emit('page', this.currentPage)
        }
      },
      onNextClick () {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.$emit('page', this.currentPage)
        }
      }
    }
  }
</script>
