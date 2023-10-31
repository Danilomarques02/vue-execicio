<template>
  <v-app-bar app fixed bottom color="#424242">
      <!--2-Possibilidade de criar uma nova publicação-->
    <v-text-field v-model="textInput" @keyup.enter="sendMessage" solo hide-details label="Enviar mensagem..."></v-text-field>
    <v-btn @click="sendMessage" icon color="blue">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-app-bar>
  
</template>

<script>
export default {
  data() {
    return {
      textInput: '',
    };
  },
  methods: {
    sendMessage() {
      const message = {
        nome: localStorage.getItem('nome'),
        user: localStorage.getItem('email'),
        text: this.textInput,
      };
      this.$emit('send-message', message);
      this.textInput = '';  
    } 
  },
};
</script>