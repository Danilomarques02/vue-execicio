<template>
  <v-app>
    <v-main>
      <!-- Barra de aplicativos -->
      <v-app-bar color="#005954">
        <v-icon @click="toggleMenu">mdi-view-sequential</v-icon>
        <div class="d-flex align-center justify-center" style="flex-grow: 1;">
          <v-toolbar-title>Todas as Publicações</v-toolbar-title>
        </div>
        <v-btn @click="deletarAllMessages()" icon color="808080">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Conteúdo da página -->
      <v-card v-for="(user, index) in usuarios" :key="index" class="ma-2" style="background: transparent;">
        <v-card-text>
          <message-card :messageProp="user" :editar="editmessage" @delete="deletarMessage" />
        </v-card-text>
      </v-card>
      <BottomBar @send-message="addMessage($event)" />

      <!-- Menu de ícone de três linhas -->
      <v-navigation-drawer v-model="menu" app>
        <v-list>
          <!-- Seus itens de menu aqui -->
        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
/*import { usuarios } from '../data/index'
import MessageCard from '../components/MessageCard.vue'
import BottomBar from '../components/BottomBar.vue'

export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    return {
      usuarios:{
    messages:[]
    },
    nomes,
      menu: false
    };
  },
  
  methods: {
    addMessage(e) {
  if (Array.isArray(this.usuarios)) {
    this.usuarios.forEach((user) => {
      if (Array.isArray(user.messages)) {
        const message = {
          id: Math.random(),
          nome: e.nome,
          text: e.text
        };
        user.messages.push(message);
      }
    });
  }
},
    deletarAllMessages() {
      this.usuarios.forEach((user) => {
        user.messages = [];
      });
    },
    deletarMessage(id) {
      this.usuarios.forEach((user) => {
        user.messages = user.messages.filter(message => message.id !== id);
      });
    },
    editmessage(id, novoTexto) {
      this.usuarios.forEach((user) => {
        const message = user.messages.find(message => message.id === id);
        if (message) {
          message.text = novoTexto;
        }
      });
    },
    toggleMenu() {
      this.menu = !this.menu;
    },
    logout() {
      // Implemente a função de logout, se necessário
    }
  }
};*/
</script>
