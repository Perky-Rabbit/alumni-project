<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>All Alumni</h1>
                <ul>
                    <li><router-link :to="{ name: 'home' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>All Alumni</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Letest News Area-->
    <div class="latest-news-area ptb-50">
        <div class="container">
            <!-- <div class="col-md-12">
                <div class="serch-content">
                    <h3>Search</h3>
                    <div class="form-group">
                        <input v-model="keyword" type="text" class="form-control" placeholder="Find Your News">
                    </div>
                </div>
            </div> -->

            <div class="col-lg-12">
                <div class="latest-news-left-content pr-20">
                    <div class="latest-news-card-area">
                        <div class="row">
                            <div v-for="(alumni, index) of alumnis" class="col-md-3">
                                <div class="single-news-card rounded" style="height: 100%; max-height: 90%;">
                                    <div class="news-img p-3">
                                        <img class="rounded" v-if="alumni.profile_image" style="width: 100%; min-height: 300px; max-height: 300px;" :src="alumni.profile_image" :alt="alumni.id">
                                        <img class="rounded" v-else style="width: 100%; min-height: 300px; max-height: 300px;" :src="avatar" :alt="alt">
                                    </div>

                                    <div class="news-content p-3">
                                        <div class="list">
                                            <ul>
                                                <!-- <li><i class="flaticon-star-1"></i><a href="#">{{ alumni.ewu_id_no }}</a></li> -->
                                                <li>
                                                    <i class="flaticon-profile"></i>
                                                    <a href="#"> {{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }} <span v-if="alumni.blood_group">({{alumni.blood_group}})</span></a>
                                                </li>
                                                <!-- <li><i class="flaticon-email"></i><a href="#">{{ alumni.university_email }} </a></li> -->
                                                <!-- <li><i class="flaticon-phone-call"></i><a href="#">{{ alumni.personal_contact_number }} </a></li> -->
                                                <li><i class="flaticon-help"></i><a href="#">{{ alumni.department_name }} </a></li>
                                                <li v-if="alumni.experience && alumni.experience.length > 0" v-for="(experience, index) of alumni.experience">
                                                    <span v-if="experience.is_current == 'Yes'">
                                                        <i class="flaticon-star-1"></i><a href="#">{{ experience.designation_department }} at {{ experience.company_name }}</a>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PaginationComponent v-show="alumnis.length" :links="links" @get-data="getData" />
                </div>
            </div>
        </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
</template>

<script>
import axios from "axios";
import { useStore } from '../../../store';
const store = useStore();
import { useHead } from '@vueuse/head';
import PaginationComponent from "../../../components/PaginationComponent.vue";

export default {
    name: "Alumni List",
    components: { PaginationComponent},

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            alumnis: [],

            keyword: "",
            fieldName: "ewu_id_no",
            perPage: 12,
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

    // created() {
    //     const url = window.location.pathname;
    //     axios.get(`${this.backendUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } })
    //     .then((response) => {
    //         // console.log(response.data.data);
    //         if (response.data.data != null) {
    //             useHead({ title: response.data.data.title });
    //         } else {
    //             useHead({ title: 'Alumni | EWU' });
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // },

    methods: {
        getData(url) {
            this.$Progress.start();
            let linkUrl = url ? url : `${this.backendUrl}/alumni`;
            axios.get(linkUrl, {
                params: {
                    per_page: this.perPage,
                    field_name: this.fieldName,
                    keyword: this.keyword,
                    place: 'alumni_list'
                },
            })
            .then((response) => {
                this.alumnis = response.data.data;
                // console.log(this.alumnis);
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