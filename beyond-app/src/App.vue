<template>
  <v-app>
    <v-main>
      <v-app-bar color="green">Roberto</v-app-bar>
      <div>
        <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? 'teal accent-4' : 'purple accent-4'" outlined class="ma-3">
          <v-card-subtitle class="font-weight-bold">{{ message.nome }}</v-card-subtitle>
          <v-card-text>{{ message.text }}</v-card-text>
        </v-card>
      </div>
    </v-main>
    <v-app-bar app fixed bottom color="#424242">
      <v-text-field v-model=""solo hide-details label="Enviar mensagem..."></v-text-field>
      <v-btn icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          textInput: "",
          nome: "Roberto",
          text: "Olá"
        },
        {
          nome: "Roberto",
          text: "Tudo bem"
        },
       
      ]
    }
  }
}
</script>
