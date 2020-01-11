<template>
  <div id="app">
    <div>
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
                       label="Riwayat Pekerjaan (hapus jika tidak ada)" />
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
    <div style="background-color: #eee; padding: 1rem; margin-top: 6rem;">
      <code>
        Preview
      </code>
      <pre v-html="stringified"
           style="word-break: break-all; overflow: hidden; white-space: pre-wrap;">
      </pre>
    </div>
    <transition name="fade">
      <div v-if="isSendingFormData"
           id="mock-progress">
        <div id="progress-modal">
          <div v-if="!hasFinishedSending"
               class="dots-loader">
            <i class="dot"></i>
            <i class="dot"></i>
            <i class="dot"></i>
          </div>
          <template v-else>
            <h3>
              Pendaftaran Berhasil!
            </h3>
            <br>
            <div>
              <button class="btn-action"
                      @click="onCloseModal"
                      style="font-size: 0.85em;">
                <b>OK</b>
              </button>
              <button class="btn-action"
                      @click="() => {onCreateNewForm(); onCloseModal(); }"
                      style="font-size: 0.85em;">
                <b>Keluar dan Hapus Data</b>
              </button>
            </div>
          </template>
        </div>
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

      formId: 1,
      isSendingFormData: false,
      hasFinishedSending: false,

      stringified: '',
      stringifyInterval: null,
      isDev: true
    }
  },
  created() {
    this.initHistory()
  },
  computed: {

  },
  methods: {
    stringifyFormData() {
      this.stringified = JSON.stringify({
        name: this.name,
        address: this.address,
        birthDate: this.birthDate,
        gender: this.gender,
        jobHistory: this.jobHistory
      }, null, 4)
    },
    initHistory() {
      this.jobHistory = [
        JSON.parse(JSON.stringify(this.jobHistoryTemplate))
      ]
    },
    hasUnsavedChanges() {
      return this.name
        || this.gender
        || this.address
        || Object.keys(this.birthDate).every(key => !!this.birthDate[key])
        || this.jobHistory.every(item => Object.keys(item).every(key => !!item[key]))
    },
    onCreateNewForm(animate = true) {
      let proceed = true
      if (!this.isSendingFormData && this.hasUnsavedChanges()) {
        proceed = confirm('Yakin untuk menghapus data?')
      }
      if (!proceed) {
        return
      }

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
          } else {
            this.isSendingFormData = true
            this.hasFinishedSending = false
            setTimeout(() => {
              this.hasFinishedSending = true
            }, 3000)
          }
        })
    },
    onCloseModal() {
      this.isSendingFormData = false
      this.hasFinishedSending = false
    }
  },
  watch: {
    isDev: {
      immediate: true,
      handler(v) {
        if (this.stringifyInterval) {
          clearInterval(this.stringifyInterval)
        }

        if (!!v) {
          this.stringifyInterval = setInterval(() => {
            this.stringifyFormData()
          }, 300)
        }
      }
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

#mock-progress {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);
}

#progress-modal {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 80vw;
  max-width: 400px;
  height: 50vh;
  max-height: 250px;

  margin: 0 auto;
  border-radius: 1rem;

  box-shadow: 0 0.25rem 1rem 0 rgba(0, 0, 0, 0.15);
  background-color: white;
}

.dots-loader {
  display: flex;
  justify-content: center;
  align-items: center;

  > .dot {
    position: relative;
    display: block;
    width: 1rem;
    height: 1rem;
    margin: 0.5rem;
    border-radius: 9999px;
    background-color: rgb(30, 115, 220);
    animation: bounce 0.75s infinite linear;

    &:nth-child(1) {
      animation-delay: 0;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-direction: reverse;
    }
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0rem);
  }
  33% {
    transform: translateY(0.5rem);
  }
  66% {
    transform: translateY(-0.25rem);
  }
  100% {
    transform: translateY(0rem);
  }
}

.fade {
  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }
}
</style>
