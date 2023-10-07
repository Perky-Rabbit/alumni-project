<template>
  <div id="another-profile-achievement">
    <div class="row">
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2 d-flex">
                <router-link :to="{ path: 'another-profile', query: { username: alumni.username, id: alumni.id } }">
                    <b><i class="fa-solid fa-arrow-left"></i></b>
                </router-link>
                <h6 class="text-dark mb-0 pl-2">Achievements</h6>
              </div>
            </div>
          </div>

          <div class="box-body p-3" v-for="(achievement,index) in alumni.achievements" :class="(index + 1) < alumni.achievements.length ? 'border-bottom' : '' ">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ achievement.title }}</h6>
                <div class="text-truncate text-primary">{{ achievement.field }}</div>
                <div class="small text-gray-500">{{ achievement.achievement_date }}</div>
              </div>
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

      <vue-progress-bar></vue-progress-bar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../../store';
const store = useStore();
import { useHead } from '@vueuse/head';

export default {
  name: "AnotherProfileAchievements",

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      alumni: '',
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      axios.get(`${this.backendUrl}/alumni/${this.$route.query.id}`)
      .then((response) => {
        this.alumni = response.data.data.alumni;
        useHead({title: this.alumni.first_name +' - Achievements | EWU'})
      })
      .catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style>
  
</style>
