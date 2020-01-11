<template>
  <div id="app">
    <header id="app-header">
      <h1 id="form-title">
        Form Pendaftaran
      </h1>
      <button class="btn-action action-new"
              style="flex: 0 0 auto;"
              @click="onCreateNewForm">
        <b>+</b>&nbsp;&nbsp;Buat Form Baru
      </button>
    </header>
    <p id="form-desc">
      Lengkapi isian di bawah ini sesuai dengan informasi yang diminta.
    </p>
    <br>
    <transition name="slide-fade"
                mode="out-in">
      <div id="form"
           :key="formId">
        <XInput input-element="input"
                name="nama"
                label="Nama"
                type="text"
                placeholder="Masukkan nama Anda..."
                v-model="name" />
        <br>
        <XDateInput name="tanggal_lahir"
                    label="Tanggal Lahir"
                    :placeholders="{date: '1', month: '1', year: '1980'}"
                    :date.sync="birthDate.date"
                    :month.sync="birthDate.month"
                    :year.sync="birthDate.year" />
        <br>
        <XInput input-element="textarea"
                name="alamat"
                label="Alamat"
                type="text"
                placeholder="Masukkan alamat Anda..."
                rows="3"
                v-model="address" />
        <br>
        <XRadioButtons label="Jenis Kelamin"
                       :options="['Laki-laki', 'Perempuan']"
                       v-model="gender" />
        <br>
        <XTableInput :columns="tableColumns"
                     :data-template="jobHistoryTemplate"
                     v-model="jobHistory"
                     label="Riwayat Pekerjaan" />
      </div>
    </transition>
  </div>
</template>

<script>
import XInput from "./components/XInput"
import XDateInput from "./components/XDateInput"
import XRadioButtons from "./components/XRadioButtons"
import XTableInput from "./components/XTableInput"

export default {
  name: 'app',
  components: {
    XInput,
    XDateInput,
    XRadioButtons,
    XTableInput
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'company',
          label: 'Perusahaan',
          inputAttrs: {
            type: 'text'
          }
        },
        {
          prop: 'position',
          label: 'Posisi',
          inputAttrs: {
            type: 'text'
          }
        },
        {
          prop: 'begin_date',
          label: 'Dari Tahun',
          inputAttrs: {
            type: 'number',
            min: 0,
            max: 9999
          }
        },
        {
          prop: 'end_date',
          label: 'Sampai Tahun',
          inputAttrs: {
            type: 'number',
            min: 0,
            max: 9999
          }
        },
      ],
      jobHistoryTemplate: {
        company: null,
        position: null,
        begin_date: null,
        end_date: null
      },
      name: '',
      address: '',
      birthDate: {
        date: null,
        month: null,
        year: null
      },
      gender: '',
      jobHistory: [],

      formId: 1
    }
  },
  methods: {
    onCreateNewForm() {
      this.formId++;
      this.$nextTick()
        .then(() => {
          this.name = ''
          this.address = ''
          this.birthDate = {
            date: null,
            month: null,
            year: null
          }
          this.gender = ''
          this.jobHistory = []
        })
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html {
  --input-border-color: rgba(176, 190, 197, 1);
  --input-border-active-color: rgba(67, 160, 71, 1);

  --input-bg-color: rgba(236, 239, 241, 1);

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
  min-width: 320px;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;

  text-align: center;
}

#app {
  max-width: 700px;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 3rem;

  border-style: solid;
  border-color: #ddd;
  border-width: 0px;
  border-left-width: 1px;
  border-right-width: 1px;

  background-color: white;

  text-align: left;
}

#app-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

#form {
  display: inline-block;
  text-align: left;
}

#form-title {
  margin-top: 0.25em;
  display: inline-block;
  flex: 0 0 auto;
  word-break: break-all;
  overflow: hidden;
}

