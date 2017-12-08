// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false // 将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐

if (module.hot) {
  module.hot.accept()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render: h => h(App)
})
