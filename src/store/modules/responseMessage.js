import store from '@/store';
import { format } from 'date-fns';
const state = {
  alert: {
    show: false,
    type: '',
    text: '',
  },
};
const mutations = {
  SHOW_ALERT: (state, { type, text }) => {
    state.alert = {
      show: true,
      type: type == 0 ? 'success' : 'error',
      text: text,
    };
  },
  SHOW_ALERT_NOTIFICATIONS: (state, { type, text, reportNow }) => {
    state.alert = {
      show: true,
      type: type == 0 ? 'success' : 'error',
      text: text,
    };

    store.commit('notifications/ADD_ITEM', {
      icon: type == 0 ? 'check_circle' : 'error_outline',
      title: text,
      reportNow: reportNow,
      subtitle: format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    });
  },
  CLOSE_ALERT: state => {
    state.alert = {
      show: false,
      type: '',
      text: '',
    };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
