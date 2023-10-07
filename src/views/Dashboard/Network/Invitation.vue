<template>
  <div id="my-network">
    <!-- Invitations -->
    <div class="box shadow-sm border rounded bg-white mb-3">
        <div v-if="invitationFriendRequests.length" class="d-flex box-title border-bottom p-3">
            <h5 class="m-0">Invitations</h5>
        </div>
        <div v-else class="d-flex box-title p-3">
            <h5 class="m-0">No pending invitations</h5>
        </div>

        <div class="box-body p-3" v-for="(item,index) in invitationFriendRequests" :class="(index + 1) < invitationFriendRequests.length ? 'border-bottom' : '' ">
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
                        <div class="small text-gray-500">
                            {{ item.designation_department }} at {{ item.organization }}
                        </div>
                    </router-link>

                    <!-- <div class="font-weight-bold small text-primary"><i class="fa fa-globe"></i> 4 mutual connections</div> -->
                </div>
                <span class="ml-auto">
                    <button type="button" class="btn btn-outline-danger btn-sm rounded-pill mr-1" @click="denyFriendRequest(item)">Deny</button>
                    <button type="button" class="btn btn-light btn-sm rounded-pill" @click="acceptFriendRequest(item)">Accept</button>
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
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    name: "Invitation",

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id : Cookies.get('alumniIdCookie'),
            invitationFriendRequests: [],
        };
    },

    beforeCreate() {
        useHead({title: 'Invitations | EWU'})
    },

    mounted() {
        this.getInvitationFriendRequests();
    },

    methods: {
        // accept friend request method
        acceptFriendRequest(alumni) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/accept-friend-request/` + alumni.id, {auth_id: this.auth_id})
            .then((response) => {
                this.getInvitationFriendRequests();
                emitter.emit("toggle-sidebar");
                this.$Progress.finish();

                axios.post(`${this.backendUrl}/friend-request-accept-notification/` + alumni.id, {
                    redirect_url: 'connection',
                    sender_id: this.auth_id
                })
                toast.success(response.data.message);
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // deny friend request method
        denyFriendRequest(alumni) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to deny the request?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/deny-friend-request/` + alumni.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.$swal.fire("Success", response.data.message, "success");
                        this.getInvitationFriendRequests();
                        emitter.emit("toggle-sidebar");
                    });
                }
            });
        },

        // invitation friend request list
        getInvitationFriendRequests() {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/get-invitation-friend-requests`, { auth_id: this.auth_id })
            .then((response) => {
                this.$Progress.finish();
                this.invitationFriendRequests = response.data.data
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
    .invitation-dropdown-list {
        height: 4rem;
        width: 5rem;
    }
    .invitation-dropdown-list-image {
        height: 5rem;
        width: 5rem;
    }
</style>