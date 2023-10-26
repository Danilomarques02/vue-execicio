<template>
    <v-app class="green-background">
      <v-main>
        <v-container fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-img src="@/assets/logo.png" max-height="140px" contain></v-img>
  
              <v-card-title class="text-h6">Faça Login</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="name" label="Nome" outlined class="rounded-input" block></v-text-field>
                      <v-text-field v-model="email" label="Email" outlined class="rounded-input" block></v-text-field>
                      <v-text-field v-model="phone" label="Telefone" outlined class="rounded-input" block></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="password" label="Senha" type="password" outlined class="rounded-input" block></v-text-field>
                      <v-text-field v-model="passwordConfirmation" label="Repetir senha" type="password" outlined class="rounded-input" block></v-text-field>
                      <v-file-input
                        v-model="file"
                        label="Escolher Foto"
                        outlined
                        class="rounded-input"
                        block
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <router-link class="link" to="/">Tela de Login</router-link>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="forms">
                        <v-btn rounded dark color="#52BA7D" block @click="login">Cadastre-se</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-layout align-center justify-center>
                        <v-icon @click="loginWithGoogle">mdi-google</v-icon>
                        <v-icon @click="loginWithEmail">mdi-email</v-icon>
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
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        phone: '',
        passwordConfirmation: '',
        file: null,
      };
    },
    methods: {
      login() {
        if (this.email && this.password) {
          this.$router.push('/dashboard');
        } else {
          console.error('Authentication failed');
        }
      },
      loginWithGoogle() {
        console.log('Login with Google');
      },
      loginWithEmail() {
        console.log('Login with email');
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
  
  .rounded-input::after {
    border-color: #009688;
  }
  
  .link {
    color: black;
  }
  </style>
  