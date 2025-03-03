# Enhance your FilamentPHP applications by integrating Lacuna’s Web PKI, enabling robust digital certificate authentication and document signing capabilities.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/aguinaldotupy/filament-pki-signer.svg?style=flat-square)](https://packagist.org/packages/aguinaldotupy/filament-pki-signer)
[![Total Downloads](https://img.shields.io/packagist/dt/aguinaldotupy/filament-pki-signer.svg?style=flat-square)](https://packagist.org/packages/aguinaldotupy/filament-pki-signer)



This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Requirements

- PHP 8.1 or higher
- [Lacuna Rest PKI token](https://pki.rest/)

## Installation

You can install the package via composer:

```bash
composer require tupy/filament-pki-signer
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --tag="filament-pki-signer-migrations"
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="filament-pki-signer-config"
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="filament-pki-signer-views"
```

This is the contents of the published config file:

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

## Usage

Generate token in site pki.rest

1. Create account in [Lacuna Rest PKI](https://pki.rest/)
2. Generate token
<p align="center">
    <a href="https://pki.rest/App/#/dashboard" target="_blank">
        <img src="https://raw.githubusercontent.com/aguinaldotupy/filament-pki-signer/main/art/generate-token.png" alt="Generate token" style="width: 100%; max-width: 800px;" />
    </a>
</p>
3. Add token in .env file
```dotenv
RESTPKI_ACCESS_KEY=your-token
```

### Register plugin in your panel

```php
use Tupy\FilamentPkiSigner\FilamentPkiSignerPlugin;

$panel->plugin(
    FilamentPkiSignerPlugin::make()
);

```

### Use in pages

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

### Use select certificate in forms

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

### Available methods in plugin

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

### Customize default page

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

Register page in config

```php
'pages' => [
    'lacuna-pades-signer' => \App\Filament\Pages\DocumentSigner::class,
],
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Aguinaldo Tupy](https://github.com/aguinaldotupy)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

