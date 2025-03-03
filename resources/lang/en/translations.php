<?php

return [
    'title' => 'PAdES Signature',
    'heading' => 'PAdES Signature_',
    'validity_end' => 'Expires at: :date',
    'email' => 'Email: :email',
    'helper_file' => 'Select a file to sign',
    'signer' => 'Signer',
    'loading' => 'Loading certificates...',
    'empty_content' => 'Empty content',
    'empty_content_message' => 'The content to be signed is empty.',
    'view_signed_file' => 'View signed file',
    'restart' => 'Restart',
    'pages' => [
        'web_pki_not_installed' => [
            'title' => 'Web PKI not installed',
            'heading' => 'Web PKI not installed',
            'subheading' => 'To sign the document, you need to install the Web PKI component.',
            'redirect_to_installation' => 'Go to installation page',
            'help_to_install' => 'Para prosseguir com a assinatura digital do documento, é necessário instalar o plugin WebPKI. Como ele ainda não está instalado no seu dispositivo, clique no link para acessar a página com as instruções de download e instalação. Após instalar, você poderá continuar o processo de assinatura.',
        ],
    ],
];
