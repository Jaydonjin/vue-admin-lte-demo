<template>
  <div id="app">
    <div class="wrapper">
      <va-navibar></va-navibar>
      <va-slider :slideMenuItems="slideMenuItems"></va-slider>
      <va-content-wrap></va-content-wrap>
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
