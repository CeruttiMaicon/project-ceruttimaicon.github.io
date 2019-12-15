# Instalação Docker

> Brian Hogan. Como Instalar e Usar o Docker no Ubuntu 18.04. [Referência](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt). Acesso em 09 fev 2019.
> Instalação do docker dentro do Ubuntu/Mint
> Pré-requisitos

> Para seguir este tutorial, você precisará do seguinte:

Um servidor Ubuntu 18.04 configurado seguindo o guia Configuração Inicial de servidor com Ubuntu 18.04, incluindo um usuário sudo não-root e um firewall.
Uma conta no Docker Hub se você deseja criar suas próprias imagens e enviá-las ao Docker Hub, como mostrado nos passos 7 e 8.

Passo 1 — Instalando o Docker
O pacote de instalação do Docker disponível no repositório oficial do Ubuntu pode não ser a versão mais recente. Para garantir que teremos a última versão, vamos instalar o Docker a partir do repositório oficial do projeto. Para fazer isto, vamos adicionar uma nova fonte de pacotes, adicionar a chave GPG do Docker para garantir que os downloads são válidos, e então instalar os pacotes.

Primeiro, atualize sua lista atual de pacotes:

```bash
$ sudo apt update
```

Em seguida, instale alguns pacotes de pré-requisitos que permitem que o apt utilize pacotes via HTTPS:

```bash
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Então adicione a chave GPG para o repositório oficial do Docker em seu sistema:

```bash
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Adicione o repositório do Docker às fontes do APT:

```bash
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

A seguir, atualize o banco de dados de pacotes com os pacotes Docker do repositório recém adicionado:

```bash
$ sudo apt update
```

Certifique-se de que você irá instalar a partir do repositório do Docker em vez do repositório padrão do Ubuntu:

```bash
$ apt-cache policy docker-ce
```

Você verá uma saída como esta, embora o número da versão do Docker possa estar diferente:

```bash
Output of apt-cache policy docker-ce

docker-ce:
Installed: (none)
Candidate: 18.03.1~ce~3-0~ubuntu
Version table:
18.03.1~ce~3-0~ubuntu 500
500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
```

Observe que o docker-ce não está instalado, mas o candidato para instalação é do repositório do Docker para o Ubuntu 18.04 (bionic).

Finalmente, instale o Docker:

```bash
$ sudo apt install docker-ce
```

O Docker agora deve ser instalado, o daemon iniciado e o processo ativado para iniciar na inicialização. Verifique se ele está sendo executado:

```bash
$ sudo systemctl status docker
```

A saída deve ser semelhante à seguinte, mostrando que o serviço está ativo e executando:

```bash
Output
● docker.service - Docker Application Container Engine
Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
Active: active (running) since Thu 2018-07-05 15:08:39 UTC; 2min 55s ago
Docs: https://docs.docker.com
Main PID: 10096 (dockerd)
Tasks: 16
CGroup: /system.slice/docker.service
├─10096 /usr/bin/dockerd -H fd://
└─10113 docker-containerd --config /var/run/docker/containerd/containerd.toml
```

A instalação do Docker agora oferece não apenas o serviço Docker (daemon), mas também o utilitário de linha de comando docker ou o cliente Docker. Vamos explorar como usar o comando docker mais adiante neste tutorial.

## Passo 2 — Executando o Comando Docker sem Sudo (Opcional)

Por padrão o comando docker só pode ser executado pelo usuário root ou por um usuário do grupo docker, que é automaticamente criado durante o processo de instalação do Docker. Se você tentar executar o comando docker sem prefixá-lo com sudo ou sem estar no grupo docker, você obterá uma saída como esta:

Output
docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See 'docker run --help'.
Se você quiser evitar digitar sudo sempre que você executar o comando docker, adicione seu nome de usuário ao grupo docker:

```bash
$ sudo usermod -aG docker nome-do-usuario
```

Para aplicar a nova associação ao grupo, efetue logout do servidor e faça logon novamente ou digite o seguinte:

```bash
$ su - nome-do-usuario
```

Você será solicitado a entrar com seu usuário e senha para continuar.

Confirme que seu usuário está agora adicionado ao grupo docker digitando:

```bash
$ id -nG
```

Saida:

```bash
Output
sammy sudo docker
```

Se você precisar adicionar um usuário ao grupo docker com o qual você não está logado, declare o nome do usuário explicitamente usando:

```bash
$ sudo usermod -aG docker nome-do-usuário
```

O restante desse artigo assume que você está executando o comando docker como um usuário do grupo docker. Se você optar por não fazê-lo, por favor, prefixe os comandos com sudo.

:)
