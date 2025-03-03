<x-filament-panels::page>
    <x-filament::section>
        <div>
            <p class="mb-4">
                @lang('filament-pki-signer::translations.pages.web_pki_not_installed.help_to_install')
            </p>

            <p class="text-center">
                <x-filament::button
                    tag="a"
                    :href="$this->getRedirectUrl()"
                >
                    @lang('filament-pki-signer::translations.pages.web_pki_not_installed.redirect_to_installation')
                </x-filament::button>
            </p>
        </div>
    </x-filament::section>
</x-filament-panels::page>
