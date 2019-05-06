<template>
  <div class="main-card-holder">
    <span @click="sendMail()">asd</span>
    <org-card v-for="org in organisations" :key="org._id" :organisation="org"></org-card>
  </div>
</template>

<style lang="scss" scoped>
.main-card-holder {
    @include general-flex;

    flex-wrap: wrap;
    width: 90%;
    justify-content: space-around;
}
</style>

<script>
import api from './../../auth/index.js'

export default {
  name: 'orgs-panel',
  components: {
    'org-card': () => import('./OrganisationCard.vue')
  },
  props: {
    organisations: {
      type: Array,
      required: true
    }
  },
  methods: {
    sendMail(){
      api.sendEmail();
    }
  }
}
</script>
