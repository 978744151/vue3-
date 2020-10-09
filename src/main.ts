import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'

// App.config.devtools = true;

console.log(createApp(App).config)
createApp(App).use(store).use(router).use(Antd).mount('#app')
