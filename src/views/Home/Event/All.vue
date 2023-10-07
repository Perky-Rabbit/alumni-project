<template>
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Latest Events</h1>
                <ul>
                    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Latest Events</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="latest-news-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="latest-news-left-content pr-20">
                        <div class="latest-news-card-area">
                            <div class="row">
                                <div class="col-md-6" v-for="(event,index) in noticeEvents">
                                    <div class="single-events-card style-4">
                                    <!-- <div class="events-image">
                                        <div class="date pt-0 pb-0" style="bottom: -25px;">
                                            <span style="font-size: 14px;">
                                            <i class="flaticon-writing-tool"></i> {{moment(event.date).format('ll')}}
                                            </span>
                                            <br>
                                            <span style="font-size: 12px; color: black;">
                                            <i class="flaticon-time"></i> {{ moment(event.time,["HH.mm"]).format('hh:mm A') }}
                                            </span>
                                        </div>
                                    </div> -->
                                    <div class="events-content" style="padding:15px;">
                                        <div class="d-flex justify-content-between">
                                            <div style="font-size: 12px; font-weight: bold;">
                                                <i class="flaticon-writing-tool"></i> {{moment(event.date).format('ll')}}
                                            </div>
                                            <div style="font-size: 12px; font-weight: bold;">
                                                <i class="flaticon-time"></i> {{ moment(event.time,["HH.mm"]).format('hh:mm A') }}
                                            </div>
                                        </div>
                                        <!-- <div class="admin">
                                            <p><a href="events-details.html"><i class="flaticon-student-with-graduation-cap"></i>Upcomming or past</a></p>
                                        </div> -->
                                        <!-- <router-link :to="{ name: 'singleEvent', query: {id: event.id} }">
                                            <h3 class="mt-2">{{ event.title.substring(0,30)}} {{event.title.length >= 30 ? `...` : ''}}</h3>
                                        </router-link> -->

                                        <router-link :to="`/notice-event/${event.slug}`">
                                            <h3 class="mt-2">{{ event.title.substring(0,30)}} {{event.title.length >= 30 ? `...` : ''}}</h3>
                                        </router-link>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <PaginationComponent v-show="noticeEvents.length" :links="links" @get-data="getData" />
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="serch-content">
                        <h3>Search</h3>
                        <div class="form-group">
                            <input v-model="keyword" type="text" class="form-control" placeholder="Find Your Events">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
</template>

<script>
import axios from "axios";
import { useHead } from '@vueuse/head';
import moment from 'moment';
import PaginationComponent from "../../../components/PaginationComponent.vue";
import { useStore } from '../../../store';
const store = useStore();

export default {
    name: "All",

    components: { PaginationComponent},

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            moment: moment,
            event_place: 'alumni',
            noticeEvents: [],

            keyword: "",
            fieldName: "title",
            perPage: 6,
            pagination: [],
            links: [],
        };
    },

    watch: {
        keyword: function () {
            this.getData();
        },
    },

    mounted() {
        this.getData();
    },

    created() {
        const url = window.location.pathname;
        axios.get(`${this.backendUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } })
        .then((response) => {
            // console.log(response.data.data);
            if (response.data.data != null) {
                useHead({ title: response.data.data.title });
            } else {
                useHead({ title: 'Alumni | EWU' });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    },

    methods: {
        getData(url) {
            this.$Progress.start();
            let linkUrl = url ? url : `${this.backendUrl}/notice-event-paginated-list`;
            axios.get(linkUrl, {
                params: {
                    per_page: this.perPage,
                    field_name: this.fieldName,
                    keyword: this.keyword,
                },
            })
            .then((response) => {
                this.noticeEvents = response.data.data;
                this.pagination = response.data.meta;
                this.links = response.data.meta.links;
                this.$Progress.finish();
            })
            .catch((e) => {
                console.log(e);
                this.$Progress.fail();
            });
        },
    }
};
</script>

<style>
    
</style>