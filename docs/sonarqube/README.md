# Sonarqube

## Instalação projeto

### Requerimentos técnicos

Docker - [https://www.docker.com/get-started](https://www.docker.com/get-started)

Git - [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Primeiros passos

Configuração SonarQube

1. Execute o servidor SonarQube

```
docker run -d --name sonarqube -p 9000:9000 sonarqube:7.5-community
```

O projeto Sonarquebe deve estar iniciando.

Entre em [http://localhost:9000](http://localhost:9000).

2. Execute e verifique se um servidor está instalado e executando:

```
docker ps
```

3. Aguarde o servidor iniciar e efetue login no servidor SonarQube em [http://localhost:9000](http://localhost:9000) Utilize credenciais padrão: login: admin password:admin

4. Acesse: [http://localhost:9000/account/security](http://localhost:9000/account/security) e gere um token.

5. Copie o valor do token e salve-o em algum lugar, pois você não poderá vê-lo novamente! Você precisará mais tarde neste tutorial.

6. Crie uma nova pasta para a imagem do Scanner SonarQube dockerfile.

Está pasta será responsável para executar os scanners de código dos projetos que você precisar.

Execute:

```
mkdir sonarqube-scanner
```

Agora entraremos na pasta para criar os arquivos docker.

```
cd sonarqube-scanner
```

Criaremos o Dockerfile.

```
touch Dockerfile
```

Agora edite este arquivo com estas informações:

```docker
# This is docker file for our sonarqube-scanner. You don't need to read it since
# the goal of this tutorial isn't about teaching docker or about presenting the best
# way for creating Sonarqube scanner image. Of course feel free to check on it if you like.
# Get dotnetcore SDK
FROM microsoft/dotnet:2.2.104-sdk AS sonarqube
# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean;
# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;
# Setup JAVA_HOME
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOM
# Env variables
ENV NODE_VERSION 10.13.0
ENV NODE_DOWNLOAD_SHA b4b5d8f73148dcf277df413bb16827be476f4fa117cbbec2aaabc8cc0a8588e1
# Install node.js
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs
# Install global tools
RUN dotnet tool install -g dotnetsay
RUN dotnet tool install --global dotnet-sonarscanner --version 4.5.0
# Add global tools folder to PATH
ENV PATH="${PATH}:/root/.dotnet/tools"
# Get required packages for sonar scanner
RUN apt-get update && apt-get -y install curl bash unzip yarn bzip2
WORKDIR /root
ENV LATEST='sonar-scanner-cli-3.3.0.1492-linux.zip'
# Get & install sonar scanner
RUN env && \
    curl -OL 'https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/'$LATEST && \
    mkdir sonar_scanner && unzip -d sonar_scanner $LATEST && mv sonar_scanner/* sonar_home && \
    rm -rf sonar_scanner $LATEST
# Add sonar scanner to PATH
ENV SONAR_RUNNER_HOME=/root/sonar_home
ENV PATH ${SONAR_RUNNER_HOME}/bin:$PATH
ARG SONAR_HOST
ARG SONAR_LOGIN_TOKEN
# make temporary folder for seed analysis for javascript scanner
WORKDIR /root/temp1
RUN mkdir src
RUN touch src/test.js
# Init sonarscanner cache with plugins
RUN sonar-scanner -Dsonar.host.url=$SONAR_HOST -Dsonar.login=$SONAR_LOGIN_TOKEN -Dsonar.analysis.mode=preview -Dsonar.projectKey="pluginsSeedJS" -Dsonar.sources="src"
WORKDIR /root
# Remove temporary folder
RUN rm /root/temp1 -rf
# make temporary folder for seed analysis
WORKDIR /root/temp2
# Init sonarscanner cache with plugins for .NET scanner
RUN dotnet sonarscanner begin /k:"pluginsSeedNET" /d:sonar.host.url=$SONAR_HOST /d:sonar.login=$SONAR_LOGIN_TOKEN /d:sonar.analysis.mode=preview
RUN dotnet new sln --name FooBar
RUN dotnet new mvc --name Foo --output Foo
RUN dotnet new console --name Bar --output Bar
RUN dotnet sln add ./Foo/Foo.csproj
RUN dotnet sln add ./Bar/Bar.csproj
RUN dotnet restore
RUN dotnet build FooBar.sln
RUN dotnet sonarscanner end /d:sonar.login=$SONAR_LOGIN_TOKEN ; exit 0
WORKDIR /root
# Remove temporary folder
RUN rm /root/temp2 -rf
```

Ainda dentro da pasta que acabamos de criar executaremos o seguinte comando:

```
docker build --network=host --tag sonar-scanner-image:latest --build-arg SONAR_HOST="http://localhost:9000" --build-arg SONAR_LOGIN_TOKEN="TOKEN_VALUE" .
```

Lembre-se de substituir "TOKEN_VALUE" pelo seu token criado na etapa 4.

Pronto!

## Executando o Scanner em um projeto

Agora baixe o(s) projeto(s) que deve(m) passar pelo scanner nesta pasta.

1. Entre no diretório do projeto e crie o .dockerignore

```
touch .dockerignore
```

Neste arquivo que acabamos de criar adicione o seguinte (e as demais pastas que deseje que o sonarquebe ignore durante o scanner):

```
.dockerignore
.vs
node_modules
```

2. Crie um Dockerfile dentro do projeto a ser scanneado, e adicione o seguinte código:

> OBS: (caso ele já exista o substitua).

> SONAR_PROJECT_KEY = Nome do projeto Scanneado

```
# It is our freshly build sonar-scanner-image from previous steps that
# is used here as a base image in docker file that we will be working on
FROM sonar-scanner-image:latest AS sonarqube_scan
# Here we are setting up a working directory to /app. It is like using `cd app` command
WORKDIR /app
# Copying all files from the project directory to our current location (/app) in image
# except patterns mention in .dockerignore
COPY . .
# Execution of example command. Here it is used to show a list of files and directories.
# It will be useful in later exercises in this tutorial.
RUN ls -list
# To execute sonar-scanner we just need to run "sonar-scanner" in the image.
# To pass Sonarqube parameter we need to add "-D"prefix to each as in the example below
# sonar.host.url is property used to define URL of Sonarqube server
# sonar.projectKey is used to define project key that will be used to distinguish it in
# sonarqube server from other projects
# sonar.sources directory for sources of project
RUN sonar-scanner \
    -Dsonar.host.url="http://localhost:9000" \
    -Dsonar.projectKey="SONAR_PROJECT_KEY" \
    -Dsonar.sources=. \

```

3. Agora, ainda dentro do diretório do projeto execute:

```
docker build --network=host --no-cache .
```

Após o termino do scanner. Ao entrar em [http://localhost:9000/projects](http://localhost:9000/projects) você verá o seu projeto.
