import { createHead } from '@vueuse/head' // https://github.com/vueuse/head (manage head with composition API)
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
const head = createHead()

app.use(head)

app.mount('#app')
