import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    isLogin: false,
    token: null
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.token = payload
      state.isLogin = true
    },
    SET_ISLOGIN (state) {
      state.isLogin = !state.isLogin
    }
  },
  actions: {
    getToken ({ commit }) {
      if (localStorage.getItem('overflow-token')) {
        commit('SET_TOKEN', localStorage.getItem('overflow-token'))
      }
    },
    login (context, user) {
      let { email, password } = user
      let self = this
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/login`,
        data: { email, password }
      })
        .then(({ data }) => {
          localStorage.setItem('overflow-token', data.token)
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    register (context, user) {
      let { name, email, password } = user
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/register`,
        data: { name, email, password }
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
})
