module.exports = {
  description: "Just playing around",
  themeConfig: {
    logo: "/images/perfil.jpeg",
    title: "Maicon Cerutti",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guia", link: "/guia/" }
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
        children: ["/linux-mint/", "/linux-ubuntu/"]
      },
      {
        title: "Amazon",
        children: ["/amazon/"]
      },
      {
        title: "Laravel",
        children: ["/laravel/"]
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
        title: "LAMP",
        children: ["/lamp/"]
      },
      {
        title: "GIT",
        children: ["/git/"]
      }
    ]
  }
};
