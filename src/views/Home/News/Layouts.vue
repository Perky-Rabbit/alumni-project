<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>News Details </h1>
                <ul>
                    <li><router-link :to="{name: 'home'}">Home</router-link></li>
                    <li>Pages</li>
                    <li>News Details</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start News Details Area-->
    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <router-view :key="$route.fullPath"></router-view>
                </div>

                <div class="col-lg-4">
                    <div class="related-post-area">
                        <h3>Related News</h3>
                        <div class="related-post-box" v-for="item in news">
                            <div class="related-post-content">
                                <router-link :to="`/news/${item.slug}`">
                                    <img v-if="item['images'][0]" :src="item['images'][0].source" :alt="item.id">
                                    <img v-else :src="avatar" :alt="alt">
                                </router-link>

                                <router-link :to="`/news/${item.slug}`">
                                    {{ item.title }}
                                </router-link>

                                <!-- <router-link :to="{ path: 'single-news', query: { id: item.id } }">
                                    <img v-if="item['images'][0]" :src="item['images'][0].source" :alt="item.id">
                                    <img v-else :src="avatar" :alt="alt">
                                </router-link>

                                <router-link :to="{ path: 'single-news', query: { id: item.id } }">
                                    {{ item.title }}
                                </router-link> -->

                                <p>.</p>

                                <!-- <p><i class="flaticon-tag"></i> Social Sciences</p> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End News Details Area-->
</template>

<script>
    import axios from 'axios';
    import { useStore } from '../../../store';
    const store = useStore();

    export default {
        name: 'Layouts',

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                avatar: store.$state.avatar,
                alt: store.$state.alt,
                news_place: 'alumni',
                news: [],
            };
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}/news`, {
                    params: {
                        place: this.news_place,
                    }
                })
                .then((response) => {
                    this.news = response.data.data.slice(Math.max(response.data.data.length - 3, 0));
                    // console.log(this.news)
                })
                .catch((e) => {
                    console.log(e);
                });
            },
        }
    }
</script>