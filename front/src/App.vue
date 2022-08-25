<script setup lang="ts">
import {ref, Ref, onMounted} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import axios, {AxiosResponse} from "axios";
// import {User} from "../../types";

type User = {
    id: number,
    name: string,
    age: number
}

const users = ref<User[]>([])

onMounted(() => {
    axios.get('/api/v1/users.json').then((data: AxiosResponse<User[]>) => {
        console.log(data.data);
        users.value = data.data;
    });
})

</script>

<template lang="pug">
ul
    li(v-for="u in users" :key="u.id") {{ u.name }}
HelloWorld(msg="Vite + Vue + Express + Socket.io")
</template>

<style scoped>

</style>
