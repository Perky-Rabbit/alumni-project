<template>
  <div id="index">
    <!--Start Banner Area-->
    <div v-if="sectionSetup.sec_alumni_home_slider === 'show'" class="banner-area">
      <Carousel :autoplay="3000" :itemsToShow="1" :wrapAround="true" :transition="1000">
        <Slide v-for="(slider, index) in sliders" :key="index">
          <div class="carousel__item custom_carousel_item">
            <img class="d-block w-100" :src="slider.image" :alt="slider.id" style="height:100%;" />
            <div class="overlay">
              <h4 class="text-white slider-title mb-0">{{ slider.title }}</h4>
              <p class="text-white slider-desc mb-1">
                {{ slider.short_description && slider.short_description.substring(0, 150) }}
                {{ slider.short_description && slider.short_description.length >= 150 ? '...' : '' }}
              </p>
              <a v-if="slider.url" :href="slider.url" class="btn btn-sm btn-danger rounded-5">View Details</a>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <!-- <Pagination /> -->
        </template>
      </Carousel>
    </div>
    <!--End Banner Area-->

    <!-- welcome part start -->
    <div v-if="sectionSetup.sec_alumni_home_welcome === 'show'" class="welcome graduate-admission ptb-50">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="how-to-apply">
              <h2 class="welcome-header text-center text-white">{{ settingKeyAndValueArray.welcomeTitle }}</h2>
              <p class="welcome-body text-white-90" style="text-align: justify">
                {{ welcome.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- welcome part end -->

    <!-- Feature alumni part start -->
    <div v-if="sectionSetup.sec_alumni_home_feature_alumni === 'show'" class="latest-news-area pt-70 pb-50 bg-f4f6f9">
      <div class="container">
        <div class="section-title" style="max-width: 944px;">
          <h2 class="text-center">{{ settingKeyAndValueArray.featureAlumniTitle }}</h2>
          <p class="text-center">{{ settingKeyAndValueArray.featureAlumniSubTitle }}</p>
        </div>

        <Carousel :autoplay="3000" :itemsToShow="3" :wrapAround="true" :transition="500">
          <Slide v-for="(alumni, index) in featuredAlumnis" :key="index">
            <div class="card rounded-4 shadow-sm mb-4 m-1" style="min-height: 310px;">
              <div class="card-body">
                <div class="text-center mb-4">
                  <img
                    v-if="alumni.profile_image"
                    class="rounded-circle"
                    :src="alumni.profile_image"
                    :alt="alumni.id"
                    style="width: 120px; height: 120px; border: 7px solid #111D5E;"
                  >
                  <img
                    v-else
                    class="rounded-circle"
                    :src="avatar"
                    :alt="alt"
                    style="width: 120px; height: 120px; border: 7px solid #111D5E;"
                  >
                </div>

                <div class="text-center">
                  <p class="mb-3 font-weight-bold" v-html="alumni.about ? alumni.about.substring(0, 150) : ''"></p>
                  <h4>{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h4>
                </div>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
    <!-- Feature alumni part end -->

    <!--start alumni Newsroom part start-->
    <div v-if="sectionSetup.sec_alumni_home_news_room === 'show'" class="lates-news-area ptb-50">
      <div class="container">
        <div class="section-title" style="max-width: 944px;">
          <h2>{{ settingKeyAndValueArray.newsroomTitle }}</h2>
          <p>{{ settingKeyAndValueArray.newsroomSubTitle }}</p>
        </div>

        <div class="row justify-content-center">
          <!-- <div v-for="(item, index) in news" class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200" data-aos-once="true"> -->
          <div v-for="(item, index) in news" class="col-lg-4 col-md-6">
            <div class="single-news-card">
              <div class="news-img">
                <!-- {{ item['images'][0].source }} -->
                <img v-if="item['images'][0]" style="width: 100%; min-height: 300px; max-height: 300px;" :src="item['images'][0].source" :alt="item.id">
                <img v-else style="width: 100%; min-height: 300px; max-height: 300px;" :src="avatar" :alt="alt">
              </div>
              <div class="news-content">
                <!-- <div class="list">
                  <ul>
                    <li>
                      <i class="flaticon-tag"></i>
                      <span v-for="(category,index) in item.categories">
                        {{ category.name }}{{ (index+1 < item.categories.length) ? ', ' : '' }}
                      </span>
                    </li>
                  </ul>
                </div> -->

                <!-- <router-link :to="{ name: 'singleNews', query: {id: item.id} }">
                  <h3>{{ item.title.substring(0,30)}} {{item.title.length >= 30 ? `...` : ''}}</h3>
                </router-link>
                <router-link :to="{ name: 'singleNews', query: {id: item.id} }">
                  <p>{{item.description.substring(0,70)}} {{item.description.length >= 70 ? `...` : ''}}</p>
                </router-link> -->

                <router-link :to="`/news/${item.slug}`">
                  <h3>{{ item.title.substring(0,30)}} {{item.title.length >= 30 ? `...` : ''}}</h3>
                </router-link>

                <router-link :to="`/news/${item.slug}`">
                  <p v-html="item.description.substring(0, 70) + (item.description.length >= 70 ? '...' : '')"></p>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="more-latest-news text-center">
          <p>Select From Hundreds of Options.
            <router-link :to="{name: 'news'}" class="read-more-btn active"> More on News<i class="flaticon-next"></i></router-link>
          </p>
        </div>
      </div>
    </div>
    <!--start alumni Newsroom part end-->

    <!--Start Latest Member-->
    <div v-if="sectionSetup.sec_alumni_home_latest_member === 'show'" class="events-area bg-f4f6f9 ptb-50">
      <div class="container">
        <div class="section-title" style="max-width: 944px;">
          <h2>{{ settingKeyAndValueArray.latestMemberTitle }}</h2>
          <p>{{ settingKeyAndValueArray.latestMemberSubTitle }}</p>
        </div>

        <div class="row justify-content-center">
          <div v-for="(alumni, index) in alumnis" class="col-lg-3 col-md-3">
            <div class="single-news-card">
              <div class="news-img">
                <img v-if="alumni.profile_image" style="width: 100%; min-height: 300px; max-height: 300px;" :src="alumni.profile_image" :alt="alumni.id">
                <img v-else style="width: 100%; min-height: 300px; max-height: 300px;" :src="avatar" :alt="alt">
              </div>
              <div class="news-content">
                <h3>{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}</h3>
                <p>{{ alumni.department_name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end Latest Member-->

    <!--Start Events Area-->
    <div v-if="sectionSetup.sec_alumni_home_notice_events === 'show'" class="events-area ptb-50">
      <div class="container">
        <div class="section-title" style="max-width: 944px;">
          <h2>{{ settingKeyAndValueArray.eventTitle }}</h2>
          <p>{{ settingKeyAndValueArray.eventSubTitle }}</p>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-6" v-for="(event,index) in noticeEvents">
            <div class="single-events-card style-4">
              <!-- <div class="events-image">
                <div class="date pt-0 pb-0" style="bottom: -25px;">
                    <span style="font-size: 14px;">
                      <i class="flaticon-writing-tool"></i> Apr 28, 2023
                    </span>
                    <br>
                    <span style="font-size: 12px; color: black;">
                      <i class="flaticon-time"></i> 10:00 AM
                    </span>
                </div>
              </div> -->
              <div class="events-content" style="padding:15px;">
                <div class="d-flex justify-content-between">
                  <div style="font-size: 12px; font-weight: bold;">
                    <i class="flaticon-writing-tool"></i> {{moment(event.date).format('ll')}}
                  </div>
                  <div style="font-size: 12px; font-weight: bold;">
                    <i class="flaticon-time"></i> {{ moment(event.time,["HH.mm"]).format('hh:mm A') }}
                  </div>
                </div>
                <!-- <div class="admin">
                    <p><a href="events-details.html"><i class="flaticon-student-with-graduation-cap"></i>Upcomming or past</a></p>
                </div> -->
                
                <!-- <router-link :to="{ name: 'singleEvent', query: {id: event.id} }">
                  <h3 class="mt-2">{{ event.title.substring(0,50)}} {{event.title.length >= 50 ? `...` : ''}}</h3>
                </router-link> -->

                <router-link :to="`/notice-event/${event.slug}`">
                  <h3 class="mt-2">{{ event.title.substring(0,50)}} {{event.title.length >= 50 ? `...` : ''}}</h3>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="more-latest-news text-center">
          <p>Select From Hundreds of Options.
            <router-link :to="{name: 'notice-event'}" class="read-more-btn active"> More on events<i class="flaticon-next"></i></router-link>
          </p>
        </div>
      </div>
    </div>
    <!--End Events Area-->
  </div>

  <vue-progress-bar></vue-progress-bar>
</template>

<script>
import axios from "axios";
import { useStore } from '../../store';
const store = useStore();
import moment from 'moment';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { useHead } from '@vueuse/head';

export default {
  name: "Index",

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      avatar: store.$state.avatar,
      alt: store.$state.alt,
      moment: moment,
      welcome: '',
      slider_place: 'alumni_home',
      sliders: [],
      news_place: 'alumni',
      news: [],
      latest_member_place: 'alumni_home',
      alumnis: [],
      featuredAlumnis: [],
      noticeEvents:[],

      sectionSetup: {
        sec_alumni_home_slider: '',
        sec_alumni_home_welcome: '',
        sec_alumni_home_feature_alumni: '',
        sec_alumni_home_news_room: '',
        sec_alumni_home_latest_member: '',
        sec_alumni_home_notice_events: ''
      },

      settingKeyAndValueArray: [
        'welcomeTitle',
        'featureAlumniTitle',
        'featureAlumniSubTitle',
        'newsroomTitle',
        'newsroomSubTitle',
        'latestMemberTitle',
        'latestMemberSubTitle',
        'eventTitle',
        'eventSubTitle'
      ]
    };
  },

  watch: {
    keyword: function () {
      this.getData();
    },
  },

  mounted() {
    this.$Progress.start();
    this.getData();

    this.$setting(this.settingKeyAndValueArray).then(value => {
      this.settingKeyAndValueArray = value;
    })
  },

  // created() {
  //   const url = window.location.pathname;
  //   axios.get(`${this.backendUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } })
  //     .then((response) => {
  //       // console.log(response.data.data);
  //       if (response.data.data != null) {
  //         useHead({ title: response.data.data.title });
  //       } else {
  //         useHead({ title: 'Alumni | EWU' });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // },

  methods: {
    getData() {
      // Slider response
      axios.get(`${this.backendUrl}/slider`, {params: {place:this.slider_place}})
      .then((response) => {
          this.sliders = response.data.data;
          // console.log(this.sliders);
      })
      .catch((e) => {
          this.$Progress.fail();
          console.log(e);
      });

      // welcome response
      axios.get(`${this.backendUrl}/whoWeAre`, {params: {type: 'alumni'}})
      .then((response) => {
          this.welcome = response.data;
          // console.log(this.welcome);
      })
      .catch((e) => {
          this.$Progress.fail();
          console.log(e);
      });

      // ccc news response
      axios.get(`${this.backendUrl}/news`, {params: {place:this.news_place}})
      .then((response) => {
          // this.news = response.data.data;
          this.news = response.data.data.slice(0, 6);
          // console.log(this.news);
      })
      .catch((e) => {
          this.$Progress.fail();
      });

      // feature alumni response
      axios.get(`${this.backendUrl}/alumni`, {params: {feature_alumni_place: 'alumni_home'}})
      .then((response) => {
        this.featuredAlumnis = response.data.data;
        // console.log(this.featuredAlumnis);
      })
      .catch((e) => {
          console.log(e);
      });

      // latest member response
      axios.get(`${this.backendUrl}/alumni`, {params: {latest_member_place:this.latest_member_place}})
      .then((response) => {
        this.alumnis = response.data.data;
        // console.log(this.alumnis);
      })
      .catch((e) => {
          console.log(e);
      });

      // event response
      axios.get(`${this.backendUrl}/notice-event`)
      .then((response) => {
        this.noticeEvents = response.data.data;
        // console.log(this.noticeEvents);
      })
      .catch((e) => {
        console.log(e);
        this.$Progress.fail();
      });

      //section hide/show
      axios.get(`${this.backendUrl}/setting/section`,{params:{siteFrom:'alumni-home'}})
              .then((response)=>{
                this.sectionSetup = response.data;
                // console.log(this.sectionSetup.sec_alumni_home_slider)
              }).catch(error => {
        console.error(error)
      })
    },
  },
};
</script>

<style>
.custom_carousel_item {
  min-height: 200px;
  width: 100%;
  height: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  text-align: center;
}

/* Media query for screens up to 968 */
@media (max-width: 1168px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 13px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 8px;
  }
}

/* Media query for screens up to 768px */
@media (max-width: 968px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 12px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 8px;
  }
}

/* Media query for screens up to 768px */
@media (max-width: 768px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 11px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 7px;
  }
}

/* Media query for screens up to 576px */
@media (max-width: 576px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 10px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 7px;
  }
}

/* @media (max-width: 767px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 10px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 7px;
  }
} */

.admisssion-area.admission-bg::before {
  position: absolute;
  content: '';
  /* background: rgba(17, 29, 94, 0.75); */
  background: rgba(0, 0, 0, 0.13);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.welcome {
  background-color: #558A2E;
}

.text-white-90 {
  color: rgba(255, 255, 255, 0.9);
}

.nopadding {
   padding: 0 !important;
   margin: 0 !important;
}

.img-custom-thumbnail {
  /* padding: 0.25rem; */
  background-color: #fff;
  border: 1px solid #ffffff;
  /* border-radius: 0.375rem; */
  max-width: 100%;
  height: auto;
}

.img__wrap {
  position: relative;
  height: 100%;
  width: 100%;
}

.img__description_layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(178, 184, 206, 0.6);
  color: #fff;
  visibility: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
}

.img__wrap:hover .img__description_layer {
  visibility: visible;
  opacity: 1;
}

.img__description {
  transition: .2s;
  transform: translateY(1em);
}

.img__wrap:hover .img__description {
  transform: translateY(0);
}
</style>
