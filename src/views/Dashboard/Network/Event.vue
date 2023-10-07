<template>
  <div id="event">
    <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
        <div class="box-title pl-3 pr-3 pt-2">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Events</h6>
              </div>
              <button type="button" class="btn btn-light btn-sm ml-auto mb-auto rounded-pill" @click="createEventModalShow()">
                Create Event
              </button>
            </div>
        </div>

        <ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Your events</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Interested</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="going-tab" data-toggle="tab" href="#going" role="tab" aria-controls="going" aria-selected="false">Going</a>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <!-- Your event code start -->
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="box-body p-3" v-for="(item,index) in events" :class="(index + 1) < events.length ? 'border-bottom' : '' ">
                    <div class="d-flex align-items-center osahan-post-header people-list">
                      <router-link :to="{ path: 'event-view', query: { id: item.event.id } }">
                          <div class="mr-3" v-if="item.event.cover_image">
                              <img class="border rounded-circle invitation-dropdown-list-image" :src="item.event.cover_image" :alt="item.event.id">
                          </div>
                          <div class="mr-3" v-else>
                              <img class="border rounded-circle invitation-dropdown-list-image" :src="backgroud_image" :alt="alt">
                          </div>
                      </router-link>

                        <div class="font-weight-bold mr-2">
                            <div class="text-truncate" style="font-size: 15px;">{{ item.event.name }}</div>
                            <div>
                                <span><strong>Start: </strong></span>
                                <span class="small text-gray-500">
                                    {{ item.event.start_date_time }}
                                </span>
                            </div>
                            <div>
                                <span><strong>End: </strong></span>
                                <span class="small text-gray-500">
                                    {{ item.event.end_date_time }}
                                </span>
                            </div>
                        </div>
                        
                        <span class="ml-auto small">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button" @click="memberRequestModalShow(item)"><i class="feather-user"></i> Member Request</button>
                                <button class="dropdown-item" type="button" @click="editEventModalShow(item.event)"><i class="feather-edit"></i> Edit</button>
                                <button class="dropdown-item" type="button" @click="destroyEvent(item.event)"><i class="feather-trash"></i> Delete</button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>

                <div class="text-center p-3" v-if="!(events && events.length)">
                  <strong style="font-size: 20px;">No data found</strong>
                </div>
            </div>

            <!-- interested event code start -->
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <template v-if="interestedEvents && interestedEvents.length">
                    <div class="box-body p-3" v-for="(item,index) in interestedEvents" :class="(index + 1) < interestedEvents.length ? 'border-bottom' : '' ">
                        <div class="d-flex align-items-center osahan-post-header people-list">
                        <router-link :to="{ path: 'event-view', query: { id: item.event.id } }">
                            <div class="mr-3" v-if="item.event.cover_image">
                                <img class="rounded-circle invitation-dropdown-list-image" :src="item.event.cover_image" :alt="item.event.id">
                            </div>
                            <div class="mr-3" v-else>
                                <img class="rounded-circle invitation-dropdown-list-image" :src="backgroud_image" :alt="alt">
                            </div>
                        </router-link>

                        <div class="font-weight-bold mr-2">
                            <div class="text-truncate" style="font-size: 15px;">{{ item.event.name }}</div>
                            <div>
                                <span><strong>Start: </strong></span>
                                <span class="small text-gray-500">
                                    {{ item.event.start_date_time }}
                                </span>
                            </div>
                            <div>
                                <span><strong>End: </strong></span>
                                <span class="small text-gray-500">
                                    {{ item.event.end_date_time }}
                                </span>
                            </div>
                        </div>
                            
                        <span class="ml-auto small">
                            <router-link :to="{ path: 'event-view', query: { id: item.event.id } }" type="button" class="btn btn-sm btn-outline-secondary btn-block rounded-pill">
                                View
                            </router-link>
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

            <!-- going event code start -->
            <div class="tab-pane fade" id="going" role="tabpanel" aria-labelledby="going-tab">
                <template v-if="goingEvents && goingEvents.length">
                    <div class="box-body p-3" v-for="(item,index) in goingEvents" :class="(index + 1) < goingEvents.length ? 'border-bottom' : '' ">
                        <div class="d-flex align-items-center osahan-post-header people-list">
                        <router-link :to="{ path: 'event-view', query: { id: item.event.id } }">
                            <div class="mr-3" v-if="item.event.cover_image">
                                <img class="rounded-circle invitation-dropdown-list-image" :src="item.event.cover_image" :alt="item.event.id">
                            </div>
                            <div class="mr-3" v-else>
                                <img class="rounded-circle invitation-dropdown-list-image" :src="backgroud_image" :alt="alt">
                            </div>
                        </router-link>

                        <div class="font-weight-bold mr-2">
                            <div class="text-truncate" style="font-size: 15px;">{{ item.event.name }}</div>
                            <div>
                                <span><strong>Start: </strong></span>
                                <span class="small text-gray-500">
                                    {{ item.event.start_date_time }}
                                </span>
                            </div>
                            <div>
                                <span><strong>End: </strong></span>
                                <span class="small text-gray-500">
                                    {{ item.event.end_date_time }}
                                </span>
                            </div>
                        </div>
                            
                        <span class="ml-auto small">
                            <router-link :to="{ path: 'event-view', query: { id: item.event.id } }" type="button" class="btn btn-sm btn-outline-secondary btn-block rounded-pill">
                                View
                            </router-link>
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

    <!-- Create and Edit event Modal -->
    <div class="modal fade" id="createEditEventModal" tabindex="-1" aria-labelledby="createEditEventModalLabel" aria-hidden="true">
      <form @submit.prevent="eventEditMode ? update() : store()">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createEditEventModalLabel">{{ eventEditMode ? 'Update' : 'Create' }} event</h5>
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
                        <label for="cover_image" class="mb-0">Upload cover image</label>
                        <input type="file" id="file" class="custom-form-control" @change="onEventCoverImageChange">
                        <img class="mt-1" :src="eventCoverImagePreview" style="width: 100px;" alt="">
                    </div>    
                  </div>

                  <div class="col-md-6">
                      <div class="form-group">
                        <label for="type" class="mb-0">Event Type</label>
                        <select v-model="form.type" class="form-select form-control">
                          <option value="">Select type</option>
                          <option value="online">Online</option>
                          <option value="inperson">Inperson</option>
                        </select>
                      </div>
                  </div>
              </div>

              <div class="form-group">
                <label for="name" class="mb-0">Event Name*</label>
                <input v-model="form.name" type="text" class="form-control" placeholder="Enter event name">
              </div>

              <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="start_date_time" class="mb-0">Start date and time*</label>
                      <input v-model="form.start_date_time" type="datetime-local" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="end_date_time" class="mb-0">End date and time*</label>
                      <input v-model="form.end_date_time" type="datetime-local" class="form-control">
                    </div>
                  </div>
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

              <Multiselect
                v-model="form.speakers"
                mode="tags"
                placeholder="Select speakers"
                :close-on-select="false"
                :searchable="true"
                :create-option="false"
                :options="dependentSpeakers"
              />
            </div>

            <div class="modal-footer">
              <button :disabled="form.busy" type="submit" class="btn btn-success"> {{ eventEditMode ? 'Update' : 'Create' }}</button>
            </div>
          </div>
        </div>
      </form>
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
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
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
      Multiselect
    },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: Cookies.get('alumniIdCookie'),
            eventEditMode: false,
            events: [],
            eventCoverImagePreview: '',
            dependentSpeakers:[],
            form: new Form({
                id: '',
                user_id: "",
                user_type: "",
                cover_image: '',
                type:'',
                name: '',
                start_date_time: '',
                end_date_time: '',
                description: "",
                speakers: [],
            }),
            interestedEvents: [],
            goingEvents: [],
        };
    },

    beforeCreate() {
        useHead({title: 'Events | EWU'})
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            // event speakers response
            axios.get(`${this.backendUrl}/alumni`)
            .then((response) => {
                let data =  response.data.data.map((item) => {
                    return { value: item.id, label: item.first_name+' '+item.middle_name+' '+item.last_name }
                })
                this.dependentSpeakers = data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });

            // event list response
            axios.get(`${this.backendUrl}/event`, { params: { user_id: this.auth_id, user_type: 'alumni' } })
            .then((response) => {
                this.events = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            // interested event list response
            axios.get(`${this.backendUrl}/get-interested-event`, { params: { user_id: this.auth_id } })
            .then((response) => {
                this.interestedEvents = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            // going event list response
            axios.get(`${this.backendUrl}/get-going-event`, { params: { user_id: this.auth_id } })
            .then((response) => {
                this.goingEvents = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // event create modal
        createEventModalShow() {
            this.chapterEditMode = false;
            this.form.user_id = this.auth_id;
            this.form.user_type = 'alumni';
            $("#createEditEventModal").modal("show");
        },

        // event cover image load
        onEventCoverImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.eventCoverImagePreview = reader.result;
                this.form.cover_image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        // event create
        store() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.post(`${this.backendUrl}/event`)
            .then((response) => {
                this.getData();
                if (this.form.successful) {
                this.$Progress.finish();
                toast.success(response.data.data.message);
                this.form.reset()
                $('#file').val('')
                this.eventCoverImagePreview = ''
                $("#createEditEventModal").modal("hide");
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

        // event edit modal
        editEventModalShow(event) {
            this.eventEditMode = true;
            this.form.fill(event);
            this.form.cover_image = '';
            this.eventCoverImagePreview = event.cover_image;
            $("#createEditEventModal").modal("show");
        },

        // event update
        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.put(`${this.backendUrl}/event/` + this.form.id)
            .then((response) => {
                this.getData();
                $("#createEditEventModal").modal("hide");
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success(response.data.data.message);
                    this.form.reset()
                    $('#file').val('')
                    this.eventCoverImagePreview = ''
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

        // event delete
        destroyEvent(event) {
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
                axios.delete(`${this.backendUrl}/event/` + event.id)
                  .then((response) => {
                    this.$swal.fire("Deleted!", response.data.message, "success");
                    this.getData();
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