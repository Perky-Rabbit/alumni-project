<template>
    <div class="py-4">
        <div class="container">
            <div class="row">
                <!-- Main Content -->
                <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <div class="box shadow-sm rounded bg-white mb-3 osahan-chat">
                        <div class="row border-bottom m-0">
                            <div class="border-right col-lg-5 col-xl-4 px-0">
                                <h5 class="pl-3 pt-3 pr-3 mb-0 pb-3">Messaging</h5>
                            </div>
                        
                            <div class="col-lg-7 col-xl-8 px-0">
                                <div class="p-3 d-flex align-items-center osahan-post-header">
                                    <div class="font-weight-bold mr-1 overflow-hidden">
                                        <div class="d-flex align-items-center" v-if="userMessages.user">
                                            <div class="dropdown-list-image mr-3">
                                                <img class="rounded-circle" v-if="userMessages.user.alumni.alumni" :src="userMessages.user.alumni.alumni.source" :alt="userMessages.user.id">
                                                <img v-else class="rounded-circle" :src="avatar" :alt="alt">
                                                <!-- <div class="status-indicator bg-success"></div> -->
                                            </div>
                                            <div class="font-weight-bold">
                                                <div class="text-truncate">{{userMessages.user.name}}</div>
                                            </div>
                                        </div>
                                        <div v-else class="text-truncate">Please select your friend before starting a message</div>
                                    </div>

                                    <span class="ml-auto mb-auto">
                                        <div class="btn-group">
                                            <a type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis text-secondary"></i>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a class="dropdown-item" type="button" @click.prevent="deleteAllMessage"><i class="feather-trash"></i> Delete All Message</a>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row m-0">
                            <div class="border-right col-lg-5 col-xl-4 px-0">
                                <div class="osahan-chat-left">
                                    <!-- <div class="position-relative icon-form-control p-3 border-bottom">
                                        <i class="feather-search position-absolute"></i>
                                        <input placeholder="Search messages" type="text" class="form-control">
                                    </div> -->

                                    <div class="osahan-chat-list" style="overflow-y: scroll!important">
                                        <div class="p-3 d-flex align-items-center border-bottom osahan-post-header overflow-hidden" style="    cursor: pointer;" v-for="item in userList" @click.prevent="selectUserMessage(item.user.id)">
                                            <div class="dropdown-list-image mr-3">
                                                <img v-if="item.profile_image" class="rounded-circle" :src="item.profile_image" :alt="item.id">
                                                <img v-else class="rounded-circle" :src="avatar" :alt="alt">
                                                <div :id="item.user.id" class="status-indicator bg-danger"></div>
                                            </div>

                                            <div class="font-weight-bold mr-1 overflow-hidden">
                                                <div class="text-truncate">{{item.first_name}} {{item.middle_name}} {{item.last_name}}</div>
                                                <div class="small text-truncate overflow-hidden text-black-50"><i class="feather-check text-primary"></i>{{item.occupation}}</div>
                                            </div>
                                            <!-- <span class="ml-auto mb-auto">
                                               <div class="text-right text-muted pt-1 small">00:21PM</div>
                                            </span> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-7 col-xl-8 px-0">
                                <div class="osahan-chat-box p-3 border-top border-bottom bg-light" style="height:375px;" >
                                    <template v-for="date in uniqueDates" :key="date">
                                        <p class="hr-lines">{{moment(date).format('ll')}}</p>
                                        <div class="d-flex align-items-center osahan-post-header" v-for="message in userMessages.messages" :key="message.id">
                                            <template v-if="moment(message.created_at).format('l') == date">
                                                <div class="dropdown-list-image mr-3 mb-auto">
                                                    <img class="rounded-circle" v-if="message.user.alumni.alumni" :src="message.user.alumni.alumni.source" :alt="message.user.alumni.id">
                                                    <img class="rounded-circle" v-else :src="avatar" :alt="alt">
                                                </div>

                                                <div class="mr-1">
                                                    <div class="text-truncate h6 mb-3">{{ message.user.name }}
                                                        <span class="text-muted pt-1 small">{{moment(message.created_at).format('LT')}}</span>
                                                    </div>
                                                    <p>{{ message.message }}</p>
                                                </div>

                                                <span class="ml-auto mb-auto">
                                                    <div class="btn-group">
                                                        <a type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="fa-solid fa-ellipsis text-secondary"></i>
                                                        </a>

                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item" type="button" @click.prevent="deleteSingleMessage(message.id)"><i class="feather-trash"></i> Delete Message</a>
                                                        </div>
                                                    </div>
                                                </span>
                                            </template>
                                        </div>
                                    </template>
                                </div>

                                <form @submit.prevent="submit">
                                    <div class="w-100 border-top border-bottom">
                                        <span class="pl-3 pr-3" v-if="typing">{{typing}} typing...</span>
                                        <textarea v-if="userMessages.user" @keydown="typeingEvent(userMessages.user.id)" @keydown.enter="sendMessage" v-model="message" placeholder="Write a message…" class="form-control border-0 pl-3 pr-3 pb-3 shadow-none" rows="3"></textarea>
                                        <textarea v-else disabled placeholder="Write a message…" class="form-control border-0 pl-3 pr-3 pb-3 shadow-none" rows="3"></textarea>
                                    </div>

                                    <div class="p-3 d-flex align-items-center">
                                        <!-- <div class="overflow-hidden">
                                            <button type="button" class="btn btn-light btn-sm rounded">
                                                <i class="feather-image"></i>
                                            </button>
                                            <button type="button" class="btn btn-light btn-sm rounded">
                                                <i class="feather-paperclip"></i>
                                            </button>
                                            <button type="button" class="btn btn-light btn-sm rounded">
                                                <i class="feather-camera"></i>
                                            </button>
                                        </div> -->

                                        <span class="ml-auto">
                                            <button type="submit" @click="sendMessage" class="btn btn-primary btn-sm rounded">
                                                <i class="feather-send"></i>
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

                <aside class="col col-xl-3 order-xl-2 col-lg-12 order-lg-2 col-12">
                    <div class="box mb-3 shadow-sm rounded bg-white list-sidebar">
                        <div class="box-title p-3">
                            <h6 class="m-0">my network</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <a href="#">
                                <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-users mr-2 text-dark"></i> Connections <span class="ml-auto font-weight-bold">{{ totalFriends }}</span></li>
                            </a>
                            <!-- <a href="#">
                                <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-book mr-2 text-dark"></i> Contacts <span class="ml-auto font-weight-bold">869</span></li>
                            </a>
                            <a href="#">
                                <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-user-check mr-2 text-dark"></i> People I Follow <span class="ml-auto font-weight-bold">156</span></li>
                            </a>
                            <a href="#">
                                <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-message-circle mr-2 text-dark"></i> Groups <span class="ml-auto font-weight-bold">15</span></li>
                            </a>
                            <a href="#">
                                <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-clipboard mr-2 text-dark"></i> Page <span class="ml-auto font-weight-bold">3</span></li>
                            </a>
                            <a href="#">
                                <li class="list-group-item pl-3 pr-3 d-flex align-items-center text-dark"><i class="feather-tag mr-2 text-dark"></i> Hashtag <span class="ml-auto font-weight-bold">8</span></li>
                            </a> -->
                        </ul>
                    </div>
                    <!-- <div class="box shadow-sm mb-3 border rounded bg-white ads-box text-center">
                        <div class="image-overlap-2 pt-4">
                            <img :src="avatar" class="img-fluid rounded-circle shadow-sm" :alt="alt">
                            <img :src="avatar" class="img-fluid rounded-circle shadow-sm" :alt="alt">
                        </div>
                        <div class="p-3 border-bottom">
                            <h6 class="text-dark">Gurdeep, grow your career by following <span class="font-weight-bold"> Askbootsrap</span></h6>
                            <p class="mb-0 text-muted">Stay up-to industry trends!</p>
                        </div>
                        <div class="p-3">
                            <button type="button" class="btn btn-outline-primary btn-sm pl-4 pr-4"> FOLLOW </button>
                        </div>
                    </div> -->
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useStore } from '../../store';
const store = useStore();
import Cookies from 'js-cookie';
import { useHead } from '@vueuse/head';
import moment from 'moment';

