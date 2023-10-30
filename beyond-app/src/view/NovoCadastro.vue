<template>
  <v-app class="green-background">
    <v-main>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-img src="@/assets/logo.png" max-height="140px" contain></v-img>

            <v-card-title class="text-h6">Faça o seu cadastro</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="cadastrar">
                <v-row>
                <v-col cols="6">
                    <v-text-field v-model="user.nome" label="Nome" outlined class="rounded-input" block :rules="rules.nome"></v-text-field>
                    <v-text-field v-model="user.email" label="Email" outlined class="rounded-input" block :rules="rules.email"></v-text-field>
                    <v-text-field v-model="user.telefone" label="Telefone" outlined class="rounded-input" block :rules="rules.telefone"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-file-input v-model="file" label="Escolher Foto" outlined class="rounded-input" block></v-file-input>
                    <v-text-field v-model="user.password" label="Senha" type="password" outlined class="rounded-input" block :rules="rules.password"></v-text-field>
                    <v-text-field v-model="user.confirmPassword" label="Confirmar senha" type="password" outlined class="rounded-input" block :rules="rules.password"></v-text-field>
                  </v-col>
                </v-row>
                <div class="error-message">{{ passwordError }}</div>
                <v-row>
                  <v-col cols="12">
                    <router-link class="link" to="/">Tela de Login</router-link>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div class="forms">
                      <v-btn type="submit" rounded dark color="#52BA7D">Cadastre-se</v-btn>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-layout align-center justify-center>
                      <v-icon @click="loginGoogle" >mdi-google</v-icon>
                    </v-layout>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from '../router/index';

export default {
  data() {
    return {
      user: {},
      rules: {
        email: [],
        password: [],
      },
      emailError: '',
      passwordError: '',
      file: null, // Adicione a propriedade 'file' aqui e inicialize-a como null
    };
  },
  methods: {
    voltar() {
      router.push({ name: 'login' });
    },
    cadastrar() {
      this.emailError = this.rules.email
        .map(rule => rule(this.user.email))
        .filter(error => error)
        .join(', ');
      this.passwordError = this.rules.password
        .map(rule => rule(this.user.password))
        .filter(error => error)
        .join(', ');

      if (!this.emailError && !this.passwordError) {
        this.$store.dispatch("register", this.user);
      }
    },
    loginGoogle() {
      this.$store.dispatch('loginGoogle').then(() => {
        router.push('/messageList');
      }).catch((error) => {
        console.error(error);
      });
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

.link {
  color: black;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
