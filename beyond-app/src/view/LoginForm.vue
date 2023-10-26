<template>
  <v-app class="green-background">
    <v-main>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-img src="../assets/logo.png" max-height="140px" contain></v-img>

            <v-card-title class="text-h6">
              Faça Login
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="email" label="Email" outlined class="rounded-input" block></v-text-field>
                <v-text-field v-model="password" label="Senha" type="password" outlined class="rounded-input" block></v-text-field>
                <router-link class="link" to="/cadastro">cadastre-se</router-link>
                <div class="forms">
                  <v-btn rounded dark color="#52BA7D" block @click="login">Login</v-btn>
                  <div class="icon-links">
                    <v-icon @click="loginWithGoogle">mdi-google</v-icon>
                    <v-icon @click="loginWithEmail">mdi-email</v-icon>
                  </div>
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
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Implemente a lógica de autenticação aqui
      if (this.email && this.password) {
        // Autenticação bem-sucedida, você pode redirecionar o usuário para a página principal
        this.$router.push('/dashboard');
      } else {
        // Tratamento de erro ou exibição de mensagem
        console.error('Falha na autenticação');
      }
    },
    loginWithGoogle() {
      // Implemente a lógica de login com o Google aqui
    },
    loginWithEmail() {
      // Implemente a lógica de login com email aqui
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

.rounded-input::after {
  border-color: #009688;
}

.link {
  color: black;
}
</style>
