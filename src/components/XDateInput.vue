<template>
  <div class="x-date-input"
       v-cloak>
    <div class="x-base__input-header">
      <label class="x-base__label align-to-box">
        {{label}}
      </label>
    </div>
    <div>
      <div class="x-date-input__inputs">
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
               :placeholder="placeholders.date"
               v-model="m_date"
               v-on="inputElementListeners"
               style="width: 3em;">
        <XInputHint :height="3"
                    :active="isFocused.date"
                    :error="!!errorMsg.date" />
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
               :placeholder="placeholders.month"
               v-model="m_month"
               v-on="inputElementListeners"
               style="width: 3em;">
        <XInputHint :height="3"
                    :active="isFocused.month"
                    :error="!!errorMsg.month" />
        <label class="x-date-input__input-label">
          Tahun
        </label>
        <input role="year-input"
               label="Tahun"
               name="year"
               class="x-base__input"
               type="number"
               :min="1900"
               :max="currentYear"
               :placeholder="placeholders.year"
               v-model="m_year"
               v-on="inputElementListeners"
               style="width: 100%;">
        <XInputHint :height="3"
                    :active="isFocused.year"
                    :error="!!errorMsg.year" />
      </div>
      <p class="x-base__hint--list"
         :active="hasErrors"
         :key="errorsLength">
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
    <button class="x-base__btn-clear align-to-box"
            :disabled="shouldButtonDisabled"
            @click="onClear">
      Hapus
    </button>
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
    },
    placeholders: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
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
      m_year: null,

      validationTimer: null
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
  computed: {
    errorsLength() {
      return Object.keys(this.errorMsg).filter(key => !!this.errorMsg[key]).length
    },
    hasErrors() {
      return this.errorsLength > 0
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
    getInputElement(name) {
      const el = this.$el.querySelector((`input[name="${name}"]`))
      if (!el) {
        throw new ReferenceError(`can't find input[name="${name}"]`)
      }
      return el
    },
    isValidDateValue() {
      const [d, m, y] = [
        parseInt(this.m_date),
        parseInt(this.m_month),
        parseInt(this.m_year)
      ]
      if (!m || !y) return true;
      if (!d) throw 'empty';
      if (d < 1 || d > 31) throw 'minmax';

      const isLeap = (y % 4 === 0 && y % 100 !== 0)
        || (y % 400 == 0)

      if (m === 2) {
        if (isLeap && d > 29) {
          throw 'gt_feb29'
        }
        if (!isLeap && d > 28) {
          throw 'gt_feb28'
        }
      }
      if ([4, 6, 9, 11].includes(m) && d > 30) {
        throw 'gt_30days'
      }
      return true
    },
    validateInput(name) {
      const el = this.getInputElement(name)
      const { min, max, value } = el
      const label = el.getAttribute('label')

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
        if (!value.length) {
          throw 'empty'
        }
        if ((+value < +min) || (+value > +max)) {
          throw 'minmax'
        }
        this.$set(this.errorMsg, name, null)
      } catch (e) {
        this.handleError(name, e)
      }

      try {
        if (this.m_date && this.m_month && this.m_year) {
          if (this.isValidDateValue()) {
            this.$set(this.errorMsg, 'date', null)
          }
        }
      } catch (e) {
        this.handleError('date', e)
      }
    },
    validate() {
      ;['date', 'month', 'year'].forEach(name => {
        this.validateInput(name)
      })
    },
    handleError(inputName, errorType) {
      const el = this.getInputElement(inputName)
      const { min, max, value } = el
      const label = el.getAttribute('label')

      const err = (e) => {
        this.$set(this.errorMsg, inputName, e)
      }
      switch (errorType) {
        case 'empty':
          err(`${label} harus diisi`)
          break
        case 'minmax':
          err(`${label} harus bernilai antara ${min} s/d ${max}`)
          break
        case 'gt_feb29':
          err(`Bulan ini tidak lebih dari 29 hari`)
          break
        case 'gt_feb28':
          err(`Bulan ini tidak lebih dari 28 hari`)
          break
        case 'gt_30days':
          err(`Bulan ini tidak lebih dari 30 hari`)
          break
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
      this.validateInput(name);
      this.$set(this.isFocused, name, !!this.errorMsg[name]);

      if (typeof value === 'string' && value.startsWith('0')) {
        this[`m_${name}`] = `${parseInt(value)}`
      }

      this.emitChange()
    },
    onInput(e) {
      const { name } = e.target
      if (this.validationTimer) {
        clearTimeout(this.validationTimer)
      }
      this.validationTimer = setTimeout(() => {
        this.validateInput(name)
      }, 300)

      this.emitChange()
    },
    onClear(showError = true) {
      ;['date', 'month', 'year'].forEach(inputName => {
        this[`m_${inputName}`] = null
        if (showError) {
          this.handleError(inputName, 'empty');
        } else {
          this.$set(this.errorMsg, inputName, null)
        }
        this.$set(this.isFocused, inputName, showError)
      })
      this.emitChange()
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
    },
    reset() {
      this.onClear(false)
    }
  },
}
</script>

<style lang="scss" scoped>
.x-date-input {
  font-size: 1rem;

  &__inputs {
    // min-width: 0;
    // width: auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, min-content) 1fr;
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    grid-gap: 0 0.5rem;

    > .x-date-input__input-label {
      opacity: 0.45;
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

@media screen and (min-width: 620px) {
  .align-to-box {
    position: relative;
    top: 1rem * 2;
  }
}
</style>