<template>
  <div id="event">
    <div class="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
        <div class="box-title pl-3 pr-3 pt-2">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Fund Events</h6>
              </div>
              <button type="button" class="btn btn-light btn-sm ml-auto mb-auto" @click="createEventModalShow()">
                Create Fund-Event
              </button>
            </div>
        </div>

        <ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All list</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">List Created by You</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="going-tab" data-toggle="tab" href="#going" role="tab" aria-controls="going" aria-selected="false">Check for Payment</a>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">
            <!-- Your event code start -->
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="box-body p-3" v-for="(item,index) in fundEvents">
                    <div class="d-flex align-items-center osahan-post-header people-list">

                            <div class="font-weight-bold mr-2">
                                <router-link :to="{ path: 'single-fund-event', query: { fundEventId: item.id } }">
                                    <div class="text-truncate" style="font-size: 15px;">{{ item.title }}

                                        <sup class="badge bg-warning" v-for="transaction in item.fundEventDetails">
                                            <!--                                    <input type="hidden" :value="creatorSubTotal+=transaction.paid_amount">-->
                                            <span class="pb-0" v-if="transaction.user_id == authIdCookie">You Paid {{creatorSubTotal+=transaction.paid_amount}} tk</span>

                                        </sup>
                                        <input type="hidden" :value="creatorSubTotal = 0">
                                    </div>
                                </router-link>


                                <div>
                                    <span><strong>Amount: </strong></span>
                                    <span class="small text-black-500">
                                    ৳ {{ item.amount }}
                                </span>
                                </div>
                                <div>
                                    <span><strong>Date: </strong></span>
                                    <span class="small text-gray-500">
                                    {{ item.date }}
                                </span>
                                </div>
                                <div>
                                    <span><strong>Time: </strong></span>
                                    <span class="small text-gray-500">
                                    {{ item.time }}
                                </span>
                                </div>
                                <button class="btn btn-primary" @click="paymentModalShow(item)">Start Payment</button>
                                <div v-if="openFieldMode == true">
                                    <input type="number" name="payable_amount" class="form-control">
                                    <button class="btn btn-primary">Pay</button>
                                </div>

                            </div>

                            <span v-show="item.created_by == authIdCookie" class="ml-auto small">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button" @click="memberRequestModalShow(item)"><i class="feather-user"></i> Member Request</button>
                                <button class="dropdown-item" type="button" @click="editEventModalShow(item)"><i class="feather-edit"></i> Edit</button>
                                <button class="dropdown-item" type="button" @click="destroyEvent(item)"><i class="feather-trash"></i> Delete</button>
                                </div>
                            </div>
                        </span>

                    </div>
                </div>

                <div class="text-center p-3" v-if="!(fundEvents && fundEvents.length)">
                  <strong style="font-size: 20px;">No data found</strong>
                </div>
            </div>

            <!-- interested event code start -->
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="p-3 w-100">
                    <div class="box-body p-3" v-for="(item,index) in authCreatorFundEvents">
                        <div class="d-flex align-items-center osahan-post-header people-list">
                            <!--<router-link :to="{ path: 'event-view', query: { id: item.event.id } }">
                                <div class="mr-3" v-if="item.event.cover_image">
                                    <img class="border rounded-circle invitation-dropdown-list-image" :src="item.event.cover_image" :alt="item.event.id">
                                </div>
                                <div class="mr-3" v-else>
                                    <img class="border rounded-circle invitation-dropdown-list-image" :src="backgroud_image" :alt="alt">
                                </div>
                            </router-link>-->

                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate" style="font-size: 15px;">{{ item.title }}</div>
                                <div>
                                    <span><strong>Amount: </strong></span>
                                    <span class="small text-black-500">
                                    ৳ {{ item.amount }}
                                </span>
                                </div>
                                <div>
                                    <span><strong>Date: </strong></span>
                                    <span class="small text-gray-500">
                                    {{ item.date }}
                                </span>
                                </div>
                                <div>
                                    <span><strong>Time: </strong></span>
                                    <span class="small text-gray-500">
                                    {{ item.time }}
                                </span>
                                </div>
                                <div>
                                    <button class="btn btn-primary">Start Payment</button>
                                </div>

                            </div>

                            <span class="ml-auto small">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button" @click="memberRequestModalShow(item)"><i class="feather-user"></i> Member Request</button>
                                <button class="dropdown-item" type="button" @click="editEventModalShow(item)"><i class="feather-edit"></i> Edit</button>
                                <button class="dropdown-item" type="button" @click="destroyEvent(item.event)"><i class="feather-trash"></i> Delete</button>
                                </div>
                            </div>
                        </span>
                        </div>
                    </div>

                    <div class="text-center p-3" v-if="!(authCreatorFundEvents && authCreatorFundEvents.length)">
                        <strong style="font-size: 20px;">No data found</strong>
                    </div>
                </div>
            </div>

            <!-- going event code start -->
            <div class="tab-pane fade" id="going" role="tabpanel" aria-labelledby="going-tab">
                <div class="p-3 w-100">
                    <template v-if="goingEvents && goingEvents.length">
                      <div class="box-body p-3" v-for="(item,index) in goingEvents">
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
              <div class="row">
                  <div class="col-md-12">
                      <div class="form-group my-2">
                          <label>Title*</label>
                          <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title">
                          <HasError :form="form" field="title" />
                    </div>
                  </div>

                  <div class="col-md-6">
                      <div class="form-group my-2">
                          <label>Fund Amount*</label>
                          <input v-model="form.amount" type="number" name="amount" class="form-control" placeholder="Amount Taka">
                          <HasError :form="form" field="amount" />
                      </div>
                  </div>

                  <div class="col-md-6">
                      <div class="form-group my-2">
                          <label>Date</label>
                          <input v-model="form.date" type="date" name="date" class="form-control">
                          <HasError :form="form" field="date" />
                      </div>
                  </div>

                  <div class="col-md-6">
                      <div class="form-group my-2">
                          <label>Time</label>
                          <input v-model="form.time" type="time" name="time" class="form-control">
                          <HasError :form="form" field="time" />
                      </div>
                  </div>
              </div>

              <div class="form-group">
                <label class="mb-0">Description*</label>
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
            </div>

            <div class="modal-footer">
              <button :disabled="form.busy" type="submit" class="btn btn-success"> {{ eventEditMode ? 'Update' : 'Create' }}</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="modal fade" id="paymentModalShow" tabindex="-1" aria-labelledby="paymentModalShowLabel" aria-hidden="true">
        <form @submit.prevent="submit()">
              <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">

                      <div class="modal-body">
                          <div class="row">
                              <div class="col-md-6">
                                  <div class="form-group my-2">
                                      <label>Fund Amount</label>
                                      <input type="text" v-model="paymentForm.amount" class="form-control" :readonly="true">
                                      <input type="hidden" v-model="paymentForm.id" class="form-control" :readonly="true">
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="form-group my-2">
                                      <label>Enter payable Amount</label>
                                      <input type="number" v-model="paymentForm.paid_amount" name="paid_amount" class="form-control" placeholder="Amount Taka" :readonly="false">
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="modal-footer">
                          <button type="submit" class="btn btn-success"> Pay </button>
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
import Form from "vform";
import Cookies from 'js-cookie'
import { useHead } from '@vueuse/head';
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
      Editor
    },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            auth_id: `${localStorage.getItem('auth_id')}`,
            authIdCookie: Cookies.get('authIdCookie'),
            eventEditMode: false,
            openFieldMode: false,
            fundEvents: [],
            authCreatorFundEvents: [],
            fundEventValues: "",
            creatorSubTotal: 0,
            form: new Form({
                id: "",
                title: "",
                description: "",
                amount: "",
                time: "",
                date: "",
                created_by: Cookies.get('authIdCookie'),
            }),

            paymentForm: new Form({
                id: "",
                amount:"",
                paid_amount: "",
            }),

            interestedEvents: [],
            goingEvents: [],
        };
    },

    beforeCreate() {
        useHead({title: 'Fund-Event | EWU'})
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
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

            axios.get(`${this.backendUrl}/fund-event`)
            .then((response) => {
                this.fundEvents = response.data.data
            }).catch((e) => {console.log(e);});

            axios.get(`${this.backendUrl}/fund-event/get-creator-wise`, {
                params: {
                    user_id: this.authIdCookie,
                    user_type: 'alumni',
                },
            })
            .then((response) => {
                this.authCreatorFundEvents = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            axios.get(`${this.backendUrl}/get-interested-event`, {
                params: {
                    user_id: this.auth_id,
                },
            })
            .then((response) => {
                this.interestedEvents = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });

            axios.get(`${this.backendUrl}/get-going-event`, {
                params: {
                    user_id: this.auth_id,
                },
            })
            .then((response) => {
                this.goingEvents = response.data.data
            })
            .catch((e) => {
                console.log(e);
            });
        },

        createEventModalShow() {
            this.chapterEditMode = false;
            this.form.user_id = this.auth_id;
            this.form.user_type = 'alumni';
            $("#createEditEventModal").modal("show");
        },

        onEventCoverImageChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = (file) => {
                this.eventCoverImagePreview = reader.result;
                this.form.cover_image = reader.result;
            }
            reader.readAsDataURL(file);
        },

        store() {
            this.$Progress.start()
            this.form.busy = true
            this.form.post(`${this.backendUrl}/fund-event`)
                .then(response => {
                    this.getData()
                    $('#exampleModal').modal('hide')
                    if(this.form.successful){
                        this.$Progress.finish();
                        toast.success("Fund-Event Added");
                        this.form.reset()
                        $("#createEditEventModal").modal("hide");
                    }else{
                        this.$Progress.fail();
                        toast.error("Something went wrong. Try again later.");
                    }
                })
                .catch(e => {
                    this.$Progress.fail()
                    console.log(e)
                })
        },

        editEventModalShow(event) {
            this.eventEditMode = true;
            this.form.fill(event);
            this.form.cover_image = '';
            this.eventCoverImagePreview = event.cover_image;
            $("#createEditEventModal").modal("show");
        },

        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.put(`${this.backendUrl}/fund-event/` + this.form.id)
            .then((response) => {
                this.getData();
                $("#createEditEventModal").modal("hide");
                if (this.form.successful) {
                    this.$Progress.finish();
                    toast.success("Fund-Event Updated");
                    this.form.reset()
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

        destroyEvent(event) {
          this.$swal
            .fire({
              title: "Are you sure?",
              text: "You will be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios.delete(`${this.backendUrl}/fund-event/` + event.id)
                  .then((response) => {
                    this.$swal.fire("Deleted!", response.data.message, "success");
                    this.getData();
                  });
              }
            });
        },

        paymentModalShow(item){
            this.paymentForm.id = item.id;
            this.paymentForm.amount = item.amount;
            $("#paymentModalShow").modal("show");
        },

        submit(){
            if (this.paymentForm.paid_amount){
                this.$Progress.start();
                this.paymentForm.busy = true;
                this.paymentForm.post(`${this.backendUrl}/fund-payment`, {
                    params:
                        {auth_id: this.authIdCookie}
                })
                    .then((response) => {
                        this.$Progress.finish();
                        toast.success("Your payment Successfully Done!");
                        this.paymentForm.reset()
                        $("#paymentModalShow").modal("hide");
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