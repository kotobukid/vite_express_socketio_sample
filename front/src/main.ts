import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {io} from "socket.io-client";

const socket = io('http://localhost:3000/ws')

socket.on('hello', (arg) => {
    console.log(arg)
})

socket.emit('howdy', "stranger")
createApp(App).mount('#app');


