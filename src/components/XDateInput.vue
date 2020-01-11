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
      <input role="date-input"
             class="x-base__input"
             type="number"
             :min="1"
             :max="31">
      <input role="month-input"
             class="x-base__input"
             type="number"
             :min="1"
             :max="12">
      <input role="year-input"
             class="x-base__input"
             type="text"
             :min="4"
             :max="4">
    </div>
    <p class="x-date-input__hint"
       :active="errorMsg">
      {{errorMsg}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    date: {
      type: [String, Number]
    },
    month: {
      type: [String, Number]
    },
    year: {
      type: [String, Number]
    },
    placeholders: {
      type: Object,
      default: () => ({})
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
    shouldButtonDisabled() {
      return false
    }
  },
  methods: {
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    > .x-base__input {
      &:not(:last-child) {
        border-top-right-radius: 0;
      }
    }

    > .x-base__input + .x-base__input {
      border-top-left-radius: 0;
    }
  }
}
</style>