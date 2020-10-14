<template>
  <generic-modal id="modal">
    <div class="modal-holder">
      <div class="close-button"></div>
      <div class="modal-header"></div>
      <div class="modal-body">
        <div>
          Har du registrert alle dine kollekter?
        </div>
        <div class="options-panel">
          <div class="back-button" @click="handleBackButton">
            <span class="button-text">Nei, gå tilbake</span>
          </div>
          <div class="proceed-button" @click="handleAdvanceButton">
            <span class="button-text">Ja, gå videre</span>
          </div>
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </generic-modal>
</template>

<style lang="scss" scoped>
.options-panel {
  display: flex;
  align-items: center;
  .back-button {
    @include default-button;

    background: $kpk-secondary-color;
    width: 120px;
    cursor: pointer;
  }
  .proceed-button {
    @include default-button;

    width: 120px;
    cursor: pointer;
  }
}
.modal-holder {
  min-height: 40vh;
  margin: $modal-margin;

  display: flex;
  justify-content: center;
  align-items: center;

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
    width: 80%;
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
  name: 'register-organisation-modal',
  components: {
    'generic-modal': () => import('./../generics/GenericModal.vue'),
  },
  props: {
  },
  computed: {},
  methods: {
    handleBackButton() {
      this.close();
    },
    handleAdvanceButton() {
      this.$emit('advance', this.id);
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
