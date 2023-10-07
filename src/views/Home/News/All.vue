<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Latest News</h1>
                <ul>
                    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Latest News</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Letest News Area-->
    <div class="latest-news-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="latest-news-left-content pr-20">
                        <div class="latest-news-card-area">
                            <!-- <h3>Latest News</h3> -->
                            <div class="row">
                                <div v-for="(item, index) of news" class="col-lg-6 col-md-6">
                                    <div class="single-news-card">
                                        <div class="news-img">
                                            <img v-if="item['images'][0]" style="width: 100%; min-height: 300px; max-height: 300px;" :src="item['images'][0].source" :alt="item.id">
                                            <img v-else style="width: 100%; min-height: 300px; max-height: 300px;" :src="avatar" :alt="alt">
                                        </div>

                                        <div class="news-content">
                                            <!-- <div class="list">
                                                <ul>
                                                    <li><i class="flaticon-user"></i>By <a href="news-details.html">Admin</a></li>
                                                    <li><i class="flaticon-tag"></i>Social Sciences</li>
                                                </ul>
                                            </div> -->

                                            <!-- <router-link :to="{ name: 'singleNews', query: {id: item.id} }">
                                                <h3>{{ item.title.substring(0,30)}} {{item.title.length >= 30 ? `...` : ''}}</h3>
                                            </router-link>

                                            <router-link :to="{name: 'singleNews', query: {id:item.id} }">
                                                <p>{{item.description.substring(0,70)}} {{item.description.length >= 70 ? `...` : ''}}</p>
                                            </router-link> -->

                                            <router-link :to="`/news/${item.slug}`">
                                                <h3>{{ item.title.substring(0,30)}} {{item.title.length >= 30 ? `...` : ''}}</h3>
                                            </router-link>

                                            <router-link :to="`/news/${item.slug}`">
                                                <p v-html="item.description.substring(0, 70) + (item.description.length >= 70 ? '...' : '')"></p>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <PaginationComponent v-show="news.length" :links="links" @get-data="getData" />
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="serch-content">
                        <h3>Search</h3>
                        <div class="form-group">
                            <input v-model="keyword" type="text" class="form-control" placeholder="Find Your News">
                        </div>
                    </div>

                    <!-- <div class="category-list">
                        <h3>Category List</h3>
                        <ul>
                            <li>
                                <a href="academics.html">Student<i class="ri-arrow-drop-right-fill"></i></a>
                            </li>
                            <li>
                                <a href="academics.html">Seminar<i class="ri-arrow-drop-right-fill"></i></a>
                            </li>
                            <li>
                                <a href="academics.html">Research<i class="ri-arrow-drop-right-fill"></i></a>
                            </li>
                            <li>
                                <a href="academics.html">Event<i class="ri-arrow-drop-right-fill"></i></a>
                            </li>
                            <li>
                                <a href="academics.html">Event<i class="ri-arrow-drop-right-fill"></i></a>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <!--End Letest News Area-->

    <vue-progress-bar></vue-progress-bar>
</template>

<script>
import axios from "axios";
import { useHead } from '@vueuse/head';
import PaginationComponent from "../../../components/PaginationComponent.vue";
import { useStore } from '../../../store';
const store = useStore();

export default {
    name: "All",

    components: { PaginationComponent},

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            
            news_place: 'alumni',
            news: [],

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
            let linkUrl = url ? url : `${this.backendUrl}/news`;
            axios.get(linkUrl, {
                params: {
                    place: this.news_place,
                    per_page: this.perPage,
                    field_name: this.fieldName,
                    keyword: this.keyword,
                },
            })
            .then((response) => {
                this.news = response.data.data;
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