<template>
    <div class="row">
        <aside class="col col-xl-3 order-xl-2 col-lg-12 order-lg-2 col-12">
            <div class="box mb-3 shadow-sm rounded bg-white list-sidebar">
                <div class="box-title p-3">
                    <h6 class="m-0">Manage my network</h6>
                </div>
                <ul class="list-group list-group-flush">
                    <router-link :to="{name: 'connection'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-users mr-2 text-dark"></i> Connections <span class="ml-auto font-weight-bold">{{ totalFriends }}</span></li>
                    </router-link>

                    <router-link :to="{name: 'pendingFriendRrequest'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-users mr-2 text-dark"></i> Pending Request <span class="ml-auto font-weight-bold">{{ totalPendingFriendRequest }}</span></li>
                    </router-link>

                    <router-link :to="{name: 'invitation'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-users mr-2 text-dark"></i> Friend Request <span class="ml-auto font-weight-bold">{{ totalInvitation }}</span></li>
                    </router-link>

                    <router-link :to="{name: 'invite_others'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-users mr-2 text-dark"></i> Invite Others <span class="ml-auto font-weight-bold">{{ totalInvitation }}</span></li>
                    </router-link>

                    <router-link :to="{name: 'blockList'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-users mr-2 text-dark"></i> Block List <span class="ml-auto font-weight-bold">{{ totalBlockList }}</span></li>
                    </router-link>

                    <!-- <a href="#">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-book mr-2 text-dark"></i> Contacts <span class="ml-auto font-weight-bold">0</span></li>
                    </a> -->

                    <router-link :to="{name: 'followingFollowers'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-user-check mr-2 text-dark"></i> Following & Followers</li>
                    </router-link>

                    <router-link :to="{name: 'group'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-user-check mr-2 text-dark"></i>Groups</li>
                    </router-link>

                    <router-link :to="{name: 'classMemories'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-user-check mr-2 text-dark"></i>Class/Group Memories</li>
                    </router-link>

                    <router-link :to="{name: 'chapter'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-clipboard mr-2 text-dark"></i> Chapter</li>
                    </router-link>

                    <router-link :to="{name: 'event'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-clipboard mr-2 text-dark"></i> Event</li>
                    </router-link>

                    <router-link :to="{name: 'fund-event'}">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-clipboard mr-2 text-dark"></i> Fund-Event</li>
                    </router-link>
                    
                    <!-- <a href="#">
                        <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-tag mr-2 text-dark"></i> Hashtag <span class="ml-auto font-weight-bold">0</span></li>
                    </a> -->
                </ul>
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
import emitter from "../../../emitter/index.js";

export default {
    name: "Layout",

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            totalFriends: '',
            totalPendingFriendRequest: '',
            totalInvitation: '',
            totalBlockList: '',
        };
    },

    mounted() {
        this.countTotal();
        emitter.on("toggle-sidebar", () => {
            this.countTotal();
        });
    },

    // created() {
    //     emitter.on("toggle-sidebar", () => {
    //         this.countTotal();
    //     });
    // },

    methods: {
        countTotal() {
            // all friends count
            axios.get(`${this.backendUrl}/total-friends-count`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.totalFriends = response.data.data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });

            // all pending friends count
            axios.get(`${this.backendUrl}/total-pending-friend-request-count`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.totalPendingFriendRequest = response.data.data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });

            // all invitations count
            axios.get(`${this.backendUrl}/total-invitation-count`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.totalInvitation = response.data.data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });

            // all block list count
            axios.get(`${this.backendUrl}/total-block-list-count`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.totalBlockList = response.data.data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });
        },
    },
};
</script>

<style>

</style>