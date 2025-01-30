<?php

namespace Tupy\FilamentPkiSigner\Forms\Components\Actions;

use Filament\Forms\Components\Actions\Action;

class ReadCertificateAction extends Action
{
    public static function getDefaultName(): ?string
    {
        return 'read-certificate';
    }

    protected function setUp(): void
    {
        parent::setUp();
    }
}
