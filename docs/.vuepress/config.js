module.exports = {
  description: "Just playing around",
  title: "maiconcerutti.dev",
  themeConfig: {
    logo: "/images/perfil.jpeg",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Linkedin",
        link: "https://www.linkedin.com/in/maicon-cerutti-516918114/"
      },
      {
        text: "GitHub",
        link: "https://github.com/CeruttiMaicon"
      }
    ],
    sidebar: [
      {
        title: "Postgres",
        children: ["/postgres/"]
      },
      {
        title: "Python",
        children: ["/python/"]
      },
      {
        title: "Docker",
        children: ["/docker-install/", "/docker-comandos/", "/docker-compose/"]
      },
      {
        title: "Sistemas Operacionais",
        children: [
          { title: "Linux Mint", children: ["/linux-mint-tema-mac/"] },
          { title: "Linux Ubuntu", children: ["/linux-ubuntu-tema-mac/"] }
        ]
      },
      {
        title: "Amazon",
        children: ["/amazon/"]
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
          "/laravel-vue-validation-for-laravel/"
        ]
      },
      {
        title: "Vue.JS",
        children: ["/vue-js/"]
      },
      {
        title: "Visual Studio Code",
        children: ["/visual-studio-code/"]
      },
      {
        title: "GIT",
        children: ["/git/"]
      }
    ]
  }
};
