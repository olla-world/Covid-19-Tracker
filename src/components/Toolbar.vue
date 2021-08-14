<template>
  <v-toolbar dense>
    <v-toolbar-title v-if="selected_country_data"
      >{{ selected_country_data.location }}
      <span class="font-weight-light font-italic subtitle-2">{{
        selected_country_data.continent
      }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="header-info">
      <div class="tag"><AccountGroupIcon />Population</div>
      <div class="value">{{ selected_country_data.population }}</div>
      <div class="sub-value">
        {{ selected_country_data.population_density }}
      </div>
    </div>
  </v-toolbar>
</template>

<script>
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";

export default {
  name: "toolbar",
  components: {
    AccountGroupIcon,
  },
  props: [
    "selected_country_data",
    "selected_data_type",
    "show_selected_country_data",
  ],
};
</script>

<style scoped lang="scss">
.header-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .tag {
    color: blue;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 15px;
    .material-design-icon {
      margin-right: 10px;
    }
  }

  .sub-value {
    margin-left: 5px;
    padding: 5px 10px;
    background: rgb(240, 240, 240);
    font-size: 12px;
  }
}
</style>
