<template>
    <div id="my-network">
        <!-- suggestions -->
        <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
            <h5 class="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">More Members for you</h5>
            <div class="p-3">
                <div class="row">
                    <h5 v-if="alumnis.length == 0">
                        No data found
                    </h5>

                    <div class="col-md-2" v-for="(alumni,index) in alumnis">
                        <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                            <router-link :to="{ path: 'another-profile', query: { username: alumni.username, id: alumni.id } }">
                                <div v-if="alumni.background_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + alumni.background_image + ')' }">
                                    <img :src="alumni.alumni.source" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 6rem; height: 6rem;">
                                </div>

                                <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                                    <img :src="alumni.alumni.source" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 5rem; height: 5rem;">
                                </div>

                                <div class="mt-5 mb-4" style="min-height: 67px;">
                                    <h6 class="font-weight-bold text-dark mb-1 mt-4">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h6>
                                    <p class="mb-0 text-muted">
                                        {{ alumni.designation_department }} at {{ alumni.organization }}
                                    </p>
                                </div>
                            </router-link>

                            <!-- <span class="font-weight-bold small text-primary mt-4">4 mutual connections</span> -->

                            <div class="network-item-footer py-3 d-flex text-center">
                                <div class="col-12 pl-3 pr-3">
                                    <button type="button" class="btn btn-primary btn-sm btn-block" @click="sendFriendRequest(alumni)">
                                        Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- </div>
                </template> -->
                </div>
            </div>
        </div>

        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
    import axios from "axios";
    import Cookies from 'js-cookie';
    import emitter from "../../../emitter/index.js";
    import { useToast } from "vue-toastification";
    const toast = useToast();

    export default {
        name: "MyNetwork",

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                avatar: store.$state.avatar,
                alt: store.$state.alt,
                backgroud_image: store.$state.backgroud_image,
                auth_id : Cookies.get('alumniIdCookie'),
                alumnis: [],
                invitationFriendRequests: [],
                followingAlumnis: [],
            };
        },

        mounted() {
            this.alumnis = JSON.parse(localStorage.getItem('allMembers'));
            this.getSuggestionAlumnis();
            this.getSuggestionFollowingAlumnis();
            this.getInvitationFriendRequests();
        },

        methods: {
            sendFriendRequest(alumni) {
                this.$Progress.start();
                axios.post(`${this.backendUrl}/send-friend-request/` + alumni.id, {auth_id: this.auth_id})
                .then((response) => {
                    this.getSuggestionAlumnis();
                    emitter.emit("toggle-sidebar");
                    this.$Progress.finish();
                    toast.success(response.data.message);
                })
                .catch((e) => {
                    this.$Progress.fail();
                    console.log(e);
                });
            },

            acceptFriendRequest(alumni) {
                this.$Progress.start();
                axios.post(`${this.backendUrl}/accept-friend-request/` + alumni.id, {auth_id: this.auth_id})
                .then((response) => {
                    this.getInvitationFriendRequests();
                    emitter.emit("toggle-sidebar");
                    this.$Progress.finish();
                    toast.success(response.data.message);
                })
                .catch((e) => {
                    this.$Progress.fail();
                    console.log(e);
                });
            },

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

            getSuggestionAlumnis() {
                axios.get(`${this.backendUrl}/get-suggestion-alumnis`, { params: { auth_id:this.auth_id } })
                .then((response) => {
                    // this.alumnis = response.data.data;
                })
                .catch((e) => {
                    this.$Progress.fail();
                });
            },

            getSuggestionFollowingAlumnis() {
                axios.get(`${this.backendUrl}/get-suggestion-following-alumnis`,
                {
                    params: {auth_id:this.auth_id}
                })
                .then((response) => {
                    this.followingAlumnis = response.data.data;
                })
                .catch((e) => {
                    this.$Progress.fail();
                });
            },

            follow(alumni) {
                this.$swal
                    .fire({
                        title: "Are you sure?",
                        text: `Are you sure you want to follow ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name }.`,
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonColor: "#d33",
                        cancelButtonText: "NO",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Yes",
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            axios.post(`${this.backendUrl}/follow/` + alumni.id, {auth_id: this.auth_id})
                            .then((response) => {
                                this.$swal.fire("Success", response.data.message, "success");
                                this.getSuggestionFollowingAlumnis();
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

    .see-all:hover {
        background-color: #c5c6c8;
        transition: 0.7s;
    }
</style>