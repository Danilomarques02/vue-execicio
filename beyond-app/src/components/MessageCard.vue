<template>
  <v-card :class="CorDaMensagem">
    <div class="NomeAvatar">
      <v-list-item-avatar>
        <v-img :src="messageProp.avatar" contain class="avatar"></v-img>
      </v-list-item-avatar>
      <div class="nome">
        <v-card-subtitle class="font-weight-bold">
          <router-link
            style="color: #c2c2c2; text-decoration: none;"
            :to="'/perfil/' + messageProp.nome + '/' + messageProp.user"
          >{{ messageProp.nome }}</router-link>
        </v-card-subtitle>
        <v-card-subtitle class="user">
          <router-link
            style="color: #c2c2c2;"
            :to="'/perfil/' + messageProp.nome + '/' + messageProp.user"
          >{{ '@' + messageProp.user }}</router-link>
        </v-card-subtitle>
      </div>
    </div>

    <v-card-text style="color: #c2c2c2;" class="distancia">
      <div>{{ messageProp.text }}</div>
      <div class="d-flex justify-end">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="#c2c2c2" v-bind="attrs" v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar Mensagem</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Editar Mensagem"
                      required
                      v-model="novoTexto"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="editMessage">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn @click="deleteMessage()" icon color="#c2c2c2">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      novoTexto: "",
    };
  },
  computed: {
    CorDaMensagem() {
      return this.messageProp.nome !== "EU" ? "grey darken-4" : "grey darken-2";
    },
  },
  props: {
    messageProp: {
      type: Object,
      required: true,
    },
    editar: Function,
  },
  methods: {
    editMessage() {
      if (this.messageProp.id && this.novoTexto) {
        this.editar(this.messageProp.id, this.novoTexto);
        this.dialog = false;
      }
    },
    deleteMessage() {
      this.$emit("delete", this.messageProp.id);
    },
  },
};
</script>

<style>
.font-weight-bold {
  font-size: 20px;
  margin-left: -19px;
}
.NomeAvatar {
  display: flex;
  margin-left: 9px;
}
.nome {
  display: flex;
  flex-direction: column;
}
.user {
  margin-top: -2rem;
  margin-left: -0.8rem;
}
</style>