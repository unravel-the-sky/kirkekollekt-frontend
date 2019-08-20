<template>
  <generic-modal id="modal">
    <div class="modal-holder">
      <div class="close-button">
        <!-- <img @click="close()" class="desktop-close" src="@/assets/imgs/close.svg"> -->
      </div>
      <div class="modal-header">Add new organisation</div>
      <div class="modal-body">
        <div class="add-new-holder">
          <form enctype="multipart/form-data">
            <div class="data-holder">
              <p>Name:*</p>
              <input type="text" v-model="orgName" />
            </div>
            <div class="data-holder">
              <p>Image url (from google drive):*</p>
              <input type="text" v-model="orgImageUrl" />
            </div>
            <div class="data-holder">
              <p>Description (links or other info):*</p>
              <!-- <input type="text" v-model="orgDescription" /> -->
              <textarea name="message" v-model="orgDescription"></textarea>
            </div>
            <div class="data-holder">
              <p>Contact Email:*</p>
              <input type="text" v-model="orgEmail" />
            </div>
            <!-- <div class="logo-input">
            <input type="text" v-model="orgImage" />
            <input type="file" @change="handleFileChange" />
            </div>-->
            <button type="button" @click="handleSubmitOrg">Submit</button>
            <button type="button" @click="close">Cancel</button>
          </form>
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </generic-modal>
</template>

<style lang="scss" scoped>
.modal-holder {
  min-height: 40vh;
  margin: $modal-margin;

  .modal-header {
    color: #9b9b9b;
    font-size: $modal-title-text-size;
    margin-bottom: 40px;
  }
  .close-button {
    float: right;
    cursor: pointer;
    margin-right: 20px;
  }
  .desktop-close {
    width: 20px;
  }
  .modal-body {
    font-size: $modal-text-size;
    overflow: hidden;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: auto;

    .add-new-holder {
      width: 100%;
      .data-holder {
        @include data-holder;

        input,
        textarea {
          width: 80%;
        }
      }
    }

    img {
      height: 120px;
      margin-right: 40px;
    }
  }
}
</style>

<script>
import auth from "./../../auth/index";

export default {
  name: "add-organisation-modal",
  components: {
    "generic-modal": () => import("./../generics/GenericModal.vue"),
    // "generic-button": () => import("./../generics/GenericButton.vue")
  },
  data() {
    return {
      orgName: "",
      orgImageUrl: "",
      orgDescription: "",
      orgEmail: "",
      orgData: null
    };
  },
  props: {
    orgId: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted() {
    if (this.orgId) {
      this.getOrgansation(this.orgId);
    }
  },
  methods: {
    async getOrgansation(id) {
      try {
        const res = await auth.getOrganisation(id);
        console.log("whoa, organisation: ", res.data);
        const data = res.data;

        this.orgName = data.name;
        this.orgImageUrl = data.image;
        this.orgDescription = data.description;
        this.orgEmail = data.email;
        this.orgId = data.id;
      } catch (err) {
        console.error("error! ", err);
      }
    },
    handleSubmitOrg() {
      const correctedImageUrl = this.orgImageUrl.replace("open", "uc");

      if (this.orgId) {
        const data = {
          name: this.orgName,
          image: correctedImageUrl,
          description: this.orgDescription,
          email: this.orgEmail,
          id: this.orgId
        };
        this.$emit("submitUpdate", data);
        this.close();
      } else {
        const data = {
          name: this.orgName,
          image: correctedImageUrl,
          description: this.orgDescription,
          email: this.orgEmail
        };
        this.$emit("submit", data);
        this.close();
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
