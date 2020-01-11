<template>
  <div class="x-radio-buttons">
    <div class="x-base__input-header">
      <label class="x-base__label">
        {{label}}
      </label>

    </div>
    <div>
      <div class="x-radio-buttons__container">
        <button class="x-radio-buttons__btn"
                v-for="(opt, index) in options"
                :key="index"
                :active="opt === mValue"
                :error="!!errorMsg"
                @click.capture="mValue = opt">
          <input type="radio"
                 :name="name"
                 :value="opt"
                 v-model="mValue">
          <label>
            {{opt}}
          </label>
        </button>

      </div>
      <p class="x-base__hint"
         :active="!!errorMsg">
        {{errorMsg}}
      </p>
    </div>
    <button class="x-base__btn-clear"
            :disabled="!mValue"
            @click="onClear">
      Hapus
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mValue: null,
      errorMsg: null,
      isFocused: false
    }
  },
  methods: {
    validate() {
      if (!this.mValue) {
        this.errorMsg = `${this.label} harus diisi`
        this.isFocused = true
      } else {
        this.errorMsg = null
        this.isFocused = false
      }
    },
    onClear() {
      this.mValue = null
    },
    emitChange() {
      this.$emit('input', this.mValue)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.mValue = v
      }
    },
    mValue: {
      immediate: false,
      handler(v) {
        this.emitChange()
        this.validate()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.x-radio-buttons {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    gap: 1rem;
    min-height: 3rem;
    padding: 0.5em 0;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    // min-width: 150px;
    // margin-right: 1em;
    // margin-bottom: 1em;
    padding: 0.5em 1em 0.5em 0.5em;
    border: 1px solid var(--input-border-color);
    border-radius: 4px;

    font-size: 1em;

    background-color: var(--input-bg-color);
    color: rgba(0, 0, 0, 0.5);

    > input[type="radio"] {
      margin-right: 1em;
    }

    &,
    & > * {
      cursor: pointer;
    }

    &[active] {
      background-color: var(--input-border-active-color);
      color: white;
    }

    &[error] {
      border-width: 2px;
      border-color: rgba(255, 23, 68, 1) !important;
    }
  }
}
</style>