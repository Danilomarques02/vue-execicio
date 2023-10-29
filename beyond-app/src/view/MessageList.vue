<template>
  <v-app>
    <v-main>
      <!-- Barra de aplicativos -->
      <v-app-bar color="#005954">
        <v-icon @click="toggleMenu">mdi-view-sequential</v-icon>
        <div class="d-flex align-center justify-center" style="flex-grow: 1;">
          <v-toolbar-title>Todas as Publicações</v-toolbar-title>
        </div>
        <v-btn @click="deletarAllMessages" icon color="808080">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Conteúdo da página -->
      <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? 'teal' : 'sea green'" outlined class="ma-2">
        <message-card :messageProp="message" :editar="editmessage" @delete="deletarMessage" />
      </v-card>
      <BottomBar @send-message="addMessage($event)" />

      <!-- Menu de ícone de três linhas -->
      <v-navigation-drawer v-model="menu" app>
        <v-list>
          <v-list-item @click="$router.push(``)">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ir para Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push(`/todosUsuarios`)">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Todos os Usuários</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push(`/`)">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import { usuarios } from '../data/index';
import MessageCard from '../components/MessageCard.vue';
import BottomBar from '../components/BottomBar.vue';

export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    const allMessages = [];

    // Adicione as mensagens dos usuários à lista de mensagens
    usuarios.forEach((user) => {
      if (Array.isArray(user.messages)) {
        allMessages.push(...user.messages);
      }
    });

    return {
      messages: allMessages.concat([
        {
          id: 1,
          nome: "Maria da Conceição",
          text: "Ainda estou aprendendo a mexer, mais estou gostando",
          avatar: "https://img.elo7.com.br/product/zoom/2BD68CE/portrait-digital-em-um-estilo-fofinho-baby.jpg",
        },
        {
          id: 2,
          nome: "Davi Felipe",
          text: "Olá sou Davi, e aqui parece ser muito legal",
          avatar: "https://i.pinimg.com/736x/81/b6/12/81b612d54083f318996e04ab46c2a355.jpg",
        },
        {
          id: 3,
          nome: "Wesley da Silva",
          text: "Olá sou Wesley, entrei aqui pela primeira vez",
          avatar: "https://i.pinimg.com/1200x/03/a8/11/03a811b919bead0487c8458d18f388af.jpg",
        }
      ]),
      menu: false
    };
  },
  methods: {
    addMessage(e) {
      const message = {
        id: Math.random(),
        nome: e.nome,
        text: e.text
      };
      this.messages.push(message);
    },
    deletarAllMessages() {
      this.messages = [];
    },
    deletarMessage(id) {
      this.messages = this.messages.filter((message) => message.id !== id);
    },
    editmessage(id, novoTexto) {
      const message = this.messages.find((message) => message.id === id);
      if (message) {
        message.text = novoTexto;
      }
    },
    toggleMenu() {
      this.menu = !this.menu;
    },
    logout() {
      // Implemente a função de logout, se necessário
    }
  }
};
</script>
