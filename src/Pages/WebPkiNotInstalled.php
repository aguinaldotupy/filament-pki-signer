<?php

namespace Tupy\FilamentPkiSigner\Pages;

use Filament\Pages\Page;
use Illuminate\Contracts\Support\Htmlable;
use Livewire\Attributes\Url;
use Tupy\FilamentPkiSigner\Enum\Lacuna\InstallationStatesEnum;

class WebPkiNotInstalled extends Page
{
    protected static ?string $slug = 'web-pki-not-installed';

    protected static string $view = 'filament-pki-signer::pages.web-pki-not-installed';

    protected static bool $shouldRegisterNavigation = false;

    #[Url]
    public ?InstallationStatesEnum $status = null;

    #[Url]
    public ?string $message = null;

    #[Url]
    public ?array $params = [];

    public function getHeading(): string
    {
        return __('filament-pki-signer::translations.pages.web_pki_not_installed.heading');
    }

    public function getTitle(): string | Htmlable
    {
        return __('filament-pki-signer::translations.pages.web_pki_not_installed.title');
    }

    public function getRedirectUrl(): string
    {
        if (isset($this->params['installUrl'])) {
            $params = $this->params;
            unset($params['installUrl']);

            return $this->params['installUrl'] . ($this->params['brand'] ?? '') . '?' . http_build_query($params);
        }

        return "{$this->status->name} ahhamem";
    }
}
