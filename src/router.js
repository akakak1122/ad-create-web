import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('./components/Main'),
  },
  {
    path: '/:url',
    name: 'PageChange',
    component: () => import('./components/PageChange'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
