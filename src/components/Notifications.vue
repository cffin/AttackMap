<template>
  <v-menu
    v-model="notifications.showMenu"
    :nudge-width="300"
    :max-width="336"
    origin="right"
    offset-y
    transition="scale-transition"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="$store.commit('notifications/HIDDER_BADGE')">
        <v-badge v-model="$store.getters.getShowBadge" color="red" overlap>
          <template v-slot:badge>
            <span>!</span>
          </template>
          <v-icon>notifications_none</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card>
      <v-list two-line subheader>
        <v-subheader class="pr-1 pt-1 mb-1">
          <v-spacer></v-spacer>
          <v-btn
            outline
            color="primary"
            v-if="$store.getters.getItems[0]"
            @click="removeAll"
            small
          >{{ $t('global.notifications.clearAll') }}</v-btn>
          <div class="pt-2 pr-1" v-else>{{ $t('global.notifications.noNotifications') }}</div>
        </v-subheader>
        <v-divider v-if="$store.getters.getItems[0]"></v-divider>
        <v-list-tile v-for="(item, index) in $store.getters.getItems" :key="index" avatar>
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-list-tile-title v-on="on">
                  {{
                  item.title
                  }}
                </v-list-tile-title>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple @click="removeItem(item)">
              <v-icon color="primary" small>clear</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: "Notifications",
    data: () => ({
      notifications: {
        showMenu: false
      }
    }),
    methods: {
      removeAll() {
        this.$store.commit("notifications/DEL_ALL_ITEM");
      },
      removeItem(Item) {
        this.$store.commit("notifications/DEL_ITEM", Item);
      }
    }
  };
</script>
