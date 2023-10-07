<template>
    <div id="my-network">
        <!-- Invitations -->
        <div class="box shadow-sm border rounded bg-white mb-3">
            <div class="d-flex box-title border-bottom p-3">
                <h5 class="m-0">Invite Others</h5>
            </div>

            <div class="box-body border-bottom p-3">
                <div class="d-flex align-items-center osahan-post-header people-list">
                    <div class="row col-md-12">
                        <div class="col-md-7">
                            <label> Import Google Contacts </label><br>
                            <input type="file" name="imported_file">
                        </div>
                        <div class="row col-md-5">
                            <label> Invite Friend Via EMAIL </label>
                            <div class="col-md-8 p-0">
                                <input type="text" v-model="friend_email" name="friend_email" class="form-control">
                                <small><strong class="text-danger"> {{error_message}} </strong></small>
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="form-control btn btn-primary" @click="submit"> Invite </button>
                            </div>
                        </div>
                    </div>
                    <span class="ml-auto">
                </span>
                </div>
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
    import { useToast } from "vue-toastification";
    const toast = useToast();

    export default {
        name: "InviteOthers",

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                avatar: store.$state.avatar,
                alt: store.$state.alt,
                auth_id : Cookies.get('alumniIdCookie'),
                friend_email: '',
                error_message: '',
            };
        },

        beforeCreate() {
            useHead({title: 'Invite Others | EWU'})
        },

        methods: {
            submit(){
                if (this.friend_email){
                    axios.get(`${this.backendUrl}/invite-others`, { params:{ auth_id: this.auth_id, email: this.friend_email } })
                    .then((response) => {
                        this.$Progress.finish();
                        toast.success("Successfully Invited Your Friend via Email");
                    });
                    this.error_message = ''
                } else{
                    this.error_message = "Please! Enter Your Friend's Mail"
                }
            },
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
</style>