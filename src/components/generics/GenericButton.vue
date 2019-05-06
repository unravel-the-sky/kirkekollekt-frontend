<template>
  <div class="button-holder" @click="handleAction">
    <span>{{title}}</span>
  </div>
</template>

<style lang="scss" scoped>
.button-holder {
  padding: 10px 30px;
  border-radius: $button-border-radius;
  background: rgb(0, 117, 0);
  color: white;
  cursor: pointer;
  box-shadow: $boxes-shadow;

  span {
    font-size: 15px;
    font-weight: 500;
  }
}
</style>

<script>
export default {
  name: "generic-button",
  props: {
    title: {
      type: String,
      required: true,
      default: "text"
    }
  },
  methods: {
    handleAction(){
      this.$emit('clicked')
    }
  }
};
</script>
