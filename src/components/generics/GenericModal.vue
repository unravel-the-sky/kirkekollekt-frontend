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
  overflow-y: auto;
  overflow-x: hidden;
  margin: 8% auto 0;
  border-radius: $button-border-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
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
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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
    console.log('hello i am a modal');
    console.log('user agent: ', navigator.appVersion);
  }
};
</script>
