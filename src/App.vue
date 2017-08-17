<template>
  <div id="app">
    <div class="wrapper">
      <va-navibar></va-navibar>
      <va-slider :slideMenuItems="slideMenuItems"></va-slider>
      <va-content-wrap></va-content-wrap>
      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
          Supported By DFIS teams
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 2016 <a href="#">Newegg, Inc</a>.</strong> All rights reserved.
      </footer>
      <Modal></Modal>
    </div>
  </div>
</template>
<script>
  import VANaviBar from './NaviBar.vue'
  import VAContentWrap from './ContentWrap.vue'
  import VASlider from './Slider.vue'
  import Modal from 'va/components/Modal.vue'
  import menus from './lib/menu.js'

  export default {
    name: 'app',
    data () {
      return {
        slideMenuItems: menus
      }
    },
    created () {
    },
    components: {
      'va-navibar': VANaviBar,
      'va-slider': VASlider,
      'va-content-wrap': VAContentWrap,
      Modal
    }
  }
</script>
