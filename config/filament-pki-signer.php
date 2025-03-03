<?php

return [
    'pages' => [
        'lacuna-pades-signer' => \Tupy\FilamentPkiSigner\Pages\LacunaPadesDocumentSigner::class,
    ],
    'restpki' => [
        'access_key' => env('RESTPKI_ACCESS_KEY'),
        'security_context' => env('RESTPKI_SECURITY_CONTEXT'),
    ],
];
