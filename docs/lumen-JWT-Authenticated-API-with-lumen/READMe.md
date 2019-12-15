# JWT Authenticated API with Lumen

## Pré requisitos

Tenha o projeto lumen instalado dentro do Laradock.

E já funcionando no localhost. (como na imagem abaixo)

<img src="/images/lumenapilocalhost.png" />

## Instalação

Crie um arquivo .env, copie todo o conteúdo em .env.example no arquivo .env e adicione suas configurações de banco de dados.

Em **boostrap/app.php** descomentar as fachadas e o método eloquente.

```php
//before

// $app->withFacades();

// $app->withEloquent();

//after

$app->withFacades();

$app->withEloquent();
```

## Criação da tabela de usuários

Crie a migration do bando de dados com o seguinte comando:

```bash
$ php artisan make:migration create_users_table --create=users
```

Localize o arquivo de migração **database/migrations/\*\_create_users_table.php** e adicione colunas da tabela de necessidade (nome, email, senha); veja o código abaixo:

```php
...
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique()->notNullable();
            $table->string('password');
            $table->timestamps();
        });
    }
...
```

Execute a migração do banco de dados.

```bash
$ php artisan migrate
```

Adicionar rota de registro que, como o nome indica; registrar usuários. Localize **routes/web.php** e insira o código necessário, como visto abaixo:

```php
// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
   // Matches "/api/register
   $router->post('register', 'AuthController@register');

});
```

Como vamos usar o prefixo em todos os pontos de extremidade, para não causar repetição de cṍdigo, usaremos o agrupamento de rotas para fazer exatamente isso.

Este método (**$router->post($uri, \$callback**); recebe um parâmetro $ url e $ callback. No campo **\$callback**, **AuthController** é a classe do Controller (criaremos essa classe daqui a pouco) e **register** é um método nessa classe.

Vamos criar nosso AuthControler.

Crie um arquivo **app/Http/Controllers/AuthController.php** e preencha-o com o código conforme mostrado abaixo.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\User;

class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function register(Request $request)
    {
        //validate incoming request
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        try {

            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);

            $user->save();

            //return successful response
            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!'], 409);
        }

    }

}
```

Registre um usuário (use POSTMAN) com a rota **localhost:8000/api/register** e você deverá obter uma resposta bem-sucedida como esta:

<img src="/images/lumen-api-exemplo-1-postman.png" />

## Instalação do pacote de autenticação JWT

```bash
$ composer require tymon/jwt-auth
```

Agora adicione o seguinte snippet ao **bootstrap/app.php** arquivo na seção provedores da seguinte maneira:

```php
// Descomente está linha
$app->register(App\Providers\AuthServiceProvider::class);

// Adicione está linha
$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);
```

Em seguida, descomente o authmiddleware no mesmo arquivo:

```php
$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
]);
```

Fazendo isso é incluido um comando auxiliar para gerar uma chave.

```bash
php artisan jwt:secret
```

Crie um arquivo **config/auth.php** com a configuração abaixo:

```php
//config.auth.php

<?php

return [
    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],

    'guards' => [
        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => \App\User::class
        ]
    ]
];

```

Faça algumas alterações no seu **User** model (**app/User.php**) para atender aos **requisitos do tymon / jwt-auth**. Fique de olho em tudo o que inclui "JWT".

```php
<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;


use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];




    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}

```

Adicionar rota de login em **routes/web.php**:

```php
// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
     // Matches "/api/register
    $router->post('register', 'AuthController@register');

      // Matches "/api/login
     $router->post('login', 'AuthController@login');
});
```

Adicione um método global **respondWithToken** à classe Controller em **app/Http/Controllers/Controller.php**. Isso é para que possamos acessá-lo de qualquer outro controlador.

```php
    ...
    //import auth facades
    use Illuminate\Support\Facades\Auth;


    //Add this method to the Controller class
    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], 200);
    }
```

Adicione um método de login à sua classe **AuthController** em **app/Http/Controllers/AuthController.php**.

```php
 ...

   //import auth facades
   use Illuminate\Support\Facades\Auth;

   ...

     /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {
          //validate incoming request
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
```

Faça login em um usuário que você cadastrou na rota **localhost:8000/api/login** e você deverá obter uma resposta bem-sucedida, como:

<img src="/images/lumen-api-exemplo-2-postman.png" />

## Rotas autenticadas

Para a nossa grande final, vamos fazer algumas rotas autenticadas.

Adicione algumas rotas para **routes/web.php**

```php
...
// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
    // Matches "/api/register
   $router->post('register', 'AuthController@register');
     // Matches "/api/login
    $router->post('login', 'AuthController@login');

    // Matches "/api/profile
    $router->get('profile', 'UserController@profile');

    // Matches "/api/users/1
    //get one user by id
    $router->get('users/{id}', 'UserController@singleUser');

    // Matches "/api/users
    $router->get('users', 'UserController@allUsers');
});

...
```

Crie um arquivo **app/Http/Controllers/UserController.php** e preencha-o com este código de aparência elegante.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use  App\User;

class UserController extends Controller
{
     /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get the authenticated User.
     *
     * @return Response
     */
    public function profile()
    {
        return response()->json(['user' => Auth::user()], 200);
    }

    /**
     * Get all User.
     *
     * @return Response
     */
    public function allUsers()
    {
         return response()->json(['users' =>  User::all()], 200);
    }

    /**
     * Get one user.
     *
     * @return Response
     */
    public function singleUser($id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json(['user' => $user], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'user not found!'], 404);
        }

    }

}
```

Abaixo está um exemplo de chamada para um dos três pontos de extremidade adicionados recentemente

<img src="/images/lumen-api-exemplo-3-postman.png" />
O fim-ish!

Espero que este artigo tenha ajudado você de alguma forma e que você desenvolva esse conhecimento para implantar APIs impressionantes em um futuro próximo.

Até mais. :)

## Referência
