<template>
  <div id="login">
    <div class="login-area pt-70 pb-50">
      <div class="container">
        <div class="login shadow-none p-3 bg-light rounded">
          <h3>Login</h3>
          <form @submit.prevent="submit">
            <div v-if="form.progress" class="text-center">
              Progress: {{ form.progress.percentage }}%
            </div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row mb-3">
              <label for="email" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-7 m-auto">
                <input v-model="form.email" type="text" name="email" class="form-control shadow-lg bg-white rounded"
                  placeholder="Enter Your valid email address" />
                <HasError :form="form" field="email" />
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-sm-3 col-form-label">Password</label>
              <div class="col-sm-7 m-auto d-flex">
                  <input v-if="showPassword" v-model="form.password" name="password" type="text" class="form-control shadow-lg bg-white rounded" placeholder="Enter password"/>

                  <input v-else v-model="form.password" name="password" type="password" class="form-control shadow-lg bg-white rounded" placeholder="Enter password"/>

                  <div class="control">
                    <div class="btn btn-white form-control" @click="toggleShow">
                      <span class="icon is-small is-right">
                        <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                      </span>
                    </div>
                  </div>
              </div>

              <HasError :form="form" field="password" />
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
                <button type="submit" class="custom-btn rounded-pill" :disabled="form.busy">
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

            <div class="row">
              <label class="col-sm-3 col-form-label"></label>
              <div class="col-sm-7 m-auto">
                <span>
                  Not a member yet? 
                  <router-link :to="{name: 'register'}" class="text-muted underline-on-hover">
                    Sign Up
                  </router-link>
                </span>
              </div>
            </div>
          </form>
        </div>

        <div>
          <div v-if="isOTPPopupOpen" class="otp-popup">
            <div class="otp-content">
              <h2>Enter OTP</h2>
              <input type="text" class="form-control" placeholder="Enter valid OTP" v-model="otpInput" />
              <div class="otp-buttons">
                <button class="btn btn-sm btn-danger" @click="cancelOTP">Cancel</button>
                <button @click="verifyOtp" class="btn btn-sm btn-success">Submit</button>
              </div>
            </div>
          </div>
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
import { useToast } from "vue-toastification";
const toast = useToast();
import vueRecaptcha from 'vue3-recaptcha2';
import { useHead } from '@vueuse/head';
import Form from 'vform';
import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5';

