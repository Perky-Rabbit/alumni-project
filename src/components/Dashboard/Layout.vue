<template>
    <!-- Header Start -->
    <Header></Header>
    <!-- Header End -->

    <!-- main content start -->
    <div class="py-4">
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    <!-- main content end -->
</template>

<script>
import Header from './Header.vue';

export default {
    name: 'Layout',
    components: { Header },

    beforeCreate() {
        // CSS
        let bodyStyle1 = document.createElement('link')
        bodyStyle1.setAttribute('href', 'assets/vendor/slick/slick.min.css')
        bodyStyle1.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle1)

        let bodyStyle2 = document.createElement('link')
        bodyStyle2.setAttribute('href', 'assets/vendor/slick/slick-theme.min.css')
        bodyStyle2.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle2)

        let bodyStyle3 = document.createElement('link')
        bodyStyle3.setAttribute('href', 'assets/vendor/icons/feather.css')
        bodyStyle3.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle3)

        let bodyStyle4 = document.createElement('link')
        bodyStyle4.setAttribute('href', 'assets/vendor/bootstrap/css/bootstrap.min.css')
        bodyStyle4.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle4)

        let bodyStyle5 = document.createElement('link')
        bodyStyle5.setAttribute('href', 'assets/css/style.css')
        bodyStyle5.setAttribute('rel', 'stylesheet')
        document.head.appendChild(bodyStyle5)
    }
}
</script>

<style>

</style>