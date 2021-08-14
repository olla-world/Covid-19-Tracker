<template>
  <div :class="data_type">
    <l-geo-json
      :geojson="geojson_covid_vaccine_json"
      :options="options"
      :options-style="styleFunction"
    />
  </div>
</template>

<script>
import { LGeoJson } from "vue2-leaflet";

export default {
  name: "geo-json-layer",
  components: {
    LGeoJson,
  },

  props: ["geojson_covid_vaccine_json", "data_type"],

  computed: {
    options: {
      get() {
        console.log(this.data_type);
        return {
          onEachFeature: (feature, layer) => {
            layer.options.fillColor = this.getColor(
              this.data_type,
              feature.properties.covid_data[this.data_type]
            );
            feature.properties.covid_data
              ? layer.on("click", (e) =>
                  this.$emit(
                    "handleSelectedCountry",
                    e.target.feature.properties.covid_data
                  )
                )
              : null;
          },
        };
      },
    },
    styleFunction: {
      get() {
        return {
          weight: 2,
          color: "rgba(0, 0, 0, 0)",
          opacity: 1,

          fillOpacity: 1,
        };
      },
    },
  },

  methods: {
    getColor(type, value) {
      return type === "people_vaccinated_per_hundred"
        ? (() =>
            value * 10000 > 1500
              ? "#00800097"
              : value * 10000 > 1250
              ? "#00b30097"
              : value * 10000 > 1000
              ? "#00e60097"
              : value * 10000 > 750
              ? "#1aff1a97"
              : value * 10000 > 500
              ? "#4dff4d97"
              : value * 10000 > 250
              ? "#80ff8097"
              : value * 10000 > 100
              ? "#b3ffb397"
              : "#e6ffe697")()
        : type === "total_cases_per_million"
        ? (() =>
            value > 1500
              ? "#99730097"
              : value > 1250
              ? "#cc990097"
              : value > 1000
              ? "#e6ac0097"
              : value > 750
              ? "#ffc61a97"
              : value > 500
              ? "#ffd24d97"
              : value > 250
              ? "#ffdf8097"
              : value > 100
              ? "#ffecb397"
              : "#fff9e697")()
        : (() =>
            value > 1500
              ? "#80000097"
              : value > 1250
              ? "#b3000097"
              : value > 1000
              ? "#e6000097"
              : value > 750
              ? "#ff1a1a97"
              : value > 500
              ? "#ff4d4d97"
              : value > 250
              ? "#ff808097"
              : value > 100
              ? "#ffb3b397"
              : "#ffe6e697")();
    },
  },
};
</script>