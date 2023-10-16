<template>
  <div>
    <v-app>
      <v-main>
        <v-container>
          <h1 class="headline"></h1>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="search"
                label="Pesquisar Usuários"
                outlined
                append-icon="mdi-magnify"
                @click:append="searchUsers"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="user-list">
            <v-list>
              <v-list-item
                v-for="usuario in filteredUsuarios"
                :key="usuario.id"
                :to="`/perfil/${usuario.nome}`"
              >
                <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [
        {
          id: 1,
          nome: "Maria da Conceição",
        },
        {
          id: 2,
          nome: "Davi Felipe",
        },
        {
          id: 3,
          nome: "Wesley da Silva",
        },
      ],
      search: "",
    };
  },
  computed: {
    filteredUsuarios() {
      return this.usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    searchUsers() {
    },
  },
};
</script>

<style>
.user-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.headline {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
