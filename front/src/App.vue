<script setup lang="ts">
import {ref, Ref, onMounted} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import axios, {AxiosResponse} from "axios";
import {User} from "../../types";

const users: Ref<User[]> = ref([])

onMounted(() => {
    axios.get('/api/v1/users.json').then((data: AxiosResponse<User[]>) => {
        console.log(data.data);
        users.value = data.data;
    });
})

</script>

<template>
    <ul>
        <li v-for="u in users" :key="u.id">{{ u.name }}</li>
    </ul>
    <HelloWorld msg="Vite + Vue"/>
</template>

<style scoped>

</style>
