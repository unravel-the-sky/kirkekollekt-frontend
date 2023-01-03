<template>
  <div class="register-page">
    <p class="register-page-title">Registrer kollekter</p>
    <ol>
      <li
        v-for="step in registerSteps"
        :key="step.name"
        class="register-page-subtitle"
      >
        {{ step }}
      </li>
    </ol>
    <!-- <span class="register-page-subtitle">how to do it</span> -->

    <div class="register-holder">
      <div class="register-orgs-holder" v-if="organisations">
        <div v-if="selectedOrganisations.length > 0">
          Valgte organisasjoner:
          <span v-for="(org, index) in selectedOrganisations" :key="org.id">
            {{ org.Name }}
            <span
              v-if="
                selectedOrganisations.length > 0 &&
                  index < selectedOrganisations.length - 1
              "
              class="space"
              >,</span
            >
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
                placeholder="Søk organisasjon.."
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
            <div
              v-for="org in filteredItemsList"
              :key="org.id"
              class="organisation-holder"
            >
              <div class="organisation-left-panel">
                <label :id="org.name">
                  <input
                    class="org-icon"
                    type="checkbox"
                    :value="org.id"
                    v-model="selectedOrgIds"
                  />
                  <img :src="org.image" />
                  <span>{{ org.name }}</span>
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
                <div v-for="dateInput in moreDates" :key="dateInput.name">
                  <span class="org-icon">Date:</span>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    date-format="dd/mm/yyyy"
                    @input="handleDateInput(org)"
                  />
                </div>
                <img
                  v-if="!hidePlusIcon"
                  src="@/assets/imgs/plus.svg"
                  class="add-date-icon"
                  @click="handleAddMoreDates"
                />
              </div>
            </div>
          </div>
          <div v-else>ingen data</div>
        </div>
      </div>
    </div>
    <register-organisation-modal
      v-if="showConfirmationDialog"
      @close="showConfirmationDialog = !showConfirmationDialog"
      @advance="handleAdvance"
    ></register-organisation-modal>
  </div>
</template>

<style lang="scss" scoped>
.register-page {
  display: block;
  width: 100%;

  ol {
    padding-inline-start: 15px;
  }

  .register-page-title {
    @include page-title;

    display: block;
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

  .add-date-icon {
    height: 12px;
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
import auth from './../auth/index';

export default {
  name: 'register-organisations',
  components: {
    'confirm-page': () => import('./../views/Confirmation.vue'),
    'register-organisation-modal': () =>
      import('./../components/products/RegisterOrganisationModal.vue'),
  },
  data() {
    return {
      organisations: null,
      searchOrg: '',
      selectedOrgIds: [],
      selectedDate: null,
      selectedDates: {},
      moreDates: [],
      hidePlusIcon: false,
      selectedOrganisations: [],
      confirmationPage: false,
      showConfirmationDialog: false,
      registerSteps: [
        'Velg organisasjon',
        'Velg dato for kollekt',
        'Gjenta for flere organisasjoner',
        'Trykk neste',
      ],
    };
  },
  created() {
    this.getData();
  },
  watch: {
    selectedOrgIds() {
      console.log('is checked? ', event.target.checked);
      console.log('value: ', event.target.defaultValue);

      if (event.target.checked === false) {
        const id = event.target.defaultValue;
        const org = this.selectedOrganisations.find((item) => item.Id === id);
        if (org) {
          this.selectedOrganisations = this.selectedOrganisations.filter(
            (item) => item.Id !== id
          );
        }
      }
    },
  },
  computed: {
    filteredItemsList() {
      return this.organisations.filter((item) => {
        return item.name.toLowerCase().includes(this.searchOrg.toLowerCase());
      });
    },
  },
  methods: {
    handleButton() {
      this.showConfirmationDialog = !this.showConfirmationDialog;
    },
    handleAdvance() {
      this.confirmationPage = !this.confirmationPage;
    },
    handleAddMoreDates() {
      this.moreDates.push('wee');
      if (this.moreDates.length === 4) {
        this.hidePlusIcon = true;
      }
    },
    handleDateInput(organisation) {
      const eventAsDate = event.target.valueAsDate;
      this.selectedDate = eventAsDate;

      if (this.selectedDates[organisation.id] == null) {
        this.selectedDates[organisation.id] = new Array();
      }

      this.selectedDates[organisation.id].length === (moreDates.length - 1)
        ? this.selectedDates[organisation.id] = eventAsDate.toJSON() 
        : this.selectedDates[organisation.id].push(eventAsDate.toJSON())

      const orgObject = {
        Name: organisation.name,
        Emails: organisation.emails,
        DonationDates: this.selectedDates[organisation.id],
        Id: organisation.id,
      };

      const org = this.selectedOrganisations.find(
        (item) => item.Id === organisation.id
      );

      if (org) {
        org.DonationDates = this.selectedDates[organisation.id];
      } else {
        this.selectedOrganisations.push(orgObject);
      }
    },
    async getData() {
      try {
        const result = await auth.getAllOrganisations();
        this.organisations = result.data;
      } catch (err) {
        console.error('error while getting data: ', err);
      }
    },
  },
};
</script>
