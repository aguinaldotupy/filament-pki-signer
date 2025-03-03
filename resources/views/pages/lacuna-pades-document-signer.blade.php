<x-filament-panels::page>
    @if(empty($this->signerCert))
        <x-filament-panels::form
            id="form"
            :wire:key="$this->getId() . '.forms.' . $this->form->getStatePath()"
            wire:submit="submit"
        >
            {{ $this->form }}

            @if($this->loading)
                <div>
                    <x-filament::button
                        disabled="true"
                    >
                        <div class="flex justify-between">
                            <x-filament::loading-indicator class="w-6 me-2" />
                            <span class="ps-2">@lang('Processing...')</span>
                        </div>
                    </x-filament::button>
                </div>
            @else
                <x-filament-panels::form.actions
                    :actions="$this->getCachedFormActions()"
                    :full-width="$this->hasFullWidthFormActions()"
                />
            @endif
        </x-filament-panels::form>
    @else
        <x-filament::section>
            <div class="p-4">
                <div class="text-center mb-5">
                    <h1 class="text-2xl font-bold text-gray-900">
                        PAdES Signature with REST PKI
                    </h1>
                    <p class="text-gray-600">
                        File signed successfully!
                    </p>
                </div>

                <x-filament::fieldset>
                    <h2 class="text-lg font-semibold">
                        Signer information
                    </h2>
                    <ul class="mt-2 space">
                        <li>
                            <span class="font-semibold">Subject:</span>
                            <span>{{ $signerCert->subjectName->commonName }}</span>
                        </li>
                        <li>
                            <span class="font-semibold">Email:</span>
                            <span>{{ $signerCert->emailAddress }}</span>
                        </li>

                        @isset($signerCert->pkiBrazil)
                            <li class="pt-4">
                                <span class="font-semibold">ICP-Brasil fields</span>
                                <ul class="mt-2 space">
                                    <li>
                                        <span class="font-semibold">Tipo de certificado:</span>
                                        <span>{{ $signerCert->pkiBrazil->certificateType }}</span>
                                    </li>
                                    <li>
                                        <span class="font-semibold">CPF:</span>
                                        <span>{{ $signerCert->pkiBrazil->cpf }}</span>
                                    </li>
                                    <li>
                                        <span class="font-semibold">Responsavel:</span>
                                        <span>{{ $signerCert->pkiBrazil->responsavel }}</span>
                                    </li>
                                    <li>
                                        <span class="font-semibold">Empresa:</span>
                                        <span>{{ $signerCert->pkiBrazil->companyName }}</span>
                                    </li>
                                    <li>
                                        <span class="font-semibold">CNPJ:</span>
                                        <span>{{ $signerCert->pkiBrazil->cnpj }}</span>
                                    </li>

                                    @isset($signerCert->pkiBrazil->rgNumero)
                                        <li>
                                            <span class="font-semibold">RG:</span>
                                            <span>{{ $signerCert->pkiBrazil->rgNumero }} {{ $signerCert->pkiBrazil->rgEmissor }} {{ $signerCert->pkiBrazil->rgEmissorUF }}</span>
                                        </li>
                                    @endisset

                                    @isset($signerCert->pkiBrazil->oabNumero)
                                        <li>
                                            <span class="font-semibold">OAB:</span>
                                            <span>{{ $signerCert->pkiBrazil->oabNumero }} {{ $signerCert->pkiBrazil->oabUF }}</span>
                                        </li>
                                    @endisset
                                </ul>
                            </li>
                        @endif
                    </ul>
                </x-filament::fieldset>

                <x-filament::actions class="pt-6">
                    {{ $this->getDownloadAction() }}
                </x-filament::actions>
            </div>
        </x-filament::section>
    @endif
</x-filament-panels::page>
