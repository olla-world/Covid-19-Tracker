<template>
  <v-alert class="indicator elevation-10" dark>
    <v-list v-if="data_indicator" dense color="#2196f300" >
      <v-subheader>
        <p class="mb-0">
          {{ data_indicator.headline }}
        </p>
      </v-subheader>
      <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
      <v-list-item 
        v-for="(item, index) in data_indicator.indicator"
        :key="`${index}-vaccine-indicator-${item.title}`"
      >
        <v-list-item-content>
          <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
          <v-list-item-subtitle
            :style="`background:${item.color} ; min-height: 5px; min-width: 10px`"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-alert>
</template>

<script>
import { data_types } from "../constant/data_types";
import { getDataIndicator } from "./../constant/data_indicator";

export default {
  name: "Indicator",

  props: ["current_data_type"],

  computed: {
    data_indicator: {
      get() {
        return getDataIndicator(data_types[this.current_data_type]);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.indicator {
  right: 0;
  bottom: 0;
  position: absolute;
  width: 250px;
}
</style>