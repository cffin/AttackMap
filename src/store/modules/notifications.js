const state = {
  items: [],
  showBadge: false,
};
const mutations = {
  HIDDER_BADGE(state) {
    state.showBadge = false;
  },
  ADD_ITEM(state, item) {
    state.showBadge = true;
    state.items.push(item);
    state.items.sort((a, b) => new Date(b.subtitle) - new Date(a.subtitle));
  },
  DEL_ITEM(state, item) {
    state.items.splice(state.items.indexOf(item), 1);
  },
  DEL_ALL_ITEM(state) {
    state.items = [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
