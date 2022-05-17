import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  MenuIcon,
  i18n,
  render: h => h(App)
}).$mount('#app')
