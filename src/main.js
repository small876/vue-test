import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVueIcons } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { 
  BadgePlugin,
  AlertPlugin,
  BreadcrumbPlugin,
  ButtonPlugin,
  CardPlugin,
  CarouselPlugin,
  CollapsePlugin,
  DropdownPlugin,
  FormPlugin ,
  FormDatepickerPlugin,
  FormGroupPlugin,
  FormRadioPlugin,
  LayoutPlugin,
  ListGroupPlugin,
  ModalPlugin,
  NavbarPlugin,
  OverlayPlugin,
  SpinnerPlugin,
  TablePlugin,
  FormInputPlugin    
  } from 'bootstrap-vue'

Vue.use(BadgePlugin)
Vue.use(AlertPlugin)
Vue.use(BadgePlugin)
Vue.use(BreadcrumbPlugin)
Vue.use(ButtonPlugin)
Vue.use(CardPlugin)
Vue.use(CarouselPlugin)
Vue.use(CollapsePlugin)
Vue.use(DropdownPlugin)
Vue.use(FormPlugin )
Vue.use(FormDatepickerPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormRadioPlugin)
Vue.use(LayoutPlugin)
Vue.use(ListGroupPlugin)
Vue.use(ModalPlugin)
Vue.use(NavbarPlugin)
Vue.use(OverlayPlugin)
Vue.use(SpinnerPlugin)
Vue.use(TablePlugin)
Vue.use(BootstrapVueIcons)
Vue.use(FormInputPlugin)
Vue.use(VueRouter)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router:router,
}).$mount('#app')
