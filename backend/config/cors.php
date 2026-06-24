<?php

return [

    'paths' => [
    'api/*',
    'sanctum/csrf-cookie',
    'broadcasting/auth',
],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://social-community-app.vercel.app',
        'https://social-community-qoi9l4niv-ahmedsalammas-projects.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [
        '/\.vercel\.app$/',
    ],
    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];