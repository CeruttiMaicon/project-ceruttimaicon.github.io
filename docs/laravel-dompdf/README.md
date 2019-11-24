# DOM PDF

Link de acesso tutorial:

```bash
https://blog.especializati.com.br/gerar-pdf-no-laravel-com-dompdf/
```

Link de acesso a documentação no GitHub:

```bash
https://github.com/barryvdh/laravel-dompdf
```

## Ferramentas

Para gerar PDF no Laravel vamos utilizar uma importante e conhecido pacote chamado DOMPDF.

Primeiramente execute o comando abaixo para fazer a instalação deste pacote no Laravel rode o comando:

```bash
composer require barryvdh/laravel-dompdf
```

Segundo as instruções do tutorial: "Após baixar o pacote precisa registrar o provider e aliases (no Laravel 5.5 não precisa porque o recurso de autodiscover faz isso automaticamente).". Como utilizamos a versão do Laravel 5.6, vamos ao próximo passo.

Adicione os providers:

**/config/app.php**

```bash
Barryvdh\DomPDF\ServiceProvider::class,
```

E em aliases adicione:

**/config/app.php**

```bash
'PDF' => Barryvdh\DomPDF\Facade::class,
```

Para gerar o arquivo de configuração e ter a possibilidade de alterar algumas configurações padrões rode este comando:

```bash
php artisan vendor:publish --provider="Barryvdh\DomPDF\ServiceProvider"
```

Após rodar o comando irá gerar um arquivo de configuração do DOMPDF em /config/dompdf.php

Feito isso o pacote está instalado e registrado.

## Utilizando

Crie a função no controller que deseja imprimir o PDF.

**ExemploController.php**

```php
use PDF;
public function fun_pdf($id)
{
    $pdf = PDF::loadView('eps_aws.showPDF');
    return $pdf->download('invoice.pdf');
}
```

(ou use a função 'stream' no lugar de 'download')

Se for necessario passar argumentos por variaveis para a view imprimir você deve utilizar o parametro compact para enviar os dados.

**Exemplo2Controller.php**

```php
use PDF;

$name_pass = DB::table("passes")->where('id', (int)$data->pass)
        ->pluck('name')
        ->all();

$name_electrodes = DB::table("electrodes")->where('id', (int)$data->electrodes)
        ->pluck('name')
        ->all();

public function fun_pdf($id)
{
    $pdf = PDF::loadView('eps_aws.showPDF', compact('name_pass', 'name_electrodes'));
    return $pdf->download('invoice.pdf');
}
```

E ajuste uma rota para que a função seja chamada.

**routes/web.php**

```php
Route::get('eps_aws/pdf/{id}', 'ExemploController@fun_pdf');
```

Repare que deixei o "{id}" para que na geração de documentos ele pegue os dados pelo id e ja os jogue no PDF. Para que no botão de importar para PDF possa ser feito do seguinte modo:

```html
<a class="btn btn-sm btn-primary" href="{{ url('eps_aws/pdf', $data->id) }}">
  {{ trans('buttons.downloadPDF') }}
</a>
```

Pronto!

O seu PDF terá um resultado semelhante a esse:

> (obs: lembre-se que um PDF é um documento bem mais simples e por isso ele não suporta varias Tags de estilo CSS e HTML. E o DOMPDF também não suporta o bootstrap até o momento).
