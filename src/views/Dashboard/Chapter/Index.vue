<template>
    <div id="profile">
        <div class="row">
            <!-- Main Content -->
            <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                <div class="bg-white mb-3">
                    <div v-if="chapter.background_image" class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{ backgroundImage: 'url(' + chapter.background_image + ')' }">
                        <img v-if="chapter.profile_image" :src="chapter.profile_image" class="img-fluid mt-2 rounded-circle" :alt="chapter.id" style="width: 150px; height: 150px" />
                        <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                    </div>

                    <div v-else class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{backgroundImage: 'url(' + backgroud_image + ')'}">
                        <img v-if="chapter.profile_image" :src="chapter.profile_image" class="img-fluid mt-2 rounded-circle" :alt="chapter.id" style="width: 150px; height: 150px" />
                        <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px" />
                    </div>

                    <!-- <div class="col-12 p-3">
                        <span class="ml-auto small float-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm bg-light rounded-circle button-hover"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">
                                        <i class="feather-edit"></i> report
                                    </button>
                                </div>
                            </div>
                        </span>
                    </div> -->

                    <div class="p-3">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <h5 class="font-weight-bold text-dark mb-1 mt-4">
                                        {{ chapter.name }}
                                    </h5>
                                </tr>
                                <tr>
                                    <router-link class="text-muted underline-on-hover" style="font-size: 15px" :to="{ path: 'chapter-member', query: { chapter_id: this.$route.query.id } }">
                                        {{ chapter.totalMember }} members
                                    </router-link>
                                </tr>

                                <tr v-if="chapter.members && chapter.members.length">
                                    <template v-for="member in chapter.members">
                                        <div v-if="member.alumni_id  == auth_id && member.status == 'pending'">
                                            <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3" @click="chapterCancelJoiningRequest(chapter)">
                                                Withdrow
                                            </button>
                                        </div>

                                        <div v-if="member.alumni_id  == auth_id && member.status == 'accept'">
                                            <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3"
                                            @click="leaveThisChapter(chapter)">
                                                leave this chapter
                                            </button>
                                        </div>
                                    </template>
                                </tr>

                                <tr v-else>
                                    <button type="button" class="btn btn-secondary btn-sm rounded-pill btn-bl mt-3" @click="chapterSendJoiningRequest(chapter)">
                                        Join
                                    </button>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h5 class="m-0">About this chapter</h5>
                    </div>

                    <div class="box-title border-bottom pt-2 pb-2 pl-3 pr-3">
                        <h6>Created</h6>
                        <span class="text-muted" style="font-size: 12px">
                            {{ chapter.created_at }}
                        </span>
                    </div>

                    <div class="box-title border-bottom p-3">
                        <h6>Description</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="chapter.description"></span>
                    </div>

                    <div class="box-title p-3">
                        <h6>Rules</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="chapter.rules"></span>
                    </div>
                </div>
            </main>

            <!-- left side -->
            <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
            <!-- <aside class="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12"> -->
                <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
                    <router-link :to="{ name: 'profile' }" class="font-weight-bold p-3 d-block">
                        <div class="px-3">
                            <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px" />
                            
                            <img v-else :src="avatar" :alt="alt" class="img-fluid mt-2 rounded-circle" style="width: 150px; height: 150px" />
                        </div>
                        <h5 class="font-weight-bold text-dark mb-1 mt-4">
                            {{ alumni.first_name }} {{ alumni.middle_name }}
                            {{ alumni.last_name }}
                        </h5>
                        <p class="mb-0 text-muted">
                            {{ alumni.designation_department }} at {{ alumni.organization }}
                        </p>
                    </router-link>
                </div>
            </aside>

            <!-- right side -->
            <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
            <!-- <aside class="col col-xl-4 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12"> -->
                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Add to yoru feed</h6>
                    </div>
                    <div class="box-body p-3">
                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list" v-for="(chapter,index) in suggestionChapters">
                            <div class="dropdown-list-image mr-3">
                                <img v-if="chapter.chapter" class="rounded-circle" :src="chapter.chapter.profile_image" :alt="chapter.chapter.id" />
                                <img v-else class="rounded-circle" :src="avatar" :alt="alt" />
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate"> {{ chapter.chapter.name }} </div>
                                <div class="small text-gray-500"> {{ chapter.chapter.created_at }} </div>
                            </div>
                            <span class="ml-auto">
                                <button v-if="!search(auth_id, chapter.chapter.members)" type="button" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="bottom" title="show" @click="chapterSendJoiningRequest(chapter.chapter)">Join</button>

                                <button v-if="search(auth_id, chapter.chapter.members)" type="button" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="bottom" title="show" @click="chapterCancelJoiningRequest(chapter.chapter)">Withdrow</button>
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
import Cookies from 'js-cookie';
import { useHead } from '@vueuse/head';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    name: "Index",

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),

            alumni: "",
            suggestionChapters: [],
            chapter: "",
        };
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
            // suggestion chapter list response
            axios.get(`${this.backendUrl}/chapter-suggestion-list`, { params: { auth_id:this.auth_id } })
            .then((response) => {
                this.suggestionChapters = response.data.data;
                console.log(this.suggestionChapters);
            })
            .catch((e) => {
                console.log(e);
            });

            // alumni information response
            axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
            .then((response) => {
                this.alumni = response.data.data.alumni;
            })
            .catch((e) => {
                console.log(e);
            });

            // chapter information response
            axios.get(`${this.backendUrl}/chapter/` + this.$route.query.id)
            .then((response) => {
                this.chapter = response.data.data.chapter;
                useHead({title: this.chapter.name +' | EWU'})
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // send chapter joining request
        chapterSendJoiningRequest(chapter) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/chapter-send-joining-request/` + chapter.id, {auth_id: this.auth_id})
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

        // cancel chapter joining request
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
                    axios.post(`${this.backendUrl}/chapter-cancel-joining-request/` + chapter.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // leave this chapter method
        leaveThisChapter(chapter) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to leave this chapter?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/chapter-leave-where-you-member/` + chapter.id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },
    },
};
</script>

<style>
.underline-on-hover:hover {
    text-decoration: underline !important;
    color: blue !important;
}

.button-hover:hover {
    background-color: #eae7e7;
    transition: 0.7s;
}

label.button-hover {
    margin-bottom: 0px;
}
</style>
