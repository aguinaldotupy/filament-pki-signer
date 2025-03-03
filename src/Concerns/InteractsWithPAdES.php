<?php

namespace Tupy\FilamentPkiSigner\Concerns;

use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Lacuna\RestPki\PadesMeasurementUnits;
use Lacuna\RestPki\PadesSignatureFinisher2;
use Lacuna\RestPki\PadesSignatureStarter;
use Lacuna\RestPki\RestPkiClient;
use Lacuna\RestPki\SignatureResult;
use Lacuna\RestPki\StandardSignaturePolicies;
use Livewire\Attributes\On;
use Tupy\FilamentPkiSigner\FilamentPkiSignerPlugin;

trait InteractsWithPAdES
{
    public ?string $token = null;

    public ?string $pathStoredSignedFile = null;

    public ?string $fileName = null;

    protected bool $loading = false;

    public mixed $signerCert = null;

    public function initializePAdES(string $content): void
    {
        $plugin = FilamentPkiSignerPlugin::get();

        $restPkiClient = new RestPkiClient(
            endpointUrl: $plugin->getEndpoint(),
            accessToken: $plugin->getAccessKey()
        );

        $signatureStarter = new PadesSignatureStarter($restPkiClient);
        $signatureStarter->setPdfToSignFromContentRaw($content);
        $signatureStarter->signaturePolicy = StandardSignaturePolicies::PADES_BASIC;
        $signatureStarter->securityContext = $plugin->getSecurityContext();
        $signatureStarter->measurementUnits = PadesMeasurementUnits::CENTIMETERS;
        $signatureStarter->visualRepresentation = $this->getVisualRepresentation($restPkiClient, $plugin);

        $this->token = $signatureStarter->startWithWebPki();
    }

    #[On('signedPAdES')]
    public function signedPAdES($token): void
    {
        $plugin = FilamentPkiSignerPlugin::get();

        $restPkiClient = new RestPkiClient(
            endpointUrl: $plugin->getEndpoint(),
            accessToken: $plugin->getAccessKey()
        );

        $signatureFinisher = new PadesSignatureFinisher2($restPkiClient);
        $signatureFinisher->token = $token;

        $this->processResult($signatureFinisher->finish(), $plugin);
    }

    public function startPAdES(): void
    {
        $this->loading = true;

        $content = $this->getContentToBeSigned();

        if (blank($content)) {
            Notification::make()
                ->title(__('filament-pki-signer::translations.empty_content'))
                ->body(__('filament-pki-signer::translations.empty_content_message'))
                ->danger()
                ->send();

            $this->loading = false;

            return;
        }

        //@phpstan-ignore-next-line
        $this->callHook('beforeInitializePAdES');

        $this->initializePAdES($this->getContentToBeSigned());

        //@phpstan-ignore-next-line
        $this->callHook('afterInitializePAdES');
    }

    /**
     * Get the content to be signed by the PAdES.
     */
    public function getContentToBeSigned(): string
    {
        //@phpstan-ignore-next-line
        $data = $this->form->getState();

        if (isset($data['file'])) {
            return Storage::disk(config('filament.default_filesystem_disk'))->get($data['file']);
        }

        throw new \RuntimeException(__('filament-pki-signer::translations.empty_content_message'));
    }

    /**
     * Hook before initialize PAdES.
     */
    public function afterInitializePAdES(): void
    {
        // This event starts the signature process
        //@phpstan-ignore-next-line
        $this->dispatch('signPAdES', token: $this->token);
    }

    public function processResult(SignatureResult $signatureResult, FilamentPkiSignerPlugin $plugin): void
    {
        $this->signerCert = $signatureResult->certificate;

        $path = rtrim($plugin->getTmpPath(), '/');

        $this->fileName = $this->generateFileName();

        $this->pathStoredSignedFile = $path . '/' . $this->fileName;

        $signatureResult->writeToFile($this->pathStoredSignedFile);

        //@phpstan-ignore-next-line
        $this->callHook('afterStoredSignedFile');
    }

    public function generateFileName(): string
    {
        return Str::uuid()->toString() . '.pdf';
    }

    public function afterStoredSignedFile(): void
    {
        if (empty($this->pathStoredSignedFile)) {
            Notification::make()
                ->title(__('filament-pki-signer::translations.empty_content'))
                ->body(__('filament-pki-signer::translations.empty_content_message'))
                ->danger()
                ->send();

            $this->loading = false;

            return;
        }

        $this->loading = false;

        // This event is triggered after the signed file is stored
        $this->redirect($this->getSignedFileUrl());
    }

    public function getSignedFileUrl(): string
    {
        return Storage::disk(config('filament.default_filesystem_disk'))->url($this->fileName);
    }

    public function getDownloadUrl()
    {
        return Storage::disk(config('filament.default_filesystem_disk'))->url($this->fileName);
    }

    public function getDownloadAction(): Action
    {
        return Action::make('download')
            ->label(__('filament-pki-signer::translations.view_signed_file'))
            ->url($this->getDownloadUrl())
            ->openUrlInNewTab();
    }

    public function getRestartAction(): Action
    {
        return Action::make('restart')
            ->label(__('filament-pki-signer::translations.restart'))
            ->action(function () {
                $this->fileName = null;
                $this->signerCert = null;
                dd('he');
            });
    }

    public function getVisualRepresentation(RestPkiClient $restPkiClient, FilamentPkiSignerPlugin $plugin): array
    {
        return [
            'text' => $plugin->getTextConfig(),
            'image' => $plugin->getImageConfig(),
            'position' => $plugin->getPosition($restPkiClient),
        ];
    }
}
