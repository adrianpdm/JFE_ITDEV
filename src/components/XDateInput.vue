<template>
  <div class="x-date-input">
    <label class="x-date-input__label">
      {{label}}
    </label>
    <div class="x-date-input__input">
      <input role="date-input"
             type="number"
             :min="1"
             :max="31">
      <input role="month-input"
             type="number"
             :min="1"
             :max="12">
      <input role="year-input"
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
  data(){
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
  }
}
</script>

<style>
</style>