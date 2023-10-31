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
        <message-card :messageProp="message" :avatar="userAvatar" :editar="editmessage" @delete="deletarMessage" />
      </v-card>
      <BottomBar @send-message="addMessage($event)" />

      <!-- Menu de ícone de três linhas -->
      <v-navigation-drawer v-model="menu" app>
        <v-list>
          <v-list-item>
            <v-list-item-icon @click="goToProfile">
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="goToProfile">
              Ir para Perfil
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToAllUsers">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Todos os Usuários</v-list-item-title>
          </v-list-item>
          <v-list-item @click="sair">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import { usuarios } from '../data/index';
import MessageCard from '../components/MessageCard.vue';
import BottomBar from '../components/BottomBar.vue';
import router from '../router/index'; 

export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    const allMessages = [];

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
          user: "Maria",
          text: "Ainda estou aprendendo a mexer, mas estou gostando",
          avatar: "https://img.elo7.com.br/product/zoom/2BD68CE/portrait-digital-em-um-estilo-fofinho-baby.jpg",
        },
        {
          id: 2,
          nome: "Davi Felipe",
          user: "Davi",
          text: "Olá sou Davi, e aqui parece ser muito legal",
          avatar: "https://i.pinimg.com/736x/81/b6/12/81b612d54083f318996e04ab46c2a355.jpg",
        },
        {
          id: 3,
          nome: "Wesley da Silva",
          user: "Wesley",
          text: "Olá sou Wesley, entrei aqui pela primeira vez",
          avatar: "https://i.pinimg.com/1200x/03/a8/11/03a811b919bead0487c8458d18f388af.jpg",
        }
      ]),
      menu: false
    };
  },
  
  computed: {
    userAvatar() {
      return localStorage.getItem('photoURL');
    },
    userDisplayNome(){
      const nome = localStorage.getItem('nome');
      const email = localStorage.getItem('email')
      return nome || (email ? email.slice(0, email.indexOf('@')) : '');
    },
  
    userDisplayUser(){
      const user = localStorage.getItem('user');
      const email = localStorage.getItem('email')
      return user || (email ? '@' + email.slice(0, email.indexOf('@')) : '');
    },
  },
  methods: {
    sair() {
      this.$store.dispatch("logout")
  .then(() => {
    localStorage.clear(); 
    router.push('/'); 
  })
  .catch((error) => {
    console.error(error);
  });
  },
    addMessage(e) {
      const message = {
        id: Math.random(),
        nome: localStorage.getItem('nome'),
        user: localStorage.getItem('user'),
        text: e.text,
        avatar: this.userAvatar, // Adicione a imagem de perfil do usuário logado
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
    goToProfile() {
      this.$router.push(`/perfil/${this.userDisplayNome}/${this.userDisplayUser}`);
    },
    goToAllUsers() {
      this.$router.push('/todosUsuarios');
    }
  },
  beforeCreate() {
    this.$store.dispatch("fetchUser");
  },
};
</script>
