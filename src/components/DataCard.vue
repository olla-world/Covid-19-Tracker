<template>
  <v-card
    v-if="show_selected_country_data"
    class="card--info elevation-10 pa-4"
    transition="scale-transition"
  >
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-else>
      <v-list class="location" dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="title d-flex justify-space-between align-center"
            >
              Overview
              <v-btn icon @click="closeSelectedCountryData">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-title>

            <v-list-item-content
              v-text="selected_country_data.last_updated_date"
              ><v-list-item-icon>
                <v-icon v-text="'mdi-calendar'"></v-icon> </v-list-item-icon
            ></v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="cases">
        <div class="info">
          <div class="info__main">
            <div class="tag">Total confirmed cases</div>
            <div class="value">
              <div class="value__main value__main--cases">
                {{
                  selected_country_data.total_cases
                    ? selected_country_data.total_cases.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )
                    : "..."
                }}
              </div>

              <div class="value__sub">
                +{{
                  selected_country_data.new_cases
                    ? selected_country_data.new_cases.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })
                    : "..."
                }}
              </div>
            </div>
          </div>

          <div class="info__sub">
            <div class="tag">Fatal cases</div>
            <div class="value">
              <div class="value__main">
                {{
                  selected_country_data.total_deaths
                    ? selected_country_data.total_deaths.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )
                    : "..."
                }}
              </div>

              <div class="value__sub">
                +{{
                  selected_country_data.new_deaths
                    ? selected_country_data.new_deaths.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })
                    : "..."
                }}
              </div>
            </div>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="info">
          <div class="info__main">
            <div class="tag">Vaccine does adminstered</div>
            <div class="value">
              <div class="value__main value__main--vaccine">
                {{
                  selected_country_data.total_vaccinations
                    ? selected_country_data.total_vaccinations.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )
                    : "..."
                }}
              </div>

              <div class="value__sub">
                +{{
                  selected_country_data.new_vaccinations
                    ? selected_country_data.new_vaccinations.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )
                    : "..."
                }}
              </div>
            </div>
          </div>

          <div class="info__sub">
            <v-progress-linear
              :buffer-value="
                ((selected_country_data.people_fully_vaccinated +
                  selected_country_data.people_vaccinated) *
                  100) /
                selected_country_data.population
              "
              color="success"
              stream
              :value="
                (selected_country_data.people_fully_vaccinated * 100) /
                selected_country_data.population
              "
            ></v-progress-linear>
          </div>
          <br />

          <div class="info__sub">
            <div class="tag">At least one dose</div>
            <div class="value">
              <div class="value__main">
                {{
                  selected_country_data.people_vaccinated
                    ? (
                        selected_country_data.people_vaccinated +
                        selected_country_data.people_fully_vaccinated
                      ).toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })
                    : "..."
                }}
              </div>
            </div>
          </div>

          <div class="info__sub">
            <div class="tag">Full dose</div>
            <div class="value">
              <div class="value__main">
                {{
                  selected_country_data.people_fully_vaccinated
                    ? selected_country_data.people_fully_vaccinated.toLocaleString(
                        "en-US",
                        {
                          maximumFractionDigits: 2,
                        }
                      )
                    : "..."
                }}
              </div>
            </div>
          </div>
          <br />

          <div class="info__sub">
            <div class="vaccine-name">
              <NeedleIcon />
              <div class="value">{{ selected_country_data.vaccine_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <v-list class="location" dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="title d-flex justify-space-between align-center"
            >
              Trends
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="cases">
        <apexchart
          height="300"
          :options="covid_data.chartOptions"
          :series="covid_data.series"
        ></apexchart>
      </div>
    </div>
  </v-card>
</template>

<script>
import { data_menu } from "./../constant/data_menu";
import NeedleIcon from "vue-material-design-icons/Needle.vue";

export default {
  name: "DataCard",
  components: {
    NeedleIcon,
  },
  data() {
    return {
      covid_data: null,
      fetchController: null,
      loading: false,
    };
  },
  props: [
    "selected_country_data",
    "selected_data_type",
    "show_selected_country_data",
  ],
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
      console.log(data);
      this.covid_data = {
        series:
          data.length > 0 && data
            ? [
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
              ]
            : [],
        chartOptions: {
          chart: {
            type: "bar",
          },

          colors: ["orange", "red", "green"],

          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 1,
          },
          xaxis: {
            type: "datetime",
            categories:
              data.length > 0 && data
                ? data[0].data.map((item) => item.date)
                : [],
          },
        },
      };

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

    closeSelectedCountryData() {
      this.$emit("closeSelectedCountryData", false);
    },
  },
  computed: {
    all_data_menu: {
      get() {
        // return data_menu[this.selected_data_type];
        return data_menu;
      },
    },
  },
};
</script>
<style scoped lang="scss">
.card--info {
  position: absolute;
  width: 300px;
  max-height: calc(100vh - 140px);
  left: 10px;
  top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: auto;
  z-index: 5;
}

.cases {
  background: white !important;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 4px;

  padding: 0px 16px;

  .info {
    margin: 16px 0px;
    display: flex;
    flex-direction: column;
    background: white !important;
    &__main {
      margin-bottom: 10px;
      .tag {
        color: rgb(80, 80, 80);
        font-size: 14px;
        font-weight: 500;
      }

      .value {
        display: flex;
        align-items: center;
        color: rgb(120, 120, 120);
        font-size: 14px;

        &__main {
          font-size: 20px;
          color: rgb(120, 120, 120);

          &--cases {
            color: red;
          }

          &--vaccine {
            color: green;
          }
        }
        &__sub {
          font-size: 12px;
          color: rgb(100, 100, 100);
          font-weight: 500;
          margin-left: 10px;
          background: rgb(238, 238, 238);
          padding: 5px 10px;
          border-radius: 4px;
        }
      }
    }
    &__sub {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;

      .vaccine-name {
        display: flex;
        justify-content: center;
        align-items: center;
        color: blue;
        .value {
          margin-left: 10px;
        }
      }

      .tag {
        color: rgb(80, 80, 80);
        font-size: 14px;
        font-weight: 500;
      }

      .value {
        display: flex;
        align-items: center;
        color: rgb(120, 120, 120);
        font-size: 14px;

        &__sub {
          font-size: 12px;
          color: rgb(100, 100, 100);
          font-weight: 500;
          margin-left: 10px;
          background: rgb(240, 240, 240);
          padding: 5px 10px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>