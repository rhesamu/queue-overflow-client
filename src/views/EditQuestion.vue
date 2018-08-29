<template>
  <section class="addquestion">
    <v-container>
      <InputForm :type="type" :header="header" :isEdit="true" :param="param"/>
    </v-container>
  </section>
</template>

<script>
import InputForm from '@/components/InputForm.vue'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
    InputForm
  },
  // computed: {
  //   ...mapState(['currQuestion'])
  // },
  created () {
    // this.getQuestion(this.$route.params.id)
  },
  data () {
    return {
      type: 'question-edit',
      header: 'Edit question',
      param: this.$route.params.id
    }
  },
  methods: {
    ...mapActions(['getQuestion'])
  }
}
</script>
