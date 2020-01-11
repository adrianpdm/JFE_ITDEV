<template>
  <div id="app">
    <div id="form">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    XInput: () => import("./components/XInput"),
    XDateInput: () => import("./components/XDateInput"),
    XRadioButtons: () => import("./components/XRadioButtons"),
  },
  data() {
    return {
      name: '',
      address: '',
      birthDate: {
        date: null,
        month: null,
        year: null
      },
      gender: ''
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;

  border-style: solid;
  border-color: #ddd;
  border-width: 0px;
  border-left-width: 1px;
  border-right-width: 1px;

  background-color: white;

  text-align: center;
}

#form {
  display: inline-block;
  text-align: left;
}

@media screen and (max-width: 599px) {
  .large-only {
    display: none;
  }

  #form {
    width: 300px;

    > * {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;

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

@media screen and (min-width: 600px) {
  #form {
    > * {
      display: grid;
      grid-template-columns: 120px 320px 120px;
      gap: 0 1rem;
      align-items: baseline;

      > *:nth-child(1) {
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: right !important;
      }

      > *:nth-child(2) {
        width: 320px;
      }
    }
  }
}

button {
  &:focus,
  &:active {
    outline: none;
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
  color: rgba(84, 110, 122, 1);
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
</style>
