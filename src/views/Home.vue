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
            <v-btn class="mx-0" large light>Ask a question</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container>
      <h1>Recent questions</h1>
      <!--Question lists-->
      <v-layout>
        <v-flex xs-12>
          <v-card to="/questions">
            <v-card-text>
              <h3 class="title font-weight-light">Question title</h3>
              <h5>by: Author</h5>
              <h5>tags:</h5>
              <!-- <v-btn class="mx-0">See more</v-btn> -->
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
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    this.getToken()
  },
  methods: {
    ...mapActions(['getToken'])
  }
}
</script>
