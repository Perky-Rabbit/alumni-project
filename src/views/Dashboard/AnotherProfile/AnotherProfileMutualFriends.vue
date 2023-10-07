<template>
  <div id="another-profile-mutual-friends">
    <div class="row">
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2 d-flex">
                <router-link :to="{ path: 'another-profile', query: { username: `${this.$route.query.username}`, id: `${this.$route.query.id}` } }">
                    <b><i class="fa-solid fa-arrow-left"></i></b>
                </router-link>
                <h6 class="text-dark mb-0 pl-2">Mutual Friends</h6>
              </div>
            </div>
          </div>

          <div class="box-body p-3" v-for="(item,index) in mutualFriends" :class="(index + 1) < mutualFriends.length ? 'border-bottom' : '' ">
            <div class="d-flex align-items-center osahan-post-header people-list">
                <router-link :to="{ path: 'another-profile', query: { username: item.username, id: item.id } }">
                    <div class="mr-3">
                        <img v-if="item.profile_image" class="rounded-circle invitation-dropdown-list-image" :src="item.profile_image" :alt="item.id">
                        <img v-else class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                    </div>
                </router-link>

                <div class="font-weight-bold mr-2">
                    <router-link :to="{ path: 'another-profile', query: { username: item.username, id: item.id } }">
                        <div class="text-truncate">{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}</div>
                        <template v-for="experience in item.experience">
                            <p class="mb-0 text-muted" v-if="experience.is_current == 'Yes'">
                                {{ experience.designation_department }} at {{ experience.company_name }}
                            </p>
                        </template>
                    </router-link>

                    <!-- <div class="font-weight-bold small text-primary"><i class="fa fa-globe"></i> 4 mutual connections</div> -->
                </div>
                <span class="ml-auto">
                    <button type="button" class="btn btn-light btn-sm rounded-pill">Message</button>
                </span>
            </div>
          </div>
        </div>
      </main>

      <!-- <aside class="col col-xl-3 order-xl-3 col-lg-12 order-lg-3 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <h6 class="m-0">People also viewed</h6>
          </div>

          <div class="box-body p-3">
            <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
              <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" :src="profile_image_url" :alt="alumni.id">
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
                <img class="rounded-circle" :src="profile_image_url" :alt="alumni.id">
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
      </aside> -->

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

export default {
  name: "AnotherProfileMutualFriends",

  data() {
    return {
        backendUrl: import.meta.env.VITE_API_BASE_URL,
        avatar: store.$state.avatar,
        alt: store.$state.alt,
      auth_id : Cookies.get('alumniIdCookie'),
      mutualFriends: [],
    };
  },

  beforeCreate() {
    useHead({title: 'Mutual Friends | EWU'})
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      axios.post(`${this.backendUrl}/get-mutual-friends/` + this.auth_id + "/" + this.$route.query.id)
      .then((response) => {
        this.mutualFriends = response.data.data
      })
      .catch((e) => {
          console.log(e);
      });
    },
  },
};
</script>

<style>
  .invitation-dropdown-list {
    height: 4rem;
    width: 5rem;
  }
  .invitation-dropdown-list-image {
    height: 5rem;
    width: 5rem;
  }
</style>
