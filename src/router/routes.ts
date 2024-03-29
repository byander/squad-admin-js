import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Rules.vue') },
      { path: 'maps', component: () => import('pages/Maps.vue') },
      { path: 'layers', component: () => import('pages/Layers.vue') },
      { path: 'commands', component: () => import('pages/Commands.vue') },
      { path: 'rcon', component: () => import('pages/Rcon.vue') },
      { path: 'messages', component: () => import('pages/Messages.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
