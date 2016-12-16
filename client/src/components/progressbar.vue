<template>
  <div class="progress-bar">
    <div class="progress-bar-indicator" :style="position"></div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Number
      }
    },

    computed: {
      position () {
        return {
          width: this.value * 100 + '%'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../styles/theme';

.progress-bar {
  position: relative;
  display: block;
  background-color: rgba(255,255,255,0.1);
}

.progress-bar-indicator {
  height: 5px;
  @include theme('background-color', 'primary');
  transition-duration: 1s;
  transition-timing-function: linear;
}

.value {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  text-align: center;
}
</style>
