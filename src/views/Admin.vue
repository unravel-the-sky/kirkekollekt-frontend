<template>
  <div class="admin-page-holder">
    <span class="admin-page-title">Admin Page</span>
    <div class="admin-page">
      <div class="add-new-org-button" @click="showAddOrgModal = !showAddOrgModal">ADD NEW ORG</div>
      <div v-if="orgs" class="admin-existing-data-holder">
        Existing organisations:
        <div v-for="org in orgs" :key="org.name" class="org-holder">
          <div>
            <div class="org-name">{{org.name}}</div>
            <img class="org-logo" :src="org.image" />
          </div>
          <div>
            <div class="org-description" v-html="org.description"></div>
            <div class="org-email">{{org.email}}</div>
          </div>
          <div>
            <button @click="handleUpdate(org.id)">update</button>
            <button @click="handleDelete(org.id)">delete</button>
          </div>
        </div>
      </div>
      <div>
        <!-- <img src="https://drive.google.com/uc?id=1Cf98-p3K5GSxUB1nd13XvFM3JUnlM48T"> -->
        <!-- change open to uc -->
      </div>
    </div>
    <add-organisation-modal
      v-if="showAddOrgModal"
      @submit="handleSubmit"
      @submitUpdate="handleDataUpdate"
      @close="showAddOrgModal = false"
      :orgId="orgId"
    ></add-organisation-modal>
  </div>
</template>

<style lang="scss" scoped>
.admin-page-holder {
  margin: 10px;

  .admin-page-title {
    margin: 20px;
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: 800;
    display: block;
  }
}
.admin-existing-data-holder {
  padding: 20px;

  .org-holder {
    margin: 15px 0;
    padding: 15px;
    border: 1px solid grey;
    border-radius: 8px;
    font-size: $modal-text-size;
    overflow: hidden;
    // width: 40%;
    max-width: 650px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: auto;

    &:hover {
      background: darken(white, 5%);
    }

    img {
      height: 120px;
      margin-right: 40px;
    }

    .org-description {
      margin-bottom: 10px;
    }
  }
}
.data-holder {
  @include data-holder;
}
.add-new-org-button {
  @include default-button;

  width: 120px;
}
</style>

<script>
import auth from "./../auth/index";
// import axios from "axios";

export default {
  name: "admin-page",
  data() {
    return {
      data: null,
      files: new FormData(),
      orgs: null,
      orgName: "",
      orgImage: "",
      showAddOrgModal: false,
      orgId: null
    };
  },
  components: {
    "add-organisation-modal": () =>
      import("./../components/products/AddOrganisationModal")
  },
  mounted() {
    this.getOrganisations();
  },
  methods: {
    async getOrganisations() {
      try {
        const res = await auth.getAllOrganisations();
        console.log("data is: ", res.data);
        this.orgs = res.data;
      } catch (err) {
        console.error("error is: ", err);
      }
    },
    handleFileChange() {
      // this.files.append(event.target.files);
      const fileList = event.target.files;
      this.files.append("file", fileList[0], fileList[0].name);
      // this.files = this.files.concat(...event.target.files);
    },
    async handleSubmit(data) {
      console.log("here is the data: ", data);

      try {
        const res = await auth.sendOrganisationData(data);
        console.log("wahoaaa: ", res.data);
      } catch (err) {
        console.error("error: ", err);
      } finally {
        this.getOrganisations();
      }
    },
    async handleDataUpdate(data) {
      console.log("here is the data: ", data);

      try {
        const res = await auth.updateOrganisation(this.orgId, data);
        console.log("wahoaaa: ", res.data);
      } catch (err) {
        console.error("error: ", err);
      } finally {
        this.getOrganisations();
      }
    },
    async handleDelete(id) {
      console.log("id: ", id);
      if (confirm("delete this one?")) {
        try {
          const res = await auth.deleteOrganisation(id);
          console.log("deleted! ", res.data);
        } catch (err) {
          console.error("error while deleting! ", err);
        } finally {
          this.getOrganisations();
        }
      }
    },
    handleUpdate(id) {
      this.orgId = id;
      this.showAddOrgModal = true;
    },
    // async submitOrg() {
    //   const data = {
    //     name: this.orgName,
    //     image: this.orgImage,
    //     description: "dwee",
    //     email: "weee"
    //   };

    //   console.log("data is: ", data);

    //   try {
    //     if (this.orgId) {
    //       const res = await auth.updateOrganisation(this.orgId, data);
    //       console.log("wahoaaa: ", res.data);
    //     } else {
    //       const res = await auth.sendOrganisationData(data);
    //       console.log("wahoaaa: ", res.data);
    //     }
    //   } catch (err) {
    //     console.error("error: ", err);
    //   }

    //   // const files = this.files;
    //   // axios
    //   //   .post("http://localhost:5000/api/organisations/image", files, {
    //   //     headers: {
    //   //       "Content-Type": "multipart/formdata"
    //   //     }
    //   //   })
    //   //   .then(res => {
    //   //     console.log("whoa! ", res.data);
    //   //   })
    //   //   .catch(err => console.error("error: ", err));
    // }
  }
};
</script>