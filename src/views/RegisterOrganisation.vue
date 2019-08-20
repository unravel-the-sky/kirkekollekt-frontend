<template>
  <div class="register-page">
    <p class="register-page-title">Register Organisation</p>
    <span class="register-page-subtitle">how to do it</span>

    <div class="register-holder">
      <div class="register-orgs-holder" v-if="organisations">
        <div v-if="selectedOrganisations.length > 0">
          selected organsations:
          <span v-for="(org, index) in selectedOrganisations" :key="org.id">
            {{org.name}}
            <span
              v-if="selectedOrganisations.length > 0 && index < selectedOrganisations.length -1 "
              class="space"
            >,</span>
          </span>
        </div>
        <div v-if="confirmationPage">
          <!-- also make this into component -->
          <confirm-page :organisations="selectedOrganisations"></confirm-page>
          <div class="proceed-button" @click="handleButton">
            <span class="button-text">Tilbake</span>
          </div>
        </div>
        <div v-else>
          <div class="orgs-action-holder">
            <div class="orgs-searchbar-holder">
              <input
                type="text"
                v-model="searchOrg"
                placeholder="Search organsation.."
                id="org-search"
                autofocus
              />
            </div>

            <div v-if="selectedOrganisations.length > 0">
              <div class="proceed-button" @click="handleButton">
                <span class="button-text">Neste</span>
              </div>
            </div>
          </div>

          <div v-if="filteredItemsList.length > 0">
            <div v-for="org in filteredItemsList" :key="org.id" class="organisation-holder">
              <div class="organisation-left-panel">
                <label :id="org.name">
                  <input class="org-icon" type="checkbox" :value="org.id" v-model="selectedOrgIds" />
                  <img :src="org.image" />
                  <span>{{org.name}}</span>
                </label>
              </div>
              <div v-if="selectedOrgIds.includes(org.id)">
                <span class="org-icon">Date:</span>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  date-format="dd/mm/yyyy"
                  @input="handleDateInput(org)"
                />
              </div>
            </div>
          </div>
          <div v-else>ingen data</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-page {
  display: block;
  width: 100%;

  .register-page-title {
    @include page-title;
  }

  .register-page-subtitle {
    @include page-title;

    font-weight: 400;
    font-size: 12px;
    margin-top: 0;
  }

  .space {
    margin-right: 3px;
  }
}
.organisation-holder {
  img {
    height: 120px;
    margin-right: 40px;
  }
}
.register-holder {
  @include general-flex;

  justify-content: center;
  width: 90%;
  padding: 0 $default-padding-large;

  .proceed-button {
    @include default-button;

    width: 90px;
  }

  .orgs-searchbar-holder {
    margin-bottom: 14px;

    input {
      width: 150px;
      border: 1px solid grey;
      border-radius: 8px;
      padding: 10px 15px;
    }
    input:focus {
      outline: none !important;
      border-color: grey;
    }
  }

  .register-orgs-holder {
    width: 100%;

    .org-icon {
      margin-right: 0.5rem;
    }

    .orgs-action-holder {
      @include general-flex;

      justify-content: space-between;
      width: 60%;
    }

    .organisation-holder {
      @include general-flex;

      justify-content: space-between;
      width: 60%;
      padding: $default-padding-large;
      border-bottom: 1px solid grey;

      &:hover {
        background: darken(white, 5%);
      }

      .organisation-left-panel {
        display: flex;
        width: 100%;
        justify-content: left;
      }

      .organisation-left-panel label {
        @include general-flex;

        display: flex;
        width: 100%;
        justify-content: left;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
import auth from "./../auth/index";

export default {
  name: "register-organisations",
  components: {
    "confirm-page": () => import("./../views/Confirmation.vue")
  },
  data() {
    return {
      organisations: null,
      searchOrg: "",
      selectedOrgIds: [],
      selectedDate: null,
      selectedDates: [],
      selectedOrganisations: [],
      confirmationPage: false
    };
  },
  created() {
    this.getData();
  },
  watch: {
    selectedOrgIds() {
      console.log("is checked? ", event.target.checked);
      console.log("value: ", event.target.defaultValue);

      if (event.target.checked === false) {
        const id = event.target.defaultValue;
        const org = this.selectedOrganisations.find(item => item.id === id);
        if (org) {
          this.selectedOrganisations = this.selectedOrganisations.filter(
            item => item.id !== id
          );
        }
      }
    }
  },
  computed: {
    filteredItemsList() {
      return this.organisations.filter(item => {
        return item.name.toLowerCase().includes(this.searchOrg.toLowerCase());
      });
    }
  },
  methods: {
    handleButton() {
      this.confirmationPage = !this.confirmationPage;
    },
    handleDateInput(organisation) {
      const eventAsDate = event.target.valueAsDate;
      this.selectedDate = eventAsDate;
      this.selectedDates.push(eventAsDate);

      const orgObject = {
        Name: organisation.name,
        Email: organisation.email,
        DonationDate: eventAsDate.toJSON(),
        Id: organisation.id
      };

      const org = this.selectedOrganisations.find(
        item => item.id === organisation.id
      );

      if (org) {
        org.date = eventAsDate;
      } else {
        this.selectedOrganisations.push(orgObject);
      }
    },
    async getData() {
      try {
        const result = await auth.getAllOrganisations();
        this.organisations = result.data;
      } catch (err) {
        console.error("error while getting data: ", err);
      }
    }
  }
};
</script>