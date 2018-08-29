<template>
  <section class="home">
    <v-jumbotron color="purple" dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Queue Overflow</h3>
            <span class="subheading">
              A place for you to ask any random questions
              answered by any random people!
            </span>
            <v-divider class="my-3"></v-divider>
            <v-btn to="/add" class="mx-0" large light>Ask a question</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container>
      <h1>Recent questions</h1>
      <!--Question lists-->
      <v-layout class="mb-2" v-for="(question, key) in questions" :key="key">
        <v-flex xs-12 >
          <v-card :to="'/questions/' + question._id ">
            <v-card-text>
              <h3 class="title font-weight-light">{{ question.title }}</h3>
              <br>
              <h5>by: {{ question.userId.name }}</h5>
              <h5>tags: {{ question.tags }}</h5>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    this.getToken()
    this.getAllQuestions()
  },
  computed: {
    ...mapState(['questions'])
  },
  methods: {
    ...mapActions(['getToken', 'getAllQuestions'])
  }
}
</script>
