<template>
  <div>
    <v-layout class="pl-2 pr-2" style="height: 36px;">
      <v-breadcrumbs class="breadcrumbs" :items="$store.getters.getBreadcrumbs">
        <v-breadcrumbs-item slot="item" slot-scope="{ item }" exact :to="item.path">{{ item.text }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-spacer></v-spacer>
      <div style="margin-top: 6px;">
        <Notifications></Notifications>
      </div>
    </v-layout>

    <v-tabs class="tabs" color="transparent" v-if="menus.item.length > 1">
      <v-tab
        v-for="(menu, index) in menus.item"
        :key="index"
        class="pl-2 pr-2 tabs__tab"
        active-class="tabs__tab--active"
        :to="menu.path"
        >{{ menu.title }}</v-tab
      >
      <v-tabs-slider color="primary"></v-tabs-slider>
    </v-tabs>
    <ResponseMessage></ResponseMessage>
  </div>
</template>

<script>
import Notifications from './Notifications';
import ResponseMessage from './ResponseMessage.vue';
export default {
  name: 'Navigationbar',
  components: {
    Notifications,
    ResponseMessage,
  },
  data() {
    return {
      menus: {
        name: 'Visualization',
        item: [
          {
            title: this.$t('global.main.visualization.visualization'),
            path: '/Visualization/web',
          },
        ],
      },
    };
  },
};
</script>
