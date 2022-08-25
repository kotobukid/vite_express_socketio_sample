<script setup lang="ts">
import {ref, Ref, onMounted} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import axios, {AxiosResponse} from "axios";

type User = {
    id: number,
    name: string,
    age: number
}
const users: Ref<User[]> = ref([{id: 0, name: 'aaa', age: 0}])

onMounted(() => {
    axios.get('/api/v1/users.json').then((data: AxiosResponse<{ id: number, name: string, age: number }[]>) => {
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
