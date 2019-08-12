<template>
  <div class="main-page-holder">
    <top-bar class="topbar-holder"></top-bar>
    <div class="main-panel-container">
      <router-view></router-view>
    </div>
    <!-- <bottom-bar class="bottombar-holder"></bottom-bar> -->
  </div>
</template>

<style lang="scss">
body {
  font-family: $main-font-style;
  margin: 0;
}
.main-panel-container {
  @include general-flex;

  justify-content: center;
  padding-top: 1.2 * $logo-height;
}
.main-page-holder {
  .topbar-holder {
    @include navbar;
  }

  .bottombar-holder {
    @include navbar;

    position: relative;
    bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
</style>

<script>
import auth from "./../auth/index";

export default {
  name: "main-page",
  components: {
    "top-bar": () => import("./../components/layout/Topbar.vue"),
    "main-panel": () =>
      import("./../components/products/OrganisationsPanel.vue"),
    "bottom-bar": () => import("./../components/layout/Footer.vue")
  },
  data() {
    return {
      organisations: null
    };
  },
  mounted() {
    this.setDefaultPage();
  },
  methods: {
    setDefaultPage(){
      this.$router.push({name: 'organisations'})
    },
    async getInfo() {
      try {
        const temp = await auth.getWpContent();
        const tempButter = await auth.getButterCmsContent();

        const result = await auth.getBucketInfo();
        console.log("here is the result, wee ", result.data);
        this.organisations = result.data;
      } catch (err) {
        console.log("error! ", err);
      }
    }
  }
};
</script>
