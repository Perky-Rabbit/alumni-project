<template>
    <div id="header">
        <nav class="navbar navbar-expand navbar-dark bg-dark osahan-nav-top p-0">
            <div class="container">
                <router-link :to="{name: 'dashboard'}" class="navbar-brand mr-2">
                    <img :src="settingKeyAndValueArray.alumniDashboardHeaderLogo" alt="logo">
                </router-link>

                <form class="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div class="input-group">
                        <input type="text" class="form-control shadow-none border-0" placeholder="Search people, jobs & more..." aria-label="Search" aria-describedby="basic-addon2" v-model="globalSearch"/>

                        <div class="input-group-append">
                            <button class="btn" type="button">
                                <i class="feather-search"></i>
                            </button>
                        </div>
                    </div>

                    <div v-show="alumnus.length" class="dropdown-list dropdown-menu dropdown-menu-left shadow-sm show">
                        <h6 class="dropdown-header">Members</h6>

                        <router-link v-for="(item,index) in alumnus" class="dropdown-item d-flex align-items-center" :to="{ path: 'another-profile', query: { username: item.username, id: item.id } }">
                            <div class="dropdown-list-image mr-3">
                                <img v-if="item.alumni" class="rounded-circle" :src="item.alumni.source" :alt="item.id">
                                <img v-else class="rounded-circle" :src="avatar" :alt="alt">
                            </div>
                            <div class="font-weight-bold overflow-hidden">
                                <div class="text-truncate"> {{item.first_name}} {{item.middle_name}} {{item.last_name}} </div>
                                <div class="small text-gray-500">{{item.department_name}}</div>
                            </div>
                        </router-link>

                        <!--<router-link :to="{path: 'member'}" class="dropdown-item text-center small font-weight-bold p-3 d-block text-primary">
                            See all Members
                        </router-link>-->
                        <label class="dropdown-item text-center small font-weight-bold p-3 d-block text-primary" @click="memberPageLoad" role="button">See all Members</label>
                       <!-- <a class="dropdown-item text-center small font-weight-bold p-3 d-block text-primary" href="#">  </a> -->
                    </div>
                </form>

                <ul class="navbar-nav ml-auto d-flex align-items-center">
                    <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                    <li class="nav-item dropdown no-arrow d-sm-none">
                        <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="feather-search mr-2"></i>
                        </a>
                        <!-- Dropdown - Messages -->
                        <div class="dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in"
                             aria-labelledby="searchDropdown">
                            <form class="form-inline mr-auto w-100 navbar-search">
                                <div class="input-group">
                                    <input type="text" class="form-control border-0 shadow-none" placeholder="Search people, jobs and more..." aria-label="Search" aria-describedby="basic-addon2" />
                                    
                                    <div class="input-group-append">
                                        <button class="btn" type="button">
                                            <i class="feather-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{name: 'dashboard'}" class="nav-link" href="#">
                            <i class="feather-briefcase mr-2"></i>
                            <span class="d-none d-lg-inline">Home</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{name: 'messages'}" class="nav-link" href="#">
                            <i class="feather-message-square mr-2"></i>
                            <span class="d-none d-lg-inline">Messaging</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{name: 'MyNetwork'}" class="nav-link">
                            <i class="feather-users mr-2"></i>
                            <span class="d-none d-lg-inline">My Network</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="http://jobs1.ewubd.edu">
                            <i class="feather-briefcase mr-2"></i>
                            <span class="d-none d-lg-inline">Job Portal</span>
                        </a>
                    </li>

                    <!-- message notification -->
                    <!-- <li class="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="feather-message-square"></i>
                            <span class="badge badge-danger badge-counter">2</span>
                        </a>

                        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
                            <h6 class="dropdown-header">Message Center</h6>
                            <a class="dropdown-item d-flex align-items-center" href="#">
                                <div class="dropdown-list-image mr-3">
                                    <img class="rounded-circle" :src="alumniHeaderImage" :alt="alt" />
                                    <div class="status-indicator bg-success"></div>
                                </div>
                                <div class="font-weight-bold overflow-hidden">
                                    <div class="text-truncate">
                                        It is a long established fact that a reader will be distracted by the readable.
                                    </div>
                                    <div class="small text-gray-500">Shohel Rana · 58m</div>
                                </div>
                            </a>

                            <a class="dropdown-item d-flex align-items-center" href="#">
                                <div class="dropdown-list-image mr-3">
                                    <img class="rounded-circle" :src="alumniHeaderImage" :alt="alt" />
                                    <div class="status-indicator bg-success"></div>
                                </div>
                                <div class="font-weight-bold overflow-hidden">
                                    <div class="text-truncate">
                                        It is a long established fact that a reader will be distracted by the readable.
                                    </div>
                                    <div class="small text-gray-500">Shohel Rana · 58m</div>
                                </div>
                            </a>
                            <router-link :to="{ name: 'messages'}" type="button" class="dropdown-item text-center small text-gray-500">
                                Read More Messages
                            </router-link>
                        </div>
                    </li> -->
                    
                    <!-- notification part -->
                    <!-- <li class="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="feather-bell"></i>
                            Counter - Alerts
                            <span v-if="unreadProfileCompletionNotificationList && unreadProfileCompletionNotificationList.length" class="badge badge-danger badge-counter">{{ unreadProfileCompletionNotificationList.length }}</span>
                            <span v-else class="badge badge-danger badge-counter">0</span>
                        </a>

                        Dropdown - Alerts
                        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
                            <h6 class="dropdown-header">Notifications Center</h6>
                            <template v-for="(notification,index) in unreadProfileCompletionNotificationList">
                                <router-link :to="{name: 'profile'}" class="dropdown-item d-flex align-items-center" @click="readProfileCompletionNotification(alumni, notification.id)">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="feather-download-cloud text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">{{ notification.created_at }}</div>
                                        <span class="font-weight-bold">{{ notification.data.message }}</span>
                                    </div>
                                </router-link>
                            </template>

                            <template v-if="unreadProfileCompletionNotificationList && unreadProfileCompletionNotificationList.length">
                                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Notification</a>
                            </template>

                            <template v-else>
                                <span class="dropdown-item text-center small text-gray-500">No Notification Found</span>
                            </template>
                        </div>
                    </li> -->

                    <li class="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="feather-bell"></i>
                            <!-- Counter - Alerts -->
                            <span v-if="unreadNotificationList && unreadNotificationList.length" class="badge badge-danger badge-counter">{{ unreadNotificationList.length }}</span>
                            <span v-else class="badge badge-danger badge-counter">0</span>
                        </a>

                        <!-- Dropdown - Alerts -->
                        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
                            <h6 class="dropdown-header">Notifications Center</h6>
                            <template v-for="(notification,index) in unreadNotificationList">
                                <a href="#" class="dropdown-item d-flex align-items-center" @click="readNotification(alumni, notification.id)">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="feather-download-cloud text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">{{ notification.created_at }}</div>
                                        <span class="font-weight-bold">{{ notification.data.message }}</span>
                                    </div>
                                </a>
                            </template>

                            <template v-if="unreadNotificationList && unreadNotificationList.length">
                                <!-- <a class="dropdown-item text-center small text-gray-500" href="#">Show All Notification</a> -->
                            </template>

                            <template v-else>
                                <span class="dropdown-item text-center small text-gray-500">No Notification Found</span>
                            </template>
                        </div>
                    </li>

                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow ml-1 osahan-profile-dropdown">
                        <a class="nav-link dropdown-toggle pr-0" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <img v-if="alumni.profile_image" class="img-profile rounded-circle" :src="alumni.profile_image" :alt="alumni.id" />
                            <img v-else class="img-profile rounded-circle" :src="avatar" :alt="alt" />
                        </a>

                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-right shadow-sm">
                            <div class="p-3 d-flex align-items-center">
                                <div class="dropdown-list-image mr-3">
                                    <img v-if="alumni.profile_image" class="rounded-circle" :src="alumni.profile_image" :alt="alumni.id" />
                                    <img v-else class="rounded-circle" :src="avatar" :alt="alt" />

                                    <div class="status-indicator bg-success"></div>
                                </div>
                                <div class="font-weight-bold">
                                    <div class="text-truncate">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</div>
                                    <div class="small text-gray-500">{{ alumni.designation_department }}</div>
                                </div>
                            </div>

                            <div class="pl-3 pr-3 d-flex align-items-center">
                                <router-link :to="{ name: 'profile'}" type="button" class="btn btn-outline-primary btn-sm btn-block rounded-pill">
                                    View Profile
                                </router-link>
                            </div>

                            <div class="dropdown-divider"></div>
                            <div class="borderless ml-3">
                                <li><b>Account</b></li>
                                <!-- <router-link :to="{name: 'account_preferences'}" class="dropdown-item">
                                    <i class="feather-edit mr-1"></i> Settings & Privacy
                                </router-link> -->
                                <router-link :to="{name: 'signin_security'}" class="dropdown-item">
                                    <i class="feather-edit mr-1"></i> Settings & Privacy
                                </router-link>

                                <!-- <a class="dropdown-item" href="#"><i class="feather-user mr-1"></i> Help</a> -->
                            </div>

                            <!-- <div class="dropdown-divider"></div>
                            <div class="borderless ml-3">
                                <li><b>Manage</b></li>
                                <a class="dropdown-item" href="#"><i class="feather-edit mr-1"></i> Posts & Activity</a>
                                <a class="dropdown-item" href="#"><i class="feather-user mr-1"></i> Job Posting</a>
                            </div> -->

                            <div class="dropdown-divider"></div>
                            <!-- <a class="dropdown-item" href="#" @click="logout"><i class="feather-log-out mr-1"></i> Sign Out</a> -->
                            <button class="dropdown-item">
                                <i class="feather-log-out mr-1"></i>
                                <span key="t-logout" @click="logout">Sign Out</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import axios from "axios";
    import { useStore } from '../../store';
    const store = useStore();
    import Cookies from 'js-cookie'

    export default {
        name: "Header",

        beforeRouteUpdate (to, from, next) {
            this.memberPageLoad()
            next()
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                avatar: store.$state.avatar,
                alt: store.$state.alt,
                members: store.$state.member,
                alumniHeaderImage: store.$state.alumniHeaderImage,
                auth_id: Cookies.get('alumniIdCookie'),
                token: Cookies.get('alumniLoggedInTokenCookie'),
                searchMode: false,
                alumni: '',
                alumnus: [],
                globalSearch: '',
                // unreadProfileCompletionNotificationList: [],
                unreadNotificationList: [],

                settingKeyAndValueArray: [
                    'alumniDashboardHeaderLogo'
                ]
            };
        },

        watch: {
            globalSearch: function () {
                this.getAlumnus();
            },
        },

        mounted() {
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.settingKeyAndValueArray = value;
            })

            this.getData();
            this.getUnreadNotification();
            // this.getUnreadProfileCompletionNotification();

            // this.interval = setInterval(function(){
            //     this.getUnreadProfileCompletionNotification();
            // }.bind(this), 500);
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}/alumni/`+this.auth_id, { params: { place: 'header' } })
                .then((response) => {
                    this.alumni = response.data.data;
                    // console.log(this.alumni);
                })
                .catch((e) => {
                    console.log(e);
                });
            },

            getUnreadNotification(){
                axios.get(`${this.backendUrl}/get-unread-notification`, { params: { auth_id: this.auth_id } })
                .then((response) => {
                    this.unreadNotificationList = response.data.data;
                })
                .catch((e) => {
                    console.log(e);
                });
            },

            readNotification(alumni, notification_id){
                axios.get(`${this.backendUrl}/read-notification`, { params: { alumni_id: alumni.id, notification_id: notification_id } })
                .then((response) => {
                    this.$router.push({ name: response.data.redirect_url }).then(() => {
                        location.reload();
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
            },

            // getUnreadProfileCompletionNotification(){
            //     axios.get(`${this.backendUrl}/get-unread-profile-completion-notification`, { params: { auth_id: this.auth_id } })
            //     .then((response) => {
            //         this.unreadProfileCompletionNotificationList = response.data.data;
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
            // },

            // readProfileCompletionNotification(alumni, notification_id){
            //     axios.get(`${this.backendUrl}/read-profile-completion-notification`, { params: { alumni_id: alumni.id, notification_id: notification_id } })
            //     .then((response) => {
            //         location.reload();
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
            // },

            logout() {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                axios.post(`${this.backendUrl}/logout`)
                .then((response) => {
                    store.removeAlumniLoggedInInfo();
                })
                .then(() => {
                    this.$router.push({ name: 'login' });
                })
                .catch((e) => {
                    console.log(e);
                });
            },

            getAlumnus() {
                axios.get(`${this.backendUrl}/alumni/search`,{
                        params: {
                            globalSearch: this.globalSearch
                        },
                    })
                    .then((response) => {
                        console.log(response.data.data)
                        this.alumnus = response.data.data.slice(Math.max(response.data.data.length - 10, 0));
                        this.members = response.data.data
                        localStorage.setItem('allMembers',JSON.stringify(response.data.data))
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },

            memberPageLoad(){
                if (this.$route.path === '/member'){
                    this.$router.go(0)
                } else{
                    this.$router.push("member").catch(err => {})
                }
            },
        }
    };
    $(document).on('click', function(event) {
        this.searchMode = false;
    });
</script>

<style>

</style>
