<template>
  <aside id="slider" class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <lte-slide-item
          v-for="item in slideMenuItems"
          :type="item.type"
          :isHeader="item.isHeader"
          :icon="item.icon"
          :name="item.name"
          :badge="item.badge"
          :items="item.items"
          :router="item.router"
          :link="item.link"
        >
        </lte-slide-item>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LteSlideItem from './components/SlideItem'

  export default {
    name: 'va-slider',
    props: {
      slideMenuItems: {
        type: Array,
        default: []
      }
    },
    created () {

    },
    computed: {
      ...mapGetters([
        'currentUser'
      ])
    },
    components: {LteSlideItem}
  }
</script>
