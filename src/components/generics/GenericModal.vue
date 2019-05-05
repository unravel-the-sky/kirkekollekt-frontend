<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 100022;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
}
.modal-container {
  overflow-x: hidden;
  border-radius: $button-border-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  // position: relative;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
  background: white;
  width: 70%;
}
@media (max-width: $mobile-width) {
  .modal-container {
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
}
@media (min-width: 450px) {
  .modal-container {
    max-width: 90%;
  }
}
@media (min-width: 1060px) {
  .modal-container {
    margin: 0 auto;
  }
}
.modal-enter, .modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  opacity: 0;
  transform: scale(0.9);
}
</style>


<script>
export default {
  name: 'modal',
  methods: {
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    document.addEventListener('keydown', event => {
      if (this.show && event.keyCode == 27) {
        // this is to catch ESC events
        this.close();
        console.log('hello you pressed ESC');
      }
    });
  },

  created() {
    console.log('user agent: ', navigator.appVersion);
  }
};
</script>
