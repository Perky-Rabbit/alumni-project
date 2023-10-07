<template>
  <div class="page-header hide-on-screen">
    <!-- <h1>{{ title }}</h1> -->
    <img :src="cccLogo" :alt="alt" class="main-logo">
    <hr>
  </div>
</template>

<script>
import { useStore } from '../store';
const store = useStore();

export default {
  name: "PrintPageHeader",
  data() {
    return {
        cccLogo: store.$state.cccLogo,
        alt: store.$state.alt,
    };
  },

  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
/* .page-header {
  text-align: center;
  margin-bottom: 20px;
} */

.hide-on-screen {
  display: none;
}

@media print {
  .hide-on-screen {
    display: block;
  }
}
</style>

