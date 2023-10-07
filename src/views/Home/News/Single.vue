<template>
    <div class="news-details">
        <div class="tags-and-share tags-and-share-custom">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                    <!-- <div class="tags">
                        <ul>
                            <li><span>Tags :</span></li>
                            <li><a href="admission.html">Admission</a></li>
                            <li><a href="admission.html">Research</a></li>
                        </ul>
                    </div> -->
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="share">
                        <ul>
                            <!-- <li><span>Share :</span></li> -->
                            <li>
                                <a href="#" type="btn" @click="printContent"><i class="fa fa-print"></i></a>
                            </li>

                            <li>
                                <ShareNetwork
                                    network="facebook"
                                    :url="'https://alumni.ewubd.edu/single-news?id=' + singleNews.id"
                                    title="Single News"
                                    description="Single News"
                                    quote="Thank you"
                                    hashtags="News"
                                >
                                    <i class="flaticon-facebook"></i>
                                </ShareNetwork>
                            </li>

                            <li>
                                <ShareNetwork
                                    network="linkedin"
                                    :url="'https://alumni.ewubd.edu/single-news?id=' + singleNews.id"
                                    title="Single News"
                                    description="Single News"
                                    quote="Thank you"
                                    hashtags="News"
                                >
                                    <i class="flaticon-linkedin"></i>
                                </ShareNetwork>
                            </li>

                            <li>
                                <ShareNetwork
                                    network="twitter"
                                    :url="'https://alumni.ewubd.edu/single-news?id=' + singleNews.id"
                                    title="Single News"
                                    description="Single News"
                                    quote="Thank you"
                                    hashtags="News"
                                >
                                    <i class="flaticon-twitter"></i>
                                </ShareNetwork>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="news-simple-card">
            <img v-if="singleNews['images']" :src="singleNews_image" alt="singleNews.id" style="width: 100%;">
            <img v-else :src="avatar" :alt="alt" style="width: 100%;">

            <div class="row mb-4">
                <div  style="margin-left: 10px;" v-for="(item,index) in singleNews.images" class="col-md-1 p-0">
                    <img :src="item.source" style="margin-left: 10px; border: 3px solid rgba(20, 11, 15, 0.808); background-color: antiquewhite;"   class="w-10 mt-2 mb-3" height="60"  @click="say(item)">
                </div>
            </div>

            <h2>{{singleNews.title}}</h2>
            <p v-html="singleNews.description"></p>
        </div>

        <div class="news-simple-card d-none" ref="printContentElement">
            <div class="header">
                <img :src="cccLogo" :alt="alt" class="main-logo">
            </div>

            <table > 
                <thead>
                    <tr>
                        <td style="height: 2cm">
                            <!-- Leave this empty and don't remove it. This space is where header placed on print -->
                        </td>
                    </tr>
                </thead>

                <tr>
                    <td>
                        <table class="print-content">
                            <tbody>
                                <tr>
                                    <td>
                                        <img class="print-img" v-if="singleNews['images']" :src="singleNews_image" alt="singleNews.id" style="width: 100%;">
                                        <img class="print-img" v-else :src="avatar" :alt="alt" style="width: 100%;">
                                    </td>
                                </tr>
                                <tr>
                                    <td><h2>{{singleNews.title}}</h2></td>
                                </tr>
                                <tr>
                                    <td v-html="singleNews.description"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tfoot>
                    <tr>
                        <td style="height: 2cm">
                            <!-- Leave this empty and don't remove it. This space is where footer placed on print -->
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div class="footer">
                Contact No: 55046678, 09666775577, 01755587224 || Email: info@ewubd.edu || Website: https://www.ewubd.edu || Address: A/2, Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar, Dhaka-1212, Bangladesh
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useStore } from '../../../store';
    const store = useStore();
    import PrintPageHeader from './../../../components/PrintPageHeaderComponent.vue';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'Single',
        components: {
            PrintPageHeader,
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                avatar: store.$state.avatar,
                cccLogo: store.$state.cccLogo,
                alt: store.$state.alt,
                singleNews: [],
                singleNews_image:"",
            };
        },

        mounted() {
            this.getData();
        },

        created() {
            const url = window.location.pathname;
            axios.get(`${this.backendUrl}/get-seo-data`, { params: { site: 'alumni', page_url: url } })
            .then((response) => {
                // console.log(response.data.data);
                if (response.data.data != null) {
                    useHead({ title: response.data.data.title });
                } else {
                    useHead({ title: 'Alumni | EWU' });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        },

        methods: {
            async getData() {
                try {
                    const newsSlug = this.$route.params.slug; // Access the dynamic route parameter
                    const response = await axios.get(`${this.backendUrl}/news/${newsSlug}`);
                    this.singleNews = response.data;
                    console.log(this.singleNews);
                    useHead({ title: response.data.title + ' | EWU' });
                    this.singleNews_image = response.data.images[0] ? response.data.images[0].source : this.avatar;
                } catch (error) {
                    console.error(error);
                    this.$Progress.fail();
                }
            },

            printContent() {
                const printWindow = window.open('', '_blank');
                printWindow.document.write('<html><head><title>Print</title>');
                printWindow.document.write('<style>');
                printWindow.document.write(`
                    .header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                        border-bottom: 1px solid #d1d1d1;
                        padding-bottom: 3px;
                    }

                    .print-img {
                        text-align: center;
                        height: 200px;
                        width: 50% !important;
                        display: block;
                        margin: 0 auto 20px;
                    }

                    .footer {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                        font-weight: bold;
                        font-size: 14px;
                        // border-top: 1px solid;
                        // padding-top: 5px;
                    }
                `);
                printWindow.document.write('</style></head><body>');
                printWindow.document.write(this.$refs.printContentElement.innerHTML);

                printWindow.document.write('</body></html>');
                printWindow.document.close();

                // Wait for images to load before printing
                printWindow.addEventListener('load', () => {
                    printWindow.print();
                    printWindow.close();
                });             
            },

            say(even){
                this.singleNews_image = event.target.src;
            }
        }
    }
</script>

<style scoped>
.tags-and-share-custom {
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;
}
</style>