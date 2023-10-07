<template>
  <div id="profile">
    <div class="row">
      <main class="col col-xl-9 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div class="bg-white mb-3">
          <div v-if="alumni.background_image" class="py-4 px-3 border-bottom circular" style="height: 150px;" :style="{ backgroundImage: 'url(' + alumni.background_image + ')' }">
            <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="backgroundImageChange(alumni.background_image, alumni)"><i class="fa-light fa fa-pencil"></i></button>
            
            <a href="#" @click="profileImage(alumni.profile_image, alumni)">
              <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px;">
              <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px;">
            </a>
          </div>

          <div v-else class="py-4 px-3 border-bottom circular" style="height: 150px;" :style="{ backgroundImage: 'url(' + backgroud_image + ')' }">
            <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="backgroundImageChange(alumni.background_image, alumni)"><i class="fa-light fa fa-pencil"></i></button>

            <a href="#" @click="profileImage(alumni.profile_image, alumni)">
              <img v-if="alumni.profile_image" :src="alumni.profile_image" class="img-fluid mt-2 rounded-circle" :alt="alumni.id" style="width: 150px; height: 150px;">
              <img v-else :src="avatar" class="img-fluid mt-2 rounded-circle" :alt="alt" style="width: 150px; height: 150px;">
            </a>
          </div>

          <div class="col-12 p-3">
            <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="basicInfo(alumni)">
              <i class="fa-light fa fa-pencil"></i>
            </button>


            <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="connectSocialMedia('linkedin', alumni)">
              <i class="fa-brands fa-linkedin"></i>
            </button>
            <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="connectSocialMedia('facebook', alumni)">
              <i class="fa-brands fa-square-facebook"></i>
            </button>
          </div>

          <div class="d-flex">
            <div class="col-8 p-3">
              <h5 class="font-weight-bold text-muted mb-1">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }} ({{ alumni.blood_group }})</h5>
              <h6 class="mb-0 text-muted">ID: {{ alumni.ewu_id_no }}</h6>
              <!-- <h6 class="mb-0 text-muted">{{ alumni.designation_department }} at {{ alumni.organization }}</h6> -->

              <p class="mb-0 text-muted">
                {{ alumni.district ? alumni.district.name : '' }} {{ alumni.country ? ', ': '' }} {{ alumni.country ? alumni.country.name : '' }}
                <a href="#" @click="contactInfo" class="underline-on-hover">Contact info</a>
              </p>

              <p>
                <router-link class="text-muted underline-on-hover" :to="{ name: 'connection'}">
                  {{ totalConnectionCount }} conncetions
                </router-link>
              </p>
            </div>
            
            <div class="col-4 p-3">
              <h6 class="mb-0 text-muted">{{ alumni.designation_department }} at {{ alumni.organization }}</h6>
              <!-- <h6 class="text-dark mb-1 mt-2" v-for="(experience, index) in experiences" v-show="index < 1">{{ experience.company_name }}</h6>
              <h6 class="text-dark mb-1 mt-4" v-for="(education, index) in educations" v-show="index < 1">{{ education.school }}</h6> -->
            </div>
          </div>
        </div>

        <!-- profile completion status part -->
        <div class="box mb-3 shadow-sm rounded bg-white view-box overflow-hidden">
            <h6 class="m-0 pl-3 pt-3">Profile completion (%)</h6>
          <div class="d-flex text-center">
            <div class="col-12 p-3">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" :style="{width:profileCompletionPercentageAmount+'%'}">
                  {{ profileCompletionPercentageAmount }}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- start my activity part -->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">My Activity</h6>
              </div>

              <!-- <div class="img-fluid ml-auto mb-auto">
                <button type="button" class="btn btn-light btn-sm float-right rounded-pill" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to your post">
                  <i class="fa fa-add"></i> Start a post
                </button>
              </div> -->
            </div>
          </div>

          <div v-for="(item,index) in newsFeeds" class="box shadow-sm rounded bg-white osahan-post" v-show="index < 1">
            <div class="pl-3 pr-3 pt-1 pb-1 d-flex align-items-center border-bottom osahan-post-header">
              <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" :src="item.alumni.alumni.source" :alt="item.alumni.id" />
              </div>

              <div class="font-weight-bold">
                <div class="text-truncate">{{ item.alumni.first_name }} {{ item.alumni.middle_name }} {{ item.alumni.last_name }}</div>
                <div class="small text-gray-500">{{ item.alumni.designation_department }} at {{ item.alumni.organization }}</div>
                <div class="small text-gray-500">{{ item.created_at }}</div>
              </div>

              <!-- <span class="ml-auto small">
                <button type="button" class="btn btn-sm rounded-circle button-hover">
                  <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                </button>
              </span> -->
            </div>

            <div class="p-3 border-bottom osahan-post-body">
              <span v-if="!readMore[item.id]">
                {{item.show_less_body}}
                <span @click="showMore(item.id)" v-if="item.body && item.body.length > 200" class="btn btn-sm underline-on-hover p-0 text-gray-500">...show more</span>
              </span>

              <span v-if="readMore[item.id]">
                {{item.body}}
                <span @click="showLess(item.id)" class="btn btn-sm underline-on-hover p-0 text-gray-500">show less</span>
              </span>

              <!-- image show start -->
              <table class="table-bordered table-active table-responsive" v-if="item.images.length">
                <tbody v-if="item.images.length == 1">
                  <tr>
                    <th>
                      <img class="img-fluid" :src="item.images[0].source" alt="" style="width:791px; height: 300px;">
                    </th>
                  </tr>
                </tbody>

                <tbody v-if="item.images.length == 2">
                  <tr>
                    <th v-for="(image,index) in item.images">
                      <img class="img-fluid" :src="image.source" alt="" style="width:396px; height: 300px;">
                    </th>
                  </tr>
                </tbody>

                <tbody v-if="item.images.length == 3">
                  <tr>
                    <th colspan="2">
                      <img class="img-fluid" :src="item.images[0].source" alt="" style="width:791px; height: 300px;">
                    </th>
                  </tr>
                  <tr>
                    <template v-for="(image,index) in item.images">
                      <th v-if="index == 1 || index == 2">
                        <img class="img-fluid" :src="image.source" alt="" style="width:396px; height: 300px;">
                      </th>
                    </template>
                  </tr>
                </tbody>

                <tbody class="container" v-if="item.images.length > 3">
                  <tr>
                    <th colspan="4">
                      <img class="img-fluid" :src="item.images[0].source" alt="" style="width:791px; height: 300px;">
                    </th>
                  </tr>
                  <tr>
                    <th colspan="2">
                      <img class="img-fluid" :src="item.images[1].source" alt="" style="width:396px; height: 300px; position: relative;">
                    </th>
                    <th colspan="2">
                      <img class="img-fluid" :src="item.images[2].source" alt="" style="width:396px; height: 300px;     filter: brightness(50%);">
                      <h1 style="position: absolute; top: 72%; left: 72%; color: rgb(255, 255, 255);">+{{ item.images.length - 3 }}</h1>
                    </th>
                  </tr>
                </tbody>
              </table>
              <!-- image show end -->

              <!-- video show start -->
              <table class="table mb-0">
                <tbody v-if="item.video">
                  <tr>
                    <embed :src="item.video" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                  </tr>
                </tbody>
              </table>
              <!-- video show end -->

              <!-- document show start -->
              <table class="table mb-0">
                <tbody v-if="item.document">
                  <tr>
                    <embed :src="item.document+'#toolbar=0'" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                  </tr>
                </tbody>
              </table>
              <!-- document show end -->
            </div>

            <div class="pt-2 pb-2 pl-3 pr-3 border-bottom osahan-post-footer">
              <span class="mr-3 text-secondary underline-on-hover">
                <i class="fa-solid fa-thumbs-up text-primary"></i> 16
              </span>
              <span class="mr-3 text-secondary underline-on-hover">
                <i class="fa-solid fa-comment text-success"></i> 8
              </span>
              <span class="mr-3 text-secondary underline-on-hover">
                <i class="fa-solid fa-arrows-spin text-info"></i> 2
              </span>
            </div>

            <div class="p-3 d-flex align-items-center">
              <div class="mr-auto">
                <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                  <span class="text-muted">
                    <i class="fa-solid fa-thumbs-up mr-2" aria-hidden="true"></i>Like
                  </span>
                </button>
              </div>

              <div class="mr-auto">
                <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                  <span class="text-muted">
                    <i class="fa-solid fa-comment mr-2" aria-hidden="true"></i>Comment
                  </span>
                </button>
              </div>

              <div class="mr-auto">
                <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                  <span class="text-muted">
                    <i class="fa-solid fa-arrows-spin mr-2" aria-hidden="true"></i>Repost
                  </span>
                </button>
              </div>

              <div class="mr-auto">
                <button type="button" class="button-hover btn btn-lg btn-outline-none font-weight-bold text-muted py-2">
                  <span class="text-muted">
                    <i class="fa-solid fa-paper-plane mr-2" aria-hidden="true"></i>Send
                  </span>
                </button>
              </div>
            </div>

            <div class="pt-2 pb-2 pl-3 pr-3 border-top osahan-post-footer text-center div-footer-show-all">
              <router-link :to="{ name: 'activity' }"><b>Show all activity <i class="fa-solid fa-arrow-right"></i></b></router-link>
            </div>
          </div>
        </div>

        <!-- start about part-->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">About You</h6>
              </div>
              <button type="button" class="btn btn-light btn-sm ml-auto mb-auto rounded-circle" @click="addAboutModalShow(alumni)">
                <i class="fa fa-add"></i>
              </button>
            </div>
          </div>
          
          <div v-if="alumni.about" class="box-body p-3">
            <span v-html="alumni.about"></span>
          </div>
        </div>

        <!-- start experience part-->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Experience</h6>
              </div>
              
              <div class="img-fluid ml-auto mb-auto">
                <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="addExperienceInfo(alumni)">
                  <i class="fa fa-add"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="box-body p-3 border-bottom" v-for="experience in experiences">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ experience.title }}</h6>

                <div class="text-truncate">{{ experience.company_name }}|{{ experience.employment_type }}</div>

                <div class="small text-gray-500">{{moment(experience.start_date).format('ll')}} - {{ experience.end_date ? moment(experience.end_date).format('ll') : 'Present' }} | {{ experience.experience }} </div>

                <div class="small text-gray-500">{{ experience.district ? experience.district.name : '' }}, {{ experience.country ? experience.country.name : '' }} | {{ experience.location_type }}</div>
              </div>

              <!-- <div class="ml-auto mb-auto">
                <button type="button" class="btn btn-sm btn-outline-warning rounded-circle mr-1" @click="updateExperienceInfo(alumni, experience)">
                  <i class="fa-light fa fa-pencil"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger rounded-circle" @click="destroyExperienceInfo(experience)">
                  <i class="fa-light fa fa-trash"></i>
                </button>
              </div> -->

              <span class="ml-auto small">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                  </button>

                  <div class="dropdown-menu dropdown-menu-right">
                    <button class="dropdown-item" type="button" @click="updateExperienceInfo(alumni, experience)"><i class="feather-edit"></i> Edit</button>

                    <button class="dropdown-item" type="button" @click="destroyExperienceInfo(experience)"><i class="feather-trash"></i> Delete</button>
                  </div>
                </div>
              </span>
              <!-- <img class="img-fluid ml-auto mb-auto" src="assets/img/l3.png" alt=""> -->
            </div>
            <p class="mb-0">{{ experience.description }}</p>
            <!-- <p><b>Skills:</b> JS, PHP, Laravel</p> -->
          </div>
        </div>

        <!-- start education part-->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Education</h6>
              </div>

              <div class="img-fluid ml-auto mb-auto">
                <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="addEducationInfo(alumni)">
                  <i class="fa fa-add"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="box-body p-3 border-bottom" v-for="education in educations">
            <div class="d-flex align-items-top job-item-header pb-2">
              <div class="mr-2">
                <h6 class="font-weight-bold text-dark mb-0">{{ education.school }}</h6>

                <div class="text-truncate text-primary">{{ education.degree }}, {{ education.field_of_study }}</div>

                <div class="small text-gray-500">{{moment(education.start_date).format('ll')}} - {{ education.end_date ? moment(education.end_date).format('ll') : 'Present' }} | {{ education.study_duration }} </div>
              </div>

              <!-- <div class="ml-auto mb-auto">
                <button type="button" class="btn btn-sm btn-outline-warning rounded-circle mr-1" @click="updateEducationInfo(alumni, education)">
                  <i class="fa-light fa fa-pencil"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger rounded-circle" @click="destroyEducationInfo(education)">
                  <i class="fa-light fa fa-trash"></i>
                </button>
              </div> -->

              <span class="ml-auto small">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm rounded-circle button-hover" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis fa-1x text-secondary"></i>
                  </button>

                  <div class="dropdown-menu dropdown-menu-right">
                    <button class="dropdown-item" type="button" @click="updateEducationInfo(alumni, education)"><i class="feather-edit"></i> Edit</button>

                    <button class="dropdown-item" type="button" @click="destroyEducationInfo(education)"><i class="feather-trash"></i> Delete</button>
                  </div>
                </div>
              </span>
              <!-- <img class="img-fluid ml-auto mb-auto" src="assets/img/e1.png" alt=""> -->
            </div>
            <p class="mb-0">{{ education.description }}</p>
          </div>
        </div>

        <!-- start skill part-->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Skills</h6>
              </div>

              <div class="img-fluid ml-auto mb-auto">
                <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="updateSkillInfoModalShow(alumni)">
                  <i class="fa fa-add"></i>
                </button>
              </div>
            </div>
          </div>

          <div v-if="alumni.skills && alumni.skills.length">
            <div class="box-body p-3 border-bottom">
              <div class="d-flex align-items-top job-item-header">
                <div v-for="(item,index) in alumni.skills" v-show="index < 3" class="p-2 mr-2 px-4 bg-success text-dark rounded-pill">
                  <h6 class="font-weight-bold text-dark mb-0">{{ item.title }}</h6>
                </div>
              </div>
            </div>

            <div class="box-body p-2 div-footer-show-all">
              <div class="text-center">
                <router-link :to="{ name: 'skills' }"><b>Show All {{ alumni.skills.length }} skills <i class="fa-solid fa-arrow-right"></i></b></router-link>
              </div>
            </div>
          </div>

          <div v-else class="text-center">
            <h5 class="p-3">No skill found</h5>
          </div>
        </div>

        <!-- start achievement part-->
        <div class="box shadow-sm rounded bg-white mb-3">
          <div class="box-title border-bottom p-3">
            <div class="d-flex align-items-top">
              <div class="mr-2">
                <h6 class="text-dark mb-0">Achievement</h6>
              </div>

              <div class="img-fluid ml-auto mb-auto">
                <button type="button" class="btn btn-light btn-sm float-right rounded-circle" @click="updateAchievementInfoModalShow(alumni)">
                  <i class="fa fa-add"></i>
                </button>
              </div>
            </div>
          </div>

          <div v-if="alumni.achievements && alumni.achievements.length">
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
                <router-link :to="{ name: 'achievements' }"><b>Show All {{ alumni.achievements.length }} achievements <i class="fa-solid fa-arrow-right"></i></b></router-link>
              </div>
            </div>
          </div>

          <div v-else class="text-center">
            <h5 class="p-3">No achievement found</h5>
          </div>
        </div>
      </main>

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
                :src="avatar" :alt="alumni.id" data-original-title="Sophia Lee">
            </div>
            <a href="#">Advance PHP: Debugging Techniques</a>
          </div>
        </div> -->
      </aside>

      <!-- Background Image Change Modal -->
      <div class="modal fade" id="backgroundImageChangeModal" tabindex="-1" role="dialog" aria-labelledby="backgroundImageChangeModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <form @submit.prevent="backgroundImageUpdate()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="backgroundImageChangeModalLabel">Background Image</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="form-group text-center">
                  <img class="img-fluid mt-2" :src="backgroundImagePreview" alt="" style="height: 150px; width: 100%;">
                </div>
              </div>

              <div class="modal-footer">
                <label class="profile-image-label btn btn-info">
                  <i class="fa fa-cloud-upload"></i> Upload Photo
                  <input type="file" class="form-control profile-image-input" @change="onBackgroundImageChange">
              </label>
                
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Profile Image Modal -->
      <div class="modal fade" id="profileImageModal" tabindex="-1" role="dialog" aria-labelledby="profileImageModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <form @submit.prevent="profileImageUpdate()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="profileImageModalLabel">Profile Photo</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="form-group text-center">
                  <img class="img-fluid mt-2 rounded-circle" :src="profileImagePreview" alt="">
                </div>
              </div>

              <div class="modal-footer">
                <label class="profile-image-label btn btn-info">
                  <i class="fa fa-cloud-upload"></i> Upload Photo
                  <input type="file" class="form-control profile-image-input" @change="onProfileImageChange">
              </label>
                
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Basic Info Modal -->
      <div class="modal fade" id="basicInfoModal" tabindex="-1" role="dialog" aria-labelledby="basicInfoModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <form @submit.prevent="basicInfoUpdate()">
          <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="basicInfoModalLabel">Basic Info</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="d-flex align-items-top mb-3">
                  <div class="mr-2">
                    * Indicates required
                  </div>
                </div>

                <h6>Basic Information</h6>
                <div class="form-group">
                    <label for="ewu_id_no" class="mb-0">Ewu id no</label>
                    <input v-model="basicInfoForm.ewu_id_no" type="text" name="ewu_id_no" class="form-control" placeholder="Enter ewu id no">
                </div>

                <div class="form-group">
                    <label for="first_name" class="mb-0">First Name</label>
                    <input v-model="basicInfoForm.first_name" type="text" name="first_name" class="form-control" placeholder="Enter first name">
                </div>

                <div class="form-group">
                    <label for="middle_name" class="mb-0">Middle Name</label>
                    <input v-model="basicInfoForm.middle_name" type="text" name="middle_name" class="form-control" placeholder="Enter middle name">
                </div>

                <div class="form-group">
                    <label for="last_name" class="mb-0">Last Name</label>
                    <input v-model="basicInfoForm.last_name" type="text" name="last_name" class="form-control" placeholder="Enter last name">
                </div>
                
                <div class="form-group">
                    <label for="dob" class="mb-0">Date of Birth</label>
                    <input v-model="basicInfoForm.dob" type="date" name="dob" class="form-control" placeholder="Enter date of Birth">
                </div>

                <div class="form-group">
                    <label for="blood_group" class="mb-0">Blood Group</label>
                    <select v-model="basicInfoForm.blood_group" class="form-select form-control">
                      <option value="">Select One</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                </div>

                <h6>Organization</h6>
                <div class="form-group">
                    <label for="organization" class="mb-0">Organization Name</label>
                    <input v-model="basicInfoForm.organization" type="text" name="organization" class="form-control" placeholder="Enter Organization Name">
                </div>

                <div class="form-group">
                    <label for="designation_department" class="mb-0">Position</label>
                    <input v-model="basicInfoForm.designation_department" type="text" name="designation_department" class="form-control" placeholder="Enter your position">
                </div>

                <h6>Location</h6>
                <div class="form-group">
                    <label for="country_id" class="mb-0">Country/Region *</label>
                    <select v-model="basicInfoForm.country_id" class="form-select form-control">
                      <option value="">Select One</option>
                      <option v-for="item in countries" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="district_id" class="mb-0">City</label>
                    <select v-model="basicInfoForm.district_id" class="form-select form-control">
                      <option value="">Select One</option>
                      <option v-for="item in districts" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>

              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

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
                  <button type="button" class="btn btn-light btn-sm float-right ml-auto mb-auto rounded-circle" @click="contactInfoEdit(alumni)">
                    <i class="fa-light fa fa-pencil"></i>
                  </button>
                </div>

                <div>
                  <small><i class="fa fa-phone"></i> Personal Contact Number</small>
                </div>
                <div class="d-flex align-items-center osahan-post-header mb-3 people-list">
                  <div class="font-weight-bold mr-2 ml-3">
                    <span>{{ alumni.personal_contact_number }}</span>
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

      <!-- Contact Info Edit Modal -->
      <div class="modal fade" id="contactInfoEditModal" tabindex="-1" role="dialog" aria-labelledby="contactInfoEditModalLabel" aria-hidden="true">
        <form @submit.prevent="contactInfoUpdate()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="contactInfoEditModalLabel">Contact Info</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="d-flex align-items-top mb-3">
                  <div class="mr-2">
                    * Indicates required
                  </div>
                </div>

                <div class="form-group">
                    <label for="personal_contact_number" class="mb-0">Personal Contact Number</label>
                    <input v-model="contactInfoForm.personal_contact_number" type="text" name="personal_contact_number" class="form-control" placeholder="Enter Personal Contact Number">
                </div>

                <div class="form-group">
                    <label for="personal_email" class="mb-0">Personal Email</label>
                    <input v-model="contactInfoForm.personal_email" type="email" name="personal_email" class="form-control" placeholder="Enter Personal Email">
                </div>

                <div class="form-group">
                    <label for="university_email" class="mb-0">University Email</label>
                    <input v-model="contactInfoForm.university_email" type="email" name="university_email" class="form-control" placeholder="Enter University Email">
                </div>

                <div class="form-group">
                    <label for="company_email" class="mb-0">Company Email</label>
                    <input v-model="contactInfoForm.company_email" type="email" name="company_email" class="form-control" placeholder="Enter Company Email">
                </div>
                
                <div class="form-group">
                    <label for="facebook_profile_link" class="mb-0">Facebook Profile Link</label>
                    <input v-model="contactInfoForm.facebook_profile_link" type="text" name="facebook_profile_link" class="form-control" placeholder="Enter Facebook Profile Link">
                </div>

                <div class="form-group">
                    <label for="linkedin_profile_link" class="mb-0">Linkedin Profile Link</label>
                    <input v-model="contactInfoForm.linkedin_profile_link" type="text" name="linkedin_profile_link" class="form-control" placeholder="Enter Linkedin Profile Link">
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Add and Edit Education Info Modal -->
      <div class="modal fade" id="addEditEducationInfoModal" tabindex="-1" role="dialog" aria-labelledby="addEditEducationInfoModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <form @submit.prevent="educationEditMode ? updateEducation(alumni) : storeEducation(alumni)">
          <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="addEditEducationInfoModalLabel">{{ educationEditMode ? 'Update' : 'Add' }} Education</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="d-flex align-items-top mb-3">
                  <div class="mr-2">
                    * Indicates required
                  </div>
                </div>

                <div class="form-group">
                    <label for="school" class="mb-0">School</label>
                    <input v-model="educationForm.school" type="text" name="school" class="form-control" placeholder="Ex: East West University">
                </div>

                <div class="form-group">
                    <label for="degree" class="mb-0">Degree</label>
                    <input v-model="educationForm.degree" type="text" name="degree" class="form-control" placeholder="Ex: Bachelor's">
                </div>

                <div class="form-group">
                    <label for="field_of_study" class="mb-0">Field Of Study</label>
                    <input v-model="educationForm.field_of_study" type="text" name="field_of_study" class="form-control" placeholder="EX: Business">
                </div>

                <div class="form-check" style="height: 40px;">
                  <input v-model="educationForm.is_current" class="form-check-input" type="checkbox" true-value="Yes" false-value="No" style="width: 25px; height: 25px;" />
                  <label class="form-check-label mt-1" style="font-size: larger;">
                    I am currently studying here
                  </label>
                </div>

                <div class="form-group">
                    <label for="start_date" class="mb-0">Start date</label>
                    <input v-model="educationForm.start_date" type="date" name="start_date" class="form-control" placeholder="Ex: 20-10-1970">
                </div>

                <div class="form-group">
                    <label for="end_date" class="mb-0">End date</label>
                    <input v-model="educationForm.end_date" :disabled="educationForm.is_current == 'Yes'" type="date" name="end_date" class="form-control" placeholder="Ex: 20-10-1970">
                </div>
                
                <div class="form-group">
                    <label for="grade" class="mb-0">Grade</label>
                    <input v-model="educationForm.grade" type="text" name="grade" class="form-control" placeholder="Enter your grade">
                </div>

                <div class="form-group">
                    <label for="activities" class="mb-0">Activities</label>
                    <textarea v-model="educationForm.activities" class="form-control" rows="3"
                  cols="50" name="activities" placeholder="Ex: Alpha Phi Omega, Marching Band, Volleball ..."></textarea>
                </div>

                <div class="form-group">
                    <label for="description" class="mb-0">Description</label>
                    <textarea v-model="educationForm.description" class="form-control" rows="3"
                  cols="50" name="description" placeholder="Enter description ..."></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <!-- <button type="submit" class="btn btn-success">Save</button> -->
                <button :disabled="educationForm.busy" type="submit" class="btn btn-success"> {{ educationEditMode ? 'Update' : 'Create' }}</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Add and Edit Experience Info Modal -->
      <div class="modal fade" id="addEditExperienceInfoModal" tabindex="-1" role="dialog" aria-labelledby="addEditExperienceInfoModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <form @submit.prevent="experienceEditMode ? updateExperience(alumni) : storeExperience(alumni)">
          <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="addEditExperienceInfoModalLabel">{{ experienceEditMode ? 'Update' : 'Add' }} Experience</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="d-flex align-items-top mb-3">
                  <div class="mr-2">
                    * Indicates required
                  </div>
                </div>

                <div class="form-group">
                    <label for="title" class="mb-0">Title</label>
                    <input v-model="experienceForm.title" type="text" name="title" class="form-control" placeholder="Ex: Retail Sales Manager">
                </div>

                <div class="form-group">
                    <label for="employment_type" class="mb-0">Employment Type</label>
                    <select v-model="experienceForm.employment_type" class="form-select form-control">
                      <option value="">Select One</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="company_name" class="mb-0">Company Name</label>
                    <input v-model="experienceForm.company_name" type="text" name="company_name" class="form-control" placeholder="Ex: Microsoft">
                </div>

                <div class="form-group">
                    <label for="designation_department" class="mb-0">Designation Department</label>
                    <input v-model="experienceForm.designation_department" type="text" name="designation_department" class="form-control" placeholder="Ex: Software Engineer / EEE">
                </div>

                <h6>Location</h6>
                <div class="form-group">
                    <label for="country_id" class="mb-0">Country/Region *</label>
                    <select v-model="experienceForm.country_id" class="form-select form-control">
                      <option value="">Select One</option>
                      <option v-for="item in countries" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="district_id" class="mb-0">City</label>
                    <select v-model="experienceForm.district_id" class="form-select form-control">
                      <option value="">Select One</option>
                      <option v-for="item in districts" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="location_type" class="mb-0">Location Type</label>
                    <select v-model="experienceForm.location_type" class="form-select form-control">
                      <option value="">Please Select</option>
                      <option value="On Site">On Site</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                </div>

                <div class="form-check" style="height: 40px;">
                  <input v-model="experienceForm.is_current" class="form-check-input" type="checkbox" true-value="Yes" false-value="No" style="width: 25px; height: 25px;" />
                  <label class="form-check-label mt-1" style="font-size: larger;">
                    I am currently working in this role
                  </label>
                </div>

                <div class="form-group">
                    <label for="start_date" class="mb-0">Start date</label>
                    <input v-model="experienceForm.start_date" type="date" name="start_date" class="form-control" placeholder="Ex: 20-10-1970">
                </div>

                <div class="form-group">
                    <label for="end_date" class="mb-0">End date</label>
                    <input v-model="experienceForm.end_date" :disabled="experienceForm.is_current == 'Yes'" type="date" name="end_date" class="form-control" placeholder="Ex: 20-10-1970">
                </div>

                <div class="form-group">
                    <label for="description" class="mb-0">Description</label>
                    <textarea v-model="experienceForm.description" class="form-control" rows="3"
                  cols="50" name="description" placeholder="Enter description ..."></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="experienceForm.busy" type="submit" class="btn btn-success"> {{ experienceEditMode ? 'Update' : 'Create' }}</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Skill Info Modal part -->
      <div class="modal fade" id="updateSkillInfoModal" tabindex="-1" role="dialog" aria-labelledby="updateSkillInfoModalLabel" aria-hidden="true">
        <form @submit.prevent="updateSkillInfo()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="updateSkillInfoModalLabel">Add Skill</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <label for="skill_ids" class="mb-0">Skill</label>
                <div class="form-group d-flex">
                  <Multiselect
                    v-model="skillInfoForm.skill_ids"
                    mode="tags"
                    placeholder="Select skills"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="false"
                    :options="dependentSkills"
                  />

                  <button type="button" class="add-new-input-group text-secondary" @click="createGlobalSkillModalShow()">
                    <i class="fa fa-plus-circle"></i>
                  </button>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="skillInfoForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="modal fade" id="createGlobalSkillModal" tabindex="-1" role="dialog" aria-labelledby="createGlobalSkillModalLabel" aria-hidden="true">
        <form @submit.prevent="createGlobalSkill()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="createGlobalSkillModalLabel">Create Skill</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label for="title" class="mb-0">Title</label>
                  <input v-model="globalSkillForm.title" type="text" name="title" class="form-control" placeholder="Add title">
                </div>

                <div class="form-group">
                    <label for="description" class="mb-0">Description</label>
                    <textarea v-model="globalSkillForm.description" class="form-control" rows="3"
                  cols="50" name="description" placeholder="Enter description ..."></textarea>
                </div>

                <div class="form-group">
                    <label for="status" class="mb-0">Status</label>
                    <select v-model="globalSkillForm.status" class="form-select form-control">
                      <option value="">Please Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="globalSkillForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- achievement info modal part -->
      <div class="modal fade" id="updateAchievementInfoModal" tabindex="-1" role="dialog" aria-labelledby="updateAchievementInfoModalLabel" aria-hidden="true">
        <form @submit.prevent="updateAchievementInfo()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="updateAchievementInfoModalLabel">Add Achievement</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <label for="achievement_ids" class="mb-0">Achievement</label>
                <div class="form-group d-flex">
                  <Multiselect
                    v-model="achievementInfoForm.achievement_ids"
                    mode="tags"
                    placeholder="Select Achievements"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="false"
                    :options="dependentAchievements"
                  />

                  <button type="button" class="add-new-input-group text-secondary" @click="createGlobalAchievementModalShow()">
                      <i class="fa fa-plus-circle"></i>
                    </button>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="achievementInfoForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="modal fade" id="createGlobalAchievementModal" tabindex="-1" role="dialog" aria-labelledby="createGlobalAchievementModalLabel" aria-hidden="true">
        <form @submit.prevent="createGlobalAchievement()">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="createGlobalAchievementModalLabel">Create Achievement</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label for="title" class="mb-0">Title</label>
                  <input v-model="globalAchievementForm.title" type="text" name="title" class="form-control" placeholder="Add title">
                </div>

                <div class="form-group">
                  <label for="field" class="mb-0">Field</label>
                  <input v-model="globalAchievementForm.field" type="text" name="field" class="form-control" placeholder="Add achievemnet field">
                </div>

                <div class="form-group">
                    <label for="description" class="mb-0">Description</label>
                    <textarea v-model="globalAchievementForm.description" class="form-control" rows="3"
                  cols="50" name="description" placeholder="Enter description ..."></textarea>
                </div>

                <div class="form-group">
                  <label for="achievement_date" class="mb-0">Achievement Date</label>
                  <input v-model="globalAchievementForm.achievement_date" type="date" name="achievement_date" class="form-control" placeholder="Ex: 12-12-1970">
                </div>

                <div class="form-group">
                    <label for="status" class="mb-0">Status</label>
                    <select v-model="globalAchievementForm.status" class="form-select form-control">
                      <option value="">Please Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="globalAchievementForm.busy" type="submit" class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- about info part -->
      <div class="modal fade" id="addAboutModal" tabindex="-1" role="dialog" aria-labelledby="addAboutModalLabel" aria-hidden="true">
        <form @submit.prevent="addAbout()">
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="addAboutModalLabel">{{alumni.first_name}} {{alumni.middle_name}} {{alumni.last_name}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div class="modal-body">
                <div class="form-group">
                  <label for="about" class="mb-0">About</label>
                  <Editor
                    v-model="aboutInfoForm.about"
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
                      /*menu: {
                          favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
                        },
                      menubar: 'favs file edit view insert format tools table help',
                      content_css: 'css/content.css'*/
                    }"
                  />
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button :disabled="aboutInfoForm.busy" type="submit" class="btn btn-success">Save</button>
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
import moment from 'moment';
import Cookies from 'js-cookie';
import { useHead } from '@vueuse/head';
import Form from "vform";
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
import { useToast } from "vue-toastification";
const toast = useToast();
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import Editor from '@tinymce/tinymce-vue';

