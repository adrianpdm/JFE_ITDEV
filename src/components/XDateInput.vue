<template>
  <div class="x-date-input"
       v-cloak>
    <div class="x-base__input-header">
      <label class="x-base__label">
        {{label}}
      </label>
      <button class="x-base__btn-clear"
              :disabled="shouldButtonDisabled"
              @click="onClear">
        Hapus
      </button>
    </div>
    <div v-show="isMounted"
         class="x-date-input__inputs">
      <label class="x-date-input__input-label">
        Tanggal
      </label>
      <input role="date-input"
             label="Tanggal"
             name="date"
             class="x-base__input"
             type="number"
             :min="1"
             :max="31"
             v-model="m_date"
             v-on="inputElementListeners"
             style="width: 72px;">
      <XInputHint :height="3"
                  :active="isFocused.date"
                  :error="!!errorMsg.date" />
      <span class="x-date-input__divider">
        /
      </span>
      <label class="x-date-input__input-label">
        Bulan
      </label>
      <input role="month-input"
             label="Bulan"
             name="month"
             class="x-base__input"
             type="number"
             :min="1"
             :max="12"
             v-model="m_month"
             v-on="inputElementListeners"
             style="width: 72px;">
      <XInputHint :height="3"
                  :active="isFocused.month"
                  :error="!!errorMsg.month" />
      <span class="x-date-input__divider">
        /
      </span>
      <label class="x-date-input__input-label">
        Tahun
      </label>
      <input role="year-input"
             label="Tahun"
             name="year"
             class="x-base__input"
             type="number"
             :min="0"
             :max="currentYear"
             v-model="m_year"
             v-on="inputElementListeners"
             style="width: 144px;">
      <XInputHint :height="3"
                  :active="isFocused.year"
                  :error="!!errorMsg.year" />
    </div>
    <p class="x-base__hint--list"
       :active="hasErrors">
      <ul>
        <template v-for="(msg, inputName) in errorMsg">
          <li v-if="msg"
              :key="inputName">
            {{msg}}
          </li>
        </template>
      </ul>
    </p>
  </div>
</template>

<script>
import XInputHint from "./XInputHint"
export default {
  components: {
    XInputHint
  },
  props: {
    label: {
      type: String
    },
    date: {
      type: [String, Number],
      default: null
    },
    month: {
      type: [String, Number],
      default: null
    },
    year: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      isMounted: false,
      errorMsg: {
        date: null,
        month: null,
        year: null
      },
      isFocused: {
        date: false,
        month: false,
        year: false
      },
      m_date: null,
      m_month: null,
      m_year: null
    }
  },
  created() {
    this.$watch(
      function () {
        const { date, month, year } = this
        return { date, month, year }
      },
      function (obj) {
        const { date, month, year } = this
        this.m_date = date
        this.m_month = month
        this.m_year = year
      },
      { immediate: true }
    )
  },
  mounted() {
    this.$nextTick(() => {
      this.isMounted = true
    })
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errorMsg).some(key => !!this.errorMsg[key])
    },
    currentYear() {
      return new Date().getFullYear()
    },
    shouldButtonDisabled() {
      return [this.m_date, this.m_month, this.m_year].every(val => !val)
    },
    inputElementListeners() {
      return {
        focus: this.onFocus,
        blur: this.onBlur,
        input: this.onInput
      }
    }
  },
  methods: {
    validateInput(e) {
      if (!e || !e.target) return;

      const { name, min, max, value } = e.target
      const label = e.target.getAttribute('label')
      if (!name) {
        throw new ReferenceError('input element must be named')
      }
      if (!label) {
        throw new ReferenceError('input element must be have label attribute')
      }
      try {
        if (typeof value !== 'string') {
          throw 'invalidtype'
        }
        if (!value.length){
          throw 'empty'
        }
        if ((+value < +min) || (+value > +max)) {
          throw 'minmax'
        }
        this.$set(this.errorMsg, name, null)
        return true
      } catch (e) {
        if (e === 'empty') {
          this.$set(this.errorMsg, name, `${label} harus diisi`)
        } else if (e === 'minmax') {
          this.$set(this.errorMsg, name, `${label} harus bernilai antara ${min} s/d ${max}`)
        }
        return false
      }
    },
    onFocus(e) {
      if (!e.target.name) {
        console.error('input element must be named.')
        return
      }
      this.$set(this.isFocused, e.target.name, true)
    },
    onBlur(e) {
      const { name, value } = e.target
      this.$set(this.isFocused, name, !this.validateInput(e));
      
      if (typeof value === 'string' && value.startsWith('0')) {
        this[`m_${name}`] = `${parseInt(value)}`
      }
    },
    onInput(e) {
      this.validateInput(e);
    },
    onClear() {
      this.m_date = null
      this.m_month = null
      this.m_year = null
    },
    emitChange() {
      const payload = {
        date: this.m_date,
        month: this.m_month,
        year: this.m_year
      }
      Object.keys(payload).forEach(key => {
        this.$emit(`update:${key}`, payload[key])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.x-date-input {
  font-size: 1rem;

  &__inputs {
    min-width: 0;
    width: auto;
    display: grid;
    grid-template-columns: repeat(5, minmax(min-content, max-content));
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    grid-gap: 0 0.5rem;

    > .x-date-input__input-label {
      opacity: 0.65;
      font-size: 0.85em;
      margin-bottom: 0.25em;
    }

    > .x-base__input {
      display: inline-block;
      width: auto;
    }

    > .x-base__input + .x-base__input {
      margin-left: 1rem;
    }
  }
}

.x-date-input__divider {
  grid-row: 1 / span 3;

  display: flex;
  align-items: center;
  width: 0.5em;
  padding-top: 0.85em;

  color: currentColor;

  opacity: 0.5;
}
</style>