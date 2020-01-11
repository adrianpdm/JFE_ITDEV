<template>
  <div :class="{'x-input': true, 'is-focused': isFocused}">
    <div class="x-base__input-header">
      <label class="x-base__label">
        {{label}}
      </label>
      <button class="x-base__btn-clear"
              :disabled="!mValue"
              @click="onClear">
        Hapus
      </button>
    </div>
    <input v-if="inputElement === 'input'"
           v-bind="inputElementProps"
           v-on="inputElementListeners" />
    <textarea v-else-if="inputElement === 'textarea'"
              v-bind="inputElementProps"
              v-on="inputElementListeners">
    </textarea>
    <XInputHint :height="3"
                 :active="isFocused"
                 :error="!!errorMsg" />
    <p class="x-base__hint"
       :active="!!errorMsg">
      {{errorMsg}}
    </p>
  </div>
</template>

<script>
export default {
  components: {
    XInputHint: () => import('./XInputHint')
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    label: {
      type: String
    },
    inputElement: {
      default: 'input',
      validator(v) {
        return [
          'input',
          'textarea'
        ].includes(v)
      }
    },
    value: {}
  },
  data() {
    return {
      mValue: '',
      isFocused: false,
      errorMsg: null
    }
  },
  created() {
    this.mValue = this.value
  },
  computed: {
    inputElementProps() {
      return {
        class: 'x-base__input',
        value: this.mValue,
        ...this.$attrs
      }
    },
    inputElementListeners() {
      return {
        focus: () => this.isFocused = true,
        blur: this.onBlur,
        input: this.onInput
      }
    }
  },
  methods: {
    validate() {
      if (!this.mValue) {
        this.errorMsg = `${this.label} harus diisi`
        this.isFocused = true
      } else {
        this.errorMsg = null
      }
      return !this.errorMsg
    },
    onBlur(e) {
      if (this.validate()){
        this.isFocused = false
      }
    },
    onInput(e) {
      this.mValue = e.target.value
      this.emitChange()
    },
    onClear() {
      this.mValue = ''
      this.emitChange()
    },
    emitChange() {
      this.$emit('input', this.mValue)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        console.log({ v })
        this.mValue = v
      }
    },
    mValue: {
      handler(v){
        this.validate()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.x-input {
  font-size: 1rem;
}
</style>