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
                    <v-text-field v-model="user.usuario" label="usuario"  outlined class="rounded-input" block :rules="rules.user"></v-text-field>
                    <v-text-field v-model="user.email" label="Email" outlined class="rounded-input" block :rules="rules.email"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="user.telefone" label="Telefone" outlined class="rounded-input" block :rules="rules.telefone"></v-text-field>
                    <v-text-field v-model="user.password" label="Senha" type="password" outlined class="rounded-input" block :rules="rules.password"></v-text-field>
                    <v-text-field v-model="user.confirmPassword" label="Confirmar senha" type="password" outlined class="rounded-input" block :rules="rules.password"></v-text-field>
                  </v-col>
                  <v-file-input v-model="file" label="Escolher Foto" outlined class="rounded-input" block @change="Image"></v-file-input>
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
      file: null,
    };
  },
  methods: {
    Image(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;

        // Armazene a imagem no Local Storage
        localStorage.setItem('userImage', base64Image);

        // Atribua a imagem à propriedade profileImage do perfil
        this.user.profileImage = base64Image;
      };

      reader.readAsDataURL(file);
    }
  },

    voltar() {
      router.push({ name: 'login' });
    },
    cadastrar() {
      localStorage.setItem("email", this.user.email);
      localStorage.setItem("nome", this.user.nome);
      localStorage.setItem("userlocal", ('@'+this.user.usuario));
      localStorage.setItem("telefone",this.user.telefone) ;
     
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