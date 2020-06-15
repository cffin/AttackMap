<template>
  <v-app id="sandbox" :dark="$vuetify.dark">
    <div id="appRoot">
      <v-app id="inspire" class="app">
        <Navigationbar></Navigationbar>
        <v-content style="padding:25px;">
          <router-view :key="$route.fullpath"></router-view>
        </v-content>
      </v-app>
    </div>
  </v-app>
</template>

<script>
import Navigationbar from '@/components/Navigationbar';
export default {
  components: {
    Navigationbar,
  },
  created() {
    this.$vuetify.dark = localStorage.getItem('isDarkMode') === 'true';
    if (this.$vuetify.dark) {
      this.$vuetify.theme.primary = '#1BA9F5';
      this.$vuetify.theme.error = '#F66';
    }
  },
};
</script>
