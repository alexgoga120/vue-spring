<template src="./index.html">
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import axios from 'axios';
import {Clients} from "@/domain/clients";

const props = defineProps({
  clients: {type: Array<Clients>},
  labels: Array<String>
})

const clientsAxios = ref();

onMounted(async () => {
  clientsAxios.value = await getClientes()
})
const getClientes = async () => {
  type GetClientsResponse = {
    data: Clients[];
  };
  const {data, status} = await axios.get<GetClientsResponse>('http://localhost:8080/api/clientes', {
    headers: {
      Accept: 'application/json',
    },
  });
  return data
}

</script>
