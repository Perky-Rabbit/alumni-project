<template>
  <div id="signin-security">
    <div class="box shadow-sm border rounded bg-white mb-3">
      <div class="box shadow-sm border rounded bg-white profile-box">
        <div class="box-title border-bottom p-3">
          <h4 class="m-0">Two-Factor Authentication (2FA)</h4>
        </div>

        <div class="box-body p-3">
          <div class="two-fa-container mb-4">
            <h2><i class="fa fa-shield-halved"></i> 2FA</h2>
            <form @submit.prevent="twoFactorAuthenticationUpdate">
              <div class="form-group">
                <label for="mobile"><b>Mobile:</b></label>
                <input type="mobile" v-model="form.mobile" placeholder="Enter valid mobile number" required />
              </div>

              <div class="form-group">
                <label for="email"><b>Email:</b></label>
                <input type="email" v-model="form.email" placeholder="Enter valid email" required />
              </div>

              <div class="form-group">
                <label><b>Status:</b></label>
                <div>
                  <div class="form-check form-check-inline">
                    <input v-model="form.status" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Enable">
                    <label class="form-check-label" for="inlineRadio1">Enable</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="form.status" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Disable">
                    <label class="form-check-label" for="inlineRadio2">Disable</label>
                  </div>
                </div>
              </div>
              <button :disabled="form.busy" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../../store';
const store = useStore();
import Cookies from 'js-cookie';
import { useHead } from '@vueuse/head';
import Form from "vform";
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "SigninSecurity",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      auth_id: Cookies.get('alumniIdCookie'),
      alumni: '',
      
      form: new Form({
        id: "",
        mobile: "",
        email: "",
        status: "Disable"
      }),
    };
  },

  beforeCreate() {
    useHead({title: 'Two-Factor Authentication | EWU'})
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
      .then((response) => {
        this.alumni = response.data.data.alumni;
      })
      .catch((e) => {
        console.log(e);
      });

      axios.get(`${this.backendUrl}/2fa-get`, {
        params: {
          user_id: Cookies.get('authIdCookie')
        }
      })
      .then((res) => {
        this.form.fill(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },

    // basic info part
    twoFactorAuthenticationUpdate() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.post(`${this.backendUrl}/2fa-update`, {
        params: {
          user_id: Cookies.get('authIdCookie')
        }
      })
      .then((res) => {
        this.getData();
        this.$Progress.finish();
        toast.success(res.data.msg);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },
  },
};
</script>

<style>
  .two-fa-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: lightgray;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-weight: bold;
  }

  input[type="email"],
  input[type="mobile"] {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

