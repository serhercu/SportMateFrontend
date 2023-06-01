import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate';
import spanish from 'vee-validate/dist/locale/es'

import messagesi18 from '@/config/i18n-General'

import '@/assets/styles.css'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VeeValidate, {
  delay: 100,
  locale: 'es',
  strict: true,
  inject: false
})
const moment = require('moment')
require('moment/locale/es')
 
Vue.use(require('vue-moment'), {
    moment
})

const i18n = new VueI18n({
  locale: 'es', // set locale
  messages: messagesi18 // set locale messages
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created () {
    this.$validator.localize('es', {
      messages: spanish.messages
    })
  },
  render: h => h(App)
}).$mount('#app')
