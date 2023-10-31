<template>
  <v-app>
    <v-app-bar app color="#009688">
      <v-btn icon @click="$router.push(`/messageList`)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Perfil do Usuário</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <v-img
                v-if="user && user.avatar" 
                :src="user.avatar"
                class="user-avatar"
              ></v-img>
              <v-divider></v-divider>
              <v-card-text class="user-details">
                <h2 class="user-name">{{ user && user.nome ? user.nome : 'N/A' }}</h2>
                <p class="user-email">{{ user && user.email ? user.email : 'N/A' }}</p>
                <p class="user-phone">{{ user && user.phone ? user.phone : 'N/A' }}</p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="#009688" class="follow-button">Seguir</v-btn>
                <v-btn color="#009688" @click="$router.push(`/chat/${user && user.nome ? user.nome : ''}`)" class="publications-button">Publicações</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card class="pa-4">
              <h3 class="section-title">Sobre Mim</h3>
              <p class="user-about">{{ user && user.sobre ? user.sobre : 'N/A' }}</p>
              <v-divider></v-divider>
              <h3 class="section-title">Informações de Conta</h3>
              <p><strong>Email:</strong> <span class="user-info">{{ user && user.email ? user.email : 'N/A' }}</span></p>
              <p><strong>Telefone:</strong> <span class="user-info">{{ user && user.telefone ? user.telefone : 'N/A' }}</span></p>
              <p><strong>Login:</strong> <span class="user-info">{{ user && user.login ? user.login : 'N/A' }}</span></p>
              <p><strong>Senha:</strong> <span class="user-info">********</span></p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app color="#009688" height="100">
    </v-footer>
  </v-app>
</template>

<script>
import { usuarios } from '../data/index';
import Vue from 'vue';

export default {
  data() {
    const usuario = usuarios.find((user) => user.nome === this.$route.params.nome);

    return {
      user: usuario,
    };
  },
  computed: {
    userDisplayNome() {
      const nome = localStorage.getItem('nome');
      const email = localStorage.getItem('email');
      return nome || (email ? email.slice(0, email.indexOf('@')) : '');
    },
    userDisplayUser() {
      const user = localStorage.getItem('user');
      const email = localStorage.getItem('email');
      return user || (email ? '@' + email.slice(0, email.indexOf('@')) : '');
    },
    userDisplayPhoto() {
      const image = localStorage.getItem('photoURL');
      const defaultImage = 'https://png.pngtree.com/thumb_back/fh260/background/20220813/pngtree-rounded-raster-icon-with-cobalt-and-gray-color-scheme-for-user-profile-photo-image_19491244.jpg';
      return image || defaultImage;
    },
  },
  created() {
    const newUsuario = {
      id: Math.random(),
      nome: this.userDisplayNome,
      email: localStorage.getItem('email'),
      telefone: localStorage.getItem('telefone'),
      login: this.userDisplayUser,
      senha: "********",
      sobre: `Olá, eu sou ${this.userDisplayNome}. Quero fazer novas amizades 😍`,
      avatar: this.userDisplayPhoto,
      mensagem: "",
      text: "",
    };

    // Adicione o novo usuário diretamente ao array 'usuarios' e torne a alteração reativa
    Vue.set(usuarios, usuarios.length, newUsuario);
  },
};
</script>

<style scoped>
.user-avatar {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.user-name {
  font-size: 25px;
  font-weight: bold;
}

.user-email,.user-phone,.user-info {
  font-size: 19px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
}

.user-about {
  font-size: 18px;
}

.follow-button, .publications-button {
  color: #fafbfb;
}
</style>
