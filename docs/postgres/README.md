# Como instalar o Postgre e pgAdmin no Linux (Ubuntu e derivados)

> 10/05/2019

Passo a passo não muito detalhado da instalação do SGBD PostgreSQL 9.5 e a ferramenta gráfica da administração pgAdmin 4. Para mais informações leia a documentação do Postgresql e pgAdmin.

## Adicionando o repositório do PostGreSQL para a versão Bionic (18.04) do Ubuntu:

– Crie o arquivo /etc/apt/sources.list.d/pgdg.list e adicione a linha abaixo:

```code
deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main
```

– Importe a chave de assinatura do repositório e atualize as listas de pacotes

```code
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
```

## Instalando o PostgreSQL 9.5

– Execute a linha abaixo

```bash
sudo apt-get install postgresql-9.5
```

## Instalando o pgAdmin 4

– Execute a linha abaixo

```bash
sudo apt-get install pgadmin4
```

## Criando o banco de dados

Primeiro precisamos acessar o prompt de comando do usuário postgres. Este usuário foi criado automaticamente na instalação do PostgresSQL.

```bash
sudo su - postgres
```

– Para criar o banco de dados:

```bash
createdb bancoTeste
```

– Entrando no cliente de linha de comando do PostgreSQL e manipulando o BD criado:

```code
psql -d bancoTeste
```

Nesse estágio você pode manipular o banco utilizando a linguagem SQL do Postgres.

– Atribuindo uma senha o usuário postgres.

É importante destacar que esse senha é para o usuário postgres e não para o DB.

Ainda dentro do client de linha de comando do Postgre digite:

```bash
password postgres
```

Ele vai pedir que você digite a nova senha duas vezes.

Para mais informações digite:

```bash
help
```

## Acessando o pgAdmin 4

– Você pode pesquisar no menu de aplicativos do seu S.O por: pgadmin4

– Ou acessar pelo navegador a url

```link
http://127.0.0.1:46245/browser/
```

– A partir do usuário postgres você consegue criar e logar nos bancos.

O servidor será iniciado e a partir daí é com você. :)
