<template>
  <div id="another-profile">
    <div class="row">
      <!-- Main Content -->
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="bg-white mb-3">
            <div v-if="alumni.background_image" class="py-4 px-3 border-bottom circular" style="height: 150px;" :style="{ backgroundImage: 'url(' + alumni.background_image + ')' }">
              <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px;">
              <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px;">
            </div>

            <div v-else class="py-4 px-3 border-bottom circular" style="height: 150px;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
              <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px;">
              <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px;">
            </div>

            <div class="d-flex">
              <div class="col-8 p-3">
                <h5 class="font-weight-bold text-dark mb-1 mt-4">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }} ({{ alumni.blood_group }})</h5>

                <h6 class="mb-0 text-muted">ID: {{ alumni.ewu_id_no }}</h6>

                <!-- <h6 class="mb-0 text-muted" v-for="(experience, index) in experiences" v-show="index < 1">{{ experience.title }} at {{ experience.company_name }}</h6> -->

                <p class="mb-0 text-muted">
                  {{ alumni.district ? alumni.district.name : '' }} {{ alumni.country ? ', ': '' }} {{ alumni.country ? alumni.country.name : '' }}
                  <a href="#" @click="contactInfo">Contact info</a>
                  </p>

                <div class="d-flex align-items-center network-item-body mt-2 mb-2" v-if="mutualFriends.length">
                    <div class="overlap-rounded-circle">
                      <template v-for="(item,index) in mutualFriends">
                        <template v-if="item.profile_image">
                          <img v-if="index < 2" class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title="Sophia Lee" :src="item.profile_image" :alt="item.id">
                        </template>

                        <template v-else>
                          <img v-if="index < 2" class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title="Sophia Lee" :src="avatar" :alt="alt">
                        </template>
                      </template>
                    </div>

                    <router-link class="text-muted underline-on-hover" :to="{ name: 'AnotherProfileMutualFriends', query: { username: alumni.username, id: alumni.id } }">
                        {{ mutualFriends.length }} mutual connections:
                        <template v-for="(item,index) in mutualFriends">
                          <template v-if="index < 2">
                            &nbsp;{{ item.middle_name }} {{ item.last_name }},&nbsp;
                          </template>
                        </template>
                        <template v-for="(item,index) in mutualFriends">
                          <template v-if="index >= 2">
                            and {{ mutualFriends.length -2 }} others
                          </template>
                        </template>
                    </router-link>
                </div>

                <div class="d-flex align-items-center mt-3">
                    <button v-if="!singleFriendship" type="button" class="btn btn-outline-primary btn-sm rounded-pill btn-bl mr-3" @click="sendFriendRequest(alumni)">
                      Connect
                    </button>

                    <button v-else-if="singleFriendship && singleFriendship.sender_id == auth_id && singleFriendship.status == 'pending'" type="button" class="btn btn-outline-primary btn-sm rounded-pill btn-bl mr-3" @click="cancelFriendRequest(alumni)">
                      Pending
                    </button>

                    <div v-else-if="singleFriendship && singleFriendship.recipient_id == auth_id && singleFriendship.status == 'pending'">
                      <button type="button" class="btn btn-outline-primary btn-sm rounded-pill btn-bl mr-3" @click="acceptFriendRequest(alumni)">
                        Accept
                      </button>

                      <button type="button" class="btn btn-outline-danger btn-sm rounded-pill btn-bl mr-3" @click="denyFriendRequest(alumni)">
                        Deny
                      </button>
                    </div>

                    <button v-else-if="singleFriendship && (singleFriendship.sender_id == auth_id || singleFriendship.recipient_id == auth_id) && singleFriendship.status == 'accepted'" type="button" class="btn btn-outline-primary btn-sm rounded-pill btn-bl mr-3" @click="unfriend(alumni)">
                      Remove Connection
                    </button>

                    <div class="dropdown">
                        <button class="btn btn-outline-secondary btn-sm rounded-pill btn-bl dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More
                        </button>
                        <div class="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                          <button v-if="blockFriendship && blockFriendship.sender_id == auth_id && blockFriendship.status == 'blocked'" type="button" class="dropdown-item" @click="unblock(alumni)">
                            <i class="fa fa-key"></i> Unblock
                          </button>

                          <button v-else type="button" class="dropdown-item" @click="block(alumni)">
                            <i class="fa fa-key"></i> Block
                          </button>

                          <button v-if="isFollowing == false" type="button" class="dropdown-item" @click="follow(alumni)">
                            <i class="fa fa-key"></i> Follow
                          </button>
                          <button v-else-if="isFollowing == true" type="button" class="dropdown-item" @click="unfollow(alumni)">
                            <i class="fa fa-key"></i> Unfollow
                          </button>
                        </div>
                     </div>
                </div>
              </div>
              
              <div class="col-4 p-3 mt-4">
                <h6 class="mb-0 text-muted">{{ alumni.designation_department }} at {{ alumni.organization }}</h6>
                <!-- <h6 class="text-dark mb-1 mt-2" v-for="(experience, index) in experiences" v-show="index < 1">{{ experience.company_name }}</h6>
                <h6 class="text-dark mb-1 mt-4" v-for="(education, index) in educations" v-show="index < 1">{{ education.school }}</h6> -->
              </div>
            </div>
        </div>

        <!-- profile completion status part -->
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3 d-flex align-items-center">
            <h6 class="m-0">Profile completion (%)</h6>
            <button type="button" class="btn btn-outline-primary btn-sm rounded-pill btn-bl ml-auto" @click="profileCompletionNotification(alumni)">
              Suggest for profile update <i class="feather-arrow-right"></i>
            </button>
          </div>
          <div class="box-body p-3">
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" :style="{width:profileCompletionPercentageAmount+'%'}">
                  {{ profileCompletionPercentageAmount }}%
                </div>
              </div>
          </div>
        </div>

        <!-- start about part -->
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">About You</h6>
              </div>
            </div>
          </div>
          
          <div class="box-body p-3">
            <span v-html="alumni.about"></span>
          </div>
        </div>

        <!-- start experience part -->
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Experience</h6>
              </div>
            </div>
          </div>

          <div class="box-body p-3 border-bottom" v-for="experience in experiences">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ experience.title }}</h6>
                <div class="text-truncate">{{ experience.company_name }}|{{ experience.employment_type }}</div>
                <div class="small text-gray-500">{{ experience.start_date }} - {{ experience.end_date ? experience.end_date : 'Present' }} | {{ experience.experience }} </div>
                <div class="small text-gray-500">{{ experience.district ? experience.district.name : '' }}, {{ experience.country ? experience.country.name : '' }} | {{ experience.location_type }}</div>
              </div>
              <!-- <img class="img-fluid ml-auto mb-auto" src="assets/img/l3.png" alt=""> -->
            </div>
            <p class="mb-0">{{ experience.description }}</p>
            <!-- <p><b>Skills:</b> JS, PHP, Laravel</p> -->
          </div>
        </div>

        <!-- start education part -->
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Education</h6>
              </div>
            </div>
          </div>

          <div class="box-body p-3 border-bottom" v-for="education in educations">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ education.school }}</h6>
                <div class="text-truncate text-primary">{{ education.degree }}, {{ education.field_of_study }}</div>
                <div class="small text-gray-500">{{ education.start_date }} - {{ education.end_date ? education.end_date : 'Present' }} | {{ education.study_duration }} </div>
              </div>
              <!-- <img class="img-fluid ml-auto mb-auto" src="assets/img/e1.png" alt=""> -->
            </div>
            <p class="mb-0">{{ education.description }}</p>
          </div>
        </div>

        <!-- start skills part -->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Skills</h6>
              </div>
            </div>
          </div>

          <!-- <div class="box-body p-3 border-bottom">
            <div class="d-flex align-items-top job-item-header">
              <div v-for="(item,index) in skills" v-show="index < 3" class="p-2 mr-2 px-4 bg-success text-dark rounded-pill">
                <h6 class="font-weight-bold text-dark mb-0">{{ item.title }}</h6>
              </div>
            </div>
          </div> -->
          
          <div class="box-body p-3 border-bottom" v-for="(item,index) in alumni.skills" v-show="index < 3">
            <h6 class="font-weight-bold text-muted mb-2">{{ item.title }}</h6>
            <span class="text-muted underline-on-hover" style="font-size: 14px;" @click="endorserListModalShow(item)">{{ item.endorsement_count }} endorsments</span>

            <div class="mt-1">
              <button v-if="!search(this.$route.query.id, auth_id, 'App\\Models\\Skill', item.id, endorsements)" type="button" class="btn btn-sm btn-outline-secondary rounded-pill" @click="addEndorsement(item)">
                Endorse
              </button>
              <button v-else type="button" class="btn btn-sm btn-outline-secondary rounded-pill" @click="cancelEndorsement(item)">
                <i class="fa fa-check"></i> Endorsed
              </button>
            </div>
          </div>

          <div class="box-body p-2 div-footer-show-all">
            <div class="text-center">
              <router-link :to="{ name: 'AnotherProfileSkills', query: { username: alumni.username, id: alumni.id } }">
                <b v-if="alumni.skills">Show All {{ alumni.skills.length }} skills <i class="fa-solid fa-arrow-right"></i></b>
              </router-link>
            </div>
          </div>
        </div>

        <!-- start achievements part -->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Achievement</h6>
              </div>
            </div>
          </div>

          <div class="box-body p-3 border-bottom" v-for="(achievement,index) in alumni.achievements" v-show="index < 2">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ achievement.title }}</h6>
                <div class="text-truncate text-primary">{{ achievement.field }}</div>
                <div class="small text-gray-500">{{ achievement.achievement_date }}</div>
              </div>
            </div>
            <p class="mb-0">{{ achievement.description }}</p>
          </div>

          <div class="box-body p-2 div-footer-show-all">
            <div class="text-center">
              <router-link :to="{ name: 'AnotherProfileAchievements', query: { username: alumni.username, id: alumni.id } }">
                <b v-if="alumni.achievements">Show All {{ alumni.achievements.length }} achievements <i class="fa-solid fa-arrow-right"></i></b> 
              </router-link>
            </div>
          </div>
        </div>
      </main>

      <!-- Contact Info Show Modal -->
      <div class="modal fade" id="contactInfoModal" tabindex="-1" role="dialog" aria-labelledby="contactInfoModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="contactInfoModalLabel">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="d-flex align-items-top mb-3">
                  <div class="mr-2">
                    <h6 class="text-dark mb-0">Contact Info</h6>
                  </div>
                </div>

                <div>
                  <small><i class="fa fa-phone"></i> Contact Number</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.contact_number }}</span>
                    <!-- <a href="#">{{ alumni.contact_number }}</a> -->
                  </div>
                </div>

                <div>
                  <small><i class="fa-solid fa-envelope"></i> Personal Email</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.personal_email }}</span>
                  </div>
                </div>

                <div>
                  <small><i class="fa-solid fa-envelope"></i> University Email</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.university_email }}</span>
                  </div>
                </div>

                <div>
                  <small><i class="fa-solid fa-envelope"></i> Company Email</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.company_email }}</span>
                  </div>
                </div>

                <div>
                  <small><i class="fa-brands fa-facebook"></i> Facebook Profile Link</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.facebook_profile_link }}</span>
                  </div>
                </div>

                <div>
                  <small><i class="fa-brands fa-linkedin"></i> Linkedin Profile Link</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.linkedin_profile_link }}</span>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </div>

      <!-- endorser list modal -->
      <div class="modal fade" id="endorserListModal" tabindex="-1" role="dialog" aria-labelledby="endorserListModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="endorserListModalLabel">Endorsements</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="box-body p-3" v-for="(item,index) in endorsers" v-bind:class="(index + 1) < endorsers.length ? 'border-bottom' : '' ">
                  <div class="d-flex align-items-center osahan-post-header people-list">
                    <!-- <router-link :to="{ path: 'another-profile', query: { username: item.user.username, id: item.user.id } }"> -->
                      <div v-if="item.user.alumni" class="mr-3">
                        <img class="rounded-circle invitation-dropdown-list-image" :src="item.user.alumni.source" :alt="item.id">
                      </div>
                      <div v-else class="mr-3">
                        <img class="rounded-circle invitation-dropdown-list-image" :src="avatar" :alt="alt">
                      </div>
                    <!-- </router-link> -->

                    <div class="font-weight-bold mr-2">
                      <div class="text-truncate">{{ item.user.first_name }} {{ item.user.middle_name }} {{ item.user.last_name }}</div>
                      <div class="small text-gray-500">
                          {{ item.user.designation_department }} at {{ item.user.organization }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <!-- start right side part -->
      <aside class="col col-xl-3 order-xl-3 col-lg-12 order-lg-3 col-12">
        <div class="box shadow-sm border rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <h6 class="m-0">People you may know</h6>
          </div>

          <div class="box-body p-3">
            <div class="d-flex align-items-center osahan-post-header mb-3 people-list" v-for="(alumni,index) in suggestionAlumnis">
              <div class="dropdown-list-image mr-3">
                <img v-if="alumni.profile_image" class="rounded-circle" :src="alumni.profile_image" :alt="alumni.id">
                <img v-else class="rounded-circle" :src="avatar" :alt="alt">
                <!-- <div class="status-indicator bg-success"></div> -->
              </div>
              <div class="font-weight-bold mr-2">
                <div class="text-truncate">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</div>
                <div class="small text-gray-500">{{ alumni.designation_department }} at {{ alumni.organization }}</div>
              </div>
              <span class="ml-auto">
                <button type="button" class="btn btn-light btn-sm" @click="sendFriendRequest(alumni)">
                  Connect
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- <div class="shadow-sm border rounded bg-white job-item mb-3">
          <div class="d-flex align-items-center p-3 job-item-header">
            <div class="overflow-hidden mr-2">
              <h6 class="font-weight-bold text-dark mb-1 text-truncate">Learning</h6>
              <div class="small text-gray-500">
                Add new skills with these courses, free for 24 hours
              </div>
            </div>
          </div>

          <div class="d-flex align-items-center p-3 border-top job-item-body">
            <div class="overlap-rounded-circle">
              <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                :src="avatar" :alt="alt" data-original-title="Sophia Lee">
            </div>
            <a href="#">Advance PHP: Debugging Techniques</a>
          </div>

          <div class="d-flex align-items-center p-3 border-top job-item-body">
            <div class="overlap-rounded-circle">
              <img class="rounded-circle shadow-sm" data-toggle="tooltip" data-placement="top" title=""
                :src="avatar" :alt="alt" data-original-title="Sophia Lee">
            </div>
            <a href="#">Advance PHP: Debugging Techniques</a>
          </div>
        </div> -->
      </aside>

      <vue-progress-bar></vue-progress-bar>
    </div>
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
  name: "AnotherProfile",

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      auth_id : Cookies.get('alumniIdCookie'),
      suggestionAlumnis: [],
      alumni: '',
      profileCompletionPercentageAmount: '',

      educations: [],
      experiences: [],
      singleFriendship: '',
      blockFriendship: '',
      mutualFriends: [],
      isFollowing: '',

      endorsements: [],
      endorsers: [],
    };
  },

  mounted() {
    this.getData();
    // this.getEducation();
    // this.getExperience();
    // this.profileCompletionPercentage();
  },

  methods: {
    search(user_id, endorser_id, activity_type, activity_id, arr){
      for (let i=0; i < arr.length; i++) {
        if (arr[i].user_id == user_id && arr[i].endorser_id == endorser_id && arr[i].activity_type == activity_type && arr[i].activity_id == activity_id) {
          return arr[i];
        }
      }
    },

    // profileCompletionPercentage() {
    //   axios.get(`${this.backendUrl}/alumni/profile-completion-percentage/${this.$route.query.id}`)
    //   .then((response) => {
    //     this.profileCompletionPercentageAmount = response.data.percentage;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    getData() {
      // suggestion alumni list response
      axios.get(`${this.backendUrl}/get-suggestion-alumnis`, { params: { auth_id:this.auth_id } })
      .then((response) => {
          this.suggestionAlumnis = response.data.data;
          console.log(this.suggestionAlumnis);
      })
      .catch((e) => {
          console.log(e);
      });

      // alumni response
      axios.get(`${this.backendUrl}/alumni/${this.$route.query.id}`)
      .then((response) => {
        this.alumni = response.data.data.alumni;
        useHead({title: this.alumni.first_name +' - Profile | EWU'})
      })
      .catch((e) => {
        console.log(e);
      });

      // profile completion percentage response
      axios.get(`${this.backendUrl}/alumni/profile-completion-percentage/${this.$route.query.id}`)
      .then((response) => {
        this.profileCompletionPercentageAmount = response.data.percentage;
      })
      .catch((e) => {
        console.log(e);
      });

      // get single friends response
      axios.post(`${this.backendUrl}/get-single-friendship/` + this.auth_id + "/" + this.$route.query.id)
      .then((response) => {
        this.singleFriendship = response.data.data
      })
      .catch((e) => {
          console.log(e);
      });

      // get block friends response
      axios.post(`${this.backendUrl}/get-block-friendship/` + this.auth_id + "/" + this.$route.query.id)
      .then((response) => {
        this.blockFriendship = response.data.data
      })
      .catch((e) => {
          console.log(e);
      });

      // get mutual friends response
      axios.post(`${this.backendUrl}/get-mutual-friends/` + this.auth_id + "/" + this.$route.query.id)
      .then((response) => {
        this.mutualFriends = response.data.data
      })
      .catch((e) => {
          console.log(e);
      });

      // is following friend response
      axios.post(`${this.backendUrl}/is-following/` + this.auth_id + "/" + this.$route.query.id)
      .then((response) => {
        this.isFollowing = response.data.data
      })
      .catch((e) => {
          console.log(e);
      });

      // endorsements list response
      axios.get(`${this.backendUrl}/endorsement-list`, { params: { user_id: this.$route.query.id } })
      .then((response) => {
        this.endorsements = response.data.endorsements;
      })
      .catch((e) => {
          console.log(e);
      });

      // get educations response
      axios.get(`${this.backendUrl}/education`, { params: { user_id: this.auth_id, user_type: 'alumni' } })
      .then((response) => {
        this.educations = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });

      // get experiences response
      axios.get(`${this.backendUrl}/experience`, { params: { user_id: this.auth_id, user_type: 'alumni' } })
      .then((response) => {
        this.experiences = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });
    },

    // getEducation() {
    //   axios.get(`${this.backendUrl}/education`, {
    //     params: {
    //         user_id: `${localStorage.getItem('auth_id')}`,
    //         user_type: 'alumni',
    //     }
    //   })
    //   .then((response) => {
    //     this.educations = response.data.data;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // getExperience() {
    //   axios.get(`${this.backendUrl}/experience`, {
    //     params: {
    //         user_id: `${localStorage.getItem('auth_id')}`,
    //         user_type: 'alumni',
    //     }
    //   })
    //   .then((response) => {
    //     this.experiences = response.data.data;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },

    // contact info part
    contactInfo() { 
      $("#contactInfoModal").modal("show");
    },

    // send friend request part
    sendFriendRequest(alumni) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/send-friend-request/` + alumni.id, {auth_id: this.auth_id})
      .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    // cancel friend request part
    cancelFriendRequest(alumni) {
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
          axios.post(`${this.backendUrl}/cancel-friend-request/` + alumni.id, {auth_id: this.auth_id})
          .then((response) => {
            this.$swal.fire("Success", response.data.message, "success");
            this.getData();
          });
        }
      });
    },

    // accept friend request part
    acceptFriendRequest(alumni) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/accept-friend-request/` + alumni.id, {auth_id: this.auth_id})
      .then((response) => {
        this.getData();
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    // deny friend request part
    denyFriendRequest(alumni) {
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
          axios.post(`${this.backendUrl}/deny-friend-request/` + alumni.id, {auth_id: this.auth_id})
          .then((response) => {
            this.$swal.fire("Success", response.data.message, "success");
            this.getData();
          });
        }
      });
    },

    // unfriend friend part
    unfriend(alumni) {
      this.$swal
      .fire({
        title: "Are you sure?",
        text: `Are you sure you want to remove ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name } ✪ as a connection? Don’t worry, ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name } won’t be notified by Alumni Portal.`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "NO",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(`${this.backendUrl}/unfriend/` + alumni.id, {auth_id: this.auth_id})
          .then((response) => {
            this.$swal.fire("Success", response.data.message, "success");
            this.getData();
          });
        }
      });
    },

    // block friend part
    block(alumni) {
      this.$swal
      .fire({
        title: "Are you sure?",
        text: `Are you sure you want to block ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name } ✪ as a connection? Don’t worry, ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name } won’t be notified by Alumni Portal.`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "NO",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(`${this.backendUrl}/block/` + alumni.id, {auth_id: this.auth_id})
          .then((response) => {
            this.$swal.fire("Success", response.data.message, "success");
            this.getData();
          });
        }
      });
    },

    // unblock friend part
    unblock(alumni) {
      this.$swal
      .fire({
        title: "Are you sure?",
        text: `Are you sure you want to unblock ${ alumni.first_name } ${ alumni.middle_name } ${ alumni.last_name }.`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "NO",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(`${this.backendUrl}/unblock/` + alumni.id, {auth_id: this.auth_id})
          .then((response) => {
            this.$swal.fire("Success", response.data.message, "success");
            this.getData();
          });
        }
      });
    },

    // follow alumni part
    follow(alumni) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/follow/` + alumni.id, {auth_id: this.auth_id})
        .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    // unfollow alumni part
    unfollow(alumni) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/unfollow/` + alumni.id, {auth_id: this.auth_id})
        .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    // send profile completion notification part
    profileCompletionNotification(alumni){
      this.$Progress.start();
      axios.post(`${this.backendUrl}/profile-completion-notification/` + alumni.id, {
        redirect_url: 'profile',
        sender_id: this.auth_id,
        profile_completion_percentage_amount: this.profileCompletionPercentageAmount
      })
      .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    // add endorsement part
    addEndorsement(item) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/add-endorsement`, {
        user_id: this.$route.query.id,
        endorser_id: this.auth_id,
        activity_type: 'App\\Models\\Skill',
        activity_id: item.id,
      })
      .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    // cancel endorsement part
    cancelEndorsement(item) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/cancel-endorsement`, {
        user_id: this.$route.query.id,
        endorser_id: this.auth_id,
        activity_type: 'App\\Models\\Skill',
        activity_id: item.id,
      })
      .then((response) => {
        this.getData()
        this.$Progress.finish();
        toast.success(response.data.message);
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },
    
    // endroser list show
    endorserListModalShow(item){
      this.endorsers = item.endorsers;
      $("#endorserListModal").modal("show");
    },
  },
};
</script>

<style>
  .underline-on-hover:hover {
      text-decoration: underline !important;
      color: blue !important; 
	}
  
  .div-footer-show-all:hover{
    background-color: #eae7e7;
    transition: 0.7s;
  }
</style>
