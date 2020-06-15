import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import zhHant from 'vuetify/es5/locale/zh-Hant'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify, {
  lang: {
    locales: { zhHant, en },
    current: localStorage.getItem('locale') === 'zhtw' ? 'zhHant' : '' || 'en'
  },
  theme: {
    primary: '#006bb4',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#ee44aa',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md'
})
