<template>
  <i :class="{'x-input__state': true, 'is-active': active, 'is-error': error}"
     :style="style"></i>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 2
    }
  },
  computed: {
    style() {
      return {
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.x-input__state {
  position: relative;
  display: block;
  width: calc(100% - #{0.25rem * 2});
  margin: 0 auto;

  text-align: left;
  background-color: rgba(176, 190, 197, 0.5);

  &::after {
    content: "";
    position: relative;
    display: block;
    width: 0%;
    height: 100%;

    background-color: var(--input-border-active-color);

    transition: width 0.25s ease-in-out;
  }

  &.is-active::after {
    width: 100%;
  }

  &.is-error::after {
    background-color: rgba(255, 23, 68, 1);
  }
}
</style>