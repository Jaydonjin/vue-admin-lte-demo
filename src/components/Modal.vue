<template>
  <!-- Modal -->
  <div class="modal fade in"
       id="bsModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="bsModalLabel"
       data-toggle="modal"
       :class="['modal-' + type]"
       :style="{display: innerValue? 'block': 'none'}"
       data-backdrop="static"
       data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" v-if="closable" data-dismiss="modal" aria-label="Close">
            <span @click="cancel" aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="bsModalLabel">{{title}}</h4>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel">{{cancelText}}</button>
          <button type="button" class="btn btn-primary" @click="ok">{{okText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Modal',
    props: {
      type: {type: String, default: ''},
      title: {type: String, default: ''},
      okText: {type: String, default: 'OK'},
      cancelText: {type: String, default: 'Cancel'},
      closable: {type: Boolean, default: true},
      value: {type: Boolean, default: false}
    },
    data () {
      return {
        innerValue: false
      }
    },
    mounted () {
      this.innerValue = this.value
    },
    watch: {
      value (newValue) {
        this.innerValue = newValue
      }
    },
    methods: {
      ok (evt) {
        this.$emit('input', false)
        this.$emit('ok', evt)
      },
      cancel (evt) {
        this.$emit('input', false)
        this.$emit('cancel', evt)
      }
    }
  }
</script>
