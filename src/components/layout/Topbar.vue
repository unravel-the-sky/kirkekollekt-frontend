<template>
  <div class="topbar-main-holder">
    <div class="topbar-left-holder">
      <img src="@/assets/imgs/kirkekollekt-header.png" class="logo-img" />

      <!-- <div class="topbar-steps-holder">
        <ol class="topbar-steps">
          <li class="topbar-step" v-for="step in steps" :key="step">{{step}}</li>
        </ol>
      </div>-->
    </div>
    <div class="topbar-register-holder">
      <span class="register-text">to register organisation</span>
      <div class="register-button-holder" @click="handleRegister">
        <span class="register-button-text">klikk her</span>
      </div>
    </div>
    <img src="@/assets/imgs/kirkekollekt-logo.jpg" class="logo-img" />
  </div>
</template>

<style lang="scss" scoped>
.topbar-main-holder {
  height: inherit;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: $boxes-shadow;
  z-index: 99;

  .logo-img {
    height: $logo-height;

    @media (max-width: $small-screen) {
      height: $logo-height-small;
    }
  }

  .topbar-left-holder {
    display: flex;
    align-items: center;

    .topbar-steps-holder {
      text-align: left;
      font-size: 17px;
      color: $topbar-text-color;
      font-weight: 600;
      min-width: 370px;

      @media (max-width: $small-screen) {
        font-size: 14px;
        font-weight: 500;
        min-width: 340px;
      }

      .topbar-steps {
        margin-block-start: 0;
        margin-block-end: 0;
        line-height: 25px;
      }
    }
  }

  .topbar-register-holder {
    @include general-flex;

    justify-content: center;

    .register-button-holder {
      @include general-flex;

      justify-content: center;
      padding: 15px;
      margin: 0 15px;
      border-radius: $button-border-radius;
      background: $kpk-primary-color;
      color: white;
      min-width: 90px;
      box-shadow: $boxes-shadow;
      cursor: pointer;

      &:hover {
        box-shadow: $boxes-shadow-hover;
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
  },
  methods: {
    handleRegister(){
      this.$router.push({ name: 'register' });
    }
  }
};
</script>
