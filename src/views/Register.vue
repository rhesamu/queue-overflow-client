<template>
  <section class="register">
    <AuthForm :type="type" />
  </section>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue'
export default {
  components: {
    AuthForm
  },
  data () {
    return {
      type: 'register'
    }
  }
}
</script>

