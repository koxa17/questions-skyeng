import Vue from 'vue'
import App from './App.vue'
import store from './store'
import kiContext from '@kiyoaki_w/vue-context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faMinus, faPen, faClock, faCircleXmark, faClockFour, faEraser, faPlus, faCirclePlus, faXmark, faStar} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight, faArrowLeft, faArrowUp, faArrowDown, faMinus, faPen, faClock, faCircleXmark, faClockFour, faEraser, faPlus, faCirclePlus, faXmark, faStar);
import { VueMaskDirective } from 'v-mask'
import VueAWN from "vue-awesome-notifications"
import 'vue-awesome-notifications/dist/styles/style.css';
import 'animate.css';

let options = {
    position: "bottom-right",
    maxNotifications: 3,
    icons: {
        enabled: false
    }
}

Vue.config.productionTip = false

Vue.use(kiContext)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAWN, options)
Vue.directive('mask', VueMaskDirective);
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
