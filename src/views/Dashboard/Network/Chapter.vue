<template>
  <div id="chapter">
    <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
        <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Chapters</h6>
              </div>
              <button type="button" class="btn btn-light btn-sm ml-auto mb-auto rounded-pill" @click="addChapterModalShow()">
                Create Chapter
              </button>
            </div>
        </div>

        <div class="tab-content">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="box-body p-3" v-bind:class="(index + 1) < chapters.length ? 'border-bottom' : '' " v-for="(item,index) in chapters">
                    <div class="d-flex align-items-center osahan-post-header people-list">
                      <router-link :to="{ path: 'chapter-view', query: { id: item.chapter.id } }">
                          <div class="mr-3">
                              <img v-if="item.chapter.profile_image" class="rounded-circle border invitation-dropdown-list-image" :src="item.chapter.profile_image" :alt="item.id">
                              <img v-else class="rounded-circle border invitation-dropdown-list-image" :src="avatar" :alt="alt">
                          </div>
                      </router-link>

                        <div class="font-weight-bold mr-2">
                            <div class="text-truncate">{{ item.chapter.name }}</div>
                            <span class="small text-gray-500">{{ item.chapter.totalMember }} members</span>
                        </div>
                        
                        <span class="ml-auto small">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button" @click="memberRequestModalShow(item)"><i class="feather-user"></i> Member Request</button>
                                    <button class="dropdown-item" type="button" @click="editChapterModalShow(item)"><i class="feather-edit"></i> Update</button>
                                    <button class="dropdown-item" type="button" @click="destroyChapter(item)"><i class="feather-trash"></i> Delete</button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>

                <template v-for="(item,index) in yourJoinedChapterList">
                    <div class="box-body p-3" v-bind:class="(index + 1) <= yourJoinedChapterList.length ? 'border-top' : '' " v-if="item.chapter.user_id != auth_id">
                        <div class="d-flex align-items-center osahan-post-header people-list">
                            <router-link :to="{ path: 'chapter-view', query: { id: item.chapter.id } }">
                                <div class="mr-3">
                                    <img v-if="item.chapter.profile_image" class="rounded-circle border invitation-dropdown-list-image" :src="item.chapter.profile_image.source" :alt="item.id">
                                    <img v-else class="rounded-circle border invitation-dropdown-list-image" :src="avatar" :alt="alt">
                                </div>
                            </router-link>

                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">{{ item.chapter.name }}</div>
                                <span class="small text-gray-500">{{ item.chapter.totalMember }} members</span>
                            </div>
                            
                            <span class="ml-auto small">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button" @click="leaveThisChapter(item.chapter)"><i class="feather-edit"></i> Leave this group</button>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </template>

                <div class="text-center p-3" v-if="!(chapters && chapters.length) && !(yourJoinedChapterList && yourJoinedChapterList.length)">
                  <code style="font-size: 20px;">No data found</code>
                </div>
            </div>
        </div>
    </div>

    <!-- Create chapter Modal -->
    <div class="modal fade" id="addEditChapterModal" tabindex="-1" role="dialog" aria-labelledby="addEditChapterModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <form @submit.prevent="chapterEditMode ? update() : store()">
            <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addEditChapterModalLabel">{{ chapterEditMode ? 'Update' : 'Create' }} chapter</h5>
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
                            <label for="name" class="mb-0">Chapter Name*</label>
                            <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Enter chapter name">
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
                            <label for="rules" class="mb-0">Chapter rules</label>
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
                    </div>

                    <div class="modal-footer">
                        <button :disabled="form.busy" type="submit" class="btn btn-success"> {{ chapterEditMode ? 'Update' : 'Create' }}</button>
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
                        <template v-if="incommingMemberRequestList && incommingMemberRequestList.length">
                            <div class="d-flex align-items-center osahan-post-header people-list mb-3" v-for="(item,index) in incommingMemberRequestList">
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
                                
                                <span class="ml-auto small">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                        </button>
                                        
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <button class="dropdown-item" type="button" @click="chapterAcceptMemberJoiningRequest(item)"><i class="feather-user"></i> Accept Request</button>
                                            <button class="dropdown-item" type="button" @click="chapterDenyMemberJoiningRequest(item)"><i class="feather-user"></i> Deny Request</button>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </template>

                        <template v-else>
                            <div class="text-center">
                                <code style="font-size: 20px;">No data found</code>
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
    name: "Group",
    components: {
      Button,
      HasError,
      AlertError,
      AlertErrors,
      AlertSuccess,
      Editor,
    },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            chapterEditMode: false,
            backgroundImagePreview: '',
            profileImagePreview: '',
            chapters: [],
            yourJoinedChapterList: [],
            incommingMemberRequestList: [],

            form: new Form({
                id: "",
                user_id: "",
                user_type: "",
                background_image: "",
                profile_image: "",
                name: "",
                description: "",
                rules: "",
            }),
        };
    },

    beforeCreate() {
        useHead({title: 'Chapter | EWU'})
    },

    mounted() {
        this.getData();
        this.chapterIncommingMemberRequestList();
    },

    methods: {
        getData() {
            // chapter response
            axios.get(`${this.backendUrl}/chapter`, {
                params: {
                    user_id: this.auth_id,
                    user_type: 'alumni',
                },
            })
            .then((response) => {
                this.chapters = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            // your joining chapter list response
            axios.get(`${this.backendUrl}/chapter-list-where-you-member/` + this.auth_id)
            .then((response) => {
                this.yourJoinedChapterList = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // create chapter modal part
        addChapterModalShow() {
            this.chapterEditMode = false;
            this.form.user_id = this.auth_id;
            this.form.user_type = 'alumni';
            $("#addEditChapterModal").modal("show");
        },

        // chapter background image load
        onBackgroundImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.backgroundImagePreview = reader.result;
                this.form.background_image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        // chapter profile image load
        onProfileImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.profileImagePreview = reader.result;
                this.form.profile_image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        // chapter store method
        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.post(`${this.backendUrl}/chapter`, {
                params: {
                    user_id: this.form.user_id,
                    user_type: this.form.user_type,
                },
            })
            .then((response) => {
                this.getData();
                $("#addEditChapterModal").modal("hide");
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

        // edit chapter modal
        editChapterModalShow(item) {
            this.chapterEditMode = true;
            this.form.user_id = this.auth_id;
            this.form.user_type = 'alumni';
            this.form.fill(item.chapter);
            this.form.background_image = '';
            this.form.profile_image = '';
            this.backgroundImagePreview = item.chapter.background_image;
            this.profileImagePreview = item.chapter.profile_image;
            $("#addEditChapterModal").modal("show");
        },

        // chapter update method
        update() {
          this.$Progress.start();
          this.form.busy = true;
          this.form.put(`${this.backendUrl}/chapter/` + this.form.id)
            .then((response) => {
              this.getData();
              $("#addEditChapterModal").modal("hide");
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

        // delete chapter method
        destroyChapter(item) {
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
                axios.delete(`${this.backendUrl}/chapter/` + item.chapter.id)
                  .then((response) => {
                    this.$swal.fire("Deleted!", response.data.message, "success");
                    this.getData();
                  });
              }
            });
        },

        // chapter joing member request
        chapterIncommingMemberRequestList(chapter_id) {
            axios.get(`${this.backendUrl}/chapter-incomming-member-request-list/` + chapter_id)
            .then((response) => {
                this.incommingMemberRequestList = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // chapter member request modal
        memberRequestModalShow(item) {
            this.chapterIncommingMemberRequestList(item.chapter.id);
            $("#memberRequestModal").modal("show");
        },

        // accept joining member request
        chapterAcceptMemberJoiningRequest(item) {
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
                    axios.post(`${this.backendUrl}/chapter-accept-member-joining-request/` + item.chapter_id + '/' + item.alumni_id)
                    .then((response) => {
                        this.chapterIncommingMemberRequestList(item.chapter_id);
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },

        // deny joining member request
        chapterDenyMemberJoiningRequest(item) {
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
                    axios.post(`${this.backendUrl}/chapter-deny-member-joining-request/` + item.chapter_id + '/' + item.alumni_id)
                    .then((response) => {
                        this.chapterIncommingMemberRequestList(item.chapter_id);
                        this.$swal.fire("Success", response.data.message, "success");
                    });
                }
            });
        },
        
        // leave this chapter
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
    .invitation-dropdown-list-image {
        height: 5rem;
        width: 5rem;
    }

    .custom-form-control {
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .custom-form-control, .btn {
        font-size: 15px;
        padding: 0px;
        height: auto;
    }
</style>