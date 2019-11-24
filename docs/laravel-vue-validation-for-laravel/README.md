# Vue Validation for Laravel

## Master Vue Validation no Laravel e Lidar com Pedidos de Formulários Efetivamente

O Laravel é um framework PHP avançado construído perfeitamente para web artisans. Ajuda a criar APIs robustas e aplicativos da Web otimizados. Além disso, a estrutura é muito amigável para o desenvolvedor, pois fornece recursos diferentes para facilitar várias operações funcionais.

A manipulação da validação de solicitações é uma das partes mais importantes de qualquer aplicativo da web. Muitos de nós sabemos que existem várias maneiras de validar a solicitação no Laravel, na qual uma é muito popular com a validação do Vue.

Por outro lado, o VueJS está se tornando cada vez mais popular entre a comunidade de front-end, não por causa de suas impressionantes funcionalidades, mas também por seu apoio oficial ao Laravel.

Ao criar um aplicativo da Web interativo, uma coisa mais importante para os desenvolvedores cuidarem é a validação do formulário. Você pode aplicar a validação de formulário por conta própria ou usar alguns plug-ins para fazer o trabalho.

Portanto, neste tutorial, demonstrarei como validar dados no Laravel usando a validação do Vue.

## Pré-requisitos

Para o propósito deste tutorial de validação de formulário do VueJS, suponho que você tenha um aplicativo Laravel instalado em um servidor da web. Minha configuração é:

- Laravel 5.5
- PHP 7.x
- MySQL
- Npm

Para uma pilha de desenvolvedores otimizada, instalei meu aplicativo Laravel em um servidor gerenciado do Cloudways que é considerado uma plataforma perfeita para hospedar o projeto Laravel . Você também pode se inscrever para uma conta gratuita do Cloudways e configurar seu aplicativo em poucos minutos.

## Instalar Npm

Começando com a validação do Vue no Laravel, a primeira etapa é a instalação do Node.js com o NPM .

Portanto, instale o NPM primeiro e vá para a pasta do projeto e cole o seguinte comando no terminal SSH.

```bash
npm init
npm install
```

## As rotas

Agora, o próximo passo é criar rotas no controlador do Vue para páginas de validação, como índice, função de armazenamento e outras.

```php
Route::get('vuevalidation/form', 'VueController@index');
Route::post('vuevalidation/form', 'VueController@store');
```

## O controlador

Para criar um VueController que lide com várias operações lógicas, basta copiar e colar o comando abaixo:

```bash
php artisan make:controller VueController
```

## Store

Depois de criar o controlador com êxito, abra-o e cole o seguinte código sob a função de armazenamento.

```php
$request->validate ([
        'name' => 'obrigatório' ,
        'comentários' => 'obrigatório'
    ] ) ;
return response()->json ([ 'success' => 'Feito!' ]) ;
```

## Index

```php
return view('vuevalidation-form');
```

## Vue Validation View

Depois de configurar a função do controlador com sucesso, agora é hora de criar arquivos de visualização dentro da pasta resources / views /. Dê um nome a ele como vuevalidation-form.blade.php e cole o código abaixo:

```php
<! DOCTYPE html>
<html>
<cabeça>
   <title> </ title>
   <link href = "https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel = "folha de estilo" >
   <script src = "https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js" > </ script>
   <script src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js" > </ script>
</ head>
<body>
<div class = "container" >
   <div class = "row" >
       <div classe = "col-sm-8 col-sm-offset-2" >
           <div class = "painel panel-default" >
               <div class = "panel-heading" > Validação simples de formulários Vuejs com o Laravel - ItSolutionStuff.com </ div>
               <div class = "panel-body" id = "app" >
                       <form method = "POST" action = "/ vuejs / form" class = "forma-horizontal" @ submit.prevent = "onSubmit" >
                       { { csrf_field ( ) } }
                           <div: class = "['form-group', allerros.name? 'tem um erro': '']" >
                               <label for = "nome" class = "col-sm-4 control-label" > Nome </ label>
                               <div class = "col-sm-6" >
                                   <input id = "nome" name = "nome" valor = ""   autofocus = "autofoco" class = "controle de forma" type = "texto" v-model = "form.name" >
                                   <span v-if = "allerros.name" : class = "['rótulo rótulo-perigo']" > @ { { allerros.name [ 0 ] } } </ span>
                               </ div>
                           </ div>
                           <div: class = "['grupo de formulários', allerros.comments? 'has-error': '']" >
                               <rótulo para = "comentários" class = "col-sm-4 control-label" > Mensagem </ label>
                                   <div class = "col-sm-6" >
                                       <input id = "comments" name = "comentários" class = "forma-controle" type = "comments" v-model = "form.comments" >
                                       <span v-if = "allerros.comments" : classe = "['label label-danger']" > @ { { allerros.comments [ 0 ] } } </ span>
                                   </ div>
                               </ div>
                               <span v-if = "success" : class = "['label label-success']" > Registro enviado com sucesso! </ span>
                               <tipo de botão = "enviar" class = "btn btn-primary" >
                                   Mandar
                               </ button>
                       </ form>
               </ div>
           </ div>
       </ div>
   </ div>
</ div>
<script type = "text / javascript" >
   const app = novo Vue ( {
       el: '#app' ,
       data: {
           form: {
               nome: '' ,
               comentários: '' ,
           } ,
           allerros: [ ] ,
           sucesso: falso,
       } ,
       métodos: {
           onSubmit ( ) {
               dataform = new FormData ( ) ;
               dataform. append ( 'nome' , this.form.name ) ;
               dataform. acrescentar ( 'comentários' , this.form.comments ) ;
               console. log ( this.form.name ) ;
               axios. post ( '/ vuevalidation / form' , dataform ) . então ( resposta => {
                   console. log ( resposta ) ;
                   this.allerros = [ ] ;
                   this.form.name = '' ;
                   this.form.comments = '' ;
                   this.success = true;
               } ) . catch ( ( erro ) => {
                        this.allerros = error.response.data.errors;
                        isto.sucesso = falso;
                   } ) ;
           }
       }
   } ) ;
</ script>
</ body>
</ html>
```

