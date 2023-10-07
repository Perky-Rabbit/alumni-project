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
                                    :url="'https://alumni.ewubd.edu/single-event?id=' + singleEvent.id"
                                    title="Single Event"
                                    description="Single Event"
                                    quote="Thank you"
                                    hashtags="Event"
                                >
                                    <i class="flaticon-facebook"></i>
                                </ShareNetwork>
                            </li>

                            <li>
                                <ShareNetwork
                                    network="linkedin"
                                    :url="'https://alumni.ewubd.edu/single-event?id=' + singleEvent.id"
                                    title="Single Event"
                                    description="Single Event"
                                    quote="Thank you"
                                    hashtags="Event"
                                >
                                    <i class="flaticon-linkedin"></i>
                                </ShareNetwork>
                            </li>

                            <li>
                                <ShareNetwork
                                    network="twitter"
                                    :url="'https://alumni.ewubd.edu/single-event?id=' + singleEvent.id"
                                    title="Single Event"
                                    description="Single Event"
                                    quote="Thank you"
                                    hashtags="Event"
                                >
                                    <i class="flaticon-twitter"></i>
                                </ShareNetwork>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="col-md-12 text-end">
            <span style="font-size: 15px;">
                <i class="flaticon-writing-tool"></i> {{moment(singleEvent.date).format('ll')}}
            </span> <br>
            <span style="font-size: 15px;">
                <i class="flaticon-time"></i> {{ moment(singleEvent.time,["HH.mm"]).format('hh:mm A') }}
            </span>
        </div> -->

        <div class="bg-f4f6f9 p-3">
            <div class="d-flex justify-content-between">
                <div style="font-size: 15px; font-weight: bold;">
                <i class="flaticon-writing-tool"></i> {{moment(singleEvent.date).format('ll')}}
                </div>
                <div style="font-size: 15px; font-weight: bold;">
                <i class="flaticon-time"></i> {{ moment(singleEvent.time,["HH.mm"]).format('hh:mm A') }}
                </div>
            </div>

            <div class="news-simple-card mt-4">
                <h2>{{singleEvent.title}}</h2>
                <p v-html="singleEvent.description"></p>
            </div>
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
                                        <table style="width: 100%;">
                                        <tbody>
                                            <tr>
                                            <td style="font-size: 15px; font-weight: bold;">
                                                <i class="flaticon-writing-tool"></i> {{ moment(singleEvent.date).format('ll') }}
                                            </td>
                                            <td style="font-size: 15px; font-weight: bold; text-align: right;">
                                                <i class="flaticon-time"></i> {{ moment(singleEvent.time,["HH.mm"]).format('hh:mm A') }}
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td><h2>{{singleEvent.title}}</h2></td>
                                </tr>

                                <tr>
                                    <td v-html="singleEvent.description"></td>
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
    import PrintPageHeader from './../../../components/PrintPageHeaderComponent.vue';
    import { useHead } from '@vueuse/head';
    import moment from 'moment';
    import { useStore } from '../../../store';
    const store = useStore();

    export default {
        name: 'Single',
        components: {
            PrintPageHeader,
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                cccLogo: store.$state.cccLogo,
                alt: store.$state.alt,
                moment: moment,
                singleEvent: [],
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
                    const eventSlug = this.$route.params.slug; // Access the dynamic route parameter
                    const response = await axios.get(`${this.backendUrl}/notice-event/${eventSlug}`);
                    this.singleEvent = response.data;
                    // console.log(this.singleEvent);
                    useHead({title: this.singleEvent.title +' | EWU'})
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