<?php

return [
    'title' => 'Assinatura PAdES',
    'heading' => 'Assinatura PAdES_',
    'validity_end' => 'Expira em: :date',
    'email' => 'E-mail: :email',
    'helper_file' => 'Selecione um arquivo para assinar',
    'signer' => 'Assinante',
    'loading' => 'Carregando certificados...',
    'empty_content' => 'Conteúdo vazio',
    'empty_content_message' => 'O conteúdo a ser assinado está vazio.',
    'view_signed_file' => 'Visualizar arquivo assinado',
    'restart' => 'Reiniciar',
    'pages' => [
        'web_pki_not_installed' => [
            'title' => 'Web PKI não instalado',
            'heading' => 'Web PKI não instalado',
            'subheading' => 'Para assinar o documento, é necessário instalar o componente Web PKI.',
            'redirect_to_installation' => 'Ir para a página de instalação',
            'help_to_install' => 'Para prosseguir com a assinatura digital do documento, é necessário instalar o plugin WebPKI. Como ele ainda não está instalado no seu dispositivo, clique no link para acessar a página com as instruções de download e instalação. Após instalar, você poderá continuar o processo de assinatura.',
        ],
    ],
];
