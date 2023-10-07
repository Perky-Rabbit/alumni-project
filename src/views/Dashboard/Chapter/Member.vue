<template>
  <div id="member">
    <div class="box shadow-sm border rounded bg-white mb-3">
        <div v-if="memberList && memberList.length != 0">
            <div class="d-flex box-title border-bottom p-3" v-for="(member,index) in memberList">
                <h5 v-if="index < 1" class="m-0">{{ member.chapter.name }}</h5> &nbsp; <span><h5>member list</h5></span>
            </div>
        </div>
        <div v-else class="d-flex box-title border-bottom p-3">
            <h5 class="m-0">Member list</h5>
        </div>
        
        <template v-if="memberList && memberList.length">
            <div class="box-body p-3"  v-for="(member,index) in memberList" :class="(index + 1) < memberList.length ? 'border-bottom' : '' ">
                <div class="d-flex align-items-center osahan-post-header people-list">
                    <router-link :to="{ path: 'another-profile', query: { username: member.alumni.username, id: member.alumni.id } }">
                        <div class="mr-3" v-if="member.alumni.alumni">
                            <img class="rounded-circle invitation-dropdown-list-image" :src="member.alumni.alumni.source" :alt="alt">
                        </div>
                        <div v-else class="mr-3">
                            <img class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                        </div>
                    </router-link>

                    <div class="font-weight-bold mr-2">
                        <router-link :to="{ path: 'another-profile', query: { username: member.alumni.username, id: member.alumni.id } }">
                            <div class="text-truncate">
                                {{ member.alumni.first_name }} {{ member.alumni.middle_name }} {{ member.alumni.last_name }}
                                <code>
                                    ({{ member.role }})
                                </code>
                            </div>
                            
                            <div class="small text-gray-500">
                                {{ member.alumni.designation_department }} at {{ member.alumni.organization }}
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="text-center p-3">
                <strong style="font-size: 20px;">No data found</strong>
            </div>
        </template>
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

export default {
    name: "Member",

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            memberList: [],
        };
    },

    beforeCreate() {
        useHead({title: 'All Member | EWU'})
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            axios.get(`${this.backendUrl}/chapter-member-list/` + this.$route.query.chapter_id)
            .then((response) => {
                this.memberList = response.data.data;
            })
            .catch((e) => {
                console.log(e);
            });
        },
    },
};
</script>

<style>

</style>