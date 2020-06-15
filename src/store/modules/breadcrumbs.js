const state = {
  items: [],
};
const mutations = {
  CHNAGE_BREADCRUMBS(state, route) {
    if (route.params.breadcrumb) {
      state.items = route.meta.breadcrumb.concat({
        text: route.params.breadcrumb,
        path: '',
      });
    } else {
      state.items = route.meta.breadcrumb;
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
