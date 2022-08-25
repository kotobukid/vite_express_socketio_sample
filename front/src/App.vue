<script setup lang="ts">
import {ref, Ref} from "vue";
import HelloWorld from './components/HelloWorld.vue'

type User = {
    id: number,
    name: string,
    age: number
}
const users: Ref<User[]> = ref([{id: 0, name: 'aaa', age: 0}])

</script>

<template>
    <ul>
        <li v-for="u in users" :key="u.id">{{ u.name }}</li>
    </ul>
    <HelloWorld msg="Vite + Vue"/>
</template>

<style scoped>

</style>
