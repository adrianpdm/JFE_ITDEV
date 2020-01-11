<template>
  <div>
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
  }
}
</script>

<style>
</style>