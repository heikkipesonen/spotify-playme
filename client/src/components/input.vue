<template>
  <div :class="classNames">
    <input type="text" v-model="inputValue">
    <label>{{ label }}</label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: String
    }
  },

  data () {
    return {
      inputValue: this.value
    }
  },

  computed: {
    hasValue () {
      return this.value !== '' && !!this.value && this.value !== 0
    },

    classNames () {
      let classNames = 'input-container'
      classNames += this.hasValue ? ' has-value' : ''
      return classNames
    }
  },

  watch: {
    inputValue () {
      this.$emit('input', this.inputValue)
    },

    value () {
      this.inputValue = this.value
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/theme';

.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 1.2rem;

  input {
    background-color: transparent;
    color: inherit;
    font-size: inherit;
    font-weight: 200;
    outline: none;
    border: none;
    padding: 8px 0;
    border-bottom: 1px solid;
    @include theme('border-color', 'primary');
  }

  label {
    position: absolute;
    top: 50%;
    margin-top: 4px;
    left: 8px;
    color: inherit;
    transition-duration: 0.2s;
  }

  &.has-value label, input:focus + label {
    @include theme('color', 'primary');
    top: 0px;
    left: 4px;
    transform: scale3d(0.8,0.8,1);
  }
}
</style>
