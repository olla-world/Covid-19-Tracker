<template>
  <v-card light>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-list v-if="covid_data">
      <v-list-item>
        <v-list-item-subtitle
          class="title d-flex justify-space-between align-center"
        >
          Trends
          <!-- <v-btn icon @click="resetCovidData">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <apexchart
          type="area"
          height="700"
          :options="covid_data.chartOptions"
          :series="covid_data.series"
        ></apexchart> </v-list-item
    ></v-list>
  </v-card>
</template>
<script>
export default {
  name: "graph",
  data() {
    return {
      covid_data: null,
      fetchController: null,
      loading: false,
    };
  },

  props: ["selected_country_data"],

  watch: {
    selected_country_data: async function (newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      await this.getCovidData(newVal.location);
    },
  },
  methods: {
    async getCovidData(country) {
      if (this.fetchController) this.deactiveFetchController();
      this.activeFetchController();

      this.resetCovidData();
      this.loading = true;

      const response = await fetch(
        `https://api.gitrows.com/https://github.com/owid/covid-19-data/blob/master/public/data/owid-covid-data.json?location=${country}`,
        { signal: this.fetchController.signal }
      );

      const data = await response.json();

      this.covid_data = data[0]
        ? {
            series: [
              {
                name: "Daily cases",
                enabled: false,
                data: data[0].data.map((item) =>
                  item.new_cases ? item.new_cases : 0
                ),
              },
              {
                name: "Daily deaths",
                data: data[0].data.map((item) =>
                  item.new_deaths ? item.new_deaths : 0
                ),
              },
              {
                name: "Daily vaccinations",
                data: data[0].data.map((item) =>
                  item.new_vaccinations ? item.new_vaccinations : 0
                ),
              },
            ],
            chartOptions: {
              chart: {
                type: "bar",
              },

              colors: ["orange", "red", "green"],
              dataLabels: {
                enabled: false,
              },

              xaxis: {
                type: "datetime",
                categories: data[0].data.map((item) => item.date),
              },
              yaxis: {
                labels: {
                  formatter: {
                    function(value, index) {
                      if (value > 999) return value / 1000 + "k";

                      return value;
                    },
                  },
                },
              },
              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm",
                },
              },
            },
          }
        : null;

      this.loading = false;
    },

    activeFetchController() {
      this.fetchController = new AbortController();
    },

    deactiveFetchController() {
      this.fetchController ? this.fetchController.abort() : null;
    },

    resetCovidData() {
      this.covid_data = null;
    },
  },
};
</script>
<style scoped lang="scss">
.v-card {
}
</style>