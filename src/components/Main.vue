<template>
  <va-button
    name="Primary"
    theme="primary"
    size="btn-lg"
    :isFlat="true">
  </va-button>
</template>

<script>
  import VAButton from 'va/components/VAButton.vue'

  export default {
    name: 'button',
    components: {
      'va-button': VAButton
    }
  }
</script>
