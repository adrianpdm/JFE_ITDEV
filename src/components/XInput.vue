<template>
  <div :class="{'x-input': true, 'is-focused': isFocused}">
    <label class="x-input__label">
      {{label}}
    </label>
    <component :is="inputElement"
               class="x-input__input"
               :value="value"
               @focus="isFocused = true"
               @blur="isFocused = false"
               @input="onInput"
               v-bind="$attrs" />
    <XInputState :height="3"
                 :active="isFocused" />
    <p class="x-input__hint">

    </p>
  </div>
</template>

<script>
export default {
  components: {
    XInputState: () => import('./XInputState')
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
    value: {},
    name: {
      type: String
    }
  },
  data() {
    return {
      mValue: '',
      isFocused: false
    }
  },
  created() {
    this.mValue = this.value
  },
  methods: {
    onInput(e) {
      this.mValue = e.target.value
      this.$emit('input', e.target.value)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.mValue = v
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.x-input {
  font-size: 1rem;

  &__label {
    display: block;
    font-size: 1em;
    font-weight: normal;
    margin-bottom: 0.25em;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 0.5em;

    border-radius: 0.25rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid var(--input-border-color);
    border-bottom-width: 0;
    background-color: var(--input-bg-color);

    font-size: 1.15em;
    transition: all 0.15s ease-out;

    &::placeholder {
      color: rgba(0, 0, 0, 0.25);
    }
    &:focus,
    &:active {
      outline: none;
    }
  }

  &__hint {
    display: block;
  }
}
</style>