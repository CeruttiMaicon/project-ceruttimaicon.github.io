# Amazon S3

## Fazendo o Download completo de um Bucket no Amazon S3

Primeiramente é necessário fazer a instalação do AWS CLI, uma ferramenta da Amazon para fazer o gerenciamento de suas tecnologias.

## Instalação das ferramentas necessárias.

```bash
$ sudo apt-get install python2.7
$ curl -O https://bootstrap.pypa.io/get-pip.py
$ sudo python2.7 get-pip.py
$ sudo pip install awscli
```

Se a instalação der certo execute este comando, e terá em vista manual com todos os comandos disponíveis.

```bash
$ aws help
```

## Configura AWS CLI

A próxima etapa é configurar o AWS CLI

```bash
$ aws configure
```

Daqui em diante é necessário ter a chave de acesso dada do sistema da AWS, para ver estas configurações entre no sistema da AWS, e em seguida clique no seu nome de usuário, abrirá um menu dropdown, e vá na seguinte configuração "My Security Credentials".

_Ao entrar nesta pagina clique em "Continue to Security Credentials"._

Em seguida na categoria de menu com o nome "Chaves de acesso (ID da chave de acesso e a chave de acesso secreta)". Se já existir uma chave de acesso a utilize, ou crie uma nova e depois a torne inativa depois de fazer seu uso(apenas como medida de segurança).

No ultimo comando dado acima insira as seguintes informações:

<img src="/images/terminalamazon.png" />

Após esta configuração você já esta credenciado a trabalhar com a ferramenta do AWS CLI.

Para fazer o download do seu Bucket, crie uma pasta por terminal de comando, (dentro desta pasta os arquivos do Bucket seram baixados).

```bash
$ mkdir ~/DownloadBucketS3
$ cd ~/DownloadBucketS3
```

E agora para baixar o conteúdo do bucket faça o seguinte comando:

```bash
$ aws s3 sync s3://mybucket .
```

No lugar de **"mybucket"** coloque o nome real do bucket que você pretende baixar.

Seu download começara imediatamente...

Após terminar suas tarefas, se desejar, você pode deletar a chave de acesso para aumentar ainda mais a segurança do seu bucket.
