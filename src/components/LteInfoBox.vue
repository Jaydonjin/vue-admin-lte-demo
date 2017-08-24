<template>
  <div class="info-box" :class="wrapBgColor">
    <span class="info-box-icon" v-bind:class="color">
      <i v-bind:class="icon"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">{{text}}</span>
      <span class="info-box-number">{{parseNumber}}</span>

      <div class="progress" v-if="isProgress">
        <div class="progress-bar" :style="`width: ${percentage}%`"></div>
      </div>
      <span class="progress-description">
        {{ progressDescription }}
      </span>
    </div>
  </div>
</template>

<script>
  // TODO: move to CONSTANT
  export default {
    name: 'lte-info-box',
    props: {
      'wrapBgColor': {
        type: String
      },
      'color': {
        type: String,
        default: 'bg-purple'
      },
      'icon': {
        type: String,
        default: 'fa fa-archive'
      },
      'text': {
        type: String,
        required: true
      },
      'number': {
        type: String,
        default: '0'
      },
      'numberType': {
        type: String
      },
      'percentage': {
        type: Number,
        default: 0
      },
      'progressDescription': {
        type: String,
        default: ''
      },
      'isProgress': {
        type: Boolean,
        default: false
      }
    },
    computed: {
      parseNumber () {
        let result = this.number
        // FIXME: using constant
        switch (this.numberType) {
          case 'percentage':
            result += '%'
            break
          case 'comma':
            result = Number(result).toLocaleString('en')
            break
          default:
            break
        }
        return result
      }
    }
  }
</script>
