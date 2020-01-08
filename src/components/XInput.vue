<template>
  <div :class="{'x-input': true, 'is-focused': isFocused}">
    <div style="display: flex; justify-content: space-between; align-center; margin-bottom: 0.5em;">
      <label class="x-input__label">
        {{label}}
      </label>
      <button class="x-input__btn-clear"
              :disabled="!value"
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
    value: {}
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
  computed: {
    inputElementProps() {
      return {
        class: 'x-input__input',
        value: this.mValue,
        ...this.$attrs
      }
    },
    inputElementListeners() {
      return {
        focus: () => this.isFocused = true,
        blur: () => this.isFocused = false,
        input: this.onInput
      }
    }
  },
  methods: {
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
  }

  &__btn-clear {
    cursor: pointer;
    padding: 0.5em 1em;
    border: none;
    border-radius: 0.25rem;

    font-size: 0.7em;
    font-weight: bold;
    color: var(--input-border-active-color);

    text-transform: uppercase;
    letter-spacing: 1px;

    &[disabled] {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.3);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:focus {
      background-color: rgba(0, 0, 0, 0.15);
    }
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