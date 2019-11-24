# Laravel Relationship

## Contexto

Quando o Laravel utiliza de banco de dados relacionais ele pode usar o Relationships do proprio framework para fazer os relacionamentos entre as tabelas para facilitar no desenvolvimento.

## Um pra um

Ex: Um usuario possui um telefone

**App/User**

```php
class User extends Model
{
    public function phone()
    {
        return \$this->hasOne('App\Phone');
    }
}
```

## Relacionamento inverso

**App/Phone**

```php
class Phone extends Model
{
    public function user()
    {
        return \$this->belongsTo('App\User');
    }
}
```

## Um pra muitos

Um relacionamento um-para-muitos é usado para definir relacionamentos em que um único modelo possui qualquer quantidade de outros modelos.

Por exemplo, uma postagem de blog pode ter um número infinito de comentários.

```php
class Post extends Model
{
    public function comments()
    {
        return \$this->hasMany('App\Comment');
    }
}
```

## Relacionamento inverso

**App/Comments**

```php
class Comment extends Model
{
    public function post()
    {
        return \$this->belongsTo('App\Post');
    }
}
```

## Muitos pra Muitos

Muitos-para-muitos relações são um pouco mais complicado do que **hasOne** e **hasMany** relacionamentos. Um exemplo de tal relacionamento é um usuário com várias funções, em que as funções também são compartilhadas por outros usuários. Por exemplo, muitos usuários podem ter o papel de "Admin". Para definir essa relação, são necessários três tabelas de banco de dados: **users**, **roles**, e **role_user**. A **role_user** tabela é derivada da ordem alfabética dos nomes de modelos relacionados e contém as colunas **user_id** e **role_id**.

Muitos-para-muitos relacionamentos são definidos escrevendo um método que retorna o resultado do **belongsToMany** método. Por exemplo, vamos definir o **roles** método em nosso model **User**:

**App/User**

```php
class User extends Model
{
    public function roles()
    {
        return \$this->belongsToMany('App\Role');
    }
}
```

## Relacionamento inverso

**App/Role**

```php
class Role extends Model
{
    public function users()
    {
        return \$this->belongsToMany('App\User');
    }
}
```

## Recuperando Colunas da Tabela Intermediária

Como você já aprendeu, trabalhar com relações muitos-para-muitos requer a presença de uma tabela intermediária. Eloquent fornece algumas maneiras muito úteis de interagir com esta tabela. Por exemplo, vamos supor que nosso **User** objeto tenha muitos **Role** objetos com os quais ele está relacionado. Depois de acessar esse relacionamento, podemos acessar a tabela intermediária usando o **pivot** atributo nos modelos:

```php
$user = App\User::find(1);

foreach ($user->roles as $role) {
    echo \$role->pivot->created_at;
}
```

## Customizando o pivot Nome do Atributo

Como observado anteriormente, os atributos da tabela intermediária podem ser acessados ​​nos modelos usando o **pivot** atributo. No entanto, você está livre para personalizar o nome desse atributo para refletir melhor sua finalidade em seu aplicativo.

Por exemplo, se seu aplicativo contiver usuários que podem se inscrever em podcasts, você provavelmente terá um relacionamento muitos-para-muitos entre usuários e podcasts. Se este for o caso, você pode querer renomear seu acessador de tabelas intermediárias em **subscription** vez de **pivot**. Isso pode ser feito usando o **"as"** método ao definir o relacionamento:

```php
return \$this->belongsToMany('App\Podcast')
    ->as('subscription')
    ->withTimestamps();
```

Feito isso, você pode acessar os dados da tabela intermediária usando o nome personalizado:

```php
$users = User::with('podcasts')->get();

foreach ($users->flatMap->podcasts as $podcast) {
    echo $podcast->subscription->created_at;
}
```

## Filtrando Relacionamentos Através de Colunas da Tabela Intermediária

Você também pode filtrar os resultados retornados **belongsToMany** usando os métodos **wherePivot** e **wherePivotIn** ao definir o relacionamento:
