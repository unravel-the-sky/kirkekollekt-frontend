<template>
  <generic-modal @close="close" id="modal">
    <div class="modal-holder">
      <div class="close-button">
        <!-- <img @click="close()" class="desktop-close" src="@/assets/imgs/close.svg"> -->
      </div>
      <div class="modal-header"></div>
      <div class="modal-body">
        HELLO
      </div>
      <div class="modal-footer"></div>
    </div>
  </generic-modal>
</template>

<style lang="scss" scoped>
.modal-holder {
  // position: relative;
}
.modal-header {
  color: #9b9b9b;
  cursor: default;
  margin: 20px 0 10px 20px;
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
  font-size: $main-text;
  margin-bottom: 30px;
  letter-spacing: 1px;
  background-size: 250px 150px;
  overflow: hidden;
}
</style>

<script>
export default {
  name: "organisation-modal",
  components: {
    "generic-modal": () => import("./../generics/GenericModal.vue")
  }
};
</script>
