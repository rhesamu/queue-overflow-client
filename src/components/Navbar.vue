<template>
  <v-toolbar>
    <v-toolbar-title>
      <router-link to="/" style="text-decoration: none; color: black;">Queue Overflow</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="isLogin" to="/add">+ Question</v-btn>
    <v-btn v-if="isLogin" @click="logout">Log out</v-btn>
    <v-btn v-if="!isLogin" to="/login">Log In</v-btn>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  created () {
    this.getToken()
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapActions(['getToken']),
    logout () {
      localStorage.removeItem('overflow-token')
      this.$store.commit('SET_ISLOGIN')
      this.$router.push('/')
    }
  }
}
</script>

