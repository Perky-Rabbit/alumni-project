<template>
    <div id="class-memories">
        <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
            <div class="box-title pl-3 pr-3 pt-2">
                <div class="d-flex align-items-top">
                    <div class="mr-2">
                        <h6 class="text-dark mb-0">Class Memories</h6>
                    </div>
                    <button type="button" class="btn btn-light btn-sm ml-auto mb-auto rounded-pill" @click="addClassMemoriesModalShow()">
                        Create
                    </button>
                </div>
            </div>

            <ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Your class memories</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Requested</a>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <!-- your class memories -->
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="box-body p-3" v-for="(item,index) in classMemories" :class="(index + 1) < classMemories.length ? 'border-bottom' : '' ">
                        <div class="d-flex align-items-center osahan-post-header people-list">
                            <router-link :to="{ name: 'classMemoriesView', query: { id: item.classMemories.id } }">
                                <div class="mr-3" v-if="item.classMemories.profile_image">
                                    <img class="rounded-circle invitation-dropdown-list-image" :src="item.classMemories.profile_image" :alt="item.id">
                                </div>
                                <div class="mr-3" v-else>
                                    <img class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                </div>
                            </router-link>

                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">{{ item.classMemories.name }} <code>(own)</code></div>
                                <span class="small text-gray-500">{{ item.classMemories.totalMember }} members</span>
                            </div>
                            
                            <span class="ml-auto small">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-ellipsis fa-1x text-secondary"></i></button>

                                    <div class="dropdown-menu dropdown-menu-right">
                                        <button class="dropdown-item" type="button" @click="memberRequestModalShow(item.classMemories)"><i class="feather-user"></i> Member Request</button>

                                        <button class="dropdown-item" type="button" @click="editClassMemoriesModalShow(item.classMemories)"><i class="feather-edit"></i> Update</button>

                                        <button class="dropdown-item" type="button" @click="destroyClassMemories(item.classMemories)"><i class="feather-trash"></i> Delete</button>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>

                    <template v-for="(item,index) in joinedClassMemoriesList">
                        <div class="box-body p-3" v-if="item.user_id != auth_id" :class="(index + 1) <= joinedClassMemoriesList.length ? 'border-top' : '' ">
                            <div class="d-flex align-items-center osahan-post-header people-list">
                                <router-link :to="{ name: 'classMemoriesView', query: { id: item.id } }">
                                    <div class="mr-3">
                                        <img v-if="item.profile_image" class="rounded-circle invitation-dropdown-list-image" :src="item.profile_image.source"  :alt="item.id">

                                        <img v-else class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                    </div>
                                </router-link>

                                <div class="font-weight-bold mr-2">
                                    <div class="text-truncate">{{ item.name }}</div>
                                    <span class="small text-gray-500">{{ item.totalMember }} members</span>
                                </div>
                                
                                <span class="ml-auto small">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-ellipsis fa-1x text-secondary"></i></button>

                                        <div class="dropdown-menu dropdown-menu-right">
                                            <button class="dropdown-item" type="button" @click="leaveThisClassMemories(item.id)"><i class="feather-edit"></i> Leave this class memories</button>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </template>

                    <div class="text-center p-3" v-if="!(classMemories && classMemories.length) && !(joinedClassMemoriesList && joinedClassMemoriesList.length)">
                        <strong style="font-size: 20px;">No Data found</strong>
                    </div>
                </div>

                <!-- requested class memories -->
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="p-3 w-100">
                        <template v-if="joiningRequestClassMemoriesList && joiningRequestClassMemoriesList.length">
                            <div class="box-body p-3" v-for="(item,index) in joiningRequestClassMemoriesList">
                                <div class="d-flex align-items-center osahan-post-header people-list">
                                    <router-link :to="{ name: 'classMemoriesView', query: { id: item.id } }">
                                        <div class="mr-3">
                                            <img v-if="item.profile_image" class="rounded-circle invitation-dropdown-list-image" :src="item.profile_image.source"  :alt="item.id">

                                            <img v-else class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                        </div>
                                    </router-link>

                                    <div class="font-weight-bold mr-2">
                                        <div class="text-truncate">{{ item.name }}</div>
                                        <span class="small text-gray-500">{{ item.totalMember }} members</span>
                                    </div>
                                    
                                    <span class="ml-auto small">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-ellipsis fa-1x text-secondary"></i></button>

                                            <div class="dropdown-menu dropdown-menu-right">
                                                <button class="dropdown-item" type="button" @click="cancelClassMemoriesJoinRequest(item)"><i class="feather-edit"></i> Cancel request</button>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </template>
                        
                        <template v-else>
                            <div class="text-center">
                                <strong style="font-size: 20px;">No data found</strong>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create class memories Modal -->
        <div class="modal fade" id="addEditClassMemoriesModal" tabindex="-1" role="dialog" aria-labelledby="addEditClassMemoriesModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <form @submit.prevent="classMemoriesEditMode ? update() : store()">
                <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addEditClassMemoriesModalLabel">{{ classMemoriesEditMode ? 'Update' : 'Create' }} class memories</h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="d-flex align-items-top mb-1">
                                <div class="mr-2">
                                * Indicates required
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="background_image" class="mb-0">Background Image</label>
                                        <input type="file" id="file1" class="custom-form-control" @change="onBackgroundImageChange">
                                        <img class="mt-1" :src="backgroundImagePreview" style="width: 100px;" alt="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="profile_image" class="mb-0">Profile Image</label>
                                        <input type="file" id="file2" class="custom-form-control" @change="onProfileImageChange">
                                        <img class="mt-1" :src="profileImagePreview" style="width: 100px;" alt="">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="name" class="mb-0">Class Memories Name*</label>
                                <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Enter class memories name">
                            </div>

                            <div class="form-group">
                                <label for="description" class="mb-0">Description*</label>
                                <Editor
                                v-model="form.description"
                                automatic_uploads="true"
                                api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
                                :init="{
                                    plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',

                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                                }"
                                />
                            </div>

                            <div class="form-group">
                                <label for="rules" class="mb-0">Class memories rules</label>
                                <Editor
                                    v-model="form.rules"
                                    automatic_uploads="true"
                                    api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
                                    :init="{
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',

                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                                    }"
                                />
                            </div>

                            <div class="form-group">
                                <label for="permissions" class="mb-0">Permissions</label>
                                <div class="form-check">
                                    <input v-model="form.invite_by_member" class="form-check-input" type="checkbox" true-value="Yes" false-value="No">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Allow members to invite their connections
                                    </label><br>
                                    <small class="text-muted">If disabled, only admins will be able to invite 1st degree connections to the group. All requests to join will still require admin approval.</small>
                                </div>
                                <div class="form-check">
                                    <input v-model="form.review_by_admin" class="form-check-input" type="checkbox" true-value="Yes" false-value="No">
                                    <label class="form-check-label" for="defaultCheck1">
                                    Require new posts to be reviewed by admins
                                    </label><br>
                                    <small class="text-muted">If enabled, members’ posts will require admin approval within 14 days before they become visible to others.</small>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        
                            <button :disabled="form.busy" type="submit" class="btn btn-success"> {{ classMemoriesEditMode ? 'Update' : 'Create' }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- member request Modal -->
        <div class="modal fade" id="memberRequestModal" tabindex="-1" role="dialog" aria-labelledby="memberRequestModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="memberRequestModalLabel">Member Request</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="box-body p-3">
                            <template v-if="classMemoriesMemberRequestList && classMemoriesMemberRequestList.length">
                                <div class="d-flex align-items-center osahan-post-header people-list mb-3" v-for="(item,index) in classMemoriesMemberRequestList">
                                    <div class="mr-3">
                                        <template v-if="item.alumni.alumni">
                                            <img class="rounded-circle invitation-dropdown-list-image" :src="item.alumni.alumni.source" :alt="item.alumni.id">
                                        </template>
                                        <template v-else>
                                            <img class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                        </template>
                                    </div>

                                    <div class="font-weight-bold mr-2">
                                        <div class="text-truncate">{{ item.alumni.first_name }} {{ item.alumni.middle_name }} {{ item.alumni.last_name }}</div>
                                        <div class="small text-gray-500">
                                            {{ item.alumni.designation_department }} at {{ item.alumni.organization }}
                                        </div>
                                    </div>

                                    <span class="ml-auto">
                                        <button type="button" class="btn btn-outline-danger btn-sm rounded-pill mr-1" @click="denyMemberRequest(item)">Deny</button>
                                        <button type="button" class="btn btn-light btn-sm rounded-pill" @click="acceptMemberRequest(item)">Accept</button>
                                    </span>
                                </div>
                            </template>
                            
                            <template v-else>
                                <div class="text-center">
                                    <strong style="font-size: 20px;">No data found</strong>
                                </div>
                            </template>
                        </div>
                    </div>
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
import Form from "vform";
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import Editor from '@tinymce/tinymce-vue';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    name: "ClassMemories",
    components: {Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor},

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            classMemoriesEditMode: false,
            backgroundImagePreview: '',
            profileImagePreview: '',
            classMemories: [],
            joinedClassMemoriesList: [],
            classMemoriesMemberRequestList: [],
            joiningRequestClassMemoriesList: [],

            form: new Form({
                id: "",
                user_id: "",
                user_type: "",
                background_image: "",
                profile_image: "",
                name: "",
                description: "",
                rules: "",
                invite_by_member: "No",
                review_by_admin: "No",
            }),
        };
    },

    beforeCreate() {
        useHead({title: 'Class Memories | EWU'})
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            // class memories response
            axios.get(`${this.backendUrl}/class-memories`, { params: { user_id: this.auth_id, user_type: 'alumni' } })
            .then((response) => {
                this.classMemories = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            // joining class memories list response
            axios.get(`${this.backendUrl}/get-joined-class-memories-list/` + this.auth_id)
            .then((response) => {
                this.joinedClassMemoriesList = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            // sending joining request class memeries list
            axios.get(`${this.backendUrl}/send-joining-request-class-memories-list/` + this.auth_id)
            .then((response) => {
                this.joiningRequestClassMemoriesList = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // create class memories modal
        addClassMemoriesModalShow() {
            this.groupEditMode = false;
            this.form.user_id = this.auth_id;
            this.form.user_type = 'alumni';
            $("#addEditClassMemoriesModal").modal("show");
        },

        // class memories background image load
        onBackgroundImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.backgroundImagePreview = reader.result;
                this.form.background_image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        // class memories profile image load
        onProfileImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.profileImagePreview = reader.result;
                this.form.profile_image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        // class memories store
        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.post(`${this.backendUrl}/class-memories`, {
                params: {
                    user_id: this.form.user_id,
                    user_type: this.form.user_type,
                },
            })
            .then((response) => {
                this.getData();
                $("#addEditClassMemoriesModal").modal("hide");
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success(response.data.data.message);
                    this.form.reset()
                    $('#file1').val('')
                    $('#file2').val('')
                    this.backgroundImagePreview = ''
                    this.profileImagePreview = ''
                } else {
                    this.$Progress.fail();
                    toast.error("Something went wrong. Try again later.");
                }
            })
            .catch((e) => {
                this.$Progress.fail();
                console.log(e);
            });
        },

        // edit class memories modal
        editClassMemoriesModalShow(classMemories) {
            this.classMemoriesEditMode = true;
            this.form.user_id = this.auth_id;
            this.form.user_type = 'alumni';
            this.form.fill(classMemories);
            this.form.background_image = '';
            this.form.profile_image = '';
            this.backgroundImagePreview = classMemories.background_image;
            this.profileImagePreview = classMemories.profile_image;
            $("#addEditClassMemoriesModal").modal("show");
        },

        // update class memories
        update() {
          this.$Progress.start();
          this.form.busy = true;
          this.form.put(`${this.backendUrl}/class-memories/` + this.form.id)
            .then((response) => {
              this.getData();
              $("#addEditClassMemoriesModal").modal("hide");
              if (this.form.successful) {
                this.$Progress.finish();
                toast.success(response.data.data.message);
                this.form.reset()
                $('#file1').val('')
                $('#file2').val('')
                this.backgroundImagePreview = ''
                this.profileImagePreview = ''
              } else {
                this.$Progress.fail();
                toast.error("Something went wrong. Try again later.");
              }
            })
            .catch((e) => {
              this.$Progress.fail();
              console.log(e);
            });
        },

        // delete class memories
        destroyClassMemories(classMemories) {
          this.$swal
            .fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios.delete(`${this.backendUrl}/class-memories/` + classMemories.id)
                  .then((response) => {
                    this.$swal.fire("Deleted!", response.data.message, "success");
                    this.getData();
                  });
              }
            });
        },

        // get class memories member request list response
        getClassMemoriesMemberRequestList(class_memories_id) {
            axios.get(`${this.backendUrl}/get-class-memories-member-request-list/` + class_memories_id)
            .then((response) => {
                this.classMemoriesMemberRequestList = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // class memories member request modal
        memberRequestModalShow(classMemories) {
            this.getClassMemoriesMemberRequestList(classMemories.id);
            $("#memberRequestModal").modal("show");
        },

        // class memories deny request
        denyMemberRequest(item) {
            console.log(item);
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
                    axios.post(`${this.backendUrl}/deny-class-memories-member-request/` + item.class_memories_id + '/' + item.alumni_id)
                    .then((response) => {
                        this.getClassMemoriesMemberRequestList(item.class_memories_id);
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // accept class memories member request
        acceptMemberRequest(item) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to accept the request?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/accept-class-memories-member-request/` + item.class_memories_id + '/' + item.alumni_id)
                    .then((response) => {
                        this.getClassMemoriesMemberRequestList(item.class_memories_id);
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // leave this class memories
        leaveThisClassMemories(class_memories_id) {
            this.$swal
            .fire({
                title: "Are you sure?",
                text: "Do you want to leave this class memories?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                cancelButtonText: "NO",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Yes",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${this.backendUrl}/leave-this-class-memories/` + class_memories_id, {auth_id: this.auth_id})
                    .then((response) => {
                        this.getData();
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // cancel class memories joining request
        cancelClassMemoriesJoinRequest(classMemories) {
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
                    axios.post(`${this.backendUrl}/cancel-class-memories-join-request/` + classMemories.id, {auth_id: this.auth_id})
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
.invitation-dropdown-list-image {
    height: 5rem;
    width: 5rem;
}
</style>