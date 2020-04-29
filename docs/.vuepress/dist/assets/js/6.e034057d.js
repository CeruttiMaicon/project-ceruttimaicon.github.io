(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{207:function(a,e,s){"use strict";s.r(e);var t=s(0),n=Object(t.a)({},(function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"amazon-s3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#amazon-s3"}},[a._v("#")]),a._v(" Amazon S3")]),a._v(" "),s("h2",{attrs:{id:"fazendo-o-download-completo-de-um-bucket-no-amazon-s3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fazendo-o-download-completo-de-um-bucket-no-amazon-s3"}},[a._v("#")]),a._v(" Fazendo o Download completo de um Bucket no Amazon S3")]),a._v(" "),s("p",[a._v("Primeiramente é necessário fazer a instalação do AWS CLI, uma ferramenta da Amazon para fazer o gerenciamento de suas tecnologias.")]),a._v(" "),s("h2",{attrs:{id:"instalacao-das-ferramentas-necessarias"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#instalacao-das-ferramentas-necessarias"}},[a._v("#")]),a._v(" Instalação das ferramentas necessárias.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" python2.7\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -O https://bootstrap.pypa.io/get-pip.py\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" python2.7 get-pip.py\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" pip "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" awscli\n")])])]),s("p",[a._v("Se a instalação der certo execute este comando, e terá em vista manual com todos os comandos disponíveis.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ aws "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("help")]),a._v("\n")])])]),s("h2",{attrs:{id:"configura-aws-cli"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configura-aws-cli"}},[a._v("#")]),a._v(" Configura AWS CLI")]),a._v(" "),s("p",[a._v("A próxima etapa é configurar o AWS CLI")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ aws configure\n")])])]),s("p",[a._v('Daqui em diante é necessário ter a chave de acesso dada do sistema da AWS, para ver estas configurações entre no sistema da AWS, e em seguida clique no seu nome de usuário, abrirá um menu dropdown, e vá na seguinte configuração "My Security Credentials".')]),a._v(" "),s("p",[s("em",[a._v('Ao entrar nesta pagina clique em "Continue to Security Credentials".')])]),a._v(" "),s("p",[a._v('Em seguida na categoria de menu com o nome "Chaves de acesso (ID da chave de acesso e a chave de acesso secreta)". Se já existir uma chave de acesso a utilize, ou crie uma nova e depois a torne inativa depois de fazer seu uso(apenas como medida de segurança).')]),a._v(" "),s("p",[a._v("No ultimo comando dado acima insira as seguintes informações:")]),a._v(" "),s("img",{attrs:{src:"/images/terminalamazon.png"}}),a._v(" "),s("p",[a._v("Após esta configuração você já esta credenciado a trabalhar com a ferramenta do AWS CLI.")]),a._v(" "),s("p",[a._v("Para fazer o download do seu Bucket, crie uma pasta por terminal de comando, (dentro desta pasta os arquivos do Bucket seram baixados).")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" ~/DownloadBucketS3\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" ~/DownloadBucketS3\n")])])]),s("p",[a._v("E agora para baixar o conteúdo do bucket faça o seguinte comando:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ aws s3 "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sync")]),a._v(" s3://mybucket "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v("\n")])])]),s("p",[a._v("No lugar de "),s("strong",[a._v('"mybucket"')]),a._v(" coloque o nome real do bucket que você pretende baixar.")]),a._v(" "),s("p",[a._v("Seu download começara imediatamente...")]),a._v(" "),s("p",[a._v("Após terminar suas tarefas, se desejar, você pode deletar a chave de acesso para aumentar ainda mais a segurança do seu bucket.")])])}),[],!1,null,null,null);e.default=n.exports}}]);