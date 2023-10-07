<template>
  <div id="forgot-password">
    <div class="password-area pt-100 pb-70">
      <div class="container">
        <div class="password shadow-none p-3 bg-light rounded">
          <h3>Forgot Password</h3>
          <form @submit.prevent="submit">
            <div v-if="form.progress" class="text-center">
              Progress: {{ form.progress.percentage }}%
            </div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row mb-3">
              <label for="email" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-7 m-auto">
                <input v-model="form.email" type="text" name="email" class="form-control shadow-lg bg-white rounded" placeholder="Enter Your valid email address" />
                <HasError :form="form" field="email" />
              </div>
            </div>
            <div class="row mb-3"> 
              <label class="col-sm-3 col-form-label">Google reCaptcha</label>
              <div class="col-sm-7 m-auto">
                <vue-recaptcha  sitekey="6LcBkkgmAAAAAEOYXaFUGxopM-ajaT0KeKCU8JRI"
                  size="normal" 
                  theme="light"
                  hl="en"
                  @verify="recaptchaVerified"
                  @expire="recaptchaExpired"
                  @fail="recaptchaFailed"
                  ref="vueRecaptcha">
               </vue-recaptcha>
                <p v-if="capchaErrorMsg" class="error-message">{{ capchaErrorMsg }}</p>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-3 col-form-label"></label>
              <div class="col-sm-7 m-auto">
                <button type="submit" class="default-btn rounded-pill" :disabled="form.busy">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <vue-progress-bar></vue-progress-bar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../store';
const store = useStore();
import { useHead } from '@vueuse/head';
import vueRecaptcha from 'vue3-recaptcha2';
import Form from 'vform';
import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "ForgotPassword",
  components: {Button, HasError, AlertError, vueRecaptcha},

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      checkedRecaptcha: false,
      capchaErrorMsg:false,
      form: new Form({
        email: ""
      }),
    }
  },

  methods: {
    recaptchaVerified(response) {
      this.checkedRecaptcha = true;
      this.capchaErrorMsg="";
    },

    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
    },

    recaptchaFailed() {
    },

    submit(){
      if(this.checkedRecaptcha) {
        this.form.busy = true
        this.form.post(`${this.backendUrl}/forgot-password`)
        .then(response => {
          toast.success(response.data.message);
        })
        .catch(e => {
          console.log(e)
        })
      }else{
        this.capchaErrorMsg = "Please verify that you are not a robot."
      }
    }
  }
}
</script>

<style>
.underline-on-hover:hover {
    text-decoration: underline !important;
    color: blue !important;
}
</style>