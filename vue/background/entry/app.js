// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
import router from '../router/index'
import store from '../vuex/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iview from 'iview'
import '../../interceptors/interceptors'

Vue.use(VueAxios, axios)
Vue.use(iview)

if (module.hot) {
  module.hot.accept()
}

router.beforeEach((to, from, next) => {
  iview.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iview.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