export default {
  name: "Login",
  components: {
    Button,
    HasError,
    AlertError,
    vueRecaptcha
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      isOTPPopupOpen: false,
      checkedRecaptcha: false,
      capchaErrorMsg:false,
      otpInput: '',
      loginResponse: [],

      form: new Form({
        email: "",
        password: "",
      }),

      showPassword: false,
    };
  },

  created() {
    const url = window.location.pathname;
    axios.get(`${this.backendUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } })
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data != null) {
          useHead({ title: response.data.data.title });
        } else {
          useHead({ title: 'Alumni | EWU' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

    async submit() {
      if(this.checkedRecaptcha) {
        try {
          this.$Progress.start();
          this.form.busy = true;

          const loginResponse = await this.form.post(`${this.backendUrl}/login`);
          if (this.form.successful) {
            this.$Progress.finish();
            if (loginResponse.data.two_fa_status === 'Enable') {
              this.isOTPPopupOpen = true;
              this.loginResponse = loginResponse;
            } else {
              store.setAlumniLoggedInInfo(loginResponse.data);
              this.$Progress.finish();
              toast.success(loginResponse.data.message);
              this.$router.push({ name: 'dashboard' });
            }
          } else {
            this.$Progress.fail();
            toast.error("Something went wrong. Try again later.");
            this.$router.push({ name: 'login' });
          }
        } catch (error) {
          this.$Progress.fail();
          console.log(error);
        }
      }else {
        this.capchaErrorMsg = "Please verify that you are not a robot."
      }
    },

    openOTP() {
      this.isOTPPopupOpen = true;
    },

    cancelOTP() {
      this.isOTPPopupOpen = false;
      this.otpInput = '';
    },

    verifyOtp() {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/verify-otp/${this.otpInput}`)
      .then((response) => {
        if (response.data.status == "success") {
          this.$Progress.finish();
          store.setAlumniLoggedInInfo(this.loginResponse.data);
          toast.success(this.loginResponse.data.message);
          this.$router.push({name: 'dashboard'})
        } else if(response.data.status == "failed") {
          this.$Progress.fail();
          toast.error(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },
    
    toggleShow(){
      this.showPassword = !this.showPassword;
    }
  }
}


// import axios from "axios";
// import { useStore } from '../../store';
// const store = useStore();
// import vueRecaptcha from 'vue3-recaptcha2';
// import { useHead } from '@vueuse/head';
// import Cookies from 'js-cookie';
// import Form from 'vform';
// import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5';

// export default {
//   name: "Login",
//   components: {
//     Button,
//     HasError,
//     AlertError,
//     vueRecaptcha
//   },

//   data() {
//     return {
//       backendUrl: import.meta.env.VITE_API_BASE_URL,
//       isOTPPopupOpen: false,
//       checkedRecaptcha: false,
//       capchaErrorMsg:false,
//       otpInput: '',
//       loginResponse: [],

//       form: new Form({
//         email: "",
//         password: "",
//       }),
//     }
//   },

//   beforeCreate() {
//     useHead({title: 'Login | EWU'})
//   },

//   methods: {
//     recaptchaVerified(response) {
//       this.checkedRecaptcha = true;
//       this.capchaErrorMsg="";
//     },

//     recaptchaExpired() {
//       this.$refs.vueRecaptcha.reset();
//     },

//     recaptchaFailed() {
//     },

//     submit(){
//       if(this.checkedRecaptcha) {
//         this.$Progress.start();
//         this.form.busy = true
//         this.form.post(`${this.backendUrl}/login`)
//         .then(response => {
//           if(this.form.successful){
//             this.$Progress.finish();
//             if (response.data.two_fa_status === 'Enable') {
//               this.isOTPPopupOpen = true;
//               this.loginResponse = response;
//             } else {
//               // this.$store.dispatch('setAlumniLoggedInInfo', response.data)
//               this.$Progress.finish();
//               // toast.success(response.data.message);
//               this.$router.push({name: 'dashboard'})
//             }
//           }else{
//             this.$Progress.fail();
//             // toast.error("Something went wrong. Try again later.");
//             this.$router.push({name: 'login'})
//           }
//         })
//         .catch(e => {
//           this.$Progress.fail();
//           console.log(e)
//         })
//       }else{
//         this.capchaErrorMsg = "Please verify that you are not a robot."
//       }
//     },

//     openOTP() {
//       this.isOTPPopupOpen = true;
//     },

//     cancelOTP() {
//       this.isOTPPopupOpen = false;
//       this.otpInput = '';
//     },

//     verifyOtp() {
//       this.$Progress.start();
//       axios.post(`${this.backendUrl}/verify-otp/${this.otpInput}`)
//       .then((response) => {
//         if (response.data.status == "success") {
//           this.$Progress.finish();
//           this.$store.dispatch('setAlumniLoggedInInfo', this.loginResponse.data)
//           toast.success(this.loginResponse.data.message);
//           this.$router.push({name: 'dashboard'})
//         } else if(response.data.status == "failed") {
//           this.$Progress.fail();
//           toast.error(response.data.message);
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     },

//     // submit(){
//     //   this.$Progress.start();
//     //   this.form.busy = true
//     //   this.form.post(`${this.backendUrl}/alumni/login`)

//     //   .then(response => {
//     //     // console.log(response);
//     //     /*localStorage.setItem('alumniLoggedInToken',response.data.token)
//     //     localStorage.setItem('auth_id',response.data.auth_id)*/

//     //       //set into cookies
//     //     if (window.location.origin.includes('fscd.xyz')){
//     //       Cookies.set('alumniLoggedInTokenCookie', response.data.token, { domain: '.fscd.xyz', path: '/', expires: 1/24 }) // expires in 1 hour
//     //       Cookies.set('authIdCookie', response.data.auth_user_id, { domain: '.fscd.xyz', path: '/', expires: 1/24 }) // expires in 1 hour
//     //       Cookies.set('alumniIdCookie', response.data.auth_alumni_id, { domain: '.fscd.xyz', path: '/', expires: 1/24 }) // expires in 1 hour
//     //     } else{
//     //       Cookies.set('alumniLoggedInTokenCookie', response.data.token) // expires in 1 hour
//     //       Cookies.set('authIdCookie', response.data.auth_user_id) // expires in 1 hour
//     //       Cookies.set('alumniIdCookie', response.data.auth_alumni_id) // expires in 1 hour
//     //     }

//     //     if(this.form.successful){
//     //       // this.$store.dispatch('setAuthId', response.data.auth_alumni_id)
//     //       this.$Progress.finish();
//     //       toast.success(response.data.message);
//     //       this.$router.push({name: 'dashboard'})
//     //     }else{
//     //       this.$Progress.fail();
//     //       toast.error("Something went wrong. Try again later.");
//     //       this.$router.push({name: 'login'})
//     //     }
//     //   })
//     //   .catch(e => {
//     //     this.$Progress.fail();
//     //     console.log(e)
//     //   })
//     // }
//   }
// }
</script>

<style>
.error-message {
  color: red;
}

.login .custom-btn {
    padding: 6px 40px;
}

.custom-btn {
  background-color: #111D5E;
  color: #ffffff;
  font-size: 16px;
  padding: 13px 35px;
  border-radius: 0;
  position: relative;
  -webkit-transition: all ease 0.5s;
  transition: all ease 0.5s;
  border: 1px solid #111D5E;
}

.custom-btn:hover {
  color: #e32845;
}

.underline-on-hover:hover {
  text-decoration: underline !important;
  color: blue !important;
}

.otp-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.otp-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}

.otp-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.otp-buttons button {
  margin-left: 10px;
}
</style>