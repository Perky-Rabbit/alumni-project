<template>
  <div id="another-profile-skill">
    <div class="row">
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2 d-flex">
                <router-link :to="{ path: 'another-profile', query: { username: alumni.username, id: alumni.id } }">
                    <b><i class="fa-solid fa-arrow-left"></i></b>
                </router-link>
                <h6 class="text-dark mb-0 pl-2">Skills</h6>
              </div>
            </div>
          </div>

          <div class="box-body p-3" v-for="(item,index) in alumni.skills" :class="(index + 1) < alumni.skills.length ? 'border-bottom' : '' ">
            <div class="d-flex align-items-top job-item-header">
              <h5 class="font-weight-bold text-dark mb-0">{{ item.title }}</h5>
            </div>
            <div class="text-muted underline-on-hover" style="font-size: 14px;" @click="endorserListModalShow(item)">{{ item.endorsement_count }} endorsments</div>

            <div class="mt-1 mb-2">
              <button v-if="!search(this.$route.query.id, auth_id, 'App\\Models\\Skill', item.id, endorsements)" type="button" class="btn btn-sm btn-outline-secondary rounded-pill" @click="addEndorsement(item)">
                Endorse
              </button>
              <button v-else type="button" class="btn btn-sm btn-outline-secondary rounded-pill" @click="cancelEndorsement(item)">
                <i class="fa fa-check"></i> Endorsed
              </button>
            </div>

            <small class="text-muted">{{ item.description }}</small>
          </div>
        </div>
      </main>

      <!-- start right side part -->
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
import { useHead } from '@vueuse/head';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "AnotherProfileSkills",

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      auth_id : Cookies.get('alumniIdCookie'),
      alumni: '',

      endorsements: [],
      endorsers: [],
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    search(user_id, endorser_id, activity_type, activity_id, arr){
      for (let i=0; i < arr.length; i++) {
        if (arr[i].user_id == user_id && arr[i].endorser_id == endorser_id && arr[i].activity_type == activity_type && arr[i].activity_id == activity_id) {
          return arr[i];
        }
      }
    },

    getData() {
      axios.get(`${this.backendUrl}/alumni/${this.$route.query.id}`)
      .then((response) => {
        this.alumni = response.data.data.alumni;
        useHead({title: this.alumni.first_name +' - Skills | EWU'})
      })
      .catch((e) => {
        console.log(e);
      });

      axios.get(`${this.backendUrl}/endorsement-list`, { params: { user_id: this.$route.query.id } })
      .then((response) => {
        this.endorsements = response.data.endorsements;
      })
      .catch((e) => {
          console.log(e);
      });
    },

    addEndorsement(item) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/add-endorsement`, {
        user_id: this.$route.query.id,
        endorser_id: this.auth_id,
        activity_type: 'App\\Models\\Skill',
        activity_id: item.id,
      })
      .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    cancelEndorsement(item) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/cancel-endorsement`, {
        user_id: this.$route.query.id,
        endorser_id: this.auth_id,
        activity_type: 'App\\Models\\Skill',
        activity_id: item.id,
      })
      .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
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
  
</style>
