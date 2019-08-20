<template>
  <div class="org-card-holder" @click="handleClick" :class="{'active': isActive}">
    <div class="org-card-image-holder">
      <!-- <img :src="organisationImage" class="org-card-img"> -->
      <img :src="organisation.image" class="org-card-img">
    </div>
    <div class="org-card-bottom-holder">
      <!-- <span class="org-card-title">{{organisationTitle}}</span> -->
      <span class="org-card-title">{{organisation.name}}</span>
    </div>

    <organisation-modal
      v-if="openOrganisationModal"
      @close="handleClick"
      @select="handleSelect"
      :organisation="organisation"
      :id="id"
    ></organisation-modal>
  </div>
</template>

<style lang="scss" scoped>
.active {
  border: 1px solid red;
}
.org-card-holder {
  @include general-flex;

  width: 15%;
  min-width: 160px;
  background: white;
  margin: 10px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: $boxes-shadow;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  padding: 0 10px;

  @media (max-width: $small-screen) {
    width: 150px;
  }

  &:hover {
    transition: all 0.2s ease-in-out;
    box-shadow: $boxes-shadow-hover;
    // transform: scale(1.05);
  }

  .org-card-image-holder {
    display: flex;
    align-content: center;
    justify-content: center;
    height: 140px;

    .org-card-img {
      width: 120px;
      object-fit: fill;
    }
  }
  .org-card-bottom-holder {
    display: flex;
    align-content: center;
    justify-content: center;
    text-align: center;
    background: rgb(245, 245, 245);
    width: 100%;
    padding: 15px;

    span {
      font-size: $title-text;
      text-transform: capitalize;
    }
  }
}
</style>

<script>
export default {
  name: "org-card",
  props: {
    organisation: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true,
      default: 0
    }
  },
  components: {
    "organisation-modal": () => import("./OrganisationModal.vue")
  },
  data() {
    return {
      isActive: false,
      openOrganisationModal: false
    };
  },
  computed: {
    organisationTitle() {
      const result = this.organisation.title
        .toLowerCase()
        .replace("logo_", "")
        .replace(".jpg", "")
        .replace("_", " ");
      return result;
    }
  },
  methods: {
    handleClick() {
      // this.isActive = !this.isActive;
      this.openOrganisationModal = !this.openOrganisationModal;
    },
    handleSelect(id) {
      this.isActive = id === this.id;
    }
  }
};
</script>
