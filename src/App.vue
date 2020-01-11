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
        <br>
        <XTableInput :columns="tableColumns"
                     :data-template="jobHistoryTemplate"
                     v-model="jobHistory"
                     label="Riwayat Pekerjaan (kosongkan jika tidak ada)" />
      </div>
    </transition>
    <br>
    <br>
    <br>
    <div style="display: flex; justify-content: flex-end;">
      <button class="btn-action"
              @click="onSubmit"
              style="font-size: 1em; float:right;">
        Daftar
      </button>
    </div>
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
  created() {
    this.initHistory()
  },
  methods: {
    initHistory() {
      this.jobHistory = [
        // JSON.parse(JSON.stringify(this.jobHistoryTemplate))
      ]
    },
    onCreateNewForm(animate = true) {
      if (animate) {
        this.formId++;
      }
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
          this.initHistory()
        })
    },
    onEraseAllData() {
      const r = confirm('Hapus semua data?')
      if (r == true) {
        this.onCreateNewForm(false)
      }
    },
    onSubmit() {
      this.$nextTick()
        .then(() => {
          const children = this.$children
          if (!children || !children.length) return;

          let isValid = true
          for (let child of children) {
            if (typeof child.validate === 'function') {
              isValid = child.validate() && isValid
            } else {
              console.error('Each form field must provide validate fn')
            }
          }

          if (!isValid) {
            setTimeout(() => {
              alert('Lengkapi seluruh isian terlebih dahulu sebelum mengirimkan data')
            }, 400)
          }
        })
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 619px) {
  .btn-action.action-new {
    order: 1;
  }
}
</style>
