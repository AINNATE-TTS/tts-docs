export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
  seo: {
    siteName: 'Text To Speech OpenAI API'
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/AINNATE-TTS/tts-docs',
      'target': '_blank',
      'aria-label': 'TTSOpenAI API docs on GitHub'
    }]
  },
  footer: {
    credits: 'Copyright © ' + new Date().getFullYear(),
    colorMode: false,
    links: [{
      'icon': 'i-mingcute-voice-line',
      'to': 'https://ttsopenai.com/',
      'target': '_blank',
      'aria-label': 'Our website'
    }, {
      'icon': 'i-openmoji-youtube',
      'to': 'https://www.youtube.com/@TTSOPENAI86',
      'target': '_blank',
      'aria-label': 'YouTube'
    }, {
      'icon': 'i-openmoji-facebook',
      'to': 'https://www.facebook.com/profile.php?id=61556251485523',
      'target': '_blank',
      'aria-label': 'Facebook'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/AINNATE-TTS',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/AINNATE-TTS/tts-docs/edit/main/content',
      links: [{
        icon: 'i-heroicons-star',
        label: 'Star on GitHub',
        to: 'https://github.com/nuxt/ui',
        target: '_blank'
      }, {
        icon: 'i-heroicons-book-open',
        label: 'Nuxt UI Pro docs',
        to: 'https://ui.nuxt.com/pro/guide',
        target: '_blank'
      }, {
        icon: 'i-simple-icons-nuxtdotjs',
        label: 'Purchase a license',
        to: 'https://ui.nuxt.com/pro/purchase',
        target: '_blank'
      }]
    }
  }
})
