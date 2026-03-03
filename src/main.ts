import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Noir from './theme/noir'
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';

const app = createApp(App);

const pinia = createPinia()
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',    
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});
app.mount('#app');
