import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const mytheme: ThemeDefinition = {
    colors: {
        primary: '#E41376',
        secondary: '#01C8EE',
        accent: '#101B37',
    },
    dark: true,

}

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: 'dark',
            themes: {
                dark: mytheme
            }
        },
    });
    nuxtApp.vueApp.use(vuetify);
})