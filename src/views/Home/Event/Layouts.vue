<template>
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Event Details </h1>
                <ul>
                    <li><router-link :to="{name: 'home'}">Home</router-link></li>
                    <li>Pages</li>
                    <li>Event Details</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <router-view :key="$route.fullPath"></router-view>
                </div>

                <div class="col-lg-4">
                    <div class="related-post-area">
                        <h3>Related Events</h3>
                        <div class="related-post-box" v-for="item in events">
                            <div class="">
                                <!-- <router-link :to="{ path: 'single-event', query: { id: item.id } }">
                                    {{ item.title }}
                                </router-link> -->

                                <router-link :to="`/notice-event/${item.slug}`">
                                    {{ item.title }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                event_place: 'alumni',
                events: [],
            };
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}/notice-event`)
                .then((response) => {
                    this.events = response.data.data.slice(Math.max(response.data.data.length - 3, 0));
                    // console.log(this.events)
                })
                .catch((e) => {
                    console.log(e);
                });
            },
        }
    }
</script>