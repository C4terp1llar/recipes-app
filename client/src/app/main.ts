import '@/app/styles/main.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from "@/app/providers/router.ts";
import {vuetify} from "@/app/providers/vuetify.ts";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
