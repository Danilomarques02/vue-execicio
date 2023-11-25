<template>
  <v-app>
    <v-main>
      <v-app-bar color="#082338">
        <v-icon @click="toggleMenu">mdi-view-sequential</v-icon>
        <div class="d-flex align-center justify-center" style="flex-grow: 1;">
          <v-toolbar-title>{{ user.nome }}</v-toolbar-title>
        </div>
        <v-btn @click="deletarAllMessages()" icon color="#c2c2c2">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card v-for="(message, index) in messages" :key="index" :class="message.nome !== 'Eu' ? 'grey darken-4' : 'grey darken-2'" outlined class="ma-2">
        <message-card :messageProp="message" :editar="editmessage" @delete="deletarMessage" />
      </v-card>
      <BottomBar @send-message="addMessage" />
      <v-navigation-drawer v-model="menu" app>
        <v-list>
          <v-list-item @click="$router.push(`/perfil/${user.nome}/${user}`)">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ir para Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push(`/todosUsuarios`)">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Todos os Usuários</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push(`/messageList`)">
            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Feed</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$router.push(`/`)">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import { usuarios } from '../data/index';
import MessageCard from '../components/MessageCard.vue';
import BottomBar from '../components/BottomBar.vue';
import { collection, addDoc, doc, updateDoc, deleteDoc, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    return {
      messages: [],
      menu: false,
      user: null,
    };
  },
  computed: {
    userAvatar() {
      return localStorage.getItem('photoURL');
    },
  },
  created() {
    const usuario = usuarios.find(user => user.nome === this.$route.params.nome);
    if (usuario) {
      this.user = usuario;
      this.messages.push({
        id: 1,
        nome: usuario.nome,
        text: usuario.text,
        avatar: usuario.avatar
      });
      this.setupRealtimeListener();
    }
  },
  methods: {
    async addMessage(e) {
      if (this.user) {
        const message = {
          remetente: this.user.nome,
          nome: e.nome,
          text: e.text,
          avatar: this.userAvatar,
        };
        try {
          const docRef = await addDoc(collection(db, 'messages'), message);
          console.log('Documento escrito com identificação: ', docRef.id);
          await new Promise(resolve => setTimeout(resolve, 1000));
          const localMessageIndex = this.messages.findIndex(msg => msg.remetente === this.user.nome && !msg.id);
          if (localMessageIndex !== -1) {
            this.$set(this.messages, localMessageIndex, { ...message, id: docRef.id });
          }
        } catch (error) {
          console.error('Erro ao adicionar documento: ', error);
        }
      }
    },

    async deletarAllMessages() {
  try {
    const q = query(collection(db, 'messages'), where('remetente', '==', this.user.nome));
    const querySnapshot = await getDocs(q);
    const messageIds = querySnapshot.docs.map(doc => doc.id);
    await Promise.all(messageIds.map(async (id) => {
      const messageRef = doc(db, 'messages', id); 
      await deleteDoc(messageRef);
    }));
    this.messages = [];
    console.log('Todas as mensagens do usuário foram deletadas com sucesso');
  } catch (error) {
    console.error('Erro ao deletar as mensagens do usuário:', error);
  }
},


    async setupRealtimeListener() {
      try {
        if (this.unsubscribe) {
          console.log('Ouvinte em tempo real já está configurado.');
          return;
        }

        const q = query(collection(db, 'messages'), where('remetente', '==', this.user.nome));
        this.unsubscribe = onSnapshot(q, (snapshot) => {
          const firestoreMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          this.messages = [...this.messages, ...firestoreMessages.filter(firestoreMessage => !this.messages.some(localMessage => localMessage.id === firestoreMessage.id))];
        });

        this.$once('hook:beforeDestroy', () => {
          if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
          }
        });
      } catch (error) {
        console.error('Erro ao configurar o ouvinte em tempo real:', error);
      }
    },
    async deletarMessage(id) {
      try {
        const messageIndex = this.messages.findIndex(message => message.id === id);
        if (messageIndex !== -1) {
          const messageRef = doc(db, 'messages', String(id));
          console.log('Deletando documento com ID:', String(id));
          await deleteDoc(messageRef);
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.messages.splice(messageIndex, 1);
          console.log('Documento deletado com sucesso');
        } else {
          console.error('Mensagem não encontrada localmente:', id);
        }
      } catch (error) {
        console.error('Erro ao deletar o documento:', error);
      }
    },

    async editmessage(id, novoTexto) {
      try {
        const messageIndex = this.messages.findIndex(message => message.id === id);
        if (messageIndex !== -1) {
          this.$set(this.messages, messageIndex, { ...this.messages[messageIndex], text: novoTexto });
          const messageRef = doc(db, 'messages', id);
          await updateDoc(messageRef, {
            text: novoTexto
          });
          this.$forceUpdate();
          console.log('Documento atualizado com sucesso');
        } else {
          console.error('Mensagem não encontrada localmente:', id);
        }
      } catch (error) {
        console.error('Erro ao atualizar o documento:', error);
      }
    },

    toggleMenu() {
      this.menu = !this.menu;
    },
  },
};
</script>