<template>
  <div id="app">
    <XInput input-element="input"
            name="nama"
            label="Nama"
            type="text"
            placeholder="Masukkan nama Anda..."
            v-model="name" />
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
    XInput: () => import("./components/XInput")
  },
  data() {
    return {
      name: '',
      address: ''
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
  --input-border-active-color: rgba(0,200,83,1);

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

.x-input + .x-input {
  margin-top: 2rem;
}
</style>
