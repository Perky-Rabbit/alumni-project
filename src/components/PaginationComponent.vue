<template>
  <div class="paginations">
    <ul>
      <li>
        <a
          v-for="(link, i) of links" :key="i"
          :disabled="!link.url"
          href="#"
          @click="getForPage($event, link)"
          aria-current="page"
          :class="link.active ? 'active' : ''"
        >
          <i v-show="i==0" class="flaticon-back"></i>
          <span v-show="isFinite(link.label)">{{link.label}}</span>
          <i v-show="links.length - 1 == i" class="flaticon-next"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['links'],
    methods: {
      getForPage(ev, link) {
        ev.preventDefault();
        if (!link.url || link.active) {
          return;
        }
        this.$emit('get-data', link.url)
      },
    },
  }
</script>

<style>

</style>






