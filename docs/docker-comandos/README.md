# Docker - Para ambiente de desenvolvimento

## Casos adversos

Trabalhando com aplicações em Laravel utilizando o docker como já documentado aqui. É necessário que aja instalado no computador local a seguinte dependencia do PHP.
(para a versão 7.2)

```bash
$ sudo apt-get install php-xml
```

(para a versão 5.6)

```bash
$ sudo apt-get install php5.6-xml
```

Para iniciar o docker sempre com os mesmos endereços IP, restarta os containers já criados, (a ordem dos id's é a ordem de iniciação dos container, o que ira garantir o mesmo IP)
"docker restart ID_CONTAINER ID_CONTAINER"

```bash
$ docker restart 78ef3614b2e6 b97f1d682d0d fdbf23a239a6 569709e864e0 baf53f467e44
```
