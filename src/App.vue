<template>

  <v-app
      class="mx-auto"
      max-width="448"
  >
    <v-layout>
      <v-app-bar
          color="teal-darken-2"
          density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>App Vue</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <client-table :clients="clients" :labels="labels"></client-table>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import {Clients} from "@/domain/clients";
import ClientTable from "@/components/client-table/client-table.vue";

const clients:Clients[]= [
  {
    "id": 1,
    "nombre": "Alex",
    "apellido": "Gomez",
    "email": "alexgoga120@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 2,
    "nombre": "Juan",
    "apellido": "Velasquez",
    "email": "velasquez@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 3,
    "nombre": "Carlos",
    "apellido": "Perez",
    "email": "perez@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 4,
    "nombre": "Pedro",
    "apellido": "Robledo",
    "email": "robledo@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 5,
    "nombre": "Luis",
    "apellido": "Maldonado",
    "email": "maldonado@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 6,
    "nombre": "Gabriel",
    "apellido": "Serrano",
    "email": "serrano@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 7,
    "nombre": "Miguel",
    "apellido": "Apodaca",
    "email": "apodaca@gmail.com",
    "createAt": "2023-01-27"
  },
  {
    "id": 8,
    "nombre": "Amed",
    "apellido": "Rivera",
    "email": "rivera@gmail.com",
    "createAt": "2023-01-27"
  }
]
const labels:string[]=Object.keys(clients[0]);
</script>