import axios, {AxiosResponse} from 'axios';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

console.log(location.host)  // この値はviteの開発サーバーである localhost:5173を指すが、

// この処理でAjaxを発行するのはvite.config.jsに記述したexpressのオリジンであるlocalhost:3000に向けられる模様
axios.get('/api/v1/users.json').then((data: AxiosResponse<{id: number, name: string, age: number}[]>) => {
    console.log(data.data);
    createApp(App).mount('#app')
})


