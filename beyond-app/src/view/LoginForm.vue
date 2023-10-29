<template>
  <v-app class="green-background">
    <v-main>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-img src="../assets/logo.png" max-height="140px" contain />

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
                <router-link class="link" to="/cadastro" @click="cadastro">Cadastre-se</router-link>
                <div class="forms">
                <v-btn type="submit" rounded dark color="#52BA7D" block @click="login" >Login</v-btn>
              </div>


                <div class="icon-links">
                  <v-icon>mdi-google</v-icon>
                  <v-icon>mdi-email</v-icon>
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
      user: {},
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.user);
    },
    cadastro() {
      router.push({ name: "cadastro" });
    },
  },
};
</script>

<style scoped>
.green-background {
  background-color: #009688;
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
</style>*/
