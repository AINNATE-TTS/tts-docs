export default defineAppConfig({
  ui: {
    primary: "green",
    gray: "slate",
    footer: {
      bottom: {
        left: "text-sm text-gray-500 dark:text-gray-400",
        wrapper: "border-t border-gray-200 dark:border-gray-800",
      },
    },
  },
  seo: {
    siteName: "Text To Speech OpenAI API",
  },
  header: {
    logo: {
      alt: "",
      light: "",
      dark: "",
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/AINNATE-TTS/tts-docs",
        target: "_blank",
        "aria-label": "TTSOpenAI API docs on GitHub",
      },
    ],
  },
  footer: {
    credits: "Copyright © " + new Date().getFullYear(),
    colorMode: false,
    links: [
      {
        icon: "i-mingcute-voice-line",
        to: "https://ttsopenai.com/",
        target: "_blank",
        "aria-label": "Our website",
      },
      {
        icon: "i-openmoji-youtube",
        to: "https://www.youtube.com/@TTSOPENAI86",
        target: "_blank",
        "aria-label": "YouTube",
      },
      {
        icon: "i-openmoji-facebook",
        to: "https://www.facebook.com/profile.php?id=61556251485523",
        target: "_blank",
        "aria-label": "Facebook",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/AINNATE-TTS",
        target: "_blank",
        "aria-label": "GitHub",
      },
    ],
  },
  toc: {
    title: "Table of Contents",
    bottom: {
      title: "Community",
      edit: "https://github.com/AINNATE-TTS/tts-docs/edit/develop/content",
      links: [
        {
          icon: "i-mingcute-voice-line",
          to: "https://ttsopenai.com/",
          target: "_blank",
          label: "Our website",
        },
        {
          icon: "i-openmoji-youtube",
          to: "https://www.youtube.com/@TTSOPENAI86",
          target: "_blank",
          label: "Follow on YouTube",
        },
        {
          icon: "i-openmoji-facebook",
          to: "https://www.facebook.com/profile.php?id=61556251485523",
          target: "_blank",
          label: "Follow on Facebook",
        },
      ],
    },
  },
});
