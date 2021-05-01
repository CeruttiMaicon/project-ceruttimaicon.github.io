module.exports = {
  theme: 'yuu',
  description: "Minhas competências, anotações e documentações :)",
  title: "ceruttimaicon.js.org",
  head: [
    [
      "script",
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        "data-ad-client": "ca-pub-7563330699889675",
        async: true,
      },
    ],
    [
      "script",
      {},
      "(adsbygoogle = window.adsbygoogle || []).push({  google_ad_client: <your code here>,  enable_page_level_ads: true });",
    ],
  ],
  themeConfig: {
    yuu: {
      disableThemeIgnore: true,
      colorThemes: [],
      labels: {
        darkTheme: 'Tema Dark', // Default is "Enable Dark Theme?"
      },
    },
    logo: "/images/perfil.jpeg",
    nav: [{
        text: "Guide",
        link: "/guide/"
      },
      {
        text: "Linkedin",
        link: "https://www.linkedin.com/in/maicon-cerutti-516918114/",
      },
      {
        text: "GitHub",
        link: "https://github.com/CeruttiMaicon",
      },
    ],
    sidebar: [{
        title: "Guide",
        children: ["/guide/"],
      },
      {
        title: "Postgres",
        children: ["/postgres/"],
      },
      {
        title: "Python",
        children: ["/python/"],
      },
      {
        title: "Docker",
        children: [
          "/docker-laradock/",
          "/docker-install/",
          "/docker-comandos/",
          "/docker-compose/",
        ],
      },
      {
        title: "Sistemas Operacionais",
        children: [{
            title: "Linux Mint",
            children: ["/linux-mint-tema-mac/"]
          },
          {
            title: "Linux Ubuntu",
            children: ["/linux-ubuntu-tema-mac/"]
          },
        ],
      },
      {
        title: "Amazon",
        children: ["/amazon/"],
      },
      {
        title: "Laravel",
        children: [
          "/laravel-uploud-de-imagem/",
          "/laravel-uploud-de-anexo/",
          "/laravel-datatable-server-side/",
          "/laravel-dompdf/",
          "/laravel-homestad/",
          "/laravel-relationship/",
          "/laravel-vue-validation-for-laravel/",
        ],
      },
      {
        title: "Lumen",
        children: ["/lumen-JWT-Authenticated-API-with-lumen/"],
      },
      {
        title: "Vue.JS",
        children: ["/vue-js/"],
      },

      {
        title: "GIT",
        children: ["/git/"],
      },
      {
        title: "Zero Absoluto",
        children: ["/install-programns/"],
      },
      {
        title: "SonarQuebe",
        children: ["/sonarqube/", "/sonarqube-utilizacao-rapida/"],
      },
    ],
  },
};