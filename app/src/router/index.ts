import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        hideInFooter: false,
      },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
      meta: {
        title: 'Gallery',
        hideInFooter: false,
      },
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue'),
      meta: {
        title: 'Team',
        hideInFooter: false,
      },
    },
    {
      path: '/sponsors',
      name: 'sponsors',
      component: () => import('../views/SponsorsView.vue'),
      meta: {
        title: 'Sponsors',
        hideInFooter: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
