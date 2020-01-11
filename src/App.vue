<template>
  <div id="app">
    <XInput input-element="input"
            name="nama"
            label="Nama"
            type="text"
            placeholder="Masukkan nama Anda..."
            v-model="name" />
    <br>
    <XDateInput name="tanggal_lahir"
                label="Tanggal Lahir"
                :placeholders="{date: 'Tanggal', month: 'Bulan', year: 'Tahun'}"
                v-bind="birthDate" />
    <br>
    <XInput input-element="textarea"
            name="alamat"
            label="Alamat"
            type="text"
            placeholder="Masukkan alamat Anda..."
            rows="3"
            v-model="address" />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    XInput: () => import("./components/XInput"),
    XDateInput: () => import("./components/XDateInput"),
  },
  data() {
    return {
      name: '',
      address: '',
      birthDate: {
        date: null,
        month: null,
        year: null
      }
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
  --input-border-active-color: rgba(0, 200, 83, 1);

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
}

#app {
  display: block;
  width: 100%;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 4rem;

  border-style: solid;
  border-color: #ddd;
  border-width: 0px;
  border-left-width: 1px;
  border-right-width: 1px;

  background-color: white;
}

button {
  &:focus,
  &:active {
    outline: none;
  }
}

.x-base__input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3em;
}

.x-base__label {
  display: block;
  font-size: 1em;
  font-weight: normal;
}

.x-base__input {
  display: block;
  width: 100%;
  padding: 0.5em;

  border-radius: 0.25rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid var(--input-border-color);
  border-bottom-width: 0;
  background-color: var(--input-bg-color);

  font-size: 1.15em;
  transition: all 0.15s ease-out;

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
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
    padding: 0.5em 0;
  }
}
</style>
