<template>
  <v-app>
    <v-main>
      <v-app-bar color="green">Roberto</v-app-bar>
      <div v-for="(messages, index) in messages" :key="index">

        <v-card v-if="messages.nome != 'ele'" outlined class="ma-3 teal accent-4">
          <v-card-subtitle class="font-weight-bold">{{ messages.nome }}</v-card-subtitle>
          <v-card-text>{{messages.text}}</v-card-text>
        </v-card>
      
        
        
      </div>
    </v-main>
    <v-app-bar app fixed bottom color="#424242">
      <v-text-field solo hide-details label="Enviar mensagem"></v-text-field>
      <v-btn icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>
<script>
export default{
  data(){
    return{
      messages:[
        {
          nome: "Roberto",
          text: "Olá"
        },
        {
        nome: "Roberto",
          text: "Tudo bem"
        },
        {
        nome: "ele",
          text: "Sou trouxa"
        },
      ]
    }
  }
}
</script>