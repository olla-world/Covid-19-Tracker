<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: calc(100vh - 120px); width: 100%; z-index: 0"
      :max-zoom="maxZoom"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <geo-json-layer
        :geojson_covid_vaccine_json="geojson_covid_vaccine_json"
        :data_type="data_type"
        v-on="$listeners"
      />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import { data_types } from "./../constant/data_types";

import GeoJsonLayer from "./GeoJsonLayer";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    GeoJsonLayer,
  },

  props: ["geojson_covid_vaccine_json", "current_data_type"],
  data() {
    return {
      zoom: 2,
      maxZoom: 4,
      zoomOffset: -1,
      center: [0, 0],
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="maptiles.p.rapidapi.com">OpenStreetMap</a> contributors',
    };
  },

  computed: {
    data_type: {
      get() {
        return data_types[this.current_data_type];
      },
    },
  },
};
</script>

