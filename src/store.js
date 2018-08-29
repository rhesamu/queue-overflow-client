import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    isLogin: false,
    token: null,
    questions: null,
    answers: null,
    currQuestion: null
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.token = payload
      state.isLogin = true
    },
    SET_ISLOGIN (state) {
      state.isLogin = !state.isLogin
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_CURRENT_QUESTION (state, payload) {
      state.currQuestion = payload
    },
    SET_ANSWERS (state, payload) {
      state.answers = payload
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
    },
    getAllQuestions ({ commit }) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/questions`
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_QUESTIONS', data)
        })
        .catch(({ response }) => {
          console.log('get questions error', response)
        })
    },
    getQuestion ({ commit }, questionId) {
      console.log('get question', questionId)
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/questions/${questionId}`
      })
        .then(({ data }) => {
          console.log('question', data)
          commit('SET_CURRENT_QUESTION', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    addQuestion ({ commit }, value) {
      let { title, tags, content } = value
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/questions`,
        headers: { token: this.state.token },
        data: {
          title, question: content, tags: tags.split(' ')
        }
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    editQuestion ({ commit }, value) {
      let { title, tags, content, questionId } = value
      axios({
        method: 'put',
        url: `${this.state.baseUrl}/questions/${questionId}`,
        headers: { token: this.state.token },
        data: {
          title, question: content, tags: tags.split(' ')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_CURRENT_QUESTION', null)
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteQuestion (context, questionId) {
      axios({
        method: 'delete',
        url: `${this.state.baseUrl}/questions/${questionId}`,
        headers: { token: this.state.token }
      })
        .then(({ data }) => {
          alert('Question deleted!')
          router.push('/')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    upvoteQuestion ({ commit, dispatch }, payload) {
      let { questionId } = payload
      axios({
        method: 'put',
        url: `${this.state.baseUrl}/questions/upvote/${questionId}`,
        headers: { token: this.state.token }
      })
        .then(({ data }) => {
          // console.log(data)
          dispatch('getQuestion', questionId)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    downvoteQuestion ({ commit, dispatch }, payload) {
      let { questionId } = payload
      axios({
        method: 'put',
        url: `${this.state.baseUrl}/questions/downvote/${questionId}`,
        headers: { token: this.state.token }
      })
        .then(({ data }) => {
          // console.log(data)
          dispatch('getQuestion', questionId)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getAnswers ({ commit }, questionId) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/answers/${questionId}`
      })
        .then(({ data }) => {
          console.log('answers', data)
          commit('SET_ANSWERS', data)
        })
        .catch(({ response }) => {
          console.log('get comments error', response)
        })
    },
    addAnswer ({ commit, dispatch }, payload) {
      let { answer, questionId } = payload

      axios({
        method: 'post',
        url: `${this.state.baseUrl}/answers/`,
        headers: { token: this.state.token },
        data: {
          questionId, answer
        }
      })
        .then(({ data }) => {
          console.log(data)
          dispatch('getAnswers', questionId)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
})
