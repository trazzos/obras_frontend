// =========================================================
// * Vuetify Material Dashboard PRO - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueAxios from 'vue-axios'
import axios from './axios'
import VueAuth from '@websanova/vue-auth'
import auth from './plugins/auth'
import VuetifyConfirm from 'vuetify-confirm'
Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(VueAuth, auth)
Vue.config.productionTip = false
Vue.use(VuetifyConfirm, { vuetify })

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
