# Git

Abaixo segue as principais diretivas para o início do desenvolvimento de um projeto com base nas especificações do Team DEV LiteLiMS.

## Configurando o GIT

Configure suas informações no GIT

```bash
git config --global user.name "Nome do Usuário"
git config --global user.email "email@dominio.com.br"
```

ATENÇÃO - Só use estes comandos se precisar reiniciar as configurações do GIT

```bash
git config --global --replace-all user.name "Nome do Usuário"
git config --global --replace-all user.email "email@dominio.com.br"
```

## Configurando chave SSH

```bash
$ ssh-keygen
```

ENTER
ENTER
ENTER

```bash
$ cat ~/.ssh/id_rsa.pub
```

Resultado esperado no terminal.

```bash
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
NrRFi9wrf+M7Q== schacon@agadorlaptop.local
```

Adicione o código na plataforma que deseja seder acesso.
