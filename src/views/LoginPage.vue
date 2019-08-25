<template>
  <div class="login-page">
    Login Page!
    <div class="login-page-holder">
      <div class="login-holder">
        <div class="login-data-holder">
          <span class="usernam">Username:</span>
          <input type="text" v-model="username" />
        </div>
        <div class="login-data-holder">
          <span class="usernam">Password:</span>
          <input type="password" v-model="password" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  @include general-flex;

  justify-content: center;
  flex-direction: column;
  width: 100%;

  .login-page-holder {
    @include general-flex;

    justify-content: center;
    width: 100%;
    height: 100vh;

    .login-holder {
      @include general-flex;

      width: 400px;
      justify-content: center;
      flex-direction: column;
      height: 200px;
      border-radius: 8px;
      border: 1px solid grey;

      .login-data-holder {
        padding: 10px;

        input {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "login-page",
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>