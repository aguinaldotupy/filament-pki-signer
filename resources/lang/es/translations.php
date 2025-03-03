<?php

return [
    'title' => 'Firma PAdES',
    'heading' => 'Firma PAdES_',
    'validity_end' => 'Expira el: :date',
    'email' => 'Correo electrónico: :email',
    'helper_file' => 'Seleccione un archivo para firmar',
    'signer' => 'Firmante',
    'loading' => 'Cargando certificados...',
    'empty_content' => 'Contenido vacío',
    'empty_content_message' => 'El contenido a firmar está vacío.',
    'view_signed_file' => 'Ver archivo firmado',
    'restart' => 'Reiniciar',
    'pages' => [
        'web_pki_not_installed' => [
            'title' => 'Web PKI no instalado',
            'heading' => 'Web PKI no instalado',
            'subheading' => 'Para firmar el documento, es necesario instalar el componente Web PKI.',
            'redirect_to_installation' => 'Ir a la página de instalación',
            'help_to_install' => 'Para continuar con la firma digital del documento, es necesario instalar el plugin WebPKI. Dado que aún no está instalado en su dispositivo, haga clic en el enlace para acceder a la página con las instrucciones de descarga e instalación. Una vez instalado, podrá proseguir con el proceso de firma.',
        ],
    ],
];
