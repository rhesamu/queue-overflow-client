<template>
  <v-layout>
    <v-flex>
      <h1 class="mb-3">{{ header }}</h1>
      <v-text-field v-model="title" box label="Question title"></v-text-field>
      <v-text-field v-model="tags" box label="Tags (separate by space)"></v-text-field>
      <wysiwyg v-model="content" />
      <v-btn v-if="type == 'question-add'" @click="addBtn" class="mx-0 my-3" color="primary">Add your question</v-btn>
      <v-btn v-if="type == 'question-edit'" @click="editBtn" class="mx-0 my-3" color="primary">Edit</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['type', 'header', 'isEdit', 'param'],
  computed: {
    ...mapState(['currQuestion'])
  },
  data () {
    return {
      title: '',
      tags: '',
      content: ''
    }
  },
  created () {
    this.getToken()
    if (this.type == 'question-edit') {
      this.getQuestion(this.param)
      console.log(this.currQuestion)
    }
  },
  watch: {
    currQuestion(value) {
      this.currQuestion = value
      console.log('from watch',this.currQuestion)
      this.title = this.currQuestion.title
      this.tags = this.currQuestion.tags.join(' ')
      this.content = this.currQuestion.question
    }
  },
  methods: {
    ...mapActions(['addQuestion', 'editQuestion', 'getQuestion', 'getToken']),
    addBtn () {
      let input = { title: this.title, tags: this.tags, content: this.content }
      this.addQuestion(input)
    },
    editBtn () {
      let input = { title: this.title, tags: this.tags, content: this.content, questionId: this.param }
      this.editQuestion(input)
    }
  }
}
</script>

