<template>
 <v-main>
      <!--8-v-app-bar com botão para apagar todas as publicações-->
      <v-app-bar color="#005954">
        <v-icon>mdi-view-sequential</v-icon>
        <div class="d-flex align-center justify-center" style="flex-grow: 1;">
          <v-toolbar-title>Collapsing Bar</v-toolbar-title>
        </div>
        <v-btn @click="deletarAllMessages()" icon color="808080">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>
      <!--1-Tela de linha do tempo da rede social (App.vue):-->
      <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? ' teal ' : 'sea green'" outlined class="ma-2">
        <message-card :messageProp="message" :editar="editmessage" @delete="deletarMessage" />
      </v-card>
      <BottomBar @send-message="addMessage($event)" />
 </v-main>

</template>
<script>
import MessageCard from '../components/MessageCard.vue';
import BottomBar from '../components/BottomBar.vue'
export default {
  components:{
    MessageCard,
    BottomBar
  },
  data() {
    return {
      messages: [
        
      {
          id: 1,
          nome: "Pedro Henrique",
          text: "Olá, entrei aqui pela primeira vez"
        }
      ],
    }
  },
  methods:{
    addMessage(e){
      const message = {
          id: Math.random(),
          nome: e.nome,
          text: e.text     
      }     
      this.messages.push(message)
    },
    deletarAllMessages(){
      this.messages = []
    },
    deletarMessage(id){
      this.messages=this.messages.filter(message=> message.id !== id)
    },
    editmessage(id,novoTexto){
      const message = this.messages.find((message) => message.id === id);
      message.text = novoTexto
    }
  }
}
</script>
<style>

</style>