Depois de colar o código acima, execute o aplicativo no navegador preferencial e verifique a validação.

## Plugins de validação do Vue

Se você não gosta de configurar a validação manualmente, existem também alguns plugins de validação de formulário VueJS pré-fabricados disponíveis no mercado que podem economizar seu tempo e facilitar várias operações.

Como existem muitos plugins de validação disponíveis, recomendo que você escolha qualquer um dos seguintes:

### Vue-validador:

Desenvolvido por Kazuya Kawaguchi, o Vue Validator é o mais popular e é desenvolvido pelos membros principais do VueJS. Mas ainda não é compatível com o Vue 2.

### Vue-form-generator:

Esse também é um dos ótimos plug-in da pilha de validação de formulários do VueJS, pois também cria formulários interativos junto com a validação.

### Vee-validate:

O Vee-validate é um novo módulo para validação, mas sua compatibilidade com o Vue1 e o Vue2 o torna uma escolha muito melhor para validação até o momento. Este plugin Vue validador é muito útil para os desenvolvedores e, portanto, eu vou estar usando isso no tutorial abaixo também.

## Vee-Validate

Este plugin de validação de formulários do VueJS é muito leve e permite validar facilmente campos de entrada. Usá-lo não exige nada extravagante, já que todo o trabalho é feito com HTML e é bastante fácil. Você só precisa especificar o tipo de validação para cada entrada, já que alterações de valor devem ocorrer com a validação. Você receberá a notificação de cada erro ocorrente no campo.

Embora a maioria das validações de tempo esteja configurada para ocorrer automaticamente, no entanto, você também pode usar a validação personalizada em locais específicos. O objeto validador é um objeto independente e não possui dependências.

Este plugin do Vue validator tem atualmente 20 regras de validação e funciona da mesma forma como a sintaxe de validação do Laravel.

## Instalação

O Vee-validate está disponível apenas no NPM atualmente, mas espera-se que ele avance em breve.

Então, para obter a versão do plugin compatível do Vue 2, eu tenho que executar o seguinte comando:

```bash
npm install vee-validate@next --save
```

Então, autorizarei o Vue a usá-lo no meu JavaScript.

```javascript
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
```

## Validação de Formulário de Exemplo Básico

Agora, para validar uma entrada, anexe a diretiva v-validate e defina regras de validação dentro do atributo data-rules.

```php
<div class="form-group" :class="{'has-error': errors.has('email') }" >
   <label class="control-label" for="email">Email</label>
   <input v-model="email" v-validate="email" data-rules="required|email" class="form-control" type="email" placeholder="Email">
   <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
</div>
```

## Erros

Observe aqui que o objeto de erro é usado para verificar erros na entrada e notificar os desenvolvedores sobre isso. Ele é criado automaticamente pelo plug-in e você pode alterar seu nome sempre que necessário.

O objeto de erro fornece alguns métodos para renderizar erros:

- first ('field'): Obtém a primeira mensagem de erro associada a esse campo.
- collect ('field'): busca todas as mensagens de erro associadas a esse campo.
- has ('field'): Verifica se há algum erro associado a esse campo.
- all (): obtém todas as mensagens de erro.
- any (): Verifica se há algum erro.

## Conclusão

Portanto, neste artigo, demonstrei detalhadamente como validar dados no Laravel usando a validação do Vue. O artigo aborda dois métodos de validação de dados com o Vue, um é o processo manual e o outro é através de plugins pré-criados. Cabe a você qual delas atende às suas demandas de validação.

Se você ainda tiver mais dúvidas sobre este artigo, escreva suas dúvidas abaixo na seção de comentários.

## Referência

[Shahroze Nawaz](https://www.cloudways.com/blog/author/shahroze-nawaz/). **Master Vue Validation in Laravel and Handle Form Requests Effectively**. <https://www.cloudways.com/blog/vue-validation-laravel/>. Acesso em: 10 jul 2019.
