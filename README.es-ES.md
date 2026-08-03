

# Mejore sus aplicaciones de FilamentPHP integrando Lacuna's Web PKI, lo que permite una autenticación robusta de certificados digitales y capacidades de firma de documentos.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/aguinaldotupy/filament-pki-signer.svg?style=flat-square)](https://packagist.org/packages/aguinaldotupy/filament-pki-signer)
[![Total Downloads](https://img.shields.io/packagist/dt/aguinaldotupy/filament-pki-signer.svg?style=flat-square)](https://packagist.org/packages/aguinaldotupy/filament-pki-signer)

Filament PKI Signer es un potente plugin que integra de manera transparente capacidades de firma digital en sus aplicaciones de FilamentPHP utilizando la infraestructura Web PKI de Lacuna. Este paquete le permite implementar firmas digitales PAdES (Firmas Electrónicas Avanzadas para PDF), permitiendo a los usuarios firmar documentos PDF directamente a través de su interfaz web utilizando sus certificados digitales.

Las características principales incluyen:
- Integración sencilla con el generador de formularios y páginas de FilamentPHP
- Soporte para firmas PAdES con representación visual personalizable
- Interfaz de selección de certificados con soporte para múltiples idiomas (EN, PT-BR, ES)
- Detección automática y guía de instalación para el componente Web PKI
- Opciones de configuración flexibles para la posición de la firma, elementos visuales y contextos de seguridad

Ideal para aplicaciones que requieren firma de documentos segura, como documentos legales, contratos o cualquier flujo de trabajo que necesite capacidades de autenticación confiable y no repudio.

## Requisitos

- PHP 8.1 o superior
- [Token de Lacuna Rest PKI](https://pki.rest/)

## Instalación

Puede instalar el paquete mediante Composer:

```bash
composer require tupy/filament-pki-signer
```

Puede publicar y ejecutar las migraciones con:

```bash
php artisan vendor:publish --tag="filament-pki-signer-migrations"
php artisan migrate
```

Puede publicar el archivo de configuración con:

```bash
php artisan vendor:publish --tag="filament-pki-signer-config"
```

Opcionalmente, puede publicar las vistas utilizando

```bash
php artisan vendor:publish --tag="filament-pki-signer-views"
```

Este es el contenido del archivo de configuración publicado:

```php
return [
    'pages' => [
        'lacuna-pades-signer' => \Tupy\FilamentPkiSigner\Pages\LacunaPadesDocumentSigner::class,
    ],
    'restpki' => [
        'access_key' => env('RESTPKI_ACCESS_KEY'),
    ],
];

```

## Uso

Genere el token en el sitio pki.rest

1. Cree una cuenta en [Lacuna Rest PKI](https://pki.rest/)
2. Genere el token
<p align="center">
    <a href="https://pki.rest/App/#/dashboard" target="_blank">
        <img src="https://raw.githubusercontent.com/aguinaldotupy/filament-pki-signer/main/art/generate-token.png" alt="Generate token" style="width: 100%; max-width: 800px;" />
    </a>
</p>
3. Agregue el token en el archivo .env
```dotenv
RESTPKI_ACCESS_KEY=your-token
```

### Registrar el plugin en su panel

```php
use Tupy\FilamentPkiSigner\FilamentPkiSignerPlugin;

$panel->plugin(
    FilamentPkiSignerPlugin::make()
);

```

### Uso en páginas

```php
use Tupy\FilamentPkiSigner\Actions\SignerAction;

class MyClass extends \Filament\Resources\Pages\ViewRecord
{
    use \Tupy\FilamentPkiSigner\Concerns\InteractsWithDigitalSignature;
    
    protected function getActions(): array
    {
        return [
            SignerAction::make(),
        ];
    }
    
    public function getContentToBeSigned(): string
    {
        // Return the content to be signed
        return $this->record->getPDF()->output();
    }
    
    public function afterStoredSignedFile(): void
    {
        //...process my signed file here...
        
        $myStoredFile = '...';

        $this->redirect($myStoredFile);
    }
}
```
<p align="center">
    <img src="https://raw.githubusercontent.com/aguinaldotupy/filament-pki-signer/main/art/signer.png" alt="Signer" style="width: 100%; max-width: 800px;" />
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/aguinaldotupy/filament-pki-signer/main/art/confirm-signature.png" alt="Confirm signature" style="width: 100%; max-width: 800px;" />
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/aguinaldotupy/filament-pki-signer/main/art/signed.png" alt="Signed" style="width: 100%; max-width: 800px;" />
</p>

### Usar selección de certificado en formularios

```php
use Tupy\FilamentPkiSigner\Forms\Components\LacunaCertificateSelect;

class MyResource extends \Filament\Resources\Resource
{
    use \Tupy\FilamentPkiSigner\Concerns\InteractsWithDigitalSignature;
    
    public function form(Form $form)
    {
        $form->schema([
            LacunaCertificateSelect::make('certificate')
                ->label('Select a certificate')
                ->required()
        ]);
    }
}
```

### Métodos disponibles en el plugin

```php
use Lacuna\RestPki\StandardSecurityContexts;
use Tupy\FilamentPkiSigner\FilamentPkiSignerPlugin;

$panel->plugin(
    FilamentPkiSignerPlugin::make()
        ->accessKey(fn () => tenant()->pkiAccessToken)
        ->endpoint('https://pki.rest')
        ->securityContext(StandardSecurityContexts::LACUNA_TEST)
        ->pdfStampPath(public_path('PdfStamp.png'))
        ->tmpPath(storage_path('app/public'))
        ->imageConfig([...])
        ->textConfig([...])
        ->position([...])
);
```

### Personalizar página predeterminada

```php
namespace App\Filament\Pages;

class DocumentSigner extends \Tupy\FilamentPkiSigner\Pages\LacunaPadesDocumentSigner
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    #[Url]
    public string $fileId = '';

    public function getContentToSign(): string
    {
        if ($this->fileId) {
            return Order::findOrFail($this->fileId)->getPDF()->output();
        }

        $data = $this->form->getState();

        $file = $data['file'];

        return Storage::disk('public')->get($file);
    }
}
```

Registrar la página en la configuración

```php
'pages' => [
    'lacuna-pades-signer' => \App\Filament\Pages\DocumentSigner::class,
],
```

## Registro de cambios

Para más información sobre los cambios recientes, consulte [CHANGELOG](CHANGELOG.md).

## Contribuir

Para más detalles, consulte [CONTRIBUTING](.github/CONTRIBUTING.md).

## Vulnerabilidades de seguridad

Revise [nuestra política de seguridad](../../security/policy) sobre cómo reportar vulnerabilidades de seguridad.

## Créditos

- [Aguinaldo Tupy](https://github.com/aguinaldotupy)
- [All Contributors](../../contributors)

## Licencia

Licencia MIT. Para más información, consulte el [Archivo de Licencia](LICENSE.md).
