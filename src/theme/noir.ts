import { definePreset } from "@primevue/themes";
import Aura from '@primevue/themes/aura';
import components from "./components";


export default definePreset(Aura, {
    components: components,
    semantic: {
        primary: {
            50: '#eef3fc',
            100: '#d9e4f8',
            200: '#b7ccf1',
            300: '#86a8e6',
            400: '#4e7dd6',
            450: '#3a66c4', // Mid-point adjustment
            500: '#2b5cb9',
            600: '#214fb1', // Your requested base color
            650: '#1c4294', // Deepened variant
            700: '#18387a',
            800: '#142e61',
            900: '#11254d',
            950: '#0b162f'
        },
    },

});