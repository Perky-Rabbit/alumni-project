<template>
  <div id="skill">
    <div class="row">
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div v-if="alumni.skills && alumni.skills.length" class="d-flex box-title border-bottom p-3">
            <router-link :to="{ name: 'profile' }"><b><i class="fa-solid fa-arrow-left"></i></b></router-link>
            <h6 class="m-0 pl-2">Skills</h6>

            <div class="img-fluid ml-auto mb-auto">
              <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="updateSkillInfoModalShow(alumni)">
                <i class="fa fa-add"></i>
              </button>
            </div>
          </div>

          <div v-else class="d-flex box-title p-3">
            <router-link :to="{ name: 'profile' }"><b><i class="fa-solid fa-arrow-left"></i></b></router-link>
            <h6 class="m-0 pl-2">Skills</h6>

            <div class="img-fluid ml-auto mb-auto">
              <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="updateSkillInfoModalShow(alumni)">
                <i class="fa fa-add"></i>
              </button>
            </div>
          </div>

          <div class="box-body p-3" v-for="(item,index) in alumni.skills" :class="(index + 1) < alumni.skills.length ? 'border-bottom' : '' ">
            <div class="d-flex align-items-top job-item-header">
              <h5 class="font-weight-bold text-dark mb-0">{{ item.title }}</h5>
              <button type="button" class="btn btn-sm btn-outline-danger ml-auto mb-auto rounded-circle" @click="destroySkillInfo(alumni,item)">
                <i class="fa-light fa fa-trash"></i>
              </button>
            </div>
            <div class="text-muted underline-on-hover" style="font-size: 14px;" @click="endorserListModalShow(item)">{{ item.endorsement_count }} endorsments</div>
            <small class="text-muted">{{ item.description }}</small>
          </div>
        </div>
      </main>

      <aside class="col col-xl-3 order-xl-3 col-lg-12 order-lg-3 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <h6 class="m-0">People also viewed</h6>
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

      <!-- Skill Info Modal part -->
      <div class="modal fade" id="updateSkillInfoModal" tabindex="-1" role="dialog" aria-labelledby="updateSkillInfoModalLabel" aria-hidden="true">
        <form @submit.prevent="updateSkillInfo()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="updateSkillInfoModalLabel">Add Skill</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <label for="skill_ids" class="mb-0">Skill</label>
                <div class="form-group d-flex">
                  <Multiselect
                    v-model="skillInfoForm.skill_ids"
                    mode="tags"
                    placeholder="Select skills"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="false"
                    :options="dependentSkills"
                  />

                  <button type="button" class="add-new-input-group text-secondary" @click="createGlobalSkillModalShow()">
                    <i class="fa fa-plus-circle"></i>
                  </button>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="skillInfoForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="modal fade" id="createGlobalSkillModal" tabindex="-1" role="dialog" aria-labelledby="createGlobalSkillModalLabel" aria-hidden="true">
        <form @submit.prevent="createGlobalSkill()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="createGlobalSkillModalLabel">Create Skill</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label for="title" class="mb-0">Title</label>
                  <input v-model="globalSkillForm.title" type="text" name="title" class="form-control" placeholder="Add title">
                </div>

                <div class="form-group">
                    <label for="description" class="mb-0">Description</label>
                    <textarea v-model="globalSkillForm.description" class="form-control" rows="3"
                  cols="50" name="description" placeholder="Enter description ..."></textarea>
                </div>

                <div class="form-group">
                    <label for="status" class="mb-0">Status</label>
                    <select v-model="globalSkillForm.status" class="form-select form-control">
                      <option value="">Please Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="globalSkillForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- endorser list modal -->
      <div class="modal fade" id="endorserListModal" tabindex="-1" role="dialog" aria-labelledby="endorserListModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="endorserListModalLabel">Endorsements</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <template v-if="endorsers && endorsers.length">
                  <div class="box-body p-3" v-for="(item,index) in endorsers" v-bind:class="(index + 1) < endorsers.length ? 'border-bottom' : '' ">
                    <div class="d-flex align-items-center osahan-post-header people-list">
                      <!-- <router-link :to="{ path: 'another-profile', query: { username: item.user.username, id: item.user.id } }"> -->
                        <div v-if="item.user.alumni" class="mr-3">
                          <img class="rounded-circle invitation-dropdown-list-image" :src="item.user.alumni.source" :alt="item.id">
                        </div>
                        <div v-else class="mr-3">
                          <img class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                        </div>
                      <!-- </router-link> -->

                      <div class="font-weight-bold mr-2">
                        <div class="text-truncate">{{ item.user.first_name }} {{ item.user.middle_name }} {{ item.user.last_name }}</div>
                        <div class="small text-gray-500">
                            {{ item.user.designation_department }} at {{ item.user.organization }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <div v-else class="text-center">
                  <h5>No endroser found</h5>
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
import { useStore } from '../../../store';
const store = useStore();
import Cookies from 'js-cookie';
import { useToast } from "vue-toastification";
const toast = useToast();
import { useHead } from '@vueuse/head';
import Form from "vform";
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";

import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
  name: "Skill",
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
      auth_id: Cookies.get('alumniIdCookie'),
      alumni: '',
      dependentSkills: [],
      endorsers: [],

      // skill info part
      globalSkillForm: new Form({
        id: "",
        title: "",
        description: "",
        status: "",
      }),

      valueFromSkillInfo: "skill_info",
      skillInfoForm: new Form({
        id: "",
        skill_ids: [],
      }),
    };
  },

  beforeCreate() {
    useHead({title: 'Skills | EWU'})
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

      // skills response
      axios.get(`${this.backendUrl}/skill`, { params: {auth_id : this.auth_id} })
      .then((response) => {
        let data =  response.data.data.map((item) => {
          return { value: item.id, label: item.title }
        })
        this.dependentSkills = data;
      })
      .catch((e) => {
        this.$Progress.fail();
      });
    },

    // skill info part
    createGlobalSkillModalShow() {
      $("#createGlobalSkillModal").modal("show");
    },

    createGlobalSkill() {
      this.$Progress.start()
      this.globalSkillForm.busy = true
      this.globalSkillForm.post(`${this.backendUrl}/skill`)
      .then(response => {
        this.getData()
        $('#createGlobalSkillModal').modal('hide')
        if(this.globalSkillForm.successful){
          this.$Progress.finish();
          toast.success("Skill Added");
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

    updateSkillInfoModalShow(alumni) {
      this.skillInfoForm.fill(alumni);
      $("#updateSkillInfoModal").modal("show");
    },

    updateSkillInfo() {
      this.$Progress.start();
      this.skillInfoForm.busy = true;
      this.skillInfoForm.put(`${this.backendUrl}/alumni/` + this.auth_id, {
        params: {
          valueFrom: this.valueFromSkillInfo
        } 
      })
      .then((response) => {
        this.getData();
        $("#updateSkillInfoModal").modal("hide");
        if (this.skillInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Skill info updated");
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

    destroySkillInfo(alumni, item) {
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
                valueFrom: this.valueFromSkillInfo,
                skill_id: item.id
              }
            })
            .then((response) => {
              this.$swal.fire("Deleted!", response.data.message, "success");
              this.getData();
            });
          }
        });
    },

    endorserListModalShow(item){
      this.endorsers = item.endorsers;
      $("#endorserListModal").modal("show");
    },
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
