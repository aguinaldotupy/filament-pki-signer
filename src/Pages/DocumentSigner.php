<?php

namespace Tupy\FilamentPkiSigner\Pages;

use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Pages\Concerns\InteractsWithFormActions;
use Filament\Pages\Page;
use Illuminate\Contracts\Support\Htmlable;
use Livewire\Attributes\Url;
use Tupy\FilamentPkiSigner\Concerns\InteractsWithPAdES;
use Tupy\FilamentPkiSigner\Concerns\InteractWithCertificate;
use Tupy\FilamentPkiSigner\Forms\Components\PkiSignerSelect;

/**
 * @property Form $form
 */
class DocumentSigner extends Page
{
    use InteractsWithActions;
    use InteractsWithFormActions;
    use InteractsWithPAdES;
    use InteractWithCertificate;

    public ?array $data = [];

    #[Url]
    public string $fileId = '';

    protected static string $view = 'filament-pki-signer::pages.document-signer';

    public static function getNavigationGroup(): ?string
    {
        return 'Documents';
    }

    public static function getNavigationLabel(): string
    {
        return 'Signer';
    }

    public function getHeading(): string
    {
        return __('filament-pki-signer::translations.heading');
    }

    public function getTitle(): string | Htmlable
    {
        return __('filament-pki-signer::translations.title');
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make()
                    ->schema([
                        Placeholder::make('helper-file')
                            ->hiddenLabel()
                            ->content(__('filament-pki-signer::translations.helper_file'))
                            ->extraAttributes([
                                'class' => 'text-muted text-gray-500 text-lg',
                            ]),
                        FileUpload::make('file')
                            ->key('file')
                            ->translateLabel()
                            ->required()
                            ->moveFiles()
                            ->disk('public')
                            ->visible(fn () => blank($this->fileId)),
                        PkiSignerSelect::make('certificate')
                            ->translateLabel()
                            ->required(),
                    ]),
            ])
            ->statePath('data');
    }

    public function getSignAction(): Action
    {
        return Action::make('sign')
            ->label(__('Sign'))
            ->submit('submit');
    }

    public function getFormActions(): array
    {
        return [
            $this->getSignAction(),
        ];
    }

    public function submit(): void
    {
        $this->startPAdES();
    }
}
