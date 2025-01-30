<?php

// config for Tupy/FilamentPkiSigner
return [
    'page' => \Tupy\FilamentPkiSigner\Pages\DocumentSigner::class,
    'restpki' => [
        'access_key' => env('RESTPKI_ACCESS_KEY'),
    ],
];
