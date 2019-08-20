<template>
  <generic-modal id="modal">
    <div class="modal-holder">
      <div class="close-button">
        <!-- <img @click="close()" class="desktop-close" src="@/assets/imgs/close.svg"> -->
      </div>
      <div class="modal-header">{{organisation.name}}</div>
      <div class="modal-body">
        <!-- <img :src="organisationImage"> -->
        <img :src="organisation.image" />
        <div>
          <p>Finn ut mer</p>
          <p>link to pdf</p>
        </div>
        <!-- <generic-button :title="'select'" @clicked="handleSelect"></generic-button> -->
      </div>
      <div class="modal-footer"></div>
    </div>
  </generic-modal>
</template>

<style lang="scss" scoped>
.modal-holder {
  min-height: 40vh;
  margin: $modal-margin;

  .modal-header {
    color: #9b9b9b;
    font-size: $modal-title-text-size;
    margin-bottom: 40px;
  }
  .close-button {
    float: right;
    cursor: pointer;
    margin-right: 20px;
  }
  .desktop-close {
    width: 20px;
  }
  .modal-body {
    font-size: $modal-text-size;
    overflow: hidden;
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: auto;

    img {
      height: 120px;
      margin-right: 40px;
    }
  }
}
</style>

<script>
export default {
  name: "organisation-modal",
  components: {
    "generic-modal": () => import("./../generics/GenericModal.vue"),
    // "generic-button": () => import("./../generics/GenericButton.vue")
  },
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
  computed: {},
  methods: {
    handleSelect() {
      this.$emit("select", this.id);
      this.close();
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
