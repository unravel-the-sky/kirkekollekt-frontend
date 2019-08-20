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
  created() {
    this.getOrganisations();
  },
  methods: {
    async getOrganisations() {
      try {
        const res = await auth.getAllOrganisations();
        console.log("data is: ", res.data);
        this.organisations = res.data;
      } catch (err) {
        console.error("error: ", err);
      }
    }
  }
};
</script>