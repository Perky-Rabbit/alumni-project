<template>
    <div id="home">
        <header>
            <!-- Start Preloader Area -->
            <!-- <div class="preloader-area">
                <div class="spinner">
                    <div class="inner">
                        <div class="disc"></div>
                        <div class="disc"></div>
                        <div class="disc"></div>
                    </div>
                </div>
            </div> -->
            <!-- End Preloader Area -->

            <!--Strat Top Header Area-->
            <!-- <div class="top-header-area">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-6">
                            <div class="header-left-content">
                                <p>Get the latest updates and Sanu's response to COVID-19</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-6 col-md-6">
                            <div class="header-right-content">
                                <div class="list">
                                    <ul>
                                        <li>
                                            <router-link :to="{ name: 'register' }">SIGN UP</router-link>
                                        </li>
                                        <li>
                                            <router-link :to="{ name: 'login' }">SIGN IN</router-link>
                                        </li>
                                        <li><a href="#">FAQ</a></li>
                                        <li><a href="#">CONTACT</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!--End Top Header Area-->

            <!-- Start Navbar Area -->
            <div class="navbar-area nav-bg-1">
                <div class="mobile-responsive-nav">
                    <div class="container">
                        <div class="mobile-responsive-menu">
                            <div class="logo">
                                <router-link :to="{name: 'home'}">
                                    <img :src="settingKeyAndValueArray.headerLogo" alt="logo" style="width: 70px; height: 20px;">
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="desktop-nav">
                    <div class="container-fluid">
                        <nav class="navbar navbar-expand-md navbar-light">
                            <router-link :to="{name: 'home'}" class="navbar-brand">
                                <img :src="settingKeyAndValueArray.headerLogo" alt="logo" style="width: 150px; height:45px;">
                            </router-link>

                            <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <router-link :to="{ name: 'home' }">Home</router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{ name: 'alumniList' }">Alumni List</router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{ name: 'register' }">SIGN UP</router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{ name: 'login' }">SIGN IN</router-link>
                                    </li>

                                    <!-- <li class="nav-item">
                                        <a href="#" class="nav-link">CONTACT</a>
                                    </li> -->
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

                <!-- <div class="desktop-nav">
                    <div class="container-fluid">
                        <nav class="navbar navbar-expand-md navbar-light">
                            <a class="navbar-brand" href="#">
                                <img :src="$store.state.cccLogo" :alt="$store.state.alt">
                            </a>

                            <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">MEMBER BENEFITS</a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="#" class="nav-link">MEMBER LIST</a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="#" class="nav-link">ALUMNI ADMISSIONS</a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="#" class="nav-link">NOTICE</a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="#" class="nav-link">ALUMNI QUESTIONNAIRE</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div> -->

                <!-- <div class="others-option-for-responsive">
                    <div class="container">
                        <div class="dot-menu">
                            <div class="inner">
                                <div class="icon">
                                    <i class="ri-menu-3-fill" data-bs-toggle="modal" data-bs-target="#sidebarModal"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- End Navbar Area -->
        </header>

        <!-- Start Main Area -->
        <router-view></router-view>
        <!-- End Main Area -->

        <footer>
            <!--Start Footer Area-->
            <div class="footer-area">
                <div class="container pt-4">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6">
                            <div class="footer-logo-area">
                                <router-link :to="{name: 'home'}">
                                    <img :src="settingKeyAndValueArray.footerLogo" alt="logo" style="width: 150px; height:45px;">
                                </router-link>
                                <p> {{ settingKeyAndValueArray.alumniSiteAddress }} </p>
                                <div class="contact-list">
                                    <ul>
                                        <li><a href="#"> {{ settingKeyAndValueArray.alumniFooterContactOne }}, {{ settingKeyAndValueArray.alumniFooterContactTwo }}, {{ settingKeyAndValueArray.alumniFooterContactThree }}</a></li>
                                        <li><a href="#"> {{ settingKeyAndValueArray.alumniFooterSiteEmail }} </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="footer-widjet">
                                <h3> {{ settingKeyAndValueArray.alumniFooterResourcesText }} </h3>
                                <div class="list">
                                    <ul>
                                        <li><a :href="settingKeyAndValueArray.alumniFooterResourcesLinkOne">{{settingKeyAndValueArray.alumniFooterResourcesLinkOneTitle}}</a></li>
                                        <li><a :href="settingKeyAndValueArray.alumniFooterResourcesLinkTwo">{{settingKeyAndValueArray.alumniFooterResourcesLinkTwoTitle}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="footer-widjet">
                                <h3> {{ settingKeyAndValueArray.alumniFooterInformationText }} </h3>
                                <div class="list">
                                    <ul>
                                        <li><a :href="settingKeyAndValueArray.alumniFooterInformationLinkOne">{{settingKeyAndValueArray.alumniFooterInformationLinkOneTitle}}</a></li>
                                        <li><a :href="settingKeyAndValueArray.alumniFooterInformationLinkTwo">{{settingKeyAndValueArray.alumniFooterInformationLinkTwoTitle}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-6">
                            <div class="footer-widjet">
                                <h3> {{ settingKeyAndValueArray.alumniFooterLocationMapText }} </h3>
                                <div class="list">
                                    <div class="border-outline">
                                        <a href="https://goo.gl/maps/QnYrTZHGPYMzSQfK7"><img :src="locationMap" :alt="alt" /></a>
                                    </div>

                                    <p class="text-white" style="margin-top: 10px">
                                        Follow Us :
                                        <ShareNetwork
                                            network="facebook"
                                            url="https://goo.gl/maps/QnYrTZHGPYMzSQfK7"
                                            title="Location Map"
                                            description="Location Map"
                                            quote="Thank you"
                                            hashtags="Location"
                                        >
                                            <i class="ri-facebook-fill circular-icon"></i>
                                        </ShareNetwork>

                                        <ShareNetwork
                                            network="linkedin"
                                            url="https://goo.gl/maps/QnYrTZHGPYMzSQfK7"
                                            title="Location Map"
                                            description="Location Map"
                                            quote="Thank you"
                                            hashtags="Location"
                                        >
                                            <i class="ri-linkedin-fill circular-icon"></i>
                                        </ShareNetwork>

                                        <ShareNetwork
                                            network="twitter"
                                            url="https://goo.gl/maps/QnYrTZHGPYMzSQfK7"
                                            title="Location Map"
                                            description="Location Map"
                                            quote="Thank you"
                                            hashtags="Location"
                                        >
                                            <i class="ri-twitter-fill circular-icon"></i>
                                        </ShareNetwork>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="shape">
                        <img :src="alumniFooterBg" alt="bg-image" style="height: 302px; width: 100%;" />
                    </div>
                </div>
            </div>
            <!--End Footer Area-->
            
            <!-- <div style="margin-top: 2px"></div> -->

            <!--Start Copyright Area-->
            <div class="copyright-area">
                <div class="container border-top">
                    <div class="copyright">
                        <div class="row">
                            <div class="col-lg-10 col-md-4">
                                <div class="social-content">
                                    <ul>
                                        <li><span>Quick Links</span></li>
                                        <li>
                                            <a :href='settingKeyAndValueArray.alumniFooterQuickLinksOne' type="button" class="btn btn-secondary btn-sm btn-responsive btn-block" style="border-radius: 20%">
                                                {{ settingKeyAndValueArray.alumniFooterQuickLinksOneTitle }}
                                            </a>
                                        </li>
                                        <li>
                                            <a :href='settingKeyAndValueArray.alumniFooterQuickLinksTwo' type="button" class="btn btn-secondary btn-sm btn-responsive btn-block" style="border-radius: 20%">
                                                {{ settingKeyAndValueArray.alumniFooterQuickLinksTwoTitle }}
                                            </a>
                                        </li>
                                        <li>
                                            <a :href='settingKeyAndValueArray.alumniFooterQuickLinksThree' type="button" class="btn btn-secondary btn-sm btn-responsive btn-block" style="border-radius: 20%">
                                                {{ settingKeyAndValueArray.alumniFooterQuickLinksThreeTitle }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Copyright Area-->

            <!-- Start Go Top Area -->
            <div class="go-top">
                <i class="ri-arrow-up-s-line"></i>
                <i class="ri-arrow-up-s-line"></i>
            </div>
            <!-- End Go Top Area -->
        </footer>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '../../store';
const store = useStore();

export default {
    name: "Layout",

    data() {
      return {
        backendUrl: import.meta.env.VITE_API_BASE_URL,
        locationMap: store.$state.locationMap,
        alt: store.$state.alt,
        alumniFooterBg: store.$state.alumniFooterBg,

        // settingKeyAndValueArray: {
        //     headerLogo: null,
        //     footerLogo: null,
        //     alumniSiteAddress: null,
        //     alumniFooterContactOne: null,
        //     alumniFooterContactTwo: null,
        //     alumniFooterContactThree: null,
        //     alumniFooterSiteEmail: null,

        //     alumniFooterResourcesText: null,
        //     alumniFooterResourcesLinkOneTitle: null,
        //     alumniFooterResourcesLinkOne: null,
        //     alumniFooterResourcesLinkTwoTitle: null,
        //     alumniFooterResourcesLinkTwo: null,

        //     alumniFooterInformationText: null,
        //     alumniFooterInformationLinkOneTitle: null,
        //     alumniFooterInformationLinkOne: null,
        //     alumniFooterInformationLinkTwoTitle: null,
        //     alumniFooterInformationLinkTwo: null,

        //     alumniFooterLocationMapText: null,
        // },

        settingKeyAndValueArray: [
            'headerLogo',
            'footerLogo',
            'alumniSiteAddress',
            'alumniFooterContactOne',
            'alumniFooterContactTwo',
            'alumniFooterContactThree',
            'alumniFooterSiteEmail',
            'alumniFooterResourcesText',
            'alumniFooterResourcesLinkOneTitle',
            'alumniFooterResourcesLinkOne',
            'alumniFooterResourcesLinkTwoTitle',
            'alumniFooterResourcesLinkTwo',
            'alumniFooterInformationText',
            'alumniFooterInformationLinkOneTitle',
            'alumniFooterInformationLinkOne',
            'alumniFooterInformationLinkTwoTitle',
            'alumniFooterInformationLinkTwo',
            'alumniFooterLocationMapText',
            'alumniFooterQuickLinksOneTitle',
            'alumniFooterQuickLinksOne',
            'alumniFooterQuickLinksTwoTitle',
            'alumniFooterQuickLinksTwo',
            'alumniFooterQuickLinksThreeTitle',
            'alumniFooterQuickLinksThree',
        ]
      };
    },

    mounted() {
        this.$setting(this.settingKeyAndValueArray).then(value => {
            this.settingKeyAndValueArray = value;
        })
    },

    beforeCreate() {
        if (typeof window !== 'undefined') {
        // CSS
        let bodyStyle1 = document.createElement('link')
        bodyStyle1.setAttribute('href', '/home/assets/css/bootstrap.min.css')
        bodyStyle1.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle1)

        let bodyStyle2 = document.createElement('link')
        bodyStyle2.setAttribute('href', '/home/assets/css/meanmenu.css')
        bodyStyle2.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle2)

        let bodyStyle3 = document.createElement('link')
        bodyStyle3.setAttribute('href', '/home/assets/css/owl.carousel.min.css')
        bodyStyle3.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle3)

        let bodyStyle4 = document.createElement('link')
        bodyStyle4.setAttribute('href', '/home/assets/css/owl.theme.default.min.css')
        bodyStyle4.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle4)

        let bodyStyle5 = document.createElement('link')
        bodyStyle5.setAttribute('href', '/home/assets/css/magnific-popup.css')
        bodyStyle5.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle5)

        let bodyStyle6 = document.createElement('link')
        bodyStyle6.setAttribute('href', '/home/assets/css/flaticon.css')
        bodyStyle6.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle6)

        let bodyStyle7 = document.createElement('link')
        bodyStyle7.setAttribute('href', '/home/assets/css/remixicon.css')
        bodyStyle7.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle7)

        let bodyStyle8 = document.createElement('link')
        bodyStyle8.setAttribute('href', '/home/assets/css/odometer.min.css')
        bodyStyle8.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle8)

        let bodyStyle9 = document.createElement('link')
        bodyStyle9.setAttribute('href', '/home/assets/css/aos.css')
        bodyStyle9.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle9)

        let bodyStyle10 = document.createElement('link')
        bodyStyle10.setAttribute('href', '/home/assets/css/style.css')
        bodyStyle10.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle10)

        let bodyStyle11 = document.createElement('link')
        bodyStyle11.setAttribute('href', '/home/assets/css/dark.css')
        bodyStyle11.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle11)

        let bodyStyle12 = document.createElement('link')
        bodyStyle12.setAttribute('href', '/home/assets/css/responsive.css')
        bodyStyle12.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle12)

        
        // JS
        // let bodyScript1 = document.createElement('script')
        // bodyScript1.setAttribute('src', '/home/assets/js/jquery.min.js')
        // document.body.appendChild(bodyScript1)

        // let bodyScript2 = document.createElement('script')
        // bodyScript2.setAttribute('src', '/home/assets/js/bootstrap.bundle.min.js')
        // document.body.appendChild(bodyScript2)

        // let bodyScript3 = document.createElement('script')
        // bodyScript3.setAttribute('src', '/home/assets/js/jquery.meanmenu.js')
        // document.body.appendChild(bodyScript3)

        // let bodyScript4 = document.createElement('script')
        // bodyScript4.setAttribute('src', '/home/assets/js/owl.carousel.min.js')
        // document.body.appendChild(bodyScript4)

        // let bodyScript5 = document.createElement('script')
        // bodyScript5.setAttribute('src', '/home/assets/js/carousel-thumbs.min.js')
        // document.body.appendChild(bodyScript5)

        // let bodyScript6 = document.createElement('script')
        // bodyScript6.setAttribute('src', '/home/assets/js/jquery.magnific-popup.js')
        // document.body.appendChild(bodyScript6)

        // let bodyScript7 = document.createElement('script')
        // bodyScript7.setAttribute('src', '/home/assets/js/aos.js')
        // document.body.appendChild(bodyScript7)

        // let bodyScript8 = document.createElement('script')
        // bodyScript8.setAttribute('src', '/home/assets/js/odometer.min.js')
        // document.body.appendChild(bodyScript8)

        // let bodyScript9 = document.createElement('script')
        // bodyScript9.setAttribute('src', '/home/assets/js/appear.min.js')
        // document.body.appendChild(bodyScript9)

        // let bodyScript10 = document.createElement('script')
        // bodyScript10.setAttribute('src', '/home/assets/js/form-validator.min.js')
        // document.body.appendChild(bodyScript10)

        // let bodyScript11 = document.createElement('script')
        // bodyScript11.setAttribute('src', '/home/assets/js/contact-form-script.js')
        // document.body.appendChild(bodyScript11)

        // let bodyScript12 = document.createElement('script')
        // bodyScript12.setAttribute('src', '/home/assets/js/ajaxchimp.min.js')
        // document.body.appendChild(bodyScript12)

        let bodyScript13 = document.createElement('script')
        bodyScript13.setAttribute('src', '/home/assets/js/custom.js')
        document.body.appendChild(bodyScript13)
        }
    },
}
</script>

<style>
.circular-icon {
    background-color: white;
    border-radius: 50%;
    color: red;
    padding: 5px;
    margin:3px;
    transition: background-color 0.6s ease;
}

.circular-icon:hover {
    background-color: red;
    color: white;
}
</style>