import store from '@/store'
import { GET, POST, PUT, DELETE } from "@/utils/Api";

const actions = {
  get({ state }, params) {
    return new Promise((resolve, reject) => {
      GET(params.url, params.data, params.options).then(response => {
        if (response.result_message && response.result_code != 0) {
          store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
            type: response.result_code,
            text: response.result_message,
          })
        }
        resolve(response);
      }).catch(error => {
        store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
          type: 1,
          text: error,
        })
        reject(error)
      })
    })
  },
  post({ state }, params) {
    return new Promise((resolve, reject) => {
      POST(params.url, params.data, params.options).then(response => {
        if (response.result_message) {
          store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
            type: response.result_code,
            text: response.result_message,
          })
        }
        resolve(response)
      }).catch(error => {
        store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
          type: 1,
          text: error,
        })
        reject(error)
      })
    })
  },
  put({ state }, params) {
    return new Promise((resolve, reject) => {
      PUT(params.url, params.data, params.options).then(response => {
        if (response.result_message) {
          store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
            type: response.result_code,
            text: response.result_message,
          })
        }
        resolve(response)
      }).catch(error => {
        store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
          type: 1,
          text: error,
        })
        reject(error)
      })
    })
  },
  delete({ state }, params) {
    return new Promise((resolve, reject) => {
      DELETE(params.url, params.data, params.options).then(response => {
        if (response.result_message) {
          store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
            type: response.result_code,
            text: response.result_message,
          })
        }
        resolve(response)
      }).catch(error => {
        store.commit("responseMessage/SHOW_ALERT_NOTIFICATIONS", {
          type: 1,
          text: error,
        })
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  actions
}

