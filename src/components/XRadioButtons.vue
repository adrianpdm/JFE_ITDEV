<template>
  <div class="x-radio__buttons">
    <template v-for="(opt, index) in options">
      <input type="radio"
             :name="name"
             :key="`radio:${index}`">
      <label :key="`label:${index}`">
        {opt{}}
      </label>
    </template>
  </div>
</template>

<script>
export default {
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
  }
}
</script>

<style>
</style>