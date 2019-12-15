# Laradock

Laradock é um ambiente de desenvolvimento PHP completo baseado no Docker.

Suportando uma variedade de serviços comuns, todos pré-configurados para fornecer um ambiente de desenvolvimento PHP completo.

## Instalação Laradock

Utilize o [site oficial](https://laradock.io/getting-started/) para se guiar e fazer a instalação. Mas fiz uma previa abaixo. :)

### Instalação como Submodulo

Clone o laradock no diretório raiz do projeto:

```bash
$ git submodule add https://github.com/Laradock/laradock.git
```

Entre na pasta laradock e copie **env-example** para **.env**

```bash
$ cp laradock/env-example laradock/.env
```

### Utilização como Submodulo

> Ao já possuir ele instalado no projeto

Clone o laradock como submodulo utilizando o seguinte comando:

```bash
$ git submodule init
$ git submodule update
```

## Configurações

Entre na pasta laradock e copie **env-example** para **.env**

```bash
$ cp laradock/env-example laradock/.env
```

> Você pode editar o **.env** arquivo para escolher quais softwares você deseja instalar no seu ambiente. Você sempre pode consultar o **docker-compose.yml** arquivo para ver como essas variáveis ​​estão sendo utilizadas.

> Você também tem total liberdade para trocar a versões utilizadas de cada software.
>
> Ex:
>
> PHP_VERSION=7.3
>
> MYSQL_VERSION=latest

Adicione um sufixo aos nomes dos containers para cada projeto.

**.env**

```
COMPOSE_PROJECT_NAME=laradock-NOMEPROJETO
```

## Executando

Crie o ambiente e execute-o usando docker-compose.

> Se for a primeira vez o processo é um pouco demorado para fazer o download dos containers.

### Usando MySQL

**.env**

```.env
MYSQL_VERSION=4.9
```

```bash
$ docker-compose up -d nginx mysql phpmyadmin portainer
```

### Usando Postgres

```bash
$ docker-compose up -d nginx mysql phpmyadmin portainer
```

## Criando atalho de start do Laradock

Você pode criar um alias no seu computador para executar o Laradock sem precisar toda vez entrar na pasta manualmente e executar o comando docker-compose.

Para isso faça o seguinte:

Utilizando o ZSH ou Bash edite o arquivo .zshrc ou .bashrc respectivamente.

Adicione o seguinte.

**start**

```text
alias project-name="cd ~/.../project-name/laradock && docker-compose up -d postgres pgadmin nginx portainer && cd ~"
```

**stop**

```text
alias project-name-stop="cd ~/.../project-name/laradock && docker-compose stop && cd ~"
```

> ... = local do projeto
>
> project-name = troque pelo nome do projeto
>
> project-name-stop = troque pelo nome do projeto com o prefixo stop

Agora para executar o docker do seu projeto apenas utilize o atalho que você acabou de criar com o nome do seu projeto.

```bash
# Para start docker-compose
$ project-name

# Para stop docker-compose
$ project-name-stop
```

## Acessos

[Seu projeto localhost](localhost)

[Portainer localhost:9010](localhost:9010)

[PHPMyAdmin localhost:8080](localhost:8080)

```
Acesso PHPMyAdmin
root
Senha:secret
```

[PGAdmin localhost:5050](localhost:5050)

```
Acesso PGAdmin4
pgadmin4@pgadmin.org
Senha:admin
```

Para mais informações consulte a [documentação oficial](https://laradock.io/getting-started/).

## Referências

[Laradock.io](https://laradock.io/)
