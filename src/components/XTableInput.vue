<template>
  <div class="x-table-input">
    <div class="x-base__input-header">
      <label class="x-base__label">
        {{label}}
      </label>
    </div>
    <table class="x-table-input__table"
           style="margin-top: 0.5em;">
      <transition-group tag="tbody"
                        name="row-transition">
        <template v-if="mData && mData.length">
          <template v-for="(row, row_index) in mData">
            <tr :key="`header:${row.id}`">
              <th colspan="2">
                <b class="x-table-input__table__row-number">
                  #{{row_index + 1}}
                </b>
              </th>
              <th align="right"
                  style="width: auto;">
                <button class="btn-action"
                        :disabled="row_index === 0"
                        text="Ke Atas"
                        data-icon="↑"
                        @click="onMoveUp(row, row_index)">
                </button>
                <button class="btn-action"
                        :disabled="!mData[row_index + 1]"
                        text="Ke Bawah"
                        data-icon="↓"
                        @click="onMoveDown(row, row_index)">
                </button>
                <button class="btn-action btn-danger"
                        :disabled="mData.length <= 1"
                        text="Hapus"
                        data-icon="✗"
                        @click="onRemove(row, row_index)">
                </button>
              </th>
            </tr>
            <tr v-for="(col) in columns"
                :key="`content:${row.id}.column:${col.prop}`">
              <td :colspan="2">
                {{col.label}}
              </td>
              <td role="input">
                <input class="x-table-input__table__input"
                       :value="getCellValue(row, row_index, col)"
                       v-bind="col.inputAttrs"
                       @focus="onFocus($event, row, row_index, col)"
                       @input="onInput($event, row, row_index, col)"
                       @blur="onBlur($event, row, row_index, col)">
                <XInputHint :active="isRowFocus(row, row_index, col)"
                            :error="!!getRowErrorMessage(row, row_index, col)" />
                <p class="x-base__hint"
                   :active="getRowErrorMessage(row, row_index, col)">
                  {{getRowErrorMessage(row, row_index, col)}}
                </p>
              </td>
            </tr>
          </template>
        </template>
      </transition-group>
      <tfoot>
        <tr>
          <td :colspan="3"
              style="padding: 0;">
            <button class="x-table-input__table__btn-add"
                    @click="onAddNewRow">
              <b>+</b>&nbsp;&nbsp;Tambah Riwayat
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    <p class="x-base__hint"
       :active="!!globalErrorMsg">
      {{globalErrorMsg}}
    </p>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'data',
    event: 'change'
  },
  components: {
    XInputHint: () => import("../components/XInputHint")
  },
  props: {
    label: {
      type: String
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    dataTemplate: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mData: [],

      isFocused: {},
      errorMsg: {},
      globalErrorMsg: null,
      completionWatcher: null,

      updateTimer: null,
      itemId: 1
    }
  },
  created() {
    this.onAddNewRow()
  },
  methods: {
    validateRow(item, index, column) {
      this.toggleFocus(!item[column.prop], item, index, column)
      this.setErrorMessage(!item[column.prop] ? 'Wajib Diisi' : null, item, index, column)
    },
    validateAll() {
      return this.mData.every((item, i) => {
        let truthy = true
        for (let key in item) {
          truthy = truthy && !!item[key]
          this.validateRow(item, i, { prop: key })
        }
        return truthy
      })
    },
    getCellValue(item, index, column) {
      return item[column.prop]
    },
    onAddNewRow(index) {
      this.globalErrorMsg = null
      this.$nextTick()
        .then(() => {
          if (this.mData.length) {
            const isComplete = this.validateAll()
            if (!isComplete) {
              this.globalErrorMsg = 'Lengkapi data yang ada terlebih dahulu sebelum menambah data baru'
              return
            }
          }

          const newItem = {
            ...JSON.parse(JSON.stringify(this.dataTemplate)),
            id: this.itemId++
          }
          if (typeof index === 'number') {
            this.mData.splice(index + 1, 0, newItem)
          } else {
            this.mData.push(newItem)
          }
        })
    },
    setErrorMessage(msg, item, index, column) {
      if (!(item.id in this.errorMsg)) {
        this.$set(this.errorMsg, item.id, {})
      }
      this.$set(this.errorMsg[item.id], column.prop, msg)
    },
    toggleFocus(isFocus, item, index, column) {
      if (!(item.id in this.isFocused)) {
        this.$set(this.isFocused, item.id, {})
      }
      this.$set(this.isFocused[item.id], column.prop, isFocus)
    },
    onFocus(e, item, index, column) {
      this.toggleFocus(true, item, index, column)
    },
    onBlur(e, item, index, column) {
      this.validateRow(item, index, column)
    },
    onInput(e, item, index, column) {
      this.$set(this.mData[index], column.prop, e.target.value)

      if (!!this.updateTimer) {
        clearTimeout(this.updateTimer)
      }
      this.updateTimer = setTimeout(() => {
        this.$emit('change', this.mData)
        this.$nextTick(() => {
          this.validateRow(item, index, column)
        })
      }, 500)
    },
    isRowFocus(item, index, column) {
      return !!this.isFocused[item.id] && !!this.isFocused[item.id][column.prop]
    },
    getRowErrorMessage(item, index, column) {
      if (!this.errorMsg[item.id]) {
        return ''
      }
      return this.errorMsg[item.id][column.prop] || ''
    },
    onMoveUp(item, index) {
      const prev = this.mData.slice(index - 1, index)[0]
      const moved = this.mData.slice(index, index + 1)[0]
      this.mData.splice(index - 1, 2, moved, prev)
    },
    onMoveDown(item, index) {
      const moved = this.mData.splice(index + 1, 1)[0]
      this.$nextTick()
        .then(() => {
          this.mData.splice(index, 0, moved)
        })
    },
    onRemove(item, index) {
      this.mData.splice(index, 1)
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(v) {
        if (Array.isArray(v)) {
          this.mData = v
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.x-table-input {
  font-size: 1rem;

  &__table {
    width: 100%;
    border-top: 1px solid var(--input-border-color);
    border-left: 1px solid var(--input-border-color);
    border-collapse: collapse;

    th,
    td {
      padding: 1em;

      color: rgb(52, 70, 79);
      font-size: 0.85em;
      line-height: 1;
    }

    th,
    td {
      border-bottom: 1px solid var(--input-border-color);
      border-right: 1px solid var(--input-border-color);
    }

    td[role="input"] {
      background-color: var(--input-bg-color);
      border-top: 1px solid var(--input-border-color);
    }

    td[role="button-add"] {
      border-top: 2px solid var(--input-border-active-color);
    }

    &__row-number {
      display: block;
      font-size: 1.2em;
      text-align: left;
    }

    &__input {
      font-size: 1em;
      width: 100%;
      padding: 0.5em;
      border: none;
      //   border-bottom: 3px solid var(--input-border-color);

      background-color: var(--input-bg-color);
      outline: none;

      &:active,
      &:focus {
        outline: none;
        // border-bottom: 3px solid var(--input-border-active-color);
      }
    }

    &__fab-add {
      $size: 2rem;
      position: absolute;

      top: calc(100% - #{$size / 2});
      left: 100%;

      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: $size;
      height: $size;
      padding: 0;

      color: var(--input-border-active-color);

      border: 2px solid var(--input-border-active-color);
      border-radius: 8px;

      background-color: white;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);

      &:hover {
        color: white;
        background-color: var(--input-border-active-color);
      }
    }

    &__btn-add {
      cursor: pointer;
      width: 100%;
      height: 3em;
      border: none;

      font-size: 0.85em;
      font-weight: 500;
      letter-spacing: 1px;
      color: rgba(33, 150, 243, 1);

      outline: none;

      transition-property: background-color, color;
      transition-duration: 0.1s;
      transition-timing-function: ease-out;

      &:active,
      &:focus {
        outline: none;
        box-shadow: 0 0 4px 0 rgba(33, 150, 243, 1);
      }

      &:hover {
        background-color: rgba(33, 150, 243, 1);
        color: white;
      }
    }
  }
}

.btn-action {
  &::after {
    content: attr(data-icon) + attr(text);
    display: inline;
  }

  @media screen and (max-width: 450px) {
    &::after {
      content: attr(data-icon);
    }
  }
}

tr {
  transition: all 0.5s ease-in-out;
  background-color: white;
}

.row-transition {
  &-leave-to {
    opacity: 0;
    transform: translateX(3rem);
  }
  &-move {
    transition: all 0.3s ease-out;
  }
}
</style>