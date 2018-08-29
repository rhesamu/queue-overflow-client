<template>
  <section class="addquestion">
    <v-container>
      <InputForm :type="type" :header="header" />
    </v-container>
  </section>
</template>

<script>
import InputForm from '@/components/InputForm.vue'

export default {
  components: {
    InputForm
  },
  data () {
    return {
      type: 'question-add',
      header: 'Add question'
    }
  }
}
</script>
