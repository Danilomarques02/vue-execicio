<template>
  <v-app>
    <v-app-bar app color="#009688">
      <v-btn icon @click="$router.push(`/`)">
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
                :src="user.avatar"
                class="user-avatar"
              ></v-img>
              <v-divider></v-divider>
              <v-card-text class="user-details">
                <h2 class="user-name">{{ user.nome }}</h2>
                <p class="user-email">{{ user.email }}</p>
                <p class="user-phone">{{ user.telefone }}</p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="#009688">Seguir</v-btn>
                <v-btn @click="$router.push(`/chat/${user.nome}`)" color="#009688">Chat</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card class="pa-4">
              <h3 class="section-title">Sobre Mim</h3>
              <p class="user-about">{{ user.sobre }}</p>
              <v-divider></v-divider>
              <h3 class="section-title">Informações de Conta</h3>
              <p><strong>Email:</strong> <span class="user-info">{{ user.email }}</span></p>
              <p><strong>Telefone:</strong> <span class="user-info">{{ user.telefone }}</span></p>
              <p><strong>Login:</strong> <span class="user-info">{{ user.login }}</span></p>
              <p><strong>Senha:</strong> <span class="user-info">{{ user.senha }}</span></p>
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

export default {
  data() {
    const usuario = usuarios.filter((user) => user.nome === this.$route.params.nome)[0];

    return {
      user: usuario,
    };
  },
  methods: {
    startChat() {
      // Adicione a lógica para iniciar um chat com este usuário
    },
  },
};
</script>

<style scoped>
.user-avatar {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.user-name {
  font-size: 30px;
  font-weight: bold;
}

.user-email, .user-phone, .user-info {
  font-size: 19px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
}

.user-about {
  font-size: 18px;
}
</style>
