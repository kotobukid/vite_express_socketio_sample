import axios, {AxiosResponse} from 'axios';
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

axios.get('/api/v1/users.json').then((data: AxiosResponse<{ id: number, name: string, age: number }[]>) => {
    console.log(data.data);
    const root_app = createApp(App).mount('#app');
    // root_app.users = data.data;
});


