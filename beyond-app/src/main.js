import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Chats from './pages/chatsList.vue'
import Messages from './pages/messagesList.vue'
import VuexPersistence from 'vuex-persist'
import todosUsuarios from './pages/todosUsuarios.vue'

Vue.config.productionTip = false;
Vue.use(Vuex)
Vue.use(VueRouter)

const users = {
  namespaced: true,
  state: {
  },
  actions: {
  },
  mutations: {
  }
}

const chat = {
  namespaced: true,
  state: { 
    messages: [
      {
        nome: "Pedro",
        id: 1
      },
      {
        nome: "Davi",
        id: 2
      }
    ],
  },
  actions: {
    sendMessage({ commit }, payload){
      commit('addMessage', payload)
    },
  },
  mutations: {
    addMessage(state, message){
      state.messages.push(message)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    users: users,
    chat: chat,
  },
  plugins: [
    new VuexPersistence().plugin
  ]
})

const routes = [
  {
    path: '/',
    component: Chats,
  },
  {
    path: '/chat',
    component: Messages,
  },
  {
  path: '/todosUsuarios',
  component: todosUsuarios
  }
]

const router = new VueRouter({
  routes,
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
