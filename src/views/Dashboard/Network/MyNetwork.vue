<template>
    <div id="my-network">
        <!-- Invitations part start -->
        <div class="box shadow-sm border rounded bg-white mb-3">
            <div v-if="invitationFriendRequests.length" class="d-flex box-title border-bottom p-3">
                <h5 class="m-0">Invitations</h5>
                <router-link :to="{name: 'invitation'}" v-if="invitationFriendRequests.length > 1" type="button" class="see-all btn btn-sm ml-auto mb-auto font-weight-bold">
                    See all
                </router-link>
            </div>

            <div v-else class="d-flex box-title p-3">
                <h5 class="m-0">No pending invitations</h5>
            </div>

            <div class="box-body border-bottom p-3" v-for="(item,index) in invitationFriendRequests" v-show="index < 1">
                <div class="d-flex align-items-center osahan-post-header people-list">
                    <div class="mr-3">
                        <img v-if="item.profile_image" class="rounded-circle invitation-dropdown-list-image" :src="item.profile_image" :alt="item.id">
                        <img v-else class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                    </div>

                    <div class="font-weight-bold mr-2">
                        <div class="text-truncate">{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }}</div>
                        <div class="small text-gray-500" v-for="education in item.education">
                            <div v-if="education.is_current == 'Yes'">
                                {{ education.school }}
                            </div>
                        </div>
                        <div class="font-weight-bold small text-primary"><i class="fa fa-globe"></i> 4 mutual connections</div>
                    </div>

                    <span class="ml-auto">
                        <button type="button" class="btn btn-outline-danger btn-sm rounded-pill mr-1" @click="denyFriendRequest(item)">Deny</button>
                        <button type="button" class="btn btn-light btn-sm rounded-pill" @click="acceptFriendRequest(item)">Accept</button>
                    </span>
                </div>
            </div>
        </div>

        <!-- suggestions alumni part start -->
        <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
            <h5 class="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">More suggestions for you</h5>
            <ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">People</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Groups</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Chapters</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" id="type-tab" data-toggle="tab" href="#type" role="tab" aria-controls="type" aria-selected="false">Events</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" id="class-memories-tab" data-toggle="tab" href="#class-memories" role="tab" aria-controls="class-memories" aria-selected="false">Class Memories</a>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <!-- suggestions people -->
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="p-3">
                        <div class="row">
                            <!-- <template v-for="(alumni) in alumnis">
                                <div class="col-md-3" v-if="alumni.id != auth_id"> -->
                                    <h5 v-if="alumnis.length == 0">
                                        No data found
                                    </h5>

                                    <div class="col-md-3" v-for="(alumni,index) in alumnis">
                                        <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                                            <router-link :to="{ name: 'AnotherProfile', query: { username: alumni.username, id: alumni.id } }">
                                                <div v-if="alumni.background_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + alumni.background_image + ')' }">
                                                    <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 6rem; height: 6rem;">
                                                    <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 6rem; height: 6rem;">
                                                </div>

                                                <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                                                    <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 6rem; height: 6rem;">
                                                    <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 6rem; height: 6rem;">
                                                </div>

                                                <div class="mt-5 mb-4" style="min-height: 67px;">
                                                    <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h5>
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

                <!-- suggestions group -->
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="p-3">
                        <div class="row">
                            <h5 v-if="groups.length == 0">
                                No data found
                            </h5>

                            <div class="col-md-3" v-for="(group,index) in groups">
                                <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                                    <router-link :to="{ path: 'group-view', query: { id: group.id } }">
                                        <div v-if="group.background_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + group.background_image + ')' }">
                                            <img :src="group.profile_image" class="img-fluid mt-2 rounded-circle" :alt="group.id" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                                            <img :src="group.profile_image" class="img-fluid mt-2 rounded-circle" :alt="group.id" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div class="mt-5 mb-4" style="min-height: 67px;">
                                            <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ group.name }}</h5>
                                            <p class="mb-0 text-muted">
                                                {{ group.total_member }} members
                                            </p>
                                        </div>
                                    </router-link>
                                    
                                    <div class="network-item-footer py-3 d-flex text-center">
                                        <template v-if="group.group_member && group.group_member.length">
                                            <div class="col-12 pl-3 pr-3" v-if="!search(auth_id, group.group_member)">
                                                <button type="button" class="btn btn-primary btn-sm btn-block" @click="sendGroupJoinRequest(group)">
                                                    Join
                                                </button>
                                            </div>

                                            <template v-for="group_member in group.group_member">
                                                <div class="col-12 pl-3 pr-3" v-if="group_member.alumni_id == auth_id && group_member.status == 'pending'">
                                                    <button v-if="group_member.status == 'pending'" type="button" class="btn btn-primary btn-sm btn-block" @click="cancelGroupJoinRequest(group)">
                                                        Withdrow
                                                    </button>
                                                </div>
                                            </template>
                                        </template>

                                        <template v-else>
                                            <div v-if="group.group_member.length  == 0" class="col-12 pl-3 pr-3">
                                                <button type="button" class="btn btn-primary btn-sm btn-block" @click="sendGroupJoinRequest(group)">
                                                    Join
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- suggestions chapters -->
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div class="p-3">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h5 v-if="chapters.length == 0">
                                    No data found
                                </h5>
                            </div>

                            <div class="col-md-3" v-for="(chapter,index) in chapters">
                                <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                                    <router-link :to="{ path: 'chapter-view', query: { id: chapter.chapter.id } }">
                                        <div v-if="chapter.chapter.background_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + chapter.chapter.background_image + ')' }">
                                            <img :src="chapter.chapter.profile_image" class="img-fluid mt-2 rounded-circle" :alt="chapter.chapter.id" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                                            <img :src="chapter.chapter.profile_image" class="img-fluid mt-2 rounded-circle" :alt="chapter.chapter.id" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div class="mt-5 mb-4" style="min-height: 67px;">
                                            <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ chapter.chapter.name }}</h5>
                                            <p class="mb-0 text-muted">
                                                {{ chapter.chapter.totalMember }} members
                                            </p>
                                        </div>
                                    </router-link>
                                    
                                    <div class="network-item-footer py-3 d-flex text-center">
                                        <template v-if="chapter.chapter.members && chapter.chapter.members.length">
                                            <div class="col-12 pl-3 pr-3" v-if="!search(auth_id, chapter.chapter.members)">
                                                <button type="button" class="btn btn-primary btn-sm btn-block" @click="chapterSendJoiningRequest(chapter)">
                                                    Join
                                                </button>
                                            </div>

                                            <template v-for="member in chapter.chapter.members">
                                                <div class="col-12 pl-3 pr-3" v-if="member.alumni_id == auth_id && member.status == 'pending'">
                                                    <button v-if="member.status == 'pending'" type="button" class="btn btn-primary btn-sm btn-block" @click="chapterCancelJoiningRequest(chapter)">
                                                        Withdrow
                                                    </button>
                                                </div>
                                            </template>
                                        </template>

                                        <template v-else>
                                            <div v-if="chapter.chapter.members.length  == 0" class="col-12 pl-3 pr-3">
                                                <button type="button" class="btn btn-primary btn-sm btn-block" @click="chapterSendJoiningRequest(chapter)">
                                                    Join
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- suggestions events -->
                <div class="tab-pane fade" id="type" role="tabpanel" aria-labelledby="type-tab">
                    <div class="p-3">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h5 v-if="events && events.length == 0">
                                    <strong>No data found</strong> 
                                </h5>
                            </div>

                            <div class="col-md-3" v-for="(event,index) in events">
                                <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                                    <div v-if="event.event.cover_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + event.event.cover_image + ')' }"></div>

                                    <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }"></div>

                                    <div class="mt-2 mb-2" style="min-height: 67px;">
                                        <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ event.event.name }}</h5>
                                        <div class="mb-0 text-muted">
                                            <strong>Start: </strong>
                                            <span>{{ event.event.start_date_time }}</span>
                                        </div>
                                        <div class="mb-0 text-muted">
                                            <strong>End: </strong>
                                            <span>{{ event.event.end_date_time }}</span>
                                        </div>
                                        <div class="mb-0 text-muted">
                                            <strong>Event Type: </strong>
                                            <span>{{ event.event.type }}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="network-item-footer py-3 d-flex text-center">
                                        <div class="col-12 pl-3 pr-3">
                                            <router-link :to="{ path: 'event-view', query: { id: event.event.id } }" type="button" class="btn btn-sm btn-outline-secondary btn-block rounded-pill">
                                                View
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- suggestions class memories -->
                <div class="tab-pane fade" id="class-memories" role="tabpanel" aria-labelledby="class-memories-tab">
                    <div class="p-3">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h5 v-if="classMemories && classMemories.length == 0">
                                    No data found
                                </h5>
                            </div>

                            <div class="col-md-3" v-for="(item,index) in classMemories">
                                <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                                    <router-link :to="{ name: 'classMemoriesView', query: { id: item.classMemories.id } }">
                                        <div v-if="item.classMemories.background_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + item.classMemories.background_image + ')' }">
                                            <img v-if="item.classMemories.profile_image" :src="item.classMemories.profile_image" class="img-fluid mt-2 rounded-circle" :alt="item.classMemories.id" style="width: 6rem; height: 6rem;">

                                            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                                            <img v-if="item.classMemories.profile_image" :src="item.classMemories.profile_image" class="img-fluid mt-2 rounded-circle" :alt="item.classMemories.id" style="width: 6rem; height: 6rem;">

                                            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div class="mt-5 mb-4" style="min-height: 67px;">
                                            <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ item.classMemories.name }}</h5>
                                            <p class="mb-0 text-muted">
                                                {{ item.classMemories.totalMember }} members
                                            </p>
                                        </div>
                                    </router-link>
                                    
                                    <div class="network-item-footer py-3 d-flex text-center">
                                        <div class="col-12 pl-3 pr-3">
                                            <router-link :to="{ name: 'classMemoriesView', query: { id: item.classMemories.id } }" type="button" class="btn btn-sm btn-outline-secondary btn-block rounded-pill">
                                                View
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- following alumni part start -->
        <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
            <h5 class="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">More suggestions following for you</h5>
            <!-- <ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="follow-people-tab" data-toggle="tab" href="#follow-people" role="tab" aria-controls="follow-people" aria-selected="true">People</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="group-tab" data-toggle="tab" href="#group" role="tab" aria-controls="group" aria-selected="false">Groups</a>
                </li>
            </ul> -->

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="follow-people" role="tabpanel" aria-labelledby="follow-people-tab">
                    <div class="p-3">
                        <div class="row">
                            <h5 v-if="followingAlumnis.length == 0">
                                No data found
                            </h5>

                            <div class="col-md-3" v-for="(alumni,index) in followingAlumnis">
                                <div class="box mb-3 shadow-sm rounded bg-white profile-box text-center">
                                    <router-link :to="{ path: 'another-profile', query: { username: alumni.username, id: alumni.id } }">
                                        <div v-if="alumni.background_image" class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + alumni.background_image + ')' }">
                                            <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 6rem; height: 6rem;">
                                            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div v-else class="border-bottom rounded-top" style="height:4rem;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
                                            <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 6rem; height: 6rem;">
                                            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 6rem; height: 6rem;">
                                        </div>

                                        <div class="mt-5 mb-4" style="min-height: 67px;">
                                            <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h5>
                                            <p class="mb-0 text-muted">
                                                {{ alumni.designation_department }} at {{ alumni.organization }}
                                            </p>
                                        </div>
                                    </router-link>

                                    <!-- <span class="font-weight-bold small text-primary mt-4">4 mutual connections</span> -->
                                    
                                    <div class="network-item-footer py-3 d-flex text-center">
                                        <div class="col-12 pl-3 pr-3">
                                            <button type="button" class="btn btn-secondary btn-sm btn-block" @click="follow(alumni)">
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="tab-pane fade" id="group" role="tabpanel" aria-labelledby="group-tab">
                    <div class="p-3 w-100">
                        <h6>following group</h6>
                    </div>
                </div> -->
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
            groups: [],
            chapters: [],
            events: [],
            classMemories: [],
        };
    },

    beforeCreate() {
        useHead({title: 'My Network | EWU'})
    },

    mounted() {
        this.getData();
    },

    methods: {
        search(nameKey, myArray){
            for (let i=0; i < myArray.length; i++) {
                if (myArray[i].alumni_id == nameKey) {
                    return myArray[i];
                }
            }
        },

        getData() {
            // invitation friend requests list response
            axios.post(`${this.backendUrl}/get-invitation-friend-requests`, { auth_id: this.auth_id })
            .then((response) => {
                this.invitationFriendRequests = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            // suggestion alumni list response
            axios.get(`${this.backendUrl}/get-suggestion-alumnis`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.alumnis = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // suggestion group list response
            axios.get(`${this.backendUrl}/get-suggestion-groups`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.groups = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // suggestion chapter list response
            axios.get(`${this.backendUrl}/chapter-suggestion-list`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.chapters = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // suggestion event list response
            axios.get(`${this.backendUrl}/event-suggestion-list`,{ params: { auth_id:this.auth_id } })
            .then((response) => {
                this.events = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // suggestion class memories list response
            axios.get(`${this.backendUrl}/class-memories-suggestion-list`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.classMemories = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });

            // suggestion following alumni list response
            axios.get(`${this.backendUrl}/get-suggestion-following-alumnis`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.followingAlumnis = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // friendship code start
        sendFriendRequest(alumni) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/send-friend-request/` + alumni.id, {auth_id: this.auth_id})
            .then((response) => {
                this.getData();
                emitter.emit("toggle-sidebar");
                this.$Progress.finish();

                axios.post(`${this.backendUrl}/friend-request-notification/` + alumni.id, {
                    redirect_url: 'invitation',
                    sender_id: this.auth_id,
                })
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
                this.getData();
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
                        this.getData();
                        emitter.emit("toggle-sidebar");
                    });
                }
            });
        },
        // friendship code end

        // group code start
        sendGroupJoinRequest(group) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/send-group-join-request/` + group.id, {auth_id: this.auth_id})
            .then((response) => {
                this.getData();
                this.$Progress.finish();
                toast.success(response.data.message);
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        cancelGroupJoinRequest(group) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to cancel the request?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/cancel-group-join-request/` + group.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },
        // group code end

        // chapter code start
        chapterSendJoiningRequest(chapter) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/chapter-send-joining-request/` + chapter.chapter.id, {auth_id: this.auth_id})
            .then((response) => {
                this.getData();
                this.$Progress.finish();
                toast.success(response.data.message);
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        chapterCancelJoiningRequest(chapter) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to cancel the request?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/chapter-cancel-joining-request/` + chapter.chapter.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },
        // chapter code end

        // following code start
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
                        this.getData();
                    });
                }
            });
        },
        // following code end
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