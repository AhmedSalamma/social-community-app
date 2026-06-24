<?php

return [

    'paths' => [
    'api/*',
    'sanctum/csrf-cookie',
    'broadcasting/auth',
],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://social-community-ydqsnuy0y-ahmedsalammas-projects.vercel.app',
         'https://social-community-app.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];