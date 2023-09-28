<template>
  <v-app>
    <v-main>
      <v-app-bar color="green">Danilo</v-app-bar>
      <div>
        <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? 'teal accent-4' : 'purple accent-4'" outlined class="ma-3">
          <v-card-subtitle class="font-weight-bold">{{ message.nome }}</v-card-subtitle>
          <v-card-text>{{ message.text }}</v-card-text>
        </v-card>
      </div>
    </v-main>
    <v-app-bar app fixed bottom color="#424242">
      <v-text-field v-model="textInput" @keyup.enter="sendMessage()" solo hide-details label="Enviar mensagem..."></v-text-field>
      <v-btn @click="sendMessage()" icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      textInput: '',
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
         sendMessage(){
          let message={
            nome: 'Eu',
            text: this.textInput

          }
          this.messages.push(message)
          this.textInput = ''
         }
        }
    }
</script>
