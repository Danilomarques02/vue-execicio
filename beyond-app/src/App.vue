
<template>
  <v-app>
    <v-main>
      <v-app-bar color="#005954">
        <v-icon>mdi-view-sequential</v-icon>
        <div class="d-flex align-center justify-center" style="flex-grow: 1;">
          <v-toolbar-title>Collapsing Bar</v-toolbar-title>
        </div>
        <v-btn @click="deleteMessage()" icon color="808080">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>
      <div v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? 'teal' : 'purple accent-4'" outlined class="ma-2">
        <message-card :messageProp="message" />
      </div>
      <BottomBar @send-message="addMessage($event)" />
    </v-main>
    
  </v-app>
  
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import BottomBar from './components/BottomBar.vue'
export default {
  components:{
    MessageCard,
    BottomBar
  },
  data() {
    return {
      messages: [
        
        {
          nome: " Danilo",
          text: "Olá"
        },
        {
          nome: "Danilo",
          text: "Tudo bem"
        },
      ],
    }
  },
  methods:{
    addMessage(e){
      this.messages.push(e)
    }
  }
    }
</script>
