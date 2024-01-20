import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  createSharedElementDirective,
  SharedElementRouteGuard,
  SharedElementDirective,
} from 'v-shared-element';
import 'aos/dist/aos.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import icons */
import {
  faHandshake,
  faX,
  faChevronDown,
  faBars,
  faEnvelope,
  faTimes,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

import axios from 'axios';
import App from './App.vue';
import router from './router/index.ts';

/* add icons to the library */
library.add(
  faHandshake,
  faX,
  faChevronDown,
  faBars,
  faEnvelope,
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedinIn,
  faTimes,
  faFilePdf,
);

const app = createApp(App);

app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = 'http://wuracing-api.test/api/v1/';

// Request interceptor
axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// Response interceptor
axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

app.use(createPinia());
app.use(router);
app.use(SharedElementDirective);
router.beforeEach(SharedElementRouteGuard);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
