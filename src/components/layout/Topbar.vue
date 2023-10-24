<template>
  <div class="topbar-main-holder">
    <div class="topbar-left-holder">
      <img src="@/assets/imgs/kirkekollekt-header.png" class="logo-img" />
    </div>
    <div class="topbar-center-holder">
      <div class="topbar-register-holder" v-if="$route.path !== '/register'">
        <span class="register-text">Registrer kollekter her</span>
        <div class="register-button-holder" @click="handleRegister">
          <span class="register-button-text">Registrer</span>
        </div>
      </div>
      <div class="topbar-all-documents-part"></div>
    </div>
    <a href="https://kpk.no" target="_blank">
      <img src="@/assets/imgs/kirkekollekt-logo.jpg" class="logo-img" />
    </a>
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

  .topbar-all-documents-part {
    margin-top: 10px;
    font-size: 12px;
  }

  .topbar-register-holder {
    @include general-flex;

    justify-content: center;

    .register-button-holder {
      @include default-button;
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
    handleRegister() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>
