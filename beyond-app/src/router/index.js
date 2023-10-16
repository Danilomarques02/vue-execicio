import VueRouter from 'vue-router'
import Vue from 'vue'
import chat from '../view/chatView.vue'
import todosUsuarios from '../view/todosUsuarios.vue'
import perfil from '../view/perfilView.vue'
Vue.use(VueRouter);

const routes = [
    {
      path: "/chat/:nome",
      name: "chat",
      component: chat,
    },
    {
        path: "/",
        name: "todosUsuarios",
        component: todosUsuarios,
    },
    {
        path: "/perfil/:nome",
        name: "perfil",
        component: perfil,
    }

    
  ];
  
  const router = new VueRouter({
    mode: "history",
    routes,
  });
  
  export default router;