import Vue from "vue";
import './plugins/vuetify';
import './plugins/axios';
import './plugins/vuex';
import './plugins/vue-file-agent';
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import i18n from './locales/index.js'
import '@/styles/index.scss' // global css
import 'inter-ui';
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
// .$mount("#app");
