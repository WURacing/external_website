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
import router from './router/index.ts';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(SharedElementDirective);
router.beforeEach(SharedElementRouteGuard);

app.mount('#app');
