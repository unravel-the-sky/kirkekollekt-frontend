<template>
  <div class="main-panel-holder">
    <main-panel v-if="organisations" :organisations="organisations"></main-panel>
  </div>
</template>

<style lang="scss" scoped>
.main-panel-holder {
  @include general-flex;

  justify-content: center;
}
</style>

<script>
import auth from "./../auth/index.js";

export default {
  name: "organisations-panel",
  components: {
    "main-panel": () =>
      import("./../components/products/OrganisationsPanel.vue")
  },
  data() {
    return {
      organisations: null
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      try {
        const result = auth.getHardCodedData();
        this.organisations = result;
        // this.$router.push({
        //   name: "organisations",
        //   params: { organisations: this.organisations }
        // });
      } catch (err) {
        console.error("error while getting data: ", err);
      }
    }
  }
};
</script>