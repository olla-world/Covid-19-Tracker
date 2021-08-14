<template>
  <v-radio-group
    class="pa-4"
    v-model="type"
    @change="$emit('handleSelectedType', type)"
    column
  >
    <v-radio
      v-for="(menu, index) in data_menu"
      :key="`${index}-${menu.type}-${menu.value}`"

      :color="menu.color"
      :value="menu.value"
    >
      <template v-slot:label>
        <div> 
          <strong class="pl-4">{{menu.type.charAt(0).toUpperCase() + menu.type.slice(1)}}</strong></div>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script>
import { data_menu } from "./../constant/data_menu";

export default {
  name: "Controller",

  props: ["selected_data_type"],
  data() {
    return {
      type: "0",
    };
  },

  computed: {
    data_menu: {
      get() {
        return data_menu;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.controller {
  &--type {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;

    width: 150px;
  }
}
</style>
