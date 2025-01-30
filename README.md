# Enhance your FilamentPHP applications by integrating Lacuna’s Web PKI, enabling robust digital certificate authentication and document signing capabilities.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/tupy/filament-pki-signer.svg?style=flat-square)](https://packagist.org/packages/tupy/filament-pki-signer)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/tupy/filament-pki-signer/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/tupy/filament-pki-signer/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/tupy/filament-pki-signer/fix-php-code-styling.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/tupy/filament-pki-signer/actions?query=workflow%3A"Fix+PHP+code+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/tupy/filament-pki-signer.svg?style=flat-square)](https://packagist.org/packages/tupy/filament-pki-signer)



This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

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
];
```

## Usage

```php
$filamentPkiSigner = new Tupy\FilamentPkiSigner();
echo $filamentPkiSigner->echoPhrase('Hello, Tupy!');
```

## Testing

```bash
composer test
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
