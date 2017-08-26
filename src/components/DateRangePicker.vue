<template>
  <div class="input-group">
    <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
    <input class="form-control pull-right" :id="id">
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'lte-date-range-picker',
    props: {
      id: {type: String, required: true},
      value: {
        type: Object,
        default: function () {
          return {
            start: new Date(),
            end: new Date('+14 days')
          }
        },
        validator: function (val) {
          if (val.start === null || val.start instanceof Date || typeof val.start === 'string') {
            if (val.end === null || val.end instanceof Date || typeof val.end === 'string') {
              return true
            }
          }
          return false
        }
      }
    },
    mounted () {
      $('#' + this.id).daterangepicker({
        startDate: this.value.start,
        endDate: this.value.end
      }, this.onSelected)
    },
    methods: {
      onSelected (start, end) {
        start = start.toDate()
        end = end.toDate()
        this.$emit('input', {start, end})
      }
    }
  }
</script>
