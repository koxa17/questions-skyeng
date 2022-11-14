import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Notifications from 'vue-notification';
import kiContext from '@kiyoaki_w/vue-context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faArrowLeft, faArrowUp, faArrowDown,  faMinus, faPen} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faMinus, faPen);
import VueMask from 'v-mask'





Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(kiContext)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueMask);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
