# Instalação Docker-compose

Siga estes comandos, retirados do site do Docker.

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Para conceder permissões para o binário do Docker que foi baixado.

```bash
$ sudo chmod +x /usr/local/bin/docker-compose
```

Para verificar se ele foi instalado corretamente:

```bash
$ docker-compose --version
```
