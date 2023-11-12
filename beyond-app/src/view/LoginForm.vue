<template>
  <v-app class="green-background">
    <v-main>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-img src="../assets/logo3.png" max-height="140px" contain />

            <v-card-title class="text-h6">Faça Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login" ref="loginForm">
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  outlined
                  class="rounded-input"
                  block
                />
                <v-text-field
                  v-model="user.password"
                  type="password"
                  label="Senha"
                  outlined
                  class="rounded-input"
                  block
                />
                <router-link class="link" to="/cadastro">Cadastre-se</router-link>
                <div class="forms">
                  <v-btn rounded dark color="#1d405c" block type="submit">Login</v-btn>
                </div>
                <div class="icon-links">
                  <v-icon @click="loginGoogle" >mdi-google</v-icon>
                </div>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import router from "../router/index";

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.user)
        .then(() => {
          this.$store.dispatch("fetchUser");
          router.push({ name: 'MessageList' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cadastro() {
      router.push({ name: "cadastro" });
    },
    loginGoogle() {
      this.$store.dispatch('loginGoogle').then(() => {
        router.push('/messageList');
      }).catch((error) => {
        console.error(error);
      });
    },
  }
}
</script>

<style scoped>
.green-background {
  background-color: #082338;
}

.rounded-input {
  border-radius: 40px;
}

.forms {
  margin: 0 auto;
  border-radius: 40px;
  width: 40%;
}

.icon-links {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.link {
  color: black;
}
</style>