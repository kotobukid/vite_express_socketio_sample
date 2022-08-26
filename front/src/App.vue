<script setup lang="ts">
import {ref, onMounted} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import axios, {AxiosResponse} from "axios";
import {io} from "socket.io-client";

import type {User} from "../../types";

const users = ref<User[]>([])

onMounted(() => {
    axios.get('/api/v1/users.json').then((data: AxiosResponse<User[]>) => {
        console.log(data.data);
        users.value = data.data;
    });
})

const request_new_user = () => {
    socket.emit('request new user', new_user_name.value)
    new_user_name.value = ''
}

const socket = io('http://localhost:3000/ws', {withCredentials: true})

socket.on('hello', (arg) => {
    console.log(arg)
})

socket.on('new user', (a: string) => {
    let max_id: number = 0;
    users.value.forEach(u => {
        max_id = Math.max(max_id, u.id)
    })
    users.value.push({
        id: max_id + 1,
        name: a,
        age: 20
    })
})
socket.emit('howdy', "stranger")

const new_user_name = ref<string>("")
</script>

<template lang="pug">
input(type="text" v-model="new_user_name")
a.button(href="#" @click.prevent="request_new_user") New User
ul(v-cloak)
    li(v-for="u in users" :key="u.id") {{ u.name }}
HelloWorld(msg="Vite + Vue + Express + Socket.io" v-cloak)
</template>

<style scoped lang="less">
.button {
    user-select: none;
    -webkit-user-drag: none;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 4px;

    &:hover {
        background-color: lightgreen;
        border-color: green;
        color: green;
    }

    &:active {
        position: relative;
        top: 1px;
        color: red;
    }
}
</style>
