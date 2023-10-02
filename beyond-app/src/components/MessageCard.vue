<template>
  <v-card
    :class="messageProp.nome !== 'Eu' ? 'teal' : 'purple accent-4'" outlined class="ma-3"
  >
    <v-card-subtitle class="font-weight-bold">{{ messageProp.nome }}</v-card-subtitle>
    <v-card-text>
      <div >{{ messageProp.text }}</div>
      <div class="d-flex justify-end">
        <v-btn @click="editMessage()" icon color="808080">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="deleteMessage()" icon color="808080">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    messageProp: {
      type: Object,
      required: true
    }
  },
  methods: {
    editMessage() {
      // Implemente a lógica para editar a mensagem aqui
      // Por exemplo, abra um diálogo de edição ou faça uma chamada à API
    },
    deleteMessage() {
      // Implemente a lógica para excluir a mensagem aqui
      // Por exemplo, abra um diálogo de confirmação de exclusão ou faça uma chamada à API
    }
  }
};
</script>
