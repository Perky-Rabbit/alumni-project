<template>
    <div id="event">
        <div class="row">
            <!-- Main Content -->
            <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
            <!-- <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12"> -->
                <div class="bg-white mb-3">
                    <div v-if="event.cover_image" class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{ backgroundImage: 'url(' + event.cover_image + ')' }"></div>

                    <div v-else class="py-4 px-3 border-bottom circular" style="height: 150px" :style="{backgroundImage: 'url(' + backgroud_image + ')'}"></div>

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
                                <tr class="font-weight-bold" style="font-size: 26px;">
                                    <span>
                                        {{ event.name }}
                                    </span>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px;">
                                    <span>Event by </span>
                                    <template v-if="event.alumni">
                                        <span class="font-weight-bold">
                                            {{ event.alumni.first_name }} {{ event.alumni.middle_name }} {{ event.alumni.last_name }}
                                        </span>
                                    </template>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px">
                                    <span>Event Type </span>
                                    <span class="font-weight-bold">
                                        {{ event.type }} event
                                    </span>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px">
                                    <span>Start Time </span>
                                    <span class="font-weight-bold">
                                        {{ event.start_date_time }}
                                    </span>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px">
                                    <span>End Time </span>
                                    <span class="font-weight-bold">
                                        {{ event.end_date_time }}
                                    </span>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px">
                                    <span>Speakers </span>
                                    <span class="font-weight-bold">
                                        <template v-for="(speker,index) in event.eventSpeakers">
                                            <router-link :to="{ path: 'another-profile', query: { username: speker.username, id: speker.id } }">
                                                {{ speker.first_name }} {{ speker.middle_name }} {{ speker.last_name }} {{ (index+1 < event.eventSpeakers.length) ? ', ' : '' }}
                                            </router-link>
                                        </template>
                                    </span>
                                </tr>

                                <tr class="text-muted d-flex" style="font-size: 14px;">
                                    <div class="mt-3 mr-4">
                                        <span class="font-weight-bold">
                                            {{ event.interestedCount }}
                                        </span>
                                        <span> interested</span>
                                    </div>

                                    <div class="mt-3">
                                        <span class="font-weight-bold">
                                            {{ event.goingCount }}
                                        </span>
                                        <span> going</span>
                                    </div>
                                </tr>

                                <tr>
                                    <div class="d-flex align-items-center mt-3">
                                        <template v-if="event.event_members">
                                            <button v-if="!search(auth_id, event.event_members)" type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="eventInterested(event)">
                                                Interested
                                            </button>

                                            <template v-else-if="search(auth_id, event.event_members) && search(auth_id, event.event_members).status == 'interested'">
                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="eventNotInterested(event)">
                                                    Not Interested
                                                </button>

                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="eventGoing(event)">
                                                    Going
                                                </button>
                                            </template>

                                            <template v-else-if="search(auth_id, event.event_members) && search(auth_id, event.event_members).status == 'going'">
                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="eventNotGoing(event)">
                                                    Not Going
                                                </button>
                                            </template>
                                        </template>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h5 class="m-0">About this event</h5>
                    </div>

                    <div class="box-title border-bottom pt-2 pb-2 pl-3 pr-3">
                        <h6>Created</h6>
                        <span class="text-muted" style="font-size: 12px">
                            {{ event.created_at }}
                        </span>
                    </div>

                    <div class="box-title p-3">
                        <h6>Description</h6>
                        <span class="text-muted" style="font-size: 12px" v-html="event.description"></span>
                    </div>
                </div>
            </main>

            <!-- left side -->
            <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
                    <router-link :to="{ name: 'profile' }" class="font-weight-bold p-3 d-block">
                        <div class="px-3">
                            <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px"/>
                            <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px"/>
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
                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Add to your feed</h6>
                    </div>
                    <div class="box-body p-3">
                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list" v-for="(item,index) in suggestionEvents">
                            <div class="dropdown-list-image mr-3">
                                <img v-if="item.event.cover_image" class="rounded-circle" :src="item.event.cover_image" :alt="item.event.id"/>
                                <img v-else class="rounded-circle" :src="avatar" :alt="alt" />
                            </div>

                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate"> {{ item.event.name }} </div>
                                <div class="small text-gray-500"> {{ item.event.created_at }} </div>
                            </div>

                            <span class="ml-auto">
                                <button v-if="!search(auth_id, item.event.event_members)" type="button" class="btn btn-outline-secondary btn-sm rounded-pill btn-bl mr-3" @click="eventInterested(event)">
                                    Interested
                                </button>
                            </span>
                        </div>

                        <div class="text-center" v-if="!(suggestionEvents && suggestionEvents.length)">
                            <strong style="font-size: 14px;">No Data found</strong>
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
            backgroud_image: store.$state.backgroud_image,

            auth_id: Cookies.get('alumniIdCookie'),

            alumni: "",
            suggestionEvents: [],
            event: "",
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
            // suggestion event list response
            axios.get(`${this.backendUrl}/event-suggestion-list`,{ params: { auth_id:this.auth_id } })
            .then((response) => {
                this.suggestionEvents = response.data.data;
                console.log(this.suggestionEvents);
            })
            .catch((e) => {
                console.log(e);
            });

            axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
            .then((response) => {
                this.alumni = response.data.data.alumni;
            })
            .catch((e) => {
                console.log(e);
            });

            axios.get(`${this.backendUrl}/event/` + this.$route.query.id)
            .then((response) => {
                this.event = response.data.data.event;
                useHead({title: this.event.name +' | EWU'})
            })
            .catch((e) => {
                console.log(e);
            });
        },

        eventInterested(event) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/event-interested/` + event.id, {auth_id: this.auth_id})
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

        eventNotInterested(event) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/event-not-interested/` + event.id, {auth_id: this.auth_id})
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

        eventGoing(event) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/event-going/` + event.id, {auth_id: this.auth_id})
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

        eventNotGoing(event) {
            this.$Progress.start();
            axios.post(`${this.backendUrl}/event-not-going/` + event.id, {auth_id: this.auth_id})
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
