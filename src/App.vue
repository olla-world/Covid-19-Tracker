<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      width="300"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title pa-2">
            Covid-19 Tracker
          </v-list-item-title>
        </v-list-item-content>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <controller
        :selected_data_type="selected_data_type"
        v-on:handleSelectedType="handleSelectedType"
      />
    </v-navigation-drawer>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <div v-if="loading">Loading...</div>
    <v-main app v-else>
      <toolbar
        :selected_country_data="selected_country_data"
        :selected_data_type="selected_data_type"
        :show_selected_country_data="show_selected_country_data"
      />

      <Map
        :geojson_covid_vaccine_json="geojson_covid_vaccine_json"
        :current_data_type="selected_data_type"
        v-on:handleSelectedCountry="handleSelectedCountry"
      />

      <!-- <indicator :current_data_type="selected_data_type" /> -->

      <data-card
        :selected_country_data="selected_country_data"
        :selected_data_type="selected_data_type"
        :show_selected_country_data="show_selected_country_data"
        v-on:closeSelectedCountryData="closeSelectedCountryData"
      />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
import DataCard from "./components/DataCard.vue";
import Map from "./components/Map.vue";
import Controller from "./components/Controller.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",

  components: {
    Map,
    DataCard,
    Controller,
    Toolbar,
  },

  data: () => ({
    loading: false,
    geojson: null,
    covid_vaccine_json: null,
    covid_vaccine_name_json: null,
    geojson_covid_vaccine_json: null,

    show_selected_country_data: false,
    selected_country_data: null,

    selected_data_type: "0",
    drawer: true,
    mini: true,

    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
  }),

  async created() {
    this.loading = true;
    this.geojson = await this.fetchGeoJsonData();
    this.covid_vaccine_json = await this.fetchCovidVaccineData();
    this.covid_vaccine_name_json = await this.fetchCovidVaccineName();
    this.geojson_covid_vaccine_json = await this.covidVaccineDataAndCovidVaccineNameMargeWithGeoJsonData();
    this.loading = false;
  },

  methods: {
    async fetchGeoJsonData() {
      const response = await fetch(
        "https://api.gitrows.com/https://github.com/johan/world.geo.json/blob/master/countries.geo.json"
      );
      const data = await response.json();
      return data;
    },

    async fetchCovidVaccineData() {
      const response = await fetch(
        "https://api.gitrows.com/https://github.com/owid/covid-19-data/blob/master/public/data/latest/owid-covid-latest.json"
      );

      const data = await response.json();
      return data;
    },

    async fetchCovidVaccineName() {
      const response = await fetch(
        "https://api.gitrows.com/https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/locations.csv"
      );

      const data = await response.json();
      return data;
    },

    async covidVaccineDataAndCovidVaccineNameMargeWithGeoJsonData() {
      let data = await this.geojson.features.map((item) => ({
        ...item,
        properties: {
          ...item.properties,
          covid_data: this.covid_vaccine_json[item.id],
        },
      }));

      data = await data.map((item) => ({
        ...item,
        properties: {
          ...item.properties,
          covid_data: {
            ...item.properties.covid_data,
            vaccine_name: (() => {
              const vaccine = this.covid_vaccine_name_json.find(
                (vaccine) => vaccine.iso_code === item.id
              );

              return vaccine ? vaccine.vaccines : null;
            })(),
          },
        },
      }));

      return { type: "FeatureCollection", features: data };
    },

    handleSelectedCountry(country_data) {
      this.show_selected_country_data = true;
      this.selected_country_data = country_data;
    },

    handleSelectedType(selected_type) {
      this.selected_data_type = selected_type;
    },

    closeSelectedCountryData() {
      this.show_selected_country_data = false;
    },
  },
};
</script>

<style>
.v-main {
}
</style>
