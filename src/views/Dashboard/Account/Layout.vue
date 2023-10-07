<template>
    <div class="row">
        <aside class="col col-xl-3 order-xl-1 col-lg-12 order-lg-1 col-12">
            <div class="box shadow-sm border rounded bg-white mb-3">
                <div class="box-title p-3">
                    <div class="d-flex align-items-center osahan-post-header people-list">
                        <div class="dropdown-list-image mr-3">
                            <img v-if="alumni.profile_image" class="rounded-circle" :src="alumni.profile_image" :alt="alumni.id">
                            <img v-else class="rounded-circle" :src="avatar" :alt="alt">
                        </div>
                        <div class="font-weight-bold">
                            <h3 class="m-0">Settings</h3>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <div class="d-flex align-items-center osahan-post-header p-3 people-list">
                        <div class="font-weight-bold">
                            <div class="text-truncate">
                                <ul class="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                                    id="menu">
                                    <!-- <li class="nav-item">
                                        <h6>
                                            <router-link :to="{name: 'account_preferences'}" class="nav-link px-sm-0 px-2">
                                                <i class="fa fa-user"></i><span
                                                    class="ms-1 d-none d-sm-inline">  Account Preferences</span>
                                            </router-link>
                                        </h6>
                                    </li> -->

                                    <li>
                                        <h6>
                                            <router-link :to="{name: 'signin_security'}" data-bs-toggle="collapse" class="nav-link px-sm-0 px-2">
                                                <i class="fa-solid fa-lock"></i><span class="ms-1 d-none d-sm-inline">  Sign in and security</span>
                                            </router-link>
                                        </h6>
                                    </li>

                                    <li>
                                        <h6>
                                            <router-link :to="{name: '2fa'}" data-bs-toggle="collapse" class="nav-link px-sm-0 px-2">
                                                <i class="fa-solid fa-lock"></i><span class="ms-1 d-none d-sm-inline"> Two-Factor Authentication </span>
                                            </router-link>
                                        </h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../../store';
const store = useStore();
import Cookies from 'js-cookie';
export default {
    name: 'Layout',

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            alumni: '',
        }
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
        },
    }
}
</script>

<style>

</style>