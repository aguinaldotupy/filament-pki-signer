<?php

namespace Tupy\FilamentPkiSigner;

use Filament\Contracts\Plugin;
use Filament\Panel;
use Filament\Support\Concerns\EvaluatesClosures;
use Lacuna\RestPki\PadesVisualPositioningPresets;
use Lacuna\RestPki\RestPkiClient;
use Lacuna\RestPki\StandardSecurityContexts;
use Tupy\FilamentPkiSigner\Pages\DocumentSigner;

class FilamentPkiSignerPlugin implements Plugin
{
    use EvaluatesClosures;

    protected \Closure | null | string $_accessKey = null;

    protected \Closure | null | string $_endpoint = 'https://pki.rest/';

    protected \Closure | null | string $_securityContext = StandardSecurityContexts::LACUNA_TEST;

    protected \Closure | null | string $_pdfStampPath = null;

    protected \Closure | null | string $_tmpPath = null;

    public function getId(): string
    {
        return 'filament-pki-signer';
    }

    public function register(Panel $panel): void
    {
        $panel->pages([
            config('filament-pki-signer.page') ?? DocumentSigner::class,
        ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }

    public function accessKey(string $accessKey): static
    {
        $this->_accessKey = $accessKey;

        return $this;
    }

    public function getAccessKey(): string
    {
        return $this->evaluate($this->_accessKey) ?? config('filament-pki-signer.restpki.access_key');
    }

    public function endpoint(string | \Closure $endpoint): static
    {
        $this->_endpoint = $endpoint;

        return $this;
    }

    public function getEndpoint(): ?string
    {
        return $this->evaluate($this->_endpoint);
    }

    public function securityContext(string | \Closure $securityContext): static
    {
        $this->_securityContext = $securityContext;

        return $this;
    }

    public function getSecurityContext(): string
    {
        return $this->evaluate($this->_securityContext);
    }

    public function pdfStampPath(string | \Closure $pdfStampPath): static
    {
        $this->_pdfStampPath = $pdfStampPath;

        return $this;
    }

    public function getPdfStampContents(): string
    {
        return file_get_contents($this->evaluate($this->_pdfStampPath) ?? public_path('PdfStamp.png'));
    }

    public function getVisualRepresentation(RestPkiClient $restPkiClient): array
    {
        $position = PadesVisualPositioningPresets::getFootnote($restPkiClient);

        // It's possible to customize the position presets. For this sample, we will customize the
        // representation container's size to fit the background image.
        $position->auto->container->height = 4.94;
        $position->auto->signatureRectangleSize->width = 8.0;
        $position->auto->signatureRectangleSize->height = 4.94;

        return [
            'text' => [
                // For a full list of the supported tags, see:
                // https://docs.lacunasoftware.com/articles/rest-pki/pades-tags.html
                'text' => 'Signed by {{signerName}} ({{signerEmail}})',
                'fontSize' => 13.0,
                // Specify that the signing time should also be rendered.
                'includeSigningTime' => true,
                // Optionally set the horizontal alignment of the text ('Left' or 'Right'), if not
                // set the default is Left.
                'horizontalAlign' => 'Left',
                // Optionally set the container within the signature rectangle on which to place
                // the text. By default, the text can occupy the entire rectangle (how much of the
                // rectangle the text will actually fill depends on the length and font size).
                // Below, we specify that the text should respect a right margin of 1.5 cm.
                'container' => [
                    'left' => 0.2,
                    'top' => 0.2,
                    'right' => 0.2,
                    'bottom' => 0.2,
                ],
            ],
            'image' => [
                // We'll use as background the image resources/PdfStamp.png.
                'resource' => [
                    'content' => base64_encode($this->getPdfStampContents()),
                    'mimeType' => 'image/png',
                ],
                // Align the image to the right.
                'horizontalAlign' => 'Right',
                // Align the image to the center.
                'verticalAlign' => 'Center',
            ],
            // Position of the visual representation. We get the footnote position preset.
            'position' => $position,
        ];
    }

    public function tmpPath(string | \Closure $tmpPath): static
    {
        $this->_tmpPath = $tmpPath;

        return $this;
    }

    public function getTmpPath()
    {
        $tmpPath = $this->evaluate($this->_tmpPath);

        if ($tmpPath) {
            return $tmpPath;
        }

        return storage_path('app/public');
    }
}
