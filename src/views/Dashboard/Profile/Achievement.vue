<template>
  <div id="profile">
    <div class="row">
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div v-if="alumni.achievements && alumni.achievements.length" class="d-flex box-title border-bottom p-3">
            <router-link :to="{ name: 'profile' }"><b><i class="fa-solid fa-arrow-left"></i></b></router-link>
            <h6 class="m-0 pl-2">Achievements</h6>

            <div class="img-fluid ml-auto mb-auto">
              <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="updateAchievementInfoModalShow(alumni)">
                <i class="fa fa-add"></i>
              </button>
            </div>
          </div>

          <div v-else class="d-flex box-title p-3">
            <router-link :to="{ name: 'profile' }"><b><i class="fa-solid fa-arrow-left"></i></b></router-link>
            <h6 class="m-0 pl-2">Achievements</h6>

            <div class="img-fluid ml-auto mb-auto">
              <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="updateAchievementInfoModalShow(alumni)">
                <i class="fa fa-add"></i>
              </button>
            </div>
          </div>

          <div class="box-body p-3" v-for="(achievement,index) in alumni.achievements" :class="(index + 1) < alumni.achievements.length ? 'border-bottom' : '' ">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ achievement.title }}</h6>
                <div class="text-truncate text-primary">{{ achievement.field }}</div>
                <div class="small text-gray-500">{{ achievement.achievement_date }}</div>
              </div>
              <button type="button" class="btn btn-sm btn-outline-danger ml-auto mb-auto rounded-circle" @click="destroyAchievementInfo(alumni,achievement)">
                <i class="fa-light fa fa-trash"></i>
              </button>
            </div>
            <p class="mb-0">{{ achievement.description }}</p>
          </div>
        </div>
      </main>

      <!-- start right side part -->
      <aside class="col col-xl-3 order-xl-3 col-lg-12 order-lg-3 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <h6 class="m-0">People you may know</h6>
          </div>

          <div class="box-body p-3">
            <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
              <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" :src="avatar" :alt="alt">
                <div class="status-indicator bg-success"></div>
              </div>
              <div class="font-weight-bold mr-2">
                <div class="text-truncate">Shohel Rana</div>
                <div class="small text-gray-500">East West University
                </div>
              </div>
              <span class="ml-auto"><button type="button" class="btn btn-light btn-sm">Connent</button>
              </span>
            </div>

            <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
              <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" :src="avatar" :alt="alt">
                <div class="status-indicator bg-success"></div>
              </div>
              <div class="font-weight-bold mr-2">
                <div class="text-truncate">Shohel Rana</div>
                <div class="small text-gray-500">East West University
                </div>
              </div>
              <span class="ml-auto"><button type="button" class="btn btn-light btn-sm">Connent</button>
              </span>
            </div>
          </div>
        </div>
      </aside>

      <!-- achievement info modal part -->
      <div class="modal fade" id="updateAchievementInfoModal" tabindex="-1" role="dialog" aria-labelledby="updateAchievementInfoModalLabel" aria-hidden="true">
        <form @submit.prevent="updateAchievementInfo()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="updateAchievementInfoModalLabel">Add Achievement</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <label for="achievement_ids" class="mb-0">Achievement</label>
                <div class="form-group d-flex">
                  <Multiselect
                    v-model="achievementInfoForm.achievement_ids"
                    mode="tags"
                    placeholder="Select Achievements"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="false"
                    :options="dependentAchievements"
                  />

                  <button type="button" class="add-new-input-group text-secondary" @click="createGlobalAchievementModalShow()">
                      <i class="fa fa-plus-circle"></i>
                    </button>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="achievementInfoForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="modal fade" id="createGlobalAchievementModal" tabindex="-1" role="dialog" aria-labelledby="createGlobalAchievementModalLabel" aria-hidden="true">
        <form @submit.prevent="createGlobalAchievement()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="createGlobalAchievementModalLabel">Create Achievement</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label for="title" class="mb-0">Title</label>
                  <input v-model="globalAchievementForm.title" type="text" name="title" class="form-control" placeholder="Add title">
                </div>

                <div class="form-group">
                  <label for="field" class="mb-0">Field</label>
                  <input v-model="globalAchievementForm.field" type="text" name="field" class="form-control" placeholder="Add achievemnet field">
                </div>

                <div class="form-group">
                    <label for="description" class="mb-0">Description</label>
                    <textarea v-model="globalAchievementForm.description" class="form-control" rows="3"
                  cols="50" name="description" placeholder="Enter description ..."></textarea>
                </div>

                <div class="form-group">
                  <label for="achievement_date" class="mb-0">Achievement Date</label>
                  <input v-model="globalAchievementForm.achievement_date" type="date" name="achievement_date" class="form-control" placeholder="Ex: 12-12-1970">
                </div>

                <div class="form-group">
                    <label for="status" class="mb-0">Status</label>
                    <select v-model="globalAchievementForm.status" class="form-select form-control">
                      <option value="">Please Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="globalAchievementForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <vue-progress-bar></vue-progress-bar>
    </div>
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
import Multiselect from '@vueform/multiselect';
import "@vueform/multiselect/themes/default.css";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "Profile",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
    Multiselect
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      backgroud_image: store.$state.backgroud_image,
      auth_id: Cookies.get('alumniIdCookie'),
      alumni: '',
      dependentAchievements: [],

      // achievement info part
      globalAchievementForm: new Form({
        id: "",
        title: "",
        field: "",
        description: "",
        achievement_date: "",
        status: "",
      }),

      valueFromAchievementInfo: "achievement_info",
      achievementInfoForm: new Form({
        id: "",
        achievement_ids: [],
      }),
    };
  },

  beforeCreate() {
    useHead({title: 'Achievements | EWU'})
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      // alumni response
      axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
      .then((response) => {
        this.alumni = response.data.data.alumni;
      })
      .catch((e) => {
        console.log(e);
      });

      // achievements response
      axios.get(`${this.backendUrl}/achievement`, {
        params: {
          auth_id : this.auth_id,
        }
      })
      .then((response) => {
        let data =  response.data.data.map((item) => {
          return { value: item.id, label: item.title }
        })
        this.dependentAchievements = data;
      })
      .catch((e) => {
        this.$Progress.fail();
      });
    },

    // achievement info part
    createGlobalAchievementModalShow() {
      $("#createGlobalAchievementModal").modal("show");
    },

    createGlobalAchievement() {
      this.$Progress.start()
      this.globalAchievementForm.busy = true
      this.globalAchievementForm.post(`${this.backendUrl}/achievement`)
      .then(response => {
        this.getData()
        $('#createGlobalAchievementModal').modal('hide')
        if(this.globalAchievementForm.successful){
          this.$Progress.finish();
          toast.success("Achievement Added");
        }else{
          this.$Progress.fail();
          toast.error("Something went wrong. Try again later.");
        }
      })
      .catch(e => {
        this.$Progress.fail()
        console.log(e)
      })
    },
    
    updateAchievementInfoModalShow(alumni) {
      this.achievementInfoForm.fill(alumni);
      $("#updateAchievementInfoModal").modal("show");
    },

    updateAchievementInfo() {
      this.$Progress.start();
      this.achievementInfoForm.busy = true;
      this.achievementInfoForm.put(`${this.backendUrl}/alumni/` + this.auth_id, {
        params: {
          valueFrom: this.valueFromAchievementInfo,
        },
      })
      .then((response) => {
        this.getData();
        $("#updateAchievementInfoModal").modal("hide");
        if (this.achievementInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Achievement info updated");
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

    destroyAchievementInfo(alumni, achievement) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${this.backendUrl}/alumni/` + alumni.id, {
              params: {
                valueFrom: this.valueFromAchievementInfo,
                achievement_id: achievement.id
              }
            })
            .then((response) => {
              this.$swal.fire("Deleted!", response.data.message, "success");
              this.getData();
            });
          }
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
