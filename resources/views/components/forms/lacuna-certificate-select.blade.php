@php
    use Filament\Support\Facades\FilamentView;

    $canSelectPlaceholder = $canSelectPlaceholder();
    $isDisabled = $isDisabled();
    $isPrefixInline = $isPrefixInline();
    $isSuffixInline = $isSuffixInline();
    $prefixActions = $getPrefixActions();
    $prefixIcon = $getPrefixIcon();
    $prefixLabel = $getPrefixLabel();
    $suffixActions = $getSuffixActions();
    $suffixIcon = $getSuffixIcon();
    $suffixLabel = $getSuffixLabel();
    $statePath = $getStatePath();
@endphp

<div id="loadingBlockUI">
    <x-filament::loading-indicator class="h-20 w-20" />
    <div class="loading-text pt-4">
        @lang('filament-pki-signer::translations.loading')
    </div>
</div>

<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
    :inline-label-vertical-alignment="\Filament\Support\Enums\VerticalAlignment::Center"
>
<x-filament::input.wrapper
        :disabled="$isDisabled"
        :inline-prefix="$isPrefixInline"
        :inline-suffix="$isSuffixInline"
        :prefix="$prefixLabel"
        :prefix-actions="$prefixActions"
        :prefix-icon="$prefixIcon"
        :prefix-icon-color="$getPrefixIconColor()"
        :suffix="$suffixLabel"
        :suffix-actions="$suffixActions"
        :suffix-icon="$suffixIcon"
        :suffix-icon-color="$getSuffixIconColor()"
        :valid="! $errors->has($statePath)"
        :attributes="
            \Filament\Support\prepare_inherited_attributes($getExtraAttributeBag())
                ->class(['fi-fo-select'])
        "
    >
    <div
        ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('lacuna-certificate-select', 'tupy/filament-pki-signer') }}"
        ax-load-css="{{ \Filament\Support\Facades\FilamentAsset::getStyleHref('filament-pki-signer-styles', 'tupy/filament-pki-signer') }}"
        x-data="lacunaCertificateSelect({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$getStatePath()}')") }},
            webPkiSignature: '{{ $getWebPkiSignature() }}',
            debug: @js($getDebug()),
            canSelectPlaceholder: @js($canSelectPlaceholder),
            isHtmlAllowed: @js($isHtmlAllowed()),
            getOptionLabelUsing: async () => {
                return await $wire.getFormSelectOptionLabel(@js($statePath))
            },
            getOptionLabelsUsing: async () => {
                return await $wire.getFormSelectOptionLabels(@js($statePath))
            },
            getOptionsUsing: async () => {
                return await $wire.getFormSelectOptions(@js($statePath))
            },
            getSearchResultsUsing: async (search) => {
                return await $wire.getFormSelectSearchResults(@js($statePath), search)
            },
            getOptionLabelByCertificateUsing: async (certificate) => {
                return await $wire.getOptionLabelByCertificate(@js($statePath), certificate)
            },
            onWebPkiNotInstalledUsing: async (status, message, params) => {
                return await $wire.onWebPkiNotInstalled(@js($statePath), status, message, params)
            },
            isAutofocused: @js($isAutofocused()),
            isMultiple: @js($isMultiple()),
            isSearchable: @js($isSearchable()),
            livewireId: @js($this->getId()),
            hasDynamicOptions: @js($hasDynamicOptions()),
            hasDynamicSearchResults: @js($hasDynamicSearchResults()),
            loadingMessage: @js($getLoadingMessage()),
            maxItems: @js($getMaxItems()),
            maxItemsMessage: @js($getMaxItemsMessage()),
            noSearchResultsMessage: @js($getNoSearchResultsMessage()),
            options: @js($getOptionsForJs()),
            optionsLimit: @js($getOptionsLimit()),
            placeholder: @js($getPlaceholder()),
            position: @js($getPosition()),
            searchDebounce: @js($getSearchDebounce()),
            searchingMessage: @js($getSearchingMessage()),
            searchPrompt: @js($getSearchPrompt()),
            searchableOptionFields: @js($getSearchableOptionFields()),
            statePath: @js($statePath),
        })"
        wire:ignore
        x-on:keydown.esc="select.dropdown.isActive && $event.stopPropagation()"
        x-on:set-select-property="$event.detail.isDisabled ? select.disable() : select.enable()"
        {{
            $attributes
                ->merge($getExtraAlpineAttributes(), escape: false)
                ->class([
                    '[&_.choices\_\_inner]:ps-0' => $isPrefixInline && (count($prefixActions) || $prefixIcon || filled($prefixLabel)),
                ])
        }}
    >
            <select
                x-ref="input"
                {{
                    $getExtraInputAttributeBag()
                        ->merge([
                            'disabled' => $isDisabled,
                            'id' => $getId(),
                            'multiple' => $isMultiple(),
                        ], escape: false)
                        ->class([
                            'h-9 w-full rounded-lg border-none bg-transparent !bg-none',
                        ])
                }}
            ></select>
    </div>
    </x-filament::input.wrapper>
</x-dynamic-component>



{{-- options filled by output lacuna web-pki --}}
