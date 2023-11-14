<template>
  <v-card dark flat>
    <v-app>
      <v-main>
        <v-app-bar color="#082338">
          <v-icon @click="toggleMenu">mdi-view-sequential</v-icon>
          <div class="d-flex align-center justify-center" style="flex-grow: 1;">
            <v-toolbar-title>Todas as Publicações</v-toolbar-title>
          </div>
          <v-switch class="dark" v-model="$vuetify.theme.dark"></v-switch>
          <v-btn @click="deletarAllMessages" icon color="#c2c2c2">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? '#1d405c' : '#1d405c'" outlined class="ma-2">
          <message-card :messageProp="message" :editar="editmessage" @delete="deletarMessage" />
        </v-card>
        <BottomBar @send-message="addMessage" />
        <v-navigation-drawer v-model="menu" app>
          <v-list>
            <v-list-item>
              <v-list-item-icon @click="goToProfile">
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="goToProfile">
                Ir para Perfil
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToAllUsers">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Todos os Usuários</v-list-item-title>
            </v-list-item>
            <v-list-item @click="sair">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-main>
    </v-app>
  </v-card>
</template>

<script>
import { addDoc, collection, doc, deleteDoc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import MessageCard from '../components/MessageCard.vue';
import BottomBar from '../components/BottomBar.vue';
import router from '../router/index';
import { usuarios } from "@/data";

export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    const allMessages = [];

    usuarios.forEach((user) => {
      if (Array.isArray(user.messages)) {
        allMessages.push(...user.messages);
      }
    });

    return {
      messages: allMessages.concat([
        {
          id: 1,
          nome: "Maria da Conceição",
          user: "Maria",
          text: "Ainda estou aprendendo a mexer, mas estou gostando",
          avatar: "https://img.elo7.com.br/product/zoom/2BD68CE/portrait-digital-em-um-estilo-fofinho-baby.jpg",
        },
        {
          id: 2,
          nome: "Davi Felipe",
          user: "Davi",
          text: "Olá sou Davi, e aqui parece ser muito legal",
          avatar: "https://i.pinimg.com/736x/81/b6/12/81b612d54083f318996e04ab46c2a355.jpg",
        },
        {
          id: 3,
          nome: "Wesley da Silva",
          user: "Wesley",
          text: "Olá sou Wesley, entrei aqui pela primeira vez",
          avatar: "https://i.pinimg.com/1200x/03/a8/11/03a811b919bead0487c8458d18f388af.jpg",
        }
      ]),
      menu: false
    };
  },
  computed: {
    userAvatar() {
      return localStorage.getItem('photoURL');
    },
    userDisplayNome() {
      const nome = localStorage.getItem('nome');
      const email = localStorage.getItem('email');
      return nome || (email ? email.slice(0, email.indexOf('@')) : '');
    },
    userDisplayUser() {
      const user = localStorage.getItem('user');
      const email = localStorage.getItem('email');
      return user || (email ? '@' + email.slice(0, email.indexOf('@')) : '');
    },
  },
  methods: {
    sair() {
      this.$vuetify.theme.dark = false;
      this.$store.dispatch("logout")
        .then(() => {
          localStorage.clear();
          router.push('/');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async addMessage(e) {
      const user = localStorage.getItem('user');
      const newMessage = {
        nome: localStorage.getItem('nome'),
        user: user,
        text: e.text,
        avatar: this.userAvatar,
      };

      try {
        const docRef = await addDoc(collection(db, "messages"), newMessage);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async deletarAllMessages() {
      try {
        const q = query(collection(db, 'messages'), where('user', '==', localStorage.getItem('user')));
        await onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
            const messageRef = doc(db, 'messages', doc.id);
            deleteDoc(messageRef);
          });
        });

        console.log('All messages deleted successfully');
      } catch (error) {
        console.error('Error deleting messages:', error);
      }
    },

    async deletarMessage(id) {
      try {
        const messageRef = doc(db, 'messages', String(id));
        await deleteDoc(messageRef);
        console.log('Document deleted successfully');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    },

    async editmessage(id, novoTexto) {
      try {
        const messageRef = doc(db, 'messages', String(id));
        await updateDoc(messageRef, { text: novoTexto });
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    },
    toggleMenu() {
      this.menu = !this.menu;
    },

    goToProfile() {
      this.$router.push(`/perfil/${this.userDisplayNome}/${this.userDisplayUser}`);
    },

    goToAllUsers() {
      this.$router.push('/todosUsuarios');
    },
  },

  beforeCreate() {
    this.$store.dispatch("fetchUser");

    const user = localStorage.getItem('user');
    const messagesCollection = collection(db, "messages");
    const userMessagesQuery = query(messagesCollection, where('user', '==', user));

    onSnapshot(userMessagesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const message = { id: change.doc.id, ...change.doc.data() };
        if (change.type === 'added') {
          this.messages.push(message);
        } else if (change.type === 'modified') {
          const index = this.messages.findIndex((m) => m.id === message.id);
          this.$set(this.messages, index, message);
        } else if (change.type === 'removed') {
          const index = this.messages.findIndex((m) => m.id === message.id);
          this.messages.splice(index, 1);
        }
      });
    });
  },
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
