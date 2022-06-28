import Vue from 'vue';
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Vuetify from 'vuetify'
import locale from 'element-ui/lib/locale/lang/en';

import Raphael from 'raphael/raphael'
global.Raphael = Raphael


import BlockUIService from './Shared/BlockUIService.js';
import App from './App.vue';
import Layout from './components/Layout/Layout.vue';
import Login from './components/Login/Login.vue';
import Home from './components/Home/Home.vue';
import DataService from './Shared/DataService';

import UserProfile from './components/Users/Profile/Profile.vue'
import Users from './components/Users/Users.vue';
import ChangePassword from './components/Users/ChangePassword/ChangePassword.vue';


import Hospitals from './components/Hospitals/Hospitals.vue';
import AddHospitals from './components/Hospitals/Add/Add.vue';


import Diseases from './components/Diseases/Diseases.vue';
import AddDiseases from './components/Diseases/Add/Add.vue';

import Applications from './components/Applications/Applications.vue';
import AddApplications from './components/Applications/Add/Add.vue';

import Immediate from './components/Applications/Immediate/Immediate.vue';
import AddImmediate from './components/Applications/Immediate/Add/Add.vue';

import Municipalities from './components/Municipalities/Municipalities.vue';
import AddMunicipalities from './components/Municipalities/Add/Add.vue';

import Requests from './components/Applications/Requests/Requests.vue';

import Reports from './components/Reports/Reports.vue';

import ChartsInfo from './components/ChartsInfo/ChartsInfo.vue';

import MediaCenter from './components/MediaCenter/MediaCenter.vue';

import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);

Vue.use(Vuetify)
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

Vue.prototype.$http = DataService;
Vue.prototype.$blockUI = BlockUIService;


export const eventBus = new Vue();

//const i18n = new VueI18n({
//    locale: 'ar', // set locale
//    messages, // set locale messages
//})

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/Login',
            component: Login,
         
        },
         {
            path: '/',
            component: App,
            children: [
                {
                    path: '',
                    component: Layout,
                    children: [
                        { path: '', component: Home },
                        { path: 'Users', component: Users },
                        { path: 'UserProfile', component: UserProfile },
                        { path: 'ChangePassword', component: ChangePassword },


                        { path: 'Hospitals', component: Hospitals },
                        { path: 'Hospitals/AddHospitals', component: AddHospitals },

                        { path: 'Diseases', component: Diseases },
                        { path: 'Diseases/AddDiseases', component: AddDiseases },

                        { path: 'Applications', component: Applications },
                        { path: 'Applications/AddApplications', component: AddApplications },

                        { path: 'Immediate', component: Immediate },
                        { path: 'Applications/AddImmediate', component: AddImmediate },

                        { path: 'Municipalities', component: Municipalities },
                        { path: 'Municipalities/AddMunicipalities', component: AddMunicipalities },

                        { path: 'Requests', component: Requests },

                        { path: 'Reports', component: Reports },

                        { path: 'ChartsInfo', component: ChartsInfo },

                        { path: 'MediaCenter', component: MediaCenter },

                    ]
                },
            ],
        }
    ]
});

Vue.filter('toUpperCase', function (value) {
    if (!value) return '';
    return value.toUpperCase();
});

new Vue({
    router,
    render: h => {
        return h(App);
    }
}).$mount('#cpanel-management');
