<template>
  <div>
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-btn icon @click="$router.push(`/messageList`)">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
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
                :to="`/perfil/${usuario.nome}/${usuario.id}`"
              >
                <v-list-item-avatar>
                  <v-img :src="usuario.avatar" contain class="avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
                </v-list-item-content>
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
      user: {},
      usuarios: [
        {
          id: 1,
          nome: "Maria da Conceição",
          avatar: "https://img.elo7.com.br/product/zoom/2BD68CE/portrait-digital-em-um-estilo-fofinho-baby.jpg",
        },
        {
          id: 2,
          nome: "Davi Felipe",
          avatar: "https://i.pinimg.com/736x/81/b6/12/81b612d54083f318996e04ab46c2a355.jpg",
        },
        {
          id: 3,
          nome: "Wesley da Silva",
          avatar: "https://i.pinimg.com/1200x/03/a8/11/03a811b919bead0487c8458d18f388af.jpg",
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
    userDisplayNome() {
      return localStorage.getItem('nome');
    },
    userDisplayUser() {
      const user = localStorage.getItem('user');
      return user || '';
    },
    userDisplayPhoto() {
      const image = localStorage.getItem('photoURL');
      const defaultImage = 'https://png.pngtree.com/thumb_back/fh260/background/20220813/pngtree-rounded-raster-icon-with-cobalt-and-gray-color-scheme-for-user-profile-photo-image_19491244.jpg';
      return image || defaultImage;
    },
  },
  created() {
    const newUser = {
      id: Math.random(),
      nome: this.userDisplayNome,
      avatar: this.userDisplayPhoto,
    };
    this.usuarios.push(newUser);
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

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
