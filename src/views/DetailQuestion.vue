<template>
  <section class="detail">
    <v-container>
      <v-layout row wrap>
        <v-flex xs-12>
          <v-card>
            <v-container>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-card-title>
                    <div>
                      <div class="headline">{{ currQuestion.title }}</div>
                      <div class="subheading">Question:</div>
                      <div class="subheading">{{ currQuestion.question }}</div>
                      <br>
                      <div class="subheading">asked by: {{ currQuestion.userId.name }}</div>
                      <div class="subheading">{{ currQuestion.createdAt }}</div>
                      <div v-if="userInfo == currQuestion.userId._id">
                        <v-btn :to="'/edit/' + currQuestion._id" color="primary" class="mx-0">Edit</v-btn>
                        <v-btn @click="deleteQuestionBtn" color="red">Delete</v-btn>
                      </div>
                    </div>
                  </v-card-title>
                </v-flex>

                <v-flex v-if="userInfo == currQuestion.userId._id" text-xs-center>
                  <div class="subheading">Vote count</div>
                  <span>{{getTotalVotes}}</span>
                </v-flex>
                <v-flex v-else xs4 text-xs-center>
                  <div class="subheading">Vote</div>
                  <v-btn @click="upQuestion">Up ({{ currQuestion.upvotes.length }})</v-btn>
                  <v-btn @click="downQuestion">Down ({{ currQuestion.downvotes.length }})</v-btn>
                  <span>{{getQuestionVotes}}</span>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout v-if="token" class="mt-4">
        <v-flex xs12>
          <h4 class="title mb-2">Add your answer</h4>
          <wysiwyg v-model="answer" />
          <v-btn @click="answerBtn" class="mx-0 my-3" color="primary">Answer</v-btn>
        </v-flex>
      </v-layout>

      <v-layout v-else class="mt-4">
        <v-flex xs12>
          <h4 class="title mb-2">Login to answer</h4>
        </v-flex>
      </v-layout>

      <v-layout v-for="(answer, key) in answers" :key="key" class="mt-4 mb-2">
        <v-flex xs12>
          <v-card>
            <v-container>
              <v-layout>
                <v-flex xs8>
                  <v-card-text>
                    <div>
                      <div class="headline">{{ answer.answer }}</div>
                      <div class="subheading">by: {{ answer.userId.name }}</div>
                      <div class="subheading">{{ answer.createdAt }}</div>
                    </div>
                  </v-card-text>
                </v-flex>
                <v-flex xs4 text-xs-center>
                  <v-btn>Up</v-btn>
                  <v-btn>Down</v-btn>
                  <span>0</span>
                </v-flex>
              </v-layout>
            </v-container>
            
          </v-card>
        </v-flex>
      </v-layout>
      
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapState(['currQuestion', 'answers', 'token']),
    getQuestionVotes () {
      return this.currQuestion.upvotes.length - this.currQuestion.downvotes.length
    }
  },
  created () {
    this.getQuestion(this.$route.params.id)
    this.getAnswers(this.$route.params.id)
    this.getUserInfo()
  },
  data () {
    return {
      answer: '',
      params: this.$route.params.id,
      userInfo: ''
    }
  },
  methods: {
    ...mapActions([
      'getQuestion', 
      'deleteQuestion', 
      'getAnswers',
      'addAnswer',
      'upvoteQuestion',
      'downvoteQuestion',
      'upvoteAnswer',
      'downvoteAnswer'
    ]),
    deleteQuestionBtn () {
      this.deleteQuestion(this.params)
    },
    answerBtn () {
      this.addAnswer({
        questionId: this.params,
        answer: this.answer
      })
    },
    upQuestion () {
      this.upvoteQuestion({
        questionId: this.params
      })
    },
    downQuestion () {
      this.downvoteQuestion({
        questionId: this.params
      })
    },
    getUserInfo () {
      let token = localStorage.getItem('overflow-token')
      let self = this
      axios({
        method: 'get',
        url: 'http://localhost:3000/users',
        headers: { token }
      })
      .then(({ data }) => self.userInfo = data._id)
      .catch(({ response }) => console.log(response))
    }
  }
}
</script>
