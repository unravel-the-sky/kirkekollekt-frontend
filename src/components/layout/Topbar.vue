<template>
  <div class="topbar-main-holder">
    <div class="topbar-left-holder">
      <img src="@/assets/imgs/kirkekollekt-header.png" class="logo-img">
      <div class="topbar-steps-holder">
        <ol class="topbar-steps">
          <li class="topbar-step" v-for="step in steps" :key="step">{{step}}</li>
        </ol>
      </div>
    </div>
    <img src="@/assets/imgs/kirkekollekt-logo.jpg" class="logo-img">
  </div>
</template>

<style lang="scss" scoped>
.topbar-main-holder {
  height: inherit;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .logo-img {
    height: $logo-height;
  }

  .topbar-left-holder {
    display: flex;
    align-items: center;

    .topbar-steps-holder {
      text-align: left;
      font-size: 17px;
      color: $topbar-text-color;
      font-weight: 600;

      .topbar-steps {
        margin-block-start: 0;
        margin-block-end: 0;
        line-height: 25px;
      }
    }
  }
}
</style>

<script>
export default {
  name: "topbar",
  props: {},
  data() {
    return {
      steps: [
        "Velg organisasjonen kollekten skal gå til",
        "Fyll ut enkelt skjema og trykk send",
        "Organisasjonen takker for informasjonen!"
      ]
    };
  }
};
</script>
