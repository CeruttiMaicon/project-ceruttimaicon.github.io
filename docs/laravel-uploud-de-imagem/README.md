# Uploud de imagem

Dentro do nosso projeto foi definido que toda imagem deverá ser armazenada em um servidor da Amazon utilizando da tecnologia S3 da Amazon.

Primeiramente execute o comando abaixo no seu terminal de comando (para instalar as dependências do S3):

```bash
$ composer require league/flysystem-aws-s3-v3
```

Depois disso entre no seu arquivo .env e edite as seguintes informações (essas informações são de seus arquivos do balde do S3 da Amazon, você consegue esssas informações todas no site da Amazon):

**.env**

```bash
S3_KEY=AKIAIFQAKTMJRWXKVXRA
S3_SECRET=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
S3_REGION=sa-east-1
S3_BUCKET=gps-bucket
AWS_URL=https://s3-sa-east-1.amazonaws.com/gps-bucket/
```

Edite o arquivo do filesystem.php:

**config/filesystem.php**

```bash
disks => [
    ...
    's3' => [
        'driver' => 's3',
        'key' => env('S3_KEY'),
        'secret' => env('S3_SECRET'),
        'region' => env('S3_REGION'),
        'bucket' => env('S3_BUCKET'),
        'url' => env('AWS_URL'),
    ],
    ...
]
```

_Desta parte em diante pode ser usado para fazer o uploud de onde quiser_

Agora execute o seguinte comando no seu terminal:

```bash
$ php artisan make:model ImagesExemplo -m
```

Você acabou de criar uma Migration e uma Model.

OBS: (Por padrão eu decidi colocar o nome "Images" na frente para que o segundo nome seja associado ao tipo da imagem que você irá guardar, exemplo: ImagesUsers, ImagensStaffs, ImagesEPS)

Uma model com o nome de ImegesExemplo foi criada. E uma migration com o nome 2018_04_19_153941_create_images_exemplo_table.php

Abra seu arquivo da migration: e adicione o seguinte código dentro da função "up"

**database/migrations/2018_04_19_153941_create_images_exemplo_table.php**

```bash
    Schema::create('images_users', function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedInteger('user_id')->unsigned();
        $table->string('mime_type');
        $table->string('file_size', 10);
        $table->string('file_name')->comment("Nome do arquivo Higienizado");
        $table->string('file_original_name')->comment("O nome original do arquivo");
        $table->string('file_path')->comment("A URL real em que o arquivo está armazenado");
        $table->string('type')->comment("Onde o arquivo está armazenado. S3 / Local");
        $table->boolean('deleted')->default(1)->comment("Se o arquivo for excluido, estara status 0");

        $table->foreign('user_id')->references('id')->on('users');

        $table->timestamps();
    });
```

A variável de FOREIGN que foi criada deve ser renomeada de acordo com o que você precisa associar. Exemplo: "user_id", para você depois conseguir fazer a ligação que determinado usuário é o dono de determinada imagem. Essa tabela que você está criando irá guardar as informações da imagem, como ID do dono da imagem (user_id), formato do arquivo (mime_type), nome da imagem (file_name), a URL em que você adicionou o arquivo no S3 (file_path), onde o arquivo está armazenado(type)(isto serviria caso nós precisássemos trabalhar com mais de um banco de dados diferente do S3).

Dentro do arquivo do model você deve referenciar as variáveis que serão validas para que se possa trabalhar com elas nos formulários.

**App/Exemplo.php**

```bash
{
    protected $fillable = ['file_name', 'mime_type', 'file_size', 'file_original_name', 'file_path', 'status', 'type', 'user_id'];
}
```

Agora nos Controllers onde você pretende fazer uploud de imagem você deve inserir as seguintes linhas de código dentro da função do STORE.

**app/Http/Controllers/UsersController.php**

```bash
use Illuminate\Support\Facades\Storage;

//Altera o nome da imagem
$imageName =  $user->customer_id . '-' . time().'.'.$request->image->getClientOriginalExtension();

//Para guardar o nome correto da imagem
$nameImage = $imageName;

//variavel com as insformações da imagem
$image = $request->file('image');

//manda a imagem para o bucket no S3 - da um retorno TRUE
$t = Storage::disk('s3')->put($imageName, file_get_contents($image), 'public');

//grava a URL da Imagem no bucket S3
$imageName = Storage::disk('s3')->url($imageName);

$s3 = Storage::disk('s3');
$mimetype = $request->file('image')->getClientMimeType();
$fileSize = $request->file('image')->getClientSize();

//Faz o insert no banco de dados com as informações da imagem do usuarios
if ( $s3->put($imageName, file_get_contents($request->file('image'))) ) {
    $file = Images_EPS_AWS::create([
        'eps_aws_id' => $eps_aws->id,
        'file_name'  => $nameImage,
        'mime_type'  => $mimetype,
        'file_size'  => $fileSize,
        'file_path'  => $imageName,
        'type'       => 's3',

    ]);
    $fileImg = Images_EPS_AWS::find($file->id);
    $fileImg->status = 1;
    $fileImg->save();
}
```

Aqui na validação da REQUEST você deve passar a variável 'image' (pois ela terá este nome no FORM).

OBS: Repare que no campo onde tem a 'mimes' você está definindo quais os formatos de arquivo que o seu sistema estará enviado para o seu bucket no S3. E se o usuário mandar outro formato o sistema não permite mandar para o S3 e no formulário ele aparecerá como se todos os campos não fossem preenchidos (caso você use o swith alert 2).

```bash
//AQUI VOCE DEFINE OS FORMATOS POSSIVEIS DOS ARQUIVOS

$this->validate($request, [
    'image'         => 'required|image|mimes:jpeg,png,jpg,gif,svg,txt|max:2048',
    'name'          => 'required',
    'outros_campos' => 'required',
    ...
]);
```

**PRESTE MUITA ATENÇÃO NESTA PARTE**

Dentro do IF no lugar onde a variável "\$file" foi criada =>

```bash
 $fileImg = ImagesExemplo::find($file->id);
```

Você deve modificar o "ImagesExemplo" pelo nome da sua Model (ImagesUsers) que irá mandar os dados para o banco de dados. Por exemplo

```bash
$fileImg = ImagesUsers::find($file->id);
```

Por ultimo mas não menos importante, nos seus formularios onde você for requisitar a vinda das imagens utilizem o metodo POST e tenha a TAG do FORM da seguinte maneira:

```bash
{{ Form::open(array('route' => 'exemplo.store','method'=>'POST', 'files'=> true)) }}
```

A TAG " 'files' => true " dentro do "array" é o que faz o seu form enviar a imagem, então não esqueça de adicioná-lo no seu FORM do BLADE.

No blade de formulario você deve ter algo parecido com:

```bash
<div class="form-group">
  {{ Form::label('image', trans('labels.image')) }} (*):
  {{ Form::file('image') }}
</div>
```

Esse "Form::file" identifica o form para envio de arquivos com o padrão do BLADE. E 'image' é o nome pelo qual está se passando o id da variável.
