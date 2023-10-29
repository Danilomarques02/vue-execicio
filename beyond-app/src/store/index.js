import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { auth } from '@/config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('Usuário não encontrado')
            break
          case 'auth/wrong-password':
            alert('Senha incorreta')
            break
          default:
            alert('Algo deu errado')
        }
        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/messageList')
    },
    async register({ commit }, details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email já em uso')
            break
          case 'auth/invalid-email':
            alert('Email inválido')
            break
          case 'auth/operation-not-allowed':
            alert('Operação não permitida')
            break
          case 'auth/weak-password':
            alert('Senha fraca')
            break
          default:
            alert('Algo deu errado')
        }
        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/messageList')
    },
    async logout({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },
    async fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.currentRoute.path === '/login') {
            router.push('/messageList')
          }
        }
      })
    },
  },
})
