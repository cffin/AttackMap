<template>
  <v-snackbar
    v-model="$store.state.responseMessage.alert.show"
    :color="$store.getters.getAlert.type"
    :bottom="true"
    :right="true"
    :timeout="4000"
  >
    <v-icon color="white">notifications_none</v-icon>
    {{ $store.getters.getAlert.text }}
    <v-icon size="16" @click="$store.commit('responseMessage/CLOSE_ALERT')" color="white">cancel</v-icon>
  </v-snackbar>
</template>
<script>
  export default {
    name: "ResponseMessage"
  };
</script>
