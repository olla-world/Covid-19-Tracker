import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'


Vue.config.productionTip = false
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
