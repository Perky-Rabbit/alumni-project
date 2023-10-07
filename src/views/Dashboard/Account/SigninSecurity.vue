<template>
  <div id="signin-security">
    <div class="box shadow-sm border rounded bg-white mb-3">
      <div class="box shadow-sm border rounded bg-white profile-box">
        <div class="box-title border-bottom p-3">
          <h4 class="m-0">Account Access</h4>
        </div>

        <div class="box-body p-3 border-bottom">
          <div class="d-flex align-items-top job-item-header pb-2">
            <div class="mr-2">
              <div>
                <h6 class="text-muted"><i class="fa fa-user"></i> User Name</h6>
              </div>
              <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                <div class="font-weight-bold mr-2 ml-3">
                  <span class="text-primary">{{ alumni.username }}</span>
                </div>
              </div>
            </div>

            <div class="ml-auto mb-auto">
              <button type="button" class="btn btn-light btn-sm rounded-circle" @click="updateUsernameEmailModalShow(alumni)">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- <div>
            <h6 class="text-muted"><i class="fa-solid fa-envelope"></i> Email</h6>
          </div>
          <div class="d-flex align-items-center osahan-post-header people-list">
            <div class="font-weight-bold mr-2 ml-3">
              <span class="text-primary">{{ alumni.email }}</span>
            </div>
          </div> -->
        </div>

        <div class="box-body p-3">
          <div class="d-flex align-items-top job-item-header pb-2">
            <div class="mr-2">
              <div>
                <h6 class="text-muted"><i class="fa-solid fa-key"></i> Change Password</h6>
              </div>
              <!-- <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                <div class="font-weight-bold mr-2 ml-3">
                  <span class="text-primary">{{ alumni.password }}</span>
                </div>
              </div> -->
            </div>

            <div class="ml-auto mb-auto">
              <button type="button" class="btn btn-light btn-sm rounded-circle" @click="updatePasswordModalShow(alumni)">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Username Email Info Modal -->
    <div class="modal fade" id="updateUsernameEmailModal" tabindex="-1" role="dialog" aria-labelledby="updateUsernameEmailModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <form @submit.prevent="updateUsernameEmail()">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateUsernameEmailModalLabel">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                  <label for="username" class="mb-0">Username</label>
                  <input v-model="usernameEmailInfoForm.username" type="text" name="username" class="form-control">
              </div>
              <!-- <div class="form-group">
                  <label for="email" class="mb-0">Email</label>
                  <input v-model="usernameEmailInfoForm.email" type="email" name="email" class="form-control">
              </div> -->
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button :disabled="usernameEmailInfoForm.busy" type="submit" class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Password Info Modal -->
    <div class="modal fade" id="updatePasswordModal" tabindex="-1" role="dialog" aria-labelledby="updatePasswordModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <form @submit.prevent="updatePassword()">
        
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updatePasswordModalLabel">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <AlertError :form="passwordInfoForm" message="There were some problems with your input." />

              <label for="current_password" class="mb-0">Type your current password</label>
              <div class="input-group mb-2">
                <input type="hidden" v-model="passwordInfoForm.old_password">
                <input :type="current_type" v-model="passwordInfoForm.current_password" class="form-control" placeholder="Current password">
                <button type="button" class="add-new-input-group text-secondary" @click='showCurrentPassword'>
                  <p style="margin-bottom: -3px;" v-if="current_type_text == 'show_current_password'"><i class="fa fa-eye"></i></p>
                  <p style="margin-bottom: -3px;" v-if="current_type_text == 'hide_current_password'"><i class="fas fa-eye-slash"></i></p>
                </button>
                <HasError :form="passwordInfoForm" field="current_password" />
              </div>

              <label for="new_password" class="mb-0">Type your new password</label>
              <div class="input-group mb-2">
                <input :type="new_type" v-model="passwordInfoForm.new_password" class="form-control" placeholder="New password">
                <button type="button" class="add-new-input-group text-secondary" @click='showNewPassword'>
                  <p style="margin-bottom: -3px;" v-if="new_type_text == 'show_new_password'"><i class="fa fa-eye"></i></p>
                  <p style="margin-bottom: -3px;" v-if="new_type_text == 'hide_new_password'"><i class="fas fa-eye-slash"></i></p>
                </button>
                <HasError :form="passwordInfoForm" field="new_password" />
              </div>

              <label for="password_confirm" class="mb-0">Retype your new password</label>
              <div class="input-group">
                <input :type="confirm_type" v-model="passwordInfoForm.password_confirm" class="form-control" placeholder="Retype password">
                <button type="button" class="add-new-input-group text-secondary" @click='showConfirmPassword'>
                  <p style="margin-bottom: -3px;" v-if="confirm_type_text == 'show_confirm_password'"><i class="fa fa-eye"></i></p>
                  <p style="margin-bottom: -3px;" v-if="confirm_type_text == 'hide_confirm_password'"><i class="fas fa-eye-slash"></i></p>
                </button>
                <HasError :form="passwordInfoForm" field="password_confirm" />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button :disabled="passwordInfoForm.busy" type="submit" class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </form>
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

      current_type: 'password',
      current_type_text: 'show_current_password',

      new_type: 'password',
      new_type_text: 'show_new_password',

      confirm_type: 'password',
      confirm_type_text: 'show_confirm_password',
      
      // username email info part
      valueFromUsernameEmailInfo: "username_email_info",
      usernameEmailInfoForm: new Form({
        id: "",
        username: "",
        email: ""
      }),

      // password info part
      valueFromPasswordInfo: "password_info",
      passwordInfoForm: new Form({
        id: "",
        old_password: "",
        current_password: "",
        new_password: "",
        password_confirm: "",
      }),
    };
  },

  beforeCreate() {
    useHead({title: 'Signin & Security | EWU'})
  },

  mounted() {
    this.getData();
  },

  methods: {
    showCurrentPassword() {
      if(this.current_type === 'password') {
        this.current_type = 'text'
        this.current_type_text = 'hide_current_password'
      }else {
        this.current_type = 'password'
        this.current_type_text = 'show_current_password'
      }
    },

    showNewPassword() {
      if(this.new_type === 'password') {
        this.new_type = 'text'
        this.new_type_text = 'hide_new_password'
      }else {
        this.new_type = 'password'
        this.new_type_text = 'show_new_password'
      }
    },

    showConfirmPassword() {
      if(this.confirm_type === 'password') {
        this.confirm_type = 'text'
        this.confirm_type_text = 'hide_confirm_password'
      }else {
        this.confirm_type = 'password'
        this.confirm_type_text = 'show_confirm_password'
      }
    },

    getData() {
      axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
      .then((response) => {
        this.alumni = response.data.data.alumni;
      })
      .catch((e) => {
        console.log(e);
      });
    },

    // basic info part
    updateUsernameEmailModalShow(alumni) {
      this.usernameEmailInfoForm.fill(alumni);
      $("#updateUsernameEmailModal").modal("show");
    },

    updateUsernameEmail() {
      this.$Progress.start();
      this.usernameEmailInfoForm.busy = true;
      this.usernameEmailInfoForm.put(`${this.backendUrl}/alumni/` + this.usernameEmailInfoForm.id, {
        params: {
          valueFrom: this.valueFromUsernameEmailInfo,
        },
      })
      .then((response) => {
        this.getData();
        $("#updateUsernameEmailModal").modal("hide");
        if (this.usernameEmailInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Auth information updated");

          setTimeout(() => {
            store.removeAlumniLoggedInInfo()
            .then(() => {
                this.$router.push({name: 'login'})
            })
          }, 1500)
        } else {
          this.$Progress.fail();
          toast.error("Something went wrong. Try again later.");
        }
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
    },

    // password info part
    updatePasswordModalShow(alumni) {
      this.passwordInfoForm.fill(alumni);
      this.passwordInfoForm.old_password = alumni.password;
      $("#updatePasswordModal").modal("show");
    },

    updatePassword() {
      this.$Progress.start();
      this.passwordInfoForm.busy = true;
      this.passwordInfoForm.put(`${this.backendUrl}/alumni/` + this.passwordInfoForm.id, {
        params: {
          valueFrom: this.valueFromPasswordInfo,
        },
      })
      .then((response) => {
        this.getData();
        if (!response.data.data.wrongCurrentPassword) {
          $("#updatePasswordModal").modal("hide");
          if (this.passwordInfoForm.successful) {
            this.$Progress.finish();
            toast.success("Password updated");

            setTimeout(() => {
              store.removeAlumniLoggedInInfo()
              .then(() => {
                  this.$router.push({name: 'login'})
              })
            }, 1500)
          } else {
            this.$Progress.fail();
            toast.error("Something went wrong. Try again later.");
          }
        } else {
          this.$Progress.fail();
          toast.error(response.data.data.wrongCurrentPassword);
        }
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    }
  },
};
</script>

<style>
  .add-new-input-group{
    display: flex;
    align-items: center;
    padding: 0.47rem 0.75rem;
    font-size: .8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #eff2f7;
    border: 1px solid #ced4da;
  }
</style>

