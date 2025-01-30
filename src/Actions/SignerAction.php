<?php

namespace Tupy\FilamentPkiSigner\Actions;

use Filament\Actions\Action;
use Filament\Actions\StaticAction;
use Tupy\FilamentPkiSigner\Concerns\InteractsWithPAdES;
use Tupy\FilamentPkiSigner\Forms\Components\PkiSignerSelect;

class SignerAction extends Action
{
    use InteractsWithPAdES;

    protected function setUp(): void
    {
        parent::setUp();

        $this->name('signer');

        $this->label(__('filament-pki-signer::translations.signer'));

        $this->form([
            PkiSignerSelect::make('certificate')
                ->disabled(fn () => $this->loading),
        ]);

        $this->modalFooterActions([
            StaticAction::make('signer')
                ->button()
                ->close(false)
                ->label(__('Sign'))
                ->extraAttributes([
                    'wire:loading.attr' => 'disabled',
                    'wire:target' => 'actions.signer',
                    'wire:click' => 'startPAdES',
                ])
                ->hidden(fn () => $this->loading),
        ]);
    }
}
