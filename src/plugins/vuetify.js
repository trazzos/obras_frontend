import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import i18n from '@/i18n'
import '@/sass/overrides.sass'

 import en from 'vuetify/src/locale/en.ts'
import es from 'vuetify/src/locale/es.ts'

Vue.use(Vuetify)

const theme = {
  primary: '#9D2449',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  error: '#b71c1c',
}

export default new Vuetify({
  lang: {
    locales: { es, en },
    current: 'es',
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
