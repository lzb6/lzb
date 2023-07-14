import { createApp } from 'vue'

// import './style.css'
import './index.css'
import './assets/css/bootstrap.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import axios from 'axios'
import store from './store'
import Cookie from 'js-cookie' 
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
axios.defaults.baseURL='http://120.26.39.150:8089'
axios.interceptors.request.use(function (config) { 
  // 这里的config包含每次请求的内容
  let token = Cookie.get('token')
  let msg = localStorage.getItem('msg')
  let Ip = localStorage.getItem('Ip')
  config.headers.message = `${msg}`;
  config.headers.ip = `${Ip}`;
  if (token) {
    // 添加headers
    config.headers.token = `${token}`;
  } else {}
  return config;
}, function (err) {
  return Promise.reject(err);
})

app.config.globalProperties.$http = axios

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

