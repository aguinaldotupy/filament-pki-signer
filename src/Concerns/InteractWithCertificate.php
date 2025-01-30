<?php

namespace Tupy\FilamentPkiSigner\Concerns;

use Illuminate\Support\Carbon;

trait InteractWithCertificate
{
    public function getOptionLabelByCertificate(array $certificate): string
    {
        $label = $certificate['subjectName'] ?? null;

        $validityEnd = $certificate['validityEnd'] ?? null;

        $email = $certificate['email'] ?? null;

        if (! blank($email)) {
            $label .= ' <br />';

            $label .= __('filament-pki-signer::translations.email', ['email' => $email]);
        }

        if (! blank($validityEnd)) {
            $label .= ' <br />';
            $validityEnd = Carbon::parse($validityEnd)->format('d/m/Y H:i');

            $label .= __('filament-pki-signer::translations.validity_end', ['date' => $validityEnd]);
        }

        return $label;
    }

    public function generateSelectOptionsFromCertificates(string $statePath, $certificates): array
    {
        return collect($certificates)
            ->map(function ($certificate) {
                $validityEnd = $certificate['validityEnd'] ?? null;
                $disabled = false;

                if (blank($validityEnd) || Carbon::parse($validityEnd)->isPast()) {
                    $disabled = true;
                }

                return [
                    'label' => $this->getOptionLabelByCertificate($certificate),
                    'value' => $certificate['thumbprint'],
                    'disabled' => $disabled,
                ];
            })
            ->sortBy('disabled')
            ->values()
            ->all();
    }
}
