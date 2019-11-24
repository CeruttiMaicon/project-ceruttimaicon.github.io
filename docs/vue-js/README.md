# VueJS

## Atributos VueJS

props: É utilizado para colocar os atributos da função do componente. Ele é instanciado dentro da tag script do Vue. E os atributos recebidos dentro do componente passam por ele. Esses atributos devem ser instanciados dentro de um array.

v-bind: Pode ser utilizado para pegar os atributos do props, e fazer a chamada de funções dentro do html.

v-if: é utilizada com a seguinte sintaxe

```javascript
<p v-if="teste  logico">
  {" "}
  Se a condição é verdadeira mostra esse paragrafo, se não, não mostra{" "}
</p>
```

Ele deve ser usado dentro da sintaxe do html, e se a condição for verdadeira ele mostra o objeto em tela.

v-for: A estrutura de laços de repetição é utilizada com a seguinte sintaxe

```javascript
<p v-for="item in itens"> itens.nomeatributo </p>
```

"itens" é a variável com o array dos itens, e item é a variável utilizada para pegar os objetos de dentro do array de "itens".

## Computado

Metodos computados não precisam ser chamados como funções (com o "Nomefunção()" parenteses no final da chamada da função ).

Apresentam um maior desempenho e só são executados uma vez no código. O computed deve ser mais utilizados para valores que mudam toda hora, para obter resultados calculados. Além disso, armazena os dados em cache até que seja alterado. Quando o Vue é instanciado, as propriedades calculadas são convertidas em uma propriedade. Portanto, você faz referência a uma propriedade computada como se fosse uma propriedade de dados.

## Metodos

Também executam funções do javascript, porém tem um desempenho muito pior, por um método ser chamado varias vezes. Methods devem ser utilizados para funções do usuário. Se recomenda utilizar methods para criar funções para o usuário. Um método não faz nada a menos que você o chame. Como todas as funções javascript, aceita parâmetros e será reavaliado sempre que for chamado. Depois disso, eles não podem armazenar valores em cache. Além disso, você deve usar métodos quando quiser passar um valor para modificá-lo.

# Reforçado

## Methods

Methods devem ser utilizados para as funções do usuario, o methodo pode ser utilizado uma vez, ou não.

## Computed

Computed deve ser utilizado para mostrar soluções, mostrar uma resposta enquanto a sua aplicação esta renderizando.

## Watch

Observadores são funções em javascript que são chamadas em tempo real, no tempo de interação do usuario. Isto é utilizado usando o "watch".
