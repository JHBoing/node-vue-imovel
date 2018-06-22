// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate, { Validator } from 'vee-validate';
import VeeValidateMessagesBR from "vee-validate/dist/locale/pt_BR";

Validator.localize('pt_BR', VeeValidateMessagesBR);

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: { messages: VeeValidateMessagesBR }
  }
});

window.$ = require('jquery')
window.JQuery = require('jquery')



Vue.use(BootstrapVue);


require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
