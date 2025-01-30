<?php

namespace Tupy\FilamentPkiSigner\Forms\Components;

use Closure;
use Filament\Forms\Components\Select;
use Tupy\FilamentPkiSigner\Concerns\InteractWithCertificate;

class PkiSignerSelect extends Select
{
    use Concerns\HasActions;
    use InteractWithCertificate;

    public string $_webPkiSignature = 'AgwAanNmaWRkbGUubmV0QwBpcDQ6MTAuMC4wLjAvOCxpcDQ6MTI3LjAuMC4wLzgsaXA0OjE3Mi4xNi4wLjAvMTIsaXA0OjE5Mi4xNjguMC4wLzE2AgBDQQgAAHjbrxhI3ggAASA0FRAh6BiLMpCqQTjEUe1ZKQQFqNtAszqDuKBJSYh2F1zev3WTM5cybPt85jzWuGdgId8mSGI6RptxuOXDvVyaHX2iQs/slMAFz29VHT+KZD+wrvx4CURv3svwTRQOKw4EIL2WE2oRdTvATIrY8lilrAUkzJ4r3n6S9gLzSkp3A1kMI+lPg4zYZPtoJbgVx8qUb2V8gRJZIcEdMEeR+q0algZl10W2HfKkGWKy6yuTOlRdP1b2Yg549YR/eO4sCRBuWWIemc15yckEUJAdk2X40Hu6QrYzejWAoEDYjjKvVNVzwuHnH8btBQiPYo3buBhtOj0y9vS+Dc5q7N6ECT8=';

    public array $_certificates = [];

    public bool $_debug = true;

    public ?Closure $_optionLabelByCertificateUsing = null;

    public Closure | string | null $_token = null;

    protected string $view = 'filament-pki-signer::pki-signer-select';

    protected function setUp(): void
    {
        parent::setUp();

        $this->native(false);

        $this->searchable(true);

        $this->allowHtml(true);
    }

    public function webPkiSignature(Closure | string $webPkiSignature): static
    {
        $this->_webPkiSignature = $webPkiSignature;

        return $this;
    }

    public function getWebPkiSignature(): string
    {
        return (string) $this->evaluate($this->_webPkiSignature);
    }

    public function debug(Closure | bool $debug): static
    {
        $this->_debug = $debug;

        return $this;
    }

    public function getDebug(): bool
    {
        return (bool) $this->evaluate($this->_debug);
    }

    public function getOptionLabelByCertificateUsing(?Closure $closure): static
    {
        $this->_optionLabelByCertificateUsing = $closure;

        return $this;
    }

    public function getOptionLabelByCertificate($certificate)
    {
        if ($this->_optionLabelByCertificateUsing instanceof Closure) {
            return $this->evaluate($this->_optionLabelByCertificateUsing, [
                'certificate' => $certificate,
            ]);
        }

        dd($certificate);

        return $certificate->subjectName;
    }

    public function token(Closure | string $token): static
    {
        $this->_token = $token;

        return $this;
    }

    public function getToken()
    {
        return $this->evaluate($this->_token);
    }
}
