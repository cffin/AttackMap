import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en/index'
import zhtw from './zhtw/index'

Vue.use(VueI18n)

const messages = {
  en, zhtw
}
const locale = localStorage.getItem('locale') || 'en'

export default new VueI18n({
  locale,
  messages
})
