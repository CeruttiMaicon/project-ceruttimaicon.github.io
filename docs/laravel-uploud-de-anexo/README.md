# Uploud de anexo

No uploud de arquivos utilizando o Laravel eu utilizei a mesma base que foi desenvolvida no uploud de imagem, apenas acrescentei algumas coisas a mais no insert no banco de dados!

O padrão de criação de uploud de arquivos que eu deixei foi "FilesExemplo"

> (OBS) No lugar de exemplo coloque o tipo de documento que será anexado.

Vamos começar criando o model e a migration.

**Terminal**

```bash
$ php artisan make:model FilesRqpsAws -m
```

Agora no seu arquivo Model que foi criado coloque os seguintes itens de protect:

**FilesRqpsAws.php**

```php
 protected $fillable = [
     'file_name',
     'mime_type',
     'file_size',
     'file_path',
     'file_original_name',
     'status',
     'type',
     'rwps_aws_id',
 ];
```

Repare que eu mudei o ultimo campo de acordo com o ID que iremos criar na Migration do Laravel.

Agora no arquivo de migration que foi criada cm o nosso primeiro comando "2018_07_10_182214_create_files_rqps_aws_table.php", você deve colocar as seguintes linhas.

**2018_07_10_182214_create_files_rqps_aws_table.php**

```php
public function up()
{
    Schema::create('files_rqps_aws', function (Blueprint $table) {

        });
    });
}

public function down()
{
    Schema::dropIfExists('files_rqps_aws');
}
```

> (OBS) Ali onde tem o comentário de "O nome original do arquivo", é o único local diferente de um uploud de imagem, pois aqui é necessário que o nome do arquivo original seja salvo e depois apresentado novamente para o usuário.

Após ter feito as implementações acima . Rode:

**Terminal**

```bash
$ php artisan migrate:refresh
```

> (OBS) Este comando reseta o banco de dados e já cria a tabela cuja qual acabamos de fazer.

Se o seu projeto tiver alguma seeder, você pode roda-lá também.

Agora vamos para a nossa View, de cadastro, no meu caso o create.blade.php, deve ser feito nele e não no form.blade.php, pois como o form é utilizado no create e no edit, a nossa requisição de imagem serve apenas para o create. (OBS) O edit também terá a mesma funcionalidade de mandar uploud de arquivos com o diferencial de listar os itens que ja foram adicionados.

Entre no seu arquivo view create.blade.php e coloque o seguinte trecho de código dentro do seu formulário.

**create.blade.php**

```php
<!-- INI: Anexos -->
    <div class="col-sm-12">
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                        <h4 class="panel-title pull-left">{{trans('titles.attachment')}}</h4>
                        <div class="btn-group pull-right">
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            {{ Form::label('temperature_min', trans('titles.attachment')) }}
                            <input type="file" name="files[]" multiple >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- FIM: Anexos -->
```

Este trecho de código faz com que seja solicitado o input dos arquivos.

Repare que na classe input do HTML a tag "name" que esta com "files[]" esta com estes colchetes, são eles que permitem a inclusão de arquivos simultâneos. Sem eles é apenas feito uploud de um arquivo por vez.
