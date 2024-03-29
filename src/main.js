import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './plugins/mixins';
import notify from "@/plugins/notify";
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import setAuthToken from './axios-config.js'

import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css'

const instance = setAuthToken(store.state.user_session.token)
Vue.prototype.$http = instance

Vue.config.productionTip = false
Vue.use(mixins);
Vue.use(notify, store)

NProgress.configure({
  showSpinner: false,
  trickleRate: 0.5,
  trickleSpeed: 800
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')