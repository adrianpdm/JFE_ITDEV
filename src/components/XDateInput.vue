<template>
  <div class="x-date-input">
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
    <div class="x-date-input__inputs">
      <label class="x-date-input__input-label">
        Tanggal
      </label>
      <input role="date-input"
             name="date"
             class="x-base__input"
             type="number"
             min="1"
             max="31"
             v-model="mDate"
             v-on="inputElementListeners"
             style="width: 72px;">
      <XInputHint :height="3"
                  :active="isFocused.date"
                  :error="!!errorMsg" />
      <label class="x-date-input__input-label">
        Bulan
      </label>
      <input role="month-input"
             name="month"
             class="x-base__input"
             type="number"
             min="1"
             max="12"
             v-model="mMonth"
             v-on="inputElementListeners"
             style="width: 72px;">
      <XInputHint :height="3"
                  :active="isFocused.month"
                  :error="!!errorMsg" />
      <label class="x-date-input__input-label">
        Tahun
      </label>
      <input role="year-input"
             name="year"
             class="x-base__input"
             type="number"
             min="1900"
             max="currentYear"
             v-model="mYear"
             v-on="inputElementListeners"
             style="width: 144px;">
      <XInputHint :height="3"
                  :active="isFocused.year"
                  :error="!!errorMsg" />
    </div>
    <p class="x-date-input__hint"
       :active="errorMsg">
      {{errorMsg}}
    </p>
  </div>
</template>

<script>
export default {
  components: {
    XInputHint: () => import("./XInputHint")
  },
  props: {
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
      errorMsg: '',
      isFocused: {
        date: false,
        month: false,
        year: false
      },
      mDate: null,
      mMonth: null,
      mYear: null
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
        this.mDate = date
        this.mMonth = month
        this.mYear = year
      },
      { immediate: true }
    )
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    shouldButtonDisabled() {
      return [this.mDate, this.mMonth, this.mYear].every(val => !val)
    },
    inputElementListeners() {
      return {
        focus: this.onFocus,
        blur: this.onBlur
      }
    }
  },
  methods: {
    validate() {
      return true
    },
    onFocus(e) {
      if (!e.target.name) {
        console.error('input element must be named.')
        return
      }
      this.isFocused[e.target.name] = true
    },
    onBlur(e) {
      if (!e.target.name) {
        console.error('input element must be named.')
        return
      }
      if (this.validate()) {
        this.isFocused[e.target.name] = false
      }
    },
    onClear() {
      this.mDate = null
      this.mMonth = null
      this.mYear = null
    },
    emitChange() {
      const payload = {
        date: this.mDate,
        month: this.mMonth,
        year: this.mYear
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
    grid-template-columns: repeat(3, minmax(min-content, max-content));
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    grid-gap: 0 2rem;

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
</style>