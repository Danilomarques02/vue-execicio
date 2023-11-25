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
        <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? 'grey darken-4' : 'grey darken-2'" outlined class="ma-2">
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
import {
  getDoc,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDocs,
  addDoc
} from "firebase/firestore";
import { auth, db } from "@/config/firebase";
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
      menu: false,
      user: null  // Adicione esta linha para corrigir o erro
    };
  },
  computed: {
    userAvatar() {
      return localStorage.getItem('photoURL');
    },
  },
  methods: {
    sair() {
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
      const user = auth.currentUser;
      if (!user) {
        console.error("Usuário não autenticado");
        return;
      }

      const userId = user.uid;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        const newMessage = {
          nome: userData.nome || "Nome Padrão", // Substitua "Nome Padrão" pelo valor padrão desejado
          user: userData.email,
          text: e.text,
          avatar: this.userAvatar,
        };

        try {
          const docRef = await addDoc(collection(db, "messages"), newMessage);
          console.log("Documento escrito com identificação: ", docRef.id);

          // Adicione a nova mensagem à lista local imediatamente
          this.messages.push(newMessage);

          // Força a atualização do componente
          this.$forceUpdate();
        } catch (error) {
          console.error("Erro ao adicionar documento: ", error);
        }
      } else {
        console.error("Documento do usuário não encontrado");
      }
    },
    async deletarAllMessages() {
  console.log("Iniciando deletarAllMessages");
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    const userId = user.uid;
    console.log("Usuário Atual:", userId);

    const q = query(collection(db, "messages"), where("user", "==", userId));
    const querySnapshot = await getDocs(q);
    const messageIds = querySnapshot.docs.map((doc) => doc.id);

    if (messageIds.length === 0) {
      console.log("Nenhuma mensagem para excluir.");
      return;
    }

    await Promise.all(
      messageIds.map(async (messageId) => {
        const messageRef = doc(db, "messages", messageId);
        await deleteDoc(messageRef);
      })
    );

    console.log(
      "Todas as mensagens do usuário atual foram excluídas com sucesso"
    );
  } catch (error) {
    console.error("Erro ao excluir mensagens:", error);
  } finally {
    console.log("Finalizando deletarAllMessages");
  }
},
    async deletarMessage(id) {
      try {
        const messageRef = doc(db, "messages", String(id));
        await deleteDoc(messageRef);
        console.log("Documento excluído com sucesso");
      } catch (error) {
        console.error("Erro ao excluir documento:", error);
      }
    },
    async editmessage(id, novoTexto) {
      try {
        const messageRef = doc(db, "messages", String(id));
        await updateDoc(messageRef, { text: novoTexto });
        console.log("Documento atualizado com sucesso");
      } catch (error) {
        console.error("Erro ao atualizar o documento:", error);
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
    created() {
      this.$store.dispatch("fetchUser");

      let user = auth.currentUser;  // Adicione 'let' para declarar a variável user

      if (!user) {
        console.error("Usuário não autenticado");
        return;
      }

      const userId = user.uid;
      const messagesCollection = collection(db, "messages");
      const userMessagesQuery = query(messagesCollection, where("user", "==", userId));

      onSnapshot(userMessagesQuery, (snapshot) => {
        console.log('Snapshot recebido:', snapshot.docs.map(doc => doc.data()));

        snapshot.docChanges().forEach((change) => {
          const message = { id: change.doc.id, ...change.doc.data() };
          console.log('Mudança de documento:', change.type, message);

          if (change.type === "added") {
            console.log('Mensagem adicionada:', message);
            this.messages.push(message);
          } else if (change.type === "modified") {
            console.log('Mensagem modificada:', message);
            const index = this.messages.findIndex((m) => m.id === message.id);
            this.$set(this.messages, index, message);
          } else if (change.type === "removed") {
            console.log('Mensagem removida:', message);
            const index = this.messages.findIndex((m) => m.id === message.id);
            this.messages.splice(index, 1);
          }
        });
      });
    }
  }
}
</script>

<style>
.dark {
  height: 20px;
}
</style>
