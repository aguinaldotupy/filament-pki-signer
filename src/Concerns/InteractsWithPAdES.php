<?php

namespace Tupy\FilamentPkiSigner\Concerns;

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
        $signatureStarter->visualRepresentation = $plugin->getVisualRepresentation($restPkiClient);

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

        $content = $this->getContentToSign();

        if (blank($content)) {
            Notification::make()
                ->title(__('Empty content'))
                ->body(__('The content to be signed is empty.'))
                ->danger()
                ->send();

            $this->loading = false;

            return;
        }

        $this->callHook('beforeInitializePAdES');

        $this->initializePAdES($this->getContentToSign());

        $this->callHook('afterInitializePAdES');
    }

    /**
     * Get the content to be signed by the PAdES.
     */
    public function getContentToSign(): string
    {
        return '';
    }

    /**
     * Hook before initialize PAdES.
     */
    public function afterInitializePAdES(): void
    {
        //This event starts the signature process
        $this->dispatch('signPAdES', token: $this->token);
    }

    public function processResult(SignatureResult $signatureResult, FilamentPkiSignerPlugin $plugin): void
    {
        $this->signerCert = $signatureResult->certificate;

        $path = rtrim($plugin->getTmpPath(), '/');

        $this->fileName = $this->generateFileName();

        $this->pathStoredSignedFile = $path . '/' . $this->fileName;

        $signatureResult->writeToFile($this->pathStoredSignedFile);

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
                ->title('Empty path')
                ->body('The path to the signed file is empty.')
                ->danger()
                ->send();

            $this->loading = false;

            return;
        }

        $this->loading = false;

        // This event is triggered after the signed file is stored
        //$this->redirect($this->getDownloadUrl());
    }

    public function getDownloadUrl()
    {
        return Storage::disk(config('filament.default_filesystem_disk'))->url($this->fileName);
    }
}
