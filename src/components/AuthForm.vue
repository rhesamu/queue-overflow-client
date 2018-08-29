<template>
  <v-container>
    <v-layout>
      <v-flex xs-12>
        <v-card>
          <v-container>
            <v-layout>
              <v-flex>
                <h1 v-if="type == 'register'">Register</h1>
                <h1 v-else>Login</h1>
                <v-text-field v-if="type == 'register'" v-model="name" label="name"></v-text-field>
                <v-text-field v-model="email" label="email"></v-text-field>
                <v-text-field v-model="password" :type="'password'" label="password"></v-text-field>
                <v-btn v-if="type == 'register'" class="mx-0" @click="userRegister" color="primary">Register</v-btn>
                <v-btn v-else class="mx-0" @click="userLogin" color="primary">Login</v-btn>
                <div v-if="type == 'login'">
                  <router-link to="/register">Don't have an account?</router-link>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    userRegister () {
      this.$store.dispatch('register', ({
        name: this.name,
        email: this.email,
        password: this.password
      }))
    },
    userLogin () {
      this.$store.dispatch('login', ({
        email: this.email,
        password: this.password
      }))
    }
  }
}
</script>
