<template>
  <div class="confirmation-holder">
    <div class="data-holder">
      <p>Menighetens navn:*</p>
      <input type="text" v-model="name" />
    </div>
    <div class="data-holder">
      <p>Menighetens kontaktinfo (telefonnummer og/ eller e-post):*</p>
      <input type="text" v-model="contactInfo" />
    </div>
    <div class="send-button" @click="handleButton">
      <span class="button-text">Send</span>
    </div>
    <!-- <div class="send-button" @click="handleBackButton">
      <span class="button-text">Tilbake</span>
    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.confirmation-holder {
  .data-holder {
    margin: 20px 0;

    input {
      width: 40%;
      border: 1px solid grey;
      border-radius: 8px;
      padding: 10px 15px;
    }
    input:focus {
      outline: none !important;
      border-color: grey;
    }
  }
  .send-button {
    @include default-button;

    width: 90px;
    margin: 10px 0;
  }
}
</style>

<script>
import auth from "./../auth/index";

export default {
  name: "confirmation-page",
  data() {
    return {
      name: null,
      contactInfo: null,
      otherInfo: '',
      allData: null
    };
  },
  props: {
    organisations: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleButton() {
      if (
        this.contactInfo == null ||
        this.name == null ||
        this.contactInfo === "" ||
        this.name === ""
      ) {
        alert("error!");
      } else {
        const allData = {
          name: this.name,
          contactInfo: this.contactInfo,
          otherInfo: this.otherInfo,
          organisations: this.organisations
        };

        console.log("send button is pressed and the object: ", allData);
        this.sendDonations(allData);
      }
    },
    async sendDonations(data) {
      try {
        const res = await auth.sendDonations(data);
        console.log("response: ", res.data);
        alert("Takk! Dine kollektdatoer er registrert og informasjon er sendt til organisasjonene.");

        this.$router.push({ name: "organisations" });

      } catch (err) {
        console.error("error!! ", err);
      }
    }
  }
};
</script>