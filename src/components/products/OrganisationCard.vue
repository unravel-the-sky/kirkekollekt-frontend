<template>
  <div class="org-card-holder">
    <div class="org-card-image-holder">
      <img :src="organisation.metadata.org_img.url" class="org-card-img">
    </div>
    <div class="org-card-bottom-holder">
      <div class="org-card-title">{{organisation.title}}</div>
      <div class="org-card-active-panel">active</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.org-card-holder {
  @include general-flex;

  width: 120px;
  background: white;
  margin: 10px;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;

  .org-card-image-holder {
    display: block;

    .org-card-img {
      width: 80px;
      height: 80px;
    }
  }
  .org-card-bottom-holder {
    display: block;
  }
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