export default {
    name: "Messages",

    data() {
        return {
            moment: moment,
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            avatar: store.$state.avatar,
            alt: store.$state.alt,
            backgroud_image: store.$state.backgroud_image,
            auth_alumni_id : Cookies.get('alumniIdCookie'),
            auth_user_id : Cookies.get('authIdCookie'),
            token : Cookies.get('alumniLoggedInTokenCookie'),
            totalFriends: '',
            authUser: '',
            userList: [],
            userMessages: [],
            uniqueDates: '',
            message:'',
            typing:'' ,
        };
    },

    beforeCreate() {
        useHead({title: 'Chat | EWU'})
    },

    mounted() {
        this.getConnectionUsers();
        this.countTotal();
        this.getAuthUser();

        // connect public channel
        // window.Echo.channel('chat')
        // .listen('PublicChat', (e) => {
        //     // console.log(e);
        //     this.selectUserMessage(e.message.from);
        // })

        // connect private channel
        window.Echo.private(`chat-${this.auth_user_id}`)
        .listen('PrivateChat', (e) => {
            // console.log(e)
            this.selectUserMessage(e.message.from);
        })

        // connect typingevent channel
        window.Echo.private('typingevent')
        .listenForWhisper('typing', (e) => {
            const ownSelectedUserId = this.userMessages.user.id;
            const ownAuthUserId = this.auth_user_id;
            if(e.typingUser.id == ownSelectedUserId && e.typingSelectedUserId == ownAuthUserId) {
                this.typing = e.typingUser.name
            }
            setTimeout(() => {
                this.typing = '';
            }, 2000);
        });

        // connect UserStatus channel
        window.Echo.join('user-status')
        .here((users)=>{
            console.log(users);
            for(let i=0; i<users.length; i++){
                if(this.auth_user_id != users[i]['id']){
                    $('#'+users[i]['id']).removeClass('bg-danger');
                    $('#'+users[i]['id']).addClass('bg-success');
                }
            }
        })
        .joining((user)=>{
            // console.log(user.name+' joined');
            $('#'+user.id).removeClass('bg-danger');
            $('#'+user.id).addClass('bg-success');
        })
        .leaving((user)=>{
            // console.log(user.name+' lieved');
            $('#'+user.id).addClass('bg-danger');
            $('#'+user.id).removeClass('bg-success');
        })
        .listen('UserStatus', (e)=>{
            console.log(e);
        })

        // get user by token
        // axios.get(`${this.backendUrl}/user`, { 
        //     headers: {
        //         'Authorization': `Bearer ${this.token}`,
        //         'Accept': 'application/vnd.api+json',
        //         'Content-Type': 'application/vnd.api+json' 
        //     }
        // })
        // .then((response) => {
        //     console.log(response);
        // })
        // .catch((e) => {
        //     console.log(e);
        // });
    },

    methods: {
        countTotal() {
            // all friends count
            axios.get(`${this.backendUrl}/total-friends-count`, { params: { auth_id:this.auth_alumni_id } })
            .then((response) => {
                this.totalFriends = response.data.data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });
        },

        // get auth user response
        getAuthUser() {
            axios.get(`${this.backendUrl}/user/`+this.auth_user_id)
            .then((response) => {
                this.authUser = response.data;
                // console.log(this.authUser);
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // get connection friend response
        getConnectionUsers() {
            axios.post(`${this.backendUrl}/get-connection-friends`, { auth_id: this.auth_alumni_id })
            .then((response) => {
                this.userList = response.data.data
                // console.log(this.userList);
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // select user messages response
        selectUserMessage(userId){
            axios.get(`${this.backendUrl}/user-message/${this.auth_user_id}/${userId}`)
            .then((response) => {
                this.userMessages = response.data
                // console.log(this.userMessages.messages);

                const dates = this.userMessages.messages.map(item => moment(item.created_at).format('l'));
                this.uniqueDates = [...new Set(dates)];
            })
            .catch((e) => {
                console.log(e);
            });
        },

        // message send response
        sendMessage(e){
            e.preventDefault();
            if(this.message!=''){
                axios.post(`${this.backendUrl}/send-message`, {
                    auth_user_id:this.auth_user_id,
                    user_id:this.userMessages.user.id,
                    message:this.message
                })
                .then((response) => {
                    // console.log(response);
                    this.selectUserMessage(this.userMessages.user.id);
                })
                this.message = '';
            }
        },

        // delete single message response
        deleteSingleMessage(messageId){
            axios.delete(`${this.backendUrl}/delete-single-message/${messageId}`)
            .then((response) => {
                // console.log(response);
                this.selectUserMessage(this.userMessages.user.id)
            });
        },

        // delete all message response
        deleteAllMessage(){
            axios.delete(`${this.backendUrl}/delete-all-message/${this.auth_user_id}/${this.userMessages.user.id}`)
            .then(response=>{
                // console.log(response);
                this.selectUserMessage(this.userMessages.user.id)
            })
        },

        typeingEvent(typingSelectedUserId) {
            window.Echo.private('typingevent')
            .whisper('typing', {
                'typingUser': this.authUser,
                'typingSelectedUserId':typingSelectedUserId,
                'typing':this.message
            });
        }
    },
}
</script>

<style>
    .hr-lines{
        position: relative;
        max-width: 500px;
        text-align: center;
    }

    .hr-lines:before{
        content:" ";
        height: 0.5px;
        width: 200px;
        background: rgb(200, 200, 200);
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
    }

    .hr-lines:after{
        content:" ";
        height: 0.5px;
        width: 200px;
        background: rgb(200, 200, 200);
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
    }
</style>