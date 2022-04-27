import { createWebHistory, createRouter } from 'vue-router';
import { v1 } from 'uuid';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('./components/Main'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./components/Login'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('./components/NotFound'),
  },
  {
    path: '/:url',
    name: 'PageChange',
    component: () => import('./components/PageChange'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  const uuid = localStorage.getItem('uuid');
  if (!uuid) localStorage.setItem('uuid', v1());
  console.log('uuid', uuid)

  if (to.path === '/' && !token) {
    return next('/login');
  }

  next();
});

export default router;
