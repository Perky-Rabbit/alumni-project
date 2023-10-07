<template>
  <div id="reset-password">
    <div class="password-area pt-100 pb-70">
      <div class="container">
        <div class="password shadow-none p-3 bg-light rounded">
          <h3>Reset Password</h3>
          <form @submit.prevent="submit">
            <div v-if="form.progress" class="text-center">
              Progress: {{ form.progress.percentage }}%
            </div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row mb-3">
              <label for="password" class="col-sm-3 col-form-label">Password</label>
              <div class="col-sm-7 m-auto">
                <input v-model="form.password" type="password" class="form-control shadow-lg bg-white rounded"
                  placeholder="Password" />
                <HasError :form="form" field="password" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="password_confirmation" class="col-sm-3 col-form-label">Retype Password</label>
              <div class="col-sm-7 m-auto">
                <input v-model="form.password_confirmation" type="password" class="form-control shadow-lg bg-white rounded"
                  placeholder="Retype password" />
                <HasError :form="form" field="password_confirmation" />
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

            <div class="row mb-1">
              <label class="col-sm-3 col-form-label"></label>
              <div class="col-sm-7 m-auto">
                <router-link :to="{name: 'forgotPassword'}" class="text-muted underline-on-hover">
                  Forgot Password?
                </router-link>
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
import Form from 'vform';
import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "ResetPassword",
  components: {Button, HasError, AlertError},

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,

      avatar: store.$state.avatar,
      alt: store.$state.alt,

      form: new Form({
        password: "",
        password_confirmation: "",
        token: this.$route.query.token
      }),
    }
  },

  mounted() {
    console.log('Page mounted');
  },

  methods: {
    submit(){
      this.form.busy = true
      this.form.post(`${this.backendUrl}/reset-password`)
      .then(response => {
        if(this.form.successful){
          toast.success(response.data.message);
          setInterval(() => {
            this.$router.push({name: 'login'})
          }, 1500);
        }else{
            this.$router.push({name: 'resetPassword'})
        }
      })
      .catch(e => {
        console.log(e)
      })
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