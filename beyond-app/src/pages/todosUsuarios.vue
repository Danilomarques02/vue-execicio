<template>
<h1> todos Usuarios </h1>
<ul><li v-for="usuario in usuarios" :key="usuario.id">
    {{ usuario.nome }}

</li></ul>
</template>

<script>
 export default {
    data(){
        return {
            usuarios:[{
                id: 1,
                nome: "Danilo",
            },
            {
              id: 2,
              nome:"Davi"
            }]
        }
    }
 }
</script>
