<template>
  <div class="org-card-holder">{{organisation.title}}</div>
</template>

<style lang="scss" scoped>
.org-card-holder {
    @include general-flex;

    width: 120px;
    height: 90px;
    background: red;
    margin: 10px;
    justify-content: center;
}
</style>

<script>
export default {
  name: 'org-card',
  props: {
    organisation: {
      type: Object,
      required: true
    }
  }
}
</script>
