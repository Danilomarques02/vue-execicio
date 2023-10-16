<template>
  <v-app>
    <v-main>
      <!-- Barra de aplicativos -->
      <v-app-bar color="#005954">
        <v-icon @click="toggleMenu">mdi-view-sequential</v-icon>
        <div class="d-flex align-center justify-center" style="flex-grow: 1;">
          <v-toolbar-title>{{ $route.params.nome }}</v-toolbar-title>
        </div>
        <v-btn @click="deletarAllMessages()" icon color="808080">
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
          <v-list-item @click="$router.push(`/perfil/${$route.params.nome}`)">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ir para Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push(`/`)">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Todos os Usuários</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
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
import MessageCard from '../components/MessageCard.vue'
import BottomBar from '../components/BottomBar.vue'

export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    return {
      messages: [
        {
          id: 1,
          nome: this.$route.params.nome,
          text: "Olá, entrei aqui pela primeira vez"
        }
      ],
      menu: false,
    }
  },
  methods: {
    addMessage(e) {
      const message = {
        id: Math.random(),
        nome: e.nome,
        text: e.text
      }
      this.messages.push(message)
    },
    deletarAllMessages() {
      this.messages = []
    },
    deletarMessage(id) {
      this.messages = this.messages.filter(message => message.id !== id)
    },
    editmessage(id, novoTexto) {
      const message = this.messages.find(message => message.id === id)
      message.text = novoTexto
    },
    toggleMenu() {
      this.menu = !this.menu
    },
    
    
    logout() {
    }
  }
}
</script>