export default {
  name: "Profile",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
    Multiselect,
    Editor,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      backgroud_image: store.$state.backgroud_image,
      auth_id: Cookies.get('alumniIdCookie'),
      token : Cookies.get('alumniLoggedInTokenCookie'),
      moment: moment,
      page_name: "profile",
      totalConnectionCount: "",
      suggestionAlumnis: [],
      alumni: '',
      profileCompletionPercentageAmount: '',

      dependentAchievements: [],
      dependentSkills: [],
      countries: [],
      districts: [],

      educations: [],
      educationEditMode: false,
      experiences: [],
      experienceEditMode: false,

      newsFeeds: [],
      readMore: {},

      // background image part
      valueFromBackgroundImage: "background_image",
      backgroundImagePreview: "",
      backgroundImageForm: new Form({
        id: "",
        background_image: '',
      }),

      // profile image part
      valueFromProfileImage: "profile_image",
      profileImagePreview: "",
      profileImageForm: new Form({
        id: "",
        profile_image: '',
      }),

      // basic info part
      valueFromBasicInfo: "basic_info",
      basicInfoForm: new Form({
        id: "",
        ewu_id_no: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        dob: "",
        blood_group: "",
        organization: "",
        designation_department: "",
        country_id: "",
        district_id: "",
      }),

      // contact info part
      valueFromContactInfo: "contact_info",
      contactInfoForm: new Form({
        id: "",
        personal_contact_number: "",
        personal_email: "",
        university_email: "",
        company_email: "",
        facebook_profile_link: "",
        linkedin_profile_link: "",
      }),

      // education info part
      educationForm: new Form({
        id: "",
        user_id: "",
        user_type: "",
        school: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        grade: "",
        activities: "",
        description: "",
        is_current: 'Yes'
      }),

      // experience info part
      experienceForm: new Form({
        id: "",
        user_id: "",
        user_type: "",
        title: "",
        employment_type: "",
        company_name: "",
        designation_department: "",
        country_id: "",
        district_id: "",
        location_type: "",
        is_current: 'Yes',
        start_date: "",
        end_date: "",
        description: "",
      }),

      // skill info part
      globalSkillForm: new Form({
        id: "",
        title: "",
        description: "",
        status: "",
      }),

      valueFromSkillInfo: "skill_info",
      skillInfoForm: new Form({
        id: "",
        skill_ids: [],
      }),

      // achievement info part
      globalAchievementForm: new Form({
        id: "",
        title: "",
        field: "",
        description: "",
        achievement_date: "",
        status: "",
      }),

      valueFromAchievementInfo: "achievement_info",
      achievementInfoForm: new Form({
        id: "",
        achievement_ids: [],
      }),

      // about info part
      valueFromAboutInfo: "about_info",
      aboutInfoForm: new Form({
        id: "",
        about: "",
      }),
    };
  },

  beforeCreate() {
    useHead({title: 'Profile | EWU'})
  },

  mounted() {
    this.getData();
    this.getUserData();

    // tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  },

  methods: {
    showMore(id) {
      this.readMore[id] = true;
    },
    showLess(id) {
      this.readMore[id] = false;
    },

    getData() {
      // suggestion alumni list response
      axios.get(`${this.backendUrl}/get-suggestion-alumnis`, { params: { auth_id:this.auth_id } })
      .then((response) => {
          this.suggestionAlumnis = response.data.data;
          // console.log(this.suggestionAlumnis);
      })
      .catch((e) => {
          console.log(e);
      });

      // alumni response
      axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
      .then((response) => {
        this.alumni = response.data.data.alumni;
        // console.log(this.alumni);
      })
      .catch((e) => {
        console.log(e);
      });

      // profile completion percentage response
      axios.get(`${this.backendUrl}/alumni/profile-completion-percentage/`+this.auth_id)
      .then((response) => {
        this.profileCompletionPercentageAmount = response.data.percentage;
      })
      .catch((e) => {
        console.log(e);
      });

      // count total friends response
      axios.get(`${this.backendUrl}/total-friends-count`, {
        params: {
          auth_id:this.auth_id
        }
      })
      .then((response) => {
          this.totalConnectionCount = response.data.data;
      })
      .catch((e) => {
          this.$Progress.fail();
      });

      // get country response
      axios.get(`${this.backendUrl}/country`)
      .then((response) => {
        this.countries = response.data.data;
      })
      .catch((e) => {
        this.$Progress.fail();
      });

      // get district response
      axios.get(`${this.backendUrl}/district`)
      .then((response) => {
        this.districts = response.data.data;
      })
      .catch((e) => {
        this.$Progress.fail();
      });

      // get skills response
      axios.get(`${this.backendUrl}/skill`, {
        params: {
          auth_id:this.auth_id
        }
      })
      .then((response) => {
        let data =  response.data.data.map((item) => {
          return { value: item.id, label: item.title }
        })
        this.dependentSkills = data;
      })
      .catch((e) => {
        this.$Progress.fail();
      });

      // get achievements response
      axios.get(`${this.backendUrl}/achievement`, {
        params: {
          auth_id:this.auth_id
        } 
      })
      .then((response) => {
        let data =  response.data.data.map((item) => {
          return { value: item.id, label: item.title }
        })
        this.dependentAchievements = data;
      })
      .catch((e) => {
        this.$Progress.fail();
      });

      // education response
      axios.get(`${this.backendUrl}/education`, {
        params: {
            user_id: this.auth_id,
            user_type: 'alumni',
        }
      })
      .then((response) => {
        this.educations = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });

      // experience response
      axios.get(`${this.backendUrl}/experience`, {
        params: {
            user_id: this.auth_id,
            user_type: 'alumni',
        }
      })
      .then((response) => {
        this.experiences = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });

      // news feed response
      axios.get(`${this.backendUrl}/news-feed`, {
        params: {
          auth_id: this.auth_id,
          page_name: this.page_name,
        },
      })
      .then((response) => {
        this.newsFeeds = response.data.data
      })
      .catch((e) => {
        console.log(e);
      });
    },

    // connection add part
    sendFriendRequest(alumni) {
      this.$Progress.start();
      axios.post(`${this.backendUrl}/send-friend-request/` + alumni.id, {auth_id: this.auth_id})
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

    // background image part
    backgroundImageChange(background_image_url, alumni) {
      if (background_image_url) {
        this.backgroundImagePreview = background_image_url;
      } else {
        this.backgroundImagePreview = store.$state.backgroud_image;
      }
      this.backgroundImageForm.fill(alumni);
      $("#backgroundImageChangeModal").modal("show");
    },

    onBackgroundImageChange(e){
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file) => {
        this.backgroundImagePreview = reader.result;
        this.backgroundImageForm.background_image = reader.result;
      }
      reader.readAsDataURL(file);
    },
    
    backgroundImageUpdate() {
      this.$Progress.start();
      this.backgroundImageForm.busy = true;
      this.backgroundImageForm.put(`${this.backendUrl}/alumni/` + this.backgroundImageForm.id, {
        params: {
          valueFrom: this.valueFromBackgroundImage,
        },
      })
      .then((response) => {
        this.getData();
        $("#backgroundImageChangeModal").modal("hide");
        if (this.backgroundImageForm.successful) {
          this.$Progress.finish();
          toast.success("Background image updated");
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

    // profile image part
    profileImage(profile_image_url, alumni) {
      if (profile_image_url) {
        this.profileImagePreview = profile_image_url;
      } else {
        this.profileImagePreview = store.$state.avatar;
      }
      this.profileImageForm.fill(alumni);
      $("#profileImageModal").modal("show");
    },

    onProfileImageChange(e){
      let file = e.target.files[0];
      let reader = new FileReader();

      // let limit = 1024 * 1024 * 2;
      // if(file['size'] > limit){
      //   swal({
      //       type: 'error',
      //       title: 'Oops...',
      //       text: 'You are uploading a large file',
      //   })
      //   return false;
      // }

      reader.onloadend = (file) => {
        this.profileImagePreview = reader.result;
        this.profileImageForm.profile_image = reader.result;
      }
      reader.readAsDataURL(file);
    },
    
    profileImageUpdate() {
      this.$Progress.start();
      this.profileImageForm.busy = true;
      this.profileImageForm.put(`${this.backendUrl}/alumni/` + this.profileImageForm.id, {
        params: {
          valueFrom: this.valueFromProfileImage,
        },
      })
      .then((response) => {
        this.getData();
        $("#profileImageModal").modal("hide");
        if (this.profileImageForm.successful) {
          this.$Progress.finish();
          toast.success("Profile photo updated");
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

    // basic info part
    basicInfo(alumni) {
      this.basicInfoForm.fill(alumni);
      $("#basicInfoModal").modal("show");
    },

    basicInfoUpdate() {
      this.$Progress.start();
      this.basicInfoForm.busy = true;
      this.basicInfoForm.put(`${this.backendUrl}/alumni/` + this.basicInfoForm.id, {
        params: {
          valueFrom: this.valueFromBasicInfo,
        },
      })
      .then((response) => {
        this.getData();
        $("#basicInfoModal").modal("hide");
        if (this.basicInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Basic info updated");
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

    // contact info part
    contactInfo() { 
      $("#contactInfoModal").modal("show");
    },

    contactInfoEdit(alumni) {
      this.contactInfoForm.fill(alumni);
      $("#contactInfoEditModal").modal("show");
    },

    contactInfoUpdate() {
      this.$Progress.start();
      this.contactInfoForm.busy = true;
      this.contactInfoForm.put(`${this.backendUrl}/alumni/` + this.contactInfoForm.id, {
        params: {
          valueFrom: this.valueFromContactInfo,
        },
      })
      .then((response) => {
        this.getData();
        $("#contactInfoEditModal").modal("hide");
        if (this.contactInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Contact info updated");
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

    // education info part
    addEducationInfo(alumni) {
      this.educationEditMode = false;
      this.educationForm.user_id = alumni.id;
      this.educationForm.user_type = 'alumni';
      $("#addEditEducationInfoModal").modal("show");
    },

    storeEducation() {
      this.$Progress.start();
      this.educationForm.busy = true;
      this.educationForm.post(`${this.backendUrl}/education`, {
        params: {
          user_id: this.educationForm.user_id,
          user_type: this.educationForm.user_type,
        },
      })
      .then((response) => {
        this.getData();
        $("#addEditEducationInfoModal").modal("hide");
        if (this.educationForm.successful) {
          this.$Progress.finish();
          toast.success(response.data.data.message);
          this.educationForm.reset()
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

    updateEducationInfo(alumni, education) {
      this.educationEditMode = true;
      this.educationForm.user_id = alumni.id;
      this.educationForm.user_type = 'alumni';
      this.educationForm.fill(education);
      $("#addEditEducationInfoModal").modal("show");
    },

    updateEducation() {
      this.$Progress.start();
      this.educationForm.busy = true;
      this.educationForm.put(`${this.backendUrl}/education/` + this.educationForm.id)
      .then((response) => {
        this.getData();
        $("#addEditEducationInfoModal").modal("hide");
        if (this.educationForm.successful) {
          this.$Progress.finish();
          toast.success(response.data.data.message);
          this.educationForm.reset()
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

    destroyEducationInfo(education) {
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
            axios.delete(`${this.backendUrl}/education/` + education.id)
            .then((response) => {
              this.$swal.fire("Deleted!", response.data.message, "success");
              this.getData();
            });
          }
        });
    },

    // education info part
    addExperienceInfo(alumni) {
      this.experienceEditMode = false;
      this.experienceForm.user_id = alumni.id;
      this.experienceForm.user_type = 'alumni';
      $("#addEditExperienceInfoModal").modal("show");
    },

    storeExperience() {
      this.$Progress.start();
      this.experienceForm.busy = true;
      this.experienceForm.post(`${this.backendUrl}/experience`, {
        params: {
          user_id: this.experienceForm.user_id,
          user_type: this.experienceForm.user_type,
        },
      })
      .then((response) => {
        this.getData();
        $("#addEditExperienceInfoModal").modal("hide");
        if (this.experienceForm.successful) {
          this.$Progress.finish();
          toast.success(response.data.data.message);
          this.experienceForm.reset()
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

    updateExperienceInfo(alumni, experience) {
      // console.log(experience);
      this.experienceEditMode = true;
      this.experienceForm.user_id = alumni.id;
      this.experienceForm.user_type = 'alumni';
      this.experienceForm.fill(experience);
      $("#addEditExperienceInfoModal").modal("show");
    },

    updateExperience() {
      this.$Progress.start();
      this.experienceForm.busy = true;
      this.experienceForm.put(`${this.backendUrl}/experience/` + this.experienceForm.id)
      .then((response) => {
        this.getData();
        $("#addEditExperienceInfoModal").modal("hide");
        if (this.experienceForm.successful) {
          this.$Progress.finish();
          toast.success(response.data.data.message);
          this.experienceForm.reset()
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

    destroyExperienceInfo(experience) {
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
            axios.delete(`${this.backendUrl}/experience/` + experience.id)
            .then((response) => {
              this.$swal.fire("Deleted!", response.data.message, "success");
              this.getData();
            });
          }
        });
    },

    // skill info part
    createGlobalSkillModalShow() {
      $("#createGlobalSkillModal").modal("show");
    },

    createGlobalSkill() {
      this.$Progress.start()
      this.globalSkillForm.busy = true
      this.globalSkillForm.post(`${this.backendUrl}/skill`)
      .then(response => {
          this.getData()
          $('#createGlobalSkillModal').modal('hide')
          if(this.globalSkillForm.successful){
              this.$Progress.finish();
              toast.success("Skill Added");
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

    updateSkillInfoModalShow(alumni) {
      this.skillInfoForm.fill(alumni);
      $("#updateSkillInfoModal").modal("show");
    },

    updateSkillInfo() {
      this.$Progress.start();
      this.skillInfoForm.busy = true;
      this.skillInfoForm.put(`${this.backendUrl}/alumni/` + this.auth_id, { 
        params: {
          valueFrom: this.valueFromSkillInfo
        }
      })
      .then((response) => {
        this.getData();
        $("#updateSkillInfoModal").modal("hide");
        if (this.skillInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Skill info updated");
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

    // achievement info part
    createGlobalAchievementModalShow() {
      $("#createGlobalAchievementModal").modal("show");
    },

    createGlobalAchievement() {
      this.$Progress.start()
      this.globalAchievementForm.busy = true
      this.globalAchievementForm.post(`${this.backendUrl}/achievement`)
      .then(response => {
        this.getData()
        $('#createGlobalAchievementModal').modal('hide')
        if(this.globalAchievementForm.successful){
          this.$Progress.finish();
          toast.success("Achievement Added");
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
    
    updateAchievementInfoModalShow(alumni) {
      this.achievementInfoForm.fill(alumni);
      $("#updateAchievementInfoModal").modal("show");
    },

    updateAchievementInfo() {
      this.$Progress.start();
      this.achievementInfoForm.busy = true;
      this.achievementInfoForm.put(`${this.backendUrl}/alumni/` + this.achievementInfoForm.id, {
        params: {
          valueFrom: this.valueFromAchievementInfo,
        },
      })
      .then((response) => {
        this.getData();
        $("#updateAchievementInfoModal").modal("hide");
        if (this.achievementInfoForm.successful) {
          this.$Progress.finish();
          toast.success("Achievement info updated");
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

    // about info part
    addAboutModalShow(alumni) {
      this.aboutInfoForm.fill(alumni);
      $("#addAboutModal").modal("show");
    },

    addAbout() {
      this.$Progress.start();
      this.aboutInfoForm.busy = true;
      console.log(this.aboutInfoForm);
      this.aboutInfoForm.put(`${this.backendUrl}/alumni/` + this.aboutInfoForm.id, {
        params: {
          valueFrom: this.valueFromAboutInfo,
        },
      })
      .then((response) => {
        this.getData();
        $("#addAboutModal").modal("hide");
        if (this.aboutInfoForm.successful) {
          this.$Progress.finish();
          toast.success("About updated");
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

    // ***********************************social media integrate part start*********************************
    // data import by access token start
    // connectSocialMedia(provider, alumni) {
    //   this.basicInfoForm.fill(alumni);
    //   $("#basicInfoModal").modal("show");
    //   axios.post(`${this.backendUrl}/get-user-info/${provider}`)
    //   .then((response) => {
    //     if (provider == 'facebook') {
    //       this.basicInfoForm.first_name = response.data.user.user.name;
    //     } else if(provider == 'linkedin') {
    //       this.basicInfoForm.first_name = response.data.user.user.firstName.localized.en_US;
    //       this.basicInfoForm.last_name = response.data.user.user.lastName.localized.en_US;
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // },
    // data import by access token end

    // data import by clientId and cliendSecret start
    getUserData() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('data')) {
        const data = JSON.parse(decodeURIComponent(urlParams.get('data')));

        // Remove URL parameter start
        const urlWithoutParam = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, urlWithoutParam);
        // Remove URL parameter end

        if (data) {
          $("#basicInfoModal").modal("show");
          axios.get(`${this.backendUrl}/alumni/`+this.auth_id)
          .then((response) => {
            this.basicInfoForm.fill(response.data.data.alumni);
            if (data.provider === 'facebook') {
              this.basicInfoForm.first_name = data.name;
            }else if(data.provider === 'linkedin') {
              this.basicInfoForm.first_name = data.first_name;
              this.basicInfoForm.last_name = data.last_name;
            }
          })
        } else {
          $("#basicInfoModal").modal("hide");
        }
      }
    },
    // data import by clientId and cliendSecret end
    
    connectSocialMedia(provider) {
      window.location.href = `${this.backendUrl}/${provider}/redirect`;

      // axios.get(`${this.backendUrl}/${provider}/redirect`)
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((e) => {
      //   console.log(e);
      // });
    },
    // *********************************social media integrate part end************************************
  },
};
</script>

<style>
  .profile-image-input {
    /* display: none; */
    opacity:0;
    position: absolute;
    visibility: hidden;
  }

  .profile-image-label {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 5px 8px;
    cursor: pointer;
  }

  .circular{
    /* width: 90px;
    height: 90px; */
    background-size: cover;
    /* border-radius: 50px;
      -webkit-border-radius: 50px;
      -moz-border-radius: 50px; */
  }

  .add-new-input-group{
    display: flex;
    align-items: center;
    padding: 0.47rem 0.75rem;
    font-size: .8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #eff2f7;
    border: 1px solid #ced4da;
  }

  .underline-on-hover:hover {
      text-decoration: underline !important;
      color: blue !important; 
	}

  .div-footer-show-all:hover{
    background-color: #eae7e7;
    transition: 0.7s;
  }
</style>
