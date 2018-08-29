<template>
  <section class="login">
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
      type: 'login'
    }
  }
}
</script>

