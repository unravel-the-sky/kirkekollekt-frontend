<template>
  <div class="main-page-holder">
    <top-bar class="topbar-holder"></top-bar>
    <main-panel class="main-panel-holder" :organisations="organisations"></main-panel>
    <bottom-bar class="bottombar-holder"></bottom-bar>
  </div>
</template>

<style lang="scss">
body {
  font-family: $main-font-style;
  margin: 0;
}
.main-page-holder {
  .topbar-holder {
    @include navbar;
  }

  .main-panel-holder {
    padding-top: $logo-height;
  }

  .bottombar-holder {
    @include navbar;

    position: absolute;
    bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
</style>

<script>
import auth from './../auth/index'

export default {
  name: 'main-page',
  components: {
    'top-bar': () => import('./../components/layout/Topbar.vue'),
    'main-panel': () => import('./../components/products/OrganisationsPanel.vue'),
    'bottom-bar': () => import('./../components/layout/Footer.vue')
  },
  data(){
    return {
      organisations: null
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        const temp = await auth.getWpContent();
        const tempButter = await auth.getButterCmsContent();

        const result = await auth.getBucketInfo();
        console.log('here is the result, wee ', result.data);
        this.organisations = result.data;
        
      } catch (err) {
        console.log('error! ', err)
      }
    }
  }
}
</script>