@media screen and (max-width: 619px) {
  .large-only {
    display: none;
  }

  html {
    font-size: 15px;
  }

  #app {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  #form-title {
    order: 2;
  }

  .btn-action.action-new {
    order: 1;
  }

  #form-title,
  #form-desc,
  #form {
    width: 100%;
  }

  #form {
    width: 100%;

    > *:not(.x-table-input) {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
      margin-bottom: 0.5em;

      > *:nth-child(1) {
        align-self: center;
      }

      > *:nth-child(2) {
        order: 3;
        grid-column: 1 / span 2;
      }

      > *:nth-child(3) {
        order: 2;
      }
    }
  }
}

@media screen and (min-width: 620px) {
  #app {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  #form {
    > *:not(.x-table-input) {
      display: grid;
      grid-template-columns: 120px 300px 120px;
      gap: 0 1rem;
      align-items: baseline;

      > *:nth-child(1) {
        width: 100%;
        height: 100%;
        overflow: hidden;
        // text-align: right !important;
      }

      > *:nth-child(2) {
        width: 100%;
      }
    }
  }
}

button {
  cursor: pointer;
  background-color: transparent;
  &:focus,
  &:active {
    outline: none;
  }
  &[disabled] {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
}

.x-base__input-header {
  min-height: 1.5rem;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  align-items: center;
}

.x-base__label {
  width: 100%;
  display: block;
  font-size: 1em;
  font-weight: normal;
  color: rgb(52, 70, 79);
}

.x-base__input {
  display: block;
  width: 100%;
  padding: 0.5em;

  border-radius: 0.25rem;
  border: 1px solid var(--input-border-color);
  background-color: var(--input-bg-color);

  font-size: 1.15em;
  transition: all 0.15s ease-out;

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
    font-size: 0.85em;
  }
  &:focus,
  &:active {
    outline: none;
  }
}

.x-base__btn-clear {
  cursor: pointer;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.25rem;

  font-size: 0.7em;
  font-weight: bold;
  color: rgba(33, 150, 243, 1);

  text-transform: uppercase;
  letter-spacing: 1px;

  &[disabled] {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:focus {
    background-color: rgba(0, 0, 0, 0.15);
  }
}

%base-hint {
  display: block;
  min-height: 1em;
  margin: 0;
  margin-top: 0.5em;

  font-size: 0.85em;
  color: rgba(211, 47, 47, 1);

  opacity: 0;
  transition: opacity 0.15s ease-in-out;

  &[active] {
    opacity: 1;
    animation: shake 2 0.1s ease-in-out;
  }
}

.x-base__hint {
  @extend %base-hint;
}

.x-base__hint--list {
  @extend %base-hint;
  ul {
    list-style-position: outside;
    margin: 0;
    padding-left: 1em;
  }

  li {
    line-height: 1.2;
    padding: 0.2em 0;
    opacity: 0.75;
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(0.5em);
  }

  75% {
    transform: translateX(-0.5em);
  }

  100% {
    transform: translateX(0);
  }
}

.btn-action {
  cursor: pointer;
  padding: 0.5em 1em;
  border-radius: 9999px;
  border: none;

  font-size: 0.85em;
  font-weight: 400;
  letter-spacing: 1px;
  border: 1px solid rgba(33, 150, 243, 1);
  color: rgba(33, 150, 243, 1);

  transition-property: background-color, color;
  transition-duration: 0.1s;
  transition-timing-function: ease-out;

  &:active,
  &:focus {
    outline: none;
    box-shadow: 0 0 0.5em 0 rgba(0, 145, 255, 0.516);
  }

  &:not([disabled]):hover {
    color: white;
    background-color: rgba(33, 150, 243, 1);
  }

  & + & {
    margin-left: 0.5em;
  }

  &.btn-danger {
    border: 1px solid rgba(229, 57, 53, 1);
    color: rgba(229, 57, 53, 1);

    &:hover {
      color: white;
      background-color: rgba(229, 57, 53, 1);
    }

    &:active,
    &:focus {
      box-shadow: 0 0 0.5em 0 rgba(229, 57, 53, 0.5);
    }
  }
}

.slide-fade {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(1.5rem);
  }

  &-enter-to,
  &-leave-to {
    transition: all 0.5s ease-in-out;
  }
}
</style>
