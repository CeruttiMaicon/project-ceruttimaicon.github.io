# Laravel Homestad

## Introdução

O Laravel se esforça para tornar toda a experiência de desenvolvimento do PHP agradável, incluindo seu ambiente de desenvolvimento local. O Vagrant fornece uma maneira simples e elegante de gerenciar e provisionar máquinas virtuais.

O Laravel Homestead é uma caixa Vagrant oficial e pré-empacotada que fornece a você um maravilhoso ambiente de desenvolvimento sem precisar instalar o PHP, um servidor web e qualquer outro software de servidor em sua máquina local. Não mais se preocupar com bagunçar o seu sistema operacional! As caixas vagabundas são completamente descartáveis. Se algo der errado, você pode destruir e recriar a caixa em minutos!

Homestead é executado em qualquer sistema Windows, Mac ou Linux, e inclui o servidor web Nginx, PHP 7.3, PHP 7.2, PHP 7.1, PHP 7.0, PHP 5.6, MySQL, PostgreSQL, Redis, Memcached, Node e todos os outros produtos você precisa desenvolver incríveis aplicativos Laravel.

## Instalação

Primeiramente a documentação oficial

[Laravel Homestead](https://laravel.com/docs/5.7/homestead)

Caso tenha dificuldades em acompanhar algum passo tenho um link de um vídeo no youtube onde o Fabio Vedovelli [Fabio Vedovelli](https://www.youtube.com/watch?v=-41Km1tAokI) explica.

Seguindo os passos dele eu montei parte deste tutorial, e esclareci muitas duvidas.

Aqui utilizarei o Virtual Box para fazer o gerenciamento das VM's e o Vagrant.

Baixe do site oficial o [Virtual Box](https://www.virtualbox.org/wiki/Downloads).

Instale-o normalmente. E em seguida instale o [Vagrant](https://www.vagrantup.com/downloads.html). Baixe-os de acordo com o seu sistema operacional.

Baixe os dois de um site oficial para não ter problemas de versão, o Laravel Homestead necessita da versão mais recente dos dois.

Em seguida: execute em seu terminal de comando o seguinte. Ele vai baixar todos os pacotes essenciais para se fazer o ambiente virtualizado do Laravel e por esse motivo vá tomar um café. Esse download demorou pra mim 3 horas e 30 min,. E é normal demorar, depende da velocidade da internet de cada um.

(Este passo só será feito uma unica vez, então não se preocupe em ter que fazer novamente para uma segunda maquina virtual caso futuramente necessite)

```bash
$ vagrant box add laravel/homestead
```

Ele vai pedir uma distro de virtualização lembre-se de escolher o Virtual Box.

Agora você pode instalar o Homestead clonando o repositório. Considere clonar o repositório em uma pasta dentro de seu diretório "home", pois a caixa Homestead servirá como host para todos os seus projetos do Laravel. Aqui ficará a sua maquina virtual. Entre no seu diretório home e execute o seguinte comando:

```bash
$ git clone https://github.com/laravel/homestead.git ~/Homestead
```

Este não ira demorar muito.

Entre na pasta Homestead que você acabou de baixar. Certifiquei-se de estar em uma versão funcional (no meu caso git checkout v7.18.0 funcionou)

```bash
$ git checkout v7.18.0
```

Execute o comando a seguir para criar o arquivo de configuração (Lembre-se de estar dentro do projeto que acabamos de baixar). O arquivo de configuração será colocado no diretório Homestead, e ele se chama "Homestead.yaml". (Execute de acordo com o seu sistema operacional).

(Se a sua opção for Windows não esqueça de executar o comando como Administrador)

```bash
// Mac / Linux...

bash init.sh

// Windows...

init.bat
```

Agora vamos configurar o arquivo Homestead.yaml. (utilize o VS Code). Dentro dele haverá as seguintes informações:

```bash
folders: - map: ~/Code
    to: /home/vagrant/Code
```

_(para configurações adicionais consulte a documentação oficial)_

Preste muita atenção. Esses serão as pastas compartilhadas com o computador local e a maquina virtual. A parte" -map: " indica a pasta cuja a qual será colocado os projetos Laravel para o acesso local, da sua maquina física, o "to" indica a pasta onde apareceram os arquivos dentro da maquina virtual. Elas funcionam de uma forma espelhada, os arquivos que são editados dentro da maquina local alteram a virtual.

_("~" isto indica a pasta home do usuário)_

Agora a parte de configuração das rotas de acesso local.

```bash
sites:
- map: homestead.test
    to: /home/vagrant/code/Laravel/public
```

Este "map" vai ser o domínio a ser criado para ser acessado da maquina fisica para testar os projetos.

O "to" indicara o local do projeto a ser exibido (não esqueça que o index do Laravel é na pasta public como no exemplo acima).

Você também pode configurar para aparecer mais de um projeto, eu por exemplo adicionei a pasta Code uma instalação do phpMyAdmin para ter acesso ao banco de dados da maquina virtual. E ficou da seguinte maneira

```bash
sites:
- map: gps.developper
    to: /home/vagrant/Code/gps_laravel/public

- map: gps.phpmyadmin
    to: /home/vagrant/Code/phpMyAdmin
```

Nas linhas superiores do arquivo você indica o número de CPU's, qunatidade de memoria a ser utilizada na maquina virtual e o provider utilizado para rodar a VM do Laravel Homestade, pode deixar estes que estão padrão mesmo.

```bash
ip: "192.168.10.10"
memory: 2048
cpus: 1
provider: virtualbox
```

## Arquivo de Hosts

O arquivo de hosts.

Você deve adicionar os "domínios" para seus sites Nginx ao arquivo de hosts em sua máquina. O arquivo hosts redirecionará as solicitações de seus sites da Homestead para sua máquina Homestead. No Mac e no Linux, esse arquivo está localizado em / etc / hosts. No Windows, ele está localizado em C: \ Windows \ System32 \ drivers \ etc \ hosts. As linhas adicionadas a este arquivo serão semelhantes às seguintes:

```bash
192.168.10.10 homestead.test
```

O primeiro endereço IP é o da maquina virtual que foi configurado no arquivo Homestead.yaml. E o nome é o mesmo que você definil no arquivo como " site: map: ".

## Iniciando maquina virtual (Comando VAGRANT)

Agora entre na pasta do Homestead que foi baixada e de o seguinte código do vagrant para iniciar a maquina virtual do virtual box.

Para iniciar (a maquina virtual deve estar ligada para que a URL desejada funcione)

```bash
$ vagrant up
```

Caso seja feita novas alterações no arquivo Homestead.yaml. a maquina virtual deverá ser reiniciada para colocar em vigor as alterações. E isso pode ser feito com comando a seguir

```bash
$ vagrant reload --provision
```

Para desligar a maquina virtual e finalizar todos os processos nela.

```bash
$ vagrant halt
```

A principio deve ser uma configuração bem simples. Não esqueça de criar as pastas no Local Físico caso elas não tenham sido criadas ainda. E crie um index.php para fazer um teste, com o seguinte código.

```php
<?php phpinfo(); ?>
```

Talvez o seguinte erro apareça.

<img src="/images/erro1.png">

Selecione Avançado, e em seguida.

<img src="/images/erro2.png">

É apenas um erro de certificação, que seu site local não possui, isto é perfeitamente normal, e por horas ficara assim.
