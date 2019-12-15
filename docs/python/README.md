# Python - Instalação Ubuntu/Mint

Inicialmente o Python já vem instalado no Ubuntu/Mint (ou qualquer outra distribuição Linux), mas ele vem na versão 2.7.

Para deixar ele na versão 3 faça o seguinte procedimento:

Verifique se ele já está instalado:

```bash
$ python3 --version
```

Ele irá retornar a versão do Python.

Agora basta mudarmos para deixar o link simbólico da chamada do comando correto, fazendo o seguinte:

## Passo 1: Remover o antigo link:

```bash
$ sudo rm /usr/bin/python
```

## Passo 2: Criando o novo link apontando para Python3

```bash
$ sudo ln -s python3 /usr/bin/python
```

Pronto! agora digitando o comando 'python' ele já ira funcionar na versão 3.

```bash
$ python --version
```
