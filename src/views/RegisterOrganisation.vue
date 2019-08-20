<template>
  <div class="register-holder">
    <div class="register-orgs-holder" v-if="organisations">
      <div>selected organsations: {{selectedOrganisations}}</div>
      <div v-if="confirmationPage">
        <!-- bunu sonra ayri sayfa yap route lu neyn  -->
        <!-- also make this into component -->
        <div class="proceed-button" @click="handleButton">
          <span class="button-text">Tilbake</span>
        </div>
        <confirm-page :organisations="selectedOrganisations"></confirm-page>
      </div>
      <div v-else>
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
        <div v-if="filteredItemsList.length > 0">
          <div v-for="org in filteredItemsList" :key="org.title" class="organisation-holder">
            <div>
              <input
                class="org-icon"
                type="checkbox"
                :value="org.title"
                v-model="selectedOrgTitles"
              />
              <span class="org-icon">image</span>
              <!-- <img :src="getOrganisationImage(org.image)" /> -->
              <span>{{org.title}}</span>
            </div>
            <div v-if="selectedOrgTitles.includes(org.title)">
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
        <div v-else>poop</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-holder {
  @include general-flex;

  justify-content: center;
  width: 90%;

  .proceed-button {
    @include default-button;

    width: 90px;
    margin: 10px 0;
  }

  .orgs-searchbar-holder {
    margin-top: 14px;

    input {
      width: 120px;
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

    .organisation-holder {
      @include general-flex;

      justify-content: space-between;
      width: 60%;
      padding: $default-padding-large;
      border-bottom: 1px solid grey;

      &:hover {
        background: darken(white, 5%);
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
    'confirm-page': () => import('./../views/Confirmation.vue')
  },
  data() {
    return {
      organisations: null,
      searchOrg: "",
      selectedOrgTitles: [],
      selectedDate: null,
      selectedDates: [],
      selectedOrganisations: [],
      confirmationPage: false
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    filteredItemsList() {
      return this.organisations.filter(item => {
        return item.title.toLowerCase().includes(this.searchOrg.toLowerCase());
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
        title: organisation.title,
        email: organisation.email,
        date: eventAsDate
      };

      const org = this.selectedOrganisations.find(
        item => item.title === organisation.title
      );

      if (org) {
        org.date = eventAsDate;
      } else {
        this.selectedOrganisations.push(orgObject);
      }
    },
    getData() {
      try {
        const result = auth.getHardCodedData();
        this.organisations = result;
      } catch (err) {
        console.error("error while getting data: ", err);
      }
    }
  }
};
</script>