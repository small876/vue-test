import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import router from './router'
import vuetify from './plugins/vuetify'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(vuetify)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router:router,
  vuetify,
  beforeCreate(){                    //需在create之前先把事件寫入
    Vue.prototype.$bus = this        //全局事件總線($bus) this指向vue實例對象
  },
}).$mount('#app')
