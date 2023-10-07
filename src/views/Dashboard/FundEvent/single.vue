<template>
    <div id="event">
        <div class="row">
            <!-- Main Content -->
            <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                <div class="bg-white mb-3">
                    <div class="col-12 p-3">
                        <span class="ml-auto small float-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm bg-light rounded-circle button-hover"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">
                                        <i class="feather-edit"></i> report
                                    </button>
                                </div>
                            </div>
                        </span>
                    </div>

                    <div class="p-3">
                        <table class="table">
                            <tbody>
                                <tr class="font-weight-bold" style="font-size: 26px;">
                                    <span>
                                        {{ fundEvent.title }}
                                    </span>
                                    &nbsp;
                                    <button class="btn btn-primary float-right" @click="paymentModalShow(fundEvent)">Start Payment</button>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px;">
                                    <span>Fund Amount: </span>
                                    <strong>{{fundEvent.amount}} TK</strong>
                                    <span class="float-end">  Datetime: {{ fundEvent.date }}{{ fundEvent.time }}</span>
                                    <p></p>
                                </tr>
                                <tr class="text-muted" style="font-size: 14px;">
                                    <span>Description: </span>
                                    <p v-html="fundEvent.description"></p>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="p-3">
                        <div class="font-weight-bold text-center" style="font-size: 18px;">
                            <span>
                                Transaction Details
                            </span>
                        </div>
                        <table class="table table-bordered dt-responsive nowrap w-100">
                            <thead>
                                <tr class="text-center align-middle">
                                    <th style="width: 5%">S.No</th>
                                    <th style="width: 35%">Name</th>
                                    <th style="width: 15%">Paid Amount</th>
                                    <th style="width: 25%">Datetime</th>
                                    <th style="width: 20%">Comments</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, index) of fundEvent.fund_event_details" class="text-center align-middle">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ item.user.name }}</td>
                                    <td>{{ item.paid_amount }} TK</td>
                                    <td>{{moment(item.created_at).format('ll')}}, {{ moment(item.created_at,["HH.mm"]).format('hh:mm a') }}</td>
                                    <td>{{ item.comments }}</td>
                                </tr>

                                <tr v-show="!fundEvent.fund_event_details">
                                    <td colspan="6">
                                        <div class="alert alert-danger text-danger text-center" role="alert">
                                            No data available in table :(
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <!-- left side -->
            <aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                <div class="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
                    <router-link :to="{ name: 'profile' }" class="font-weight-bold p-3 d-block">
                        <div class="px-3">
                            <img :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id"
                                 style="width: 150px; height: 150px" />
                        </div>
                        <h5 class="font-weight-bold text-dark mb-1 mt-4">
                            {{ alumni.first_name }} {{ alumni.middle_name }}
                            {{ alumni.last_name }}
                        </h5>
                        <p class="mb-0 text-muted">
                            {{ alumni.designation_department }} at {{ alumni.organization }}
                        </p>
                    </router-link>
                </div>
            </aside>

            <!-- right side -->
            <aside class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                <div class="box shadow-sm border rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Add to your feed</h6>
                    </div>
                    <div class="box-body p-3">
                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" :src="avatar" :alt="alt" />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">Shohel Rana</div>
                                <div class="small text-gray-500">Student at EWU</div>
                            </div>
                            <span class="ml-auto">
                                <button type="button" class="btn btn-light btn-sm" data-toggle="tooltip"
                                        data-placement="bottom" title="follow">
                                    <i class="feather-user-plus"></i>
                                </button>
                            </span>
                        </div>

                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" :src="avatar" :alt="alt" />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">Shohel Rana</div>
                                <div class="small text-gray-500">Student at EWU</div>
                            </div>
                            <span class="ml-auto">
                                <button type="button" class="btn btn-light btn-sm" data-toggle="tooltip"
                                        data-placement="bottom" title="follow">
                                    <i class="feather-user-plus"></i>
                                </button>
                            </span>
                        </div>

                        <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" :src="avatar" :alt="alt" />
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold mr-2">
                                <div class="text-truncate">Shohel Rana</div>
                                <div class="small text-gray-500">Student at EWU</div>
                            </div>
                            <span class="ml-auto">
                                <button type="button" class="btn btn-light btn-sm" data-toggle="tooltip"
                                        data-placement="bottom" title="follow">
                                    <i class="feather-user-plus"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

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
                                            <label>Enter payable Amount (TK)</label>
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
    </div>
</template>

<script>
    import axios from "axios";
    import { useStore } from '../../../store';
    const store = useStore();
    import Form from "vform";
    import Cookies from "js-cookie";
    import { useHead } from '@vueuse/head';
    import moment from 'moment';
    import { useToast } from "vue-toastification";
    const toast = useToast();

    export default {
        name: "Index",

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                avatar: store.$state.avatar,
                alt: store.$state.alt,
                auth_id: `${localStorage.getItem("auth_id")}`,
                authIdCookie: Cookies.get('authIdCookie'),

                alumni: "",
                fundEvent: "",
                moment: moment,

                paymentForm: new Form({
                    id: "",
                    amount:"",
                    paid_amount: "",
                }),

            };
        },

        mounted() {
            this.getData();
        },

        methods: {
            search(nameKey, myArray){
                for (let i=0; i < myArray.length; i++) {
                    if (myArray[i].alumni_id == nameKey) {
                        return myArray[i];
                    }
                }
            },

            getData() {
                axios.get(`${this.backendUrl}/alumni/${localStorage.getItem("auth_id")}`)
                    .then((response) => {
                        this.alumni = response.data.data.alumni;
                        // console.log(this.alumni);
                    })
                    .catch((e) => {
                        console.log(e);
                    });

                axios.get(`${this.backendUrl}/fund-event/` + this.$route.query.fundEventId)
                    .then((response) => {
                        console.log(response)
                        this.fundEvent = response.data;
                        useHead({title: this.fundEvent.title +' | EWU'})
                    })
                    .catch((e) => {
                        console.log(e);
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
                            this.getData();
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

<!--<style>
    .underline-on-hover:hover {
        text-decoration: underline !important;
        color: blue !important;
    }

    .button-hover:hover {
        background-color: #eae7e7;
        transition: 0.7s;
    }

    label.button-hover {
        margin-bottom: 0px;
    }
</style>-->
