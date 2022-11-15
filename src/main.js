import Vue from 'vue'
import App from './App.vue'
import store from './store'
import kiContext from '@kiyoaki_w/vue-context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faMinus, faPen, faClock, faCircleXmark, faClockFour} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faMinus, faPen, faClock, faCircleXmark, faClockFour);
import VueMask from 'v-mask'
import VueAWN from "vue-awesome-notifications"
import 'vue-awesome-notifications/dist/styles/style.css';

let options = {
    position: "bottom-right",
    maxNotifications: 3
}

Vue.config.productionTip = false

Vue.use(kiContext)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueMask);
Vue.use(VueAWN, options)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
