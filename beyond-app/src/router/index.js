import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../view/LoginForm.vue';
import { auth } from '@/config/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'loginForm',
    component: login,
  },
  {
    path: '/cadastro',
    name: 'Novocadastro',
    component: () => import('../view/NovoCadastro.vue'),
  },
  {
    path: '/chat/:nome',
    name: 'chat',
    component: () => import('../view/chatView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/todosUsuarios',
    name: 'todosUsuarios',
    component: () => import('../view/todosUsuarios.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/perfil/:nome/:user',
    name: 'perfil',
    component: () => import('../view/perfilView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/messageList',
    name: 'MessageList',
    component: () => import('../view/MessageList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history', 
  routes,
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (!user && to.matched.some((record) => record.meta.requiresAuth)) {
      next({ name: 'loginForm' });
    } else {
      next();
    }
  });
});

export default router;