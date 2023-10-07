<template>
  <div id="connection">
    <div class="box shadow-sm border rounded bg-white mb-3">
        <div v-if="connectionFriends.length" class="d-flex box-title border-bottom p-3">
            <h5 class="m-0">All Connections</h5>
        </div>
        <div v-else class="d-flex box-title p-3">
            <h5 class="m-0">No Connections</h5>
        </div>

        <div class="box-body p-3" v-for="(item,index) in connectionFriends" :class="(index + 1) < connectionFriends.length ? 'border-bottom' : '' ">
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
                    </router-link>
                    
                    <div class="small text-gray-500">
                        {{ item.designation_department }} at {{ item.organization }}
                    </div>
                </div>
                
                <span class="ml-auto">
                    <!-- <button type="button" class="btn btn-light btn-sm rounded-pill mr-1">Message</button> -->
                    <button type="button" class="btn btn-outline-danger btn-sm rounded-pill" @click="unfriend(item)">Remove Connection</button>
                </span>
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
import emitter from "../../../emitter/index.js";

export default {
    name: "Connection",

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id : Cookies.get('alumniIdCookie'),
            connectionFriends: [],
        };
    },

    beforeCreate() {
        useHead({title: 'Connections| EWU'})
    },

    mounted() {
        this.getConnectionFriends();
    },

    methods: {
        // get connection friend response
        getConnectionFriends() {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/get-connection-friends`, { auth_id: this.auth_id })
            .then((response) => {
                this.$Progress.finish();
                this.connectionFriends = response.data.data
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // unfriend connection
        unfriend(alumni) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: `Are you sure you want to remove ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name } ✪ as a connection? Don’t worry, ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name } won’t be notified by Alumni Portal.`,
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/unfriend/` + alumni.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.$swal.fire("Success", response.data.message, "success");
                        this.getConnectionFriends();
                        emitter.emit("toggle-sidebar");
                    });
                }
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