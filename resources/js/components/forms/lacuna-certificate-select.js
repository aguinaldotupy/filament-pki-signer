import Choices from 'choices.js'
import { LacunaWebPKI } from 'web-pki';

export default function lacunaCertificateSelect({
    state,
    webPkiSignature,
    debug = false,
    canSelectPlaceholder,
    isHtmlAllowed,
    getOptionLabelUsing,
    getOptionLabelsUsing,
    getOptionsUsing,
    getSearchResultsUsing,
    isAutofocused,
    isMultiple,
    isSearchable,
    hasDynamicOptions,
    hasDynamicSearchResults,
    loadingMessage,
    maxItems,
    maxItemsMessage,
    noSearchResultsMessage,
    options,
    optionsLimit,
    placeholder,
    position,
    searchPrompt,
    searchableOptionFields,
    statePath,
    onWebPkiNotInstalledUsing,
}) {
    return {
        isSearching: false,

        selectedOptions: [],

        isStateBeingUpdated: false,

        state,

        certificates: [],

        debug,

        selectInput: null,

        /** @type {LacunaWebPKI} */
        pki: null,

        select: null,

        token: null,

        blockUIElement: null,

        init: async function () {

            this.blockUIElement = document.getElementById('loadingBlockUI');

            this.select = new Choices(this.$refs.input, {
                allowHTML: isHtmlAllowed,
                duplicateItemsAllowed: false,
                itemSelectText: '',
                loadingText: loadingMessage,
                maxItemCount: maxItems ?? -1,
                maxItemText: (maxItemCount) =>
                    window.pluralize(maxItemsMessage, maxItemCount, {
                        count: maxItemCount,
                    }),
                noChoicesText: searchPrompt,
                noResultsText: noSearchResultsMessage,
                placeholderValue: placeholder,
                position: position ?? 'auto',
                removeItemButton: canSelectPlaceholder,
                renderChoiceLimit: optionsLimit,
                searchEnabled: isSearchable,
                searchFields: searchableOptionFields ?? ['label'],
                searchPlaceholderValue: searchPrompt,
                searchResultLimit: optionsLimit,
                shouldSort: false,
                searchFloor: hasDynamicSearchResults ? 0 : 1,
            })

            await this.refreshChoices({ withInitialOptions: true })

            if (![null, undefined, ''].includes(this.state)) {
                this.select.setChoiceByValue(this.formatState(this.state))
            }

            this.refreshPlaceholder()

            if (isAutofocused) {
                this.select.showDropdown()
            }

            this.$refs.input.addEventListener('change', () => {
                this.refreshPlaceholder()

                if (this.isStateBeingUpdated) {
                    return
                }

                this.isStateBeingUpdated = true
                this.state = this.select.getValue(true) ?? null
                this.$nextTick(() => (this.isStateBeingUpdated = false))
            })

            this.$watch('state', async () => {
                if (!this.select) {
                    return
                }

                this.refreshPlaceholder()

                if (this.isStateBeingUpdated) {
                    return
                }

                await this.refreshChoices({
                    withInitialOptions: !hasDynamicOptions,
                })
            })

            this.log('Initializing Web PKI component ...', state);

            this.showLoadingBlockUI();

            this.pki = new LacunaWebPKI(webPkiSignature);

            await this.pki.init({
                ready: () => {
                    this.pki.listCertificates()
                        .success(async (certs) => {
                            this.certificates = certs;

                            this.select.clearChoices()

                            await this.select.setChoices([
                                {
                                    label: loadingMessage,
                                    value: '',
                                    disabled: true,
                                },
                            ])

                            this.log('Get options from certificates ...', statePath, certs);

                            let options = await this.$wire.generateSelectOptionsFromCertificates(statePath, certs);

                            this.setChoices(options);

                            this.hiddenLoadingBlockUI();
                        });
                },
                notInstalled: async (status, message) => {
                    this.log('Web PKI not installed.');

                    this.hiddenLoadingBlockUI();

                    let params = {
                        installUrl: this.pki._installUrl,
                        brand: this.pki.brand || '',
                        jslib: this.pki._jslibVersion,
                        returnUrl: window.location.href
                    };

                    onWebPkiNotInstalledUsing(status, message, params);
                },
                defaultError: (error) => {
                    this.log('An error has occurred: ' + error);

                    this.hiddenLoadingBlockUI();
                }
            });

            this.$wire.on('signPAdES', (event) => {
                this.token = event.token;
                this.log('Signing PAdES ...', this.state, this.token, event);
                this.signPAdES();
            });
        },
        log(...args) {
            if (!this.debug) {
                return;
            }

            console.debug(args);
        },
        signPAdES: async function () {
            this.log('Signing PAdES ...', this.state);

            //TODO: Add loading state

            await this.pki.signWithRestPki({
                token: this.token,
                thumbprint: this.state
            }).success(() => {
                // Once the operation is completed, we submit the form.
                this.$wire.dispatch('signedPAdES', {
                    token: this.token,
                    thumbprint: this.state
                });
            });
        },

        destroy: function () {
            this.select.destroy()
            this.select = null
        },

        refreshChoices: async function (config = {}) {
            const choices = await this.getChoices(config)

            if (!this.select) {
                return
            }

            this.select.clearStore()

            this.refreshPlaceholder()

            this.setChoices(choices)

            if (![null, undefined, ''].includes(this.state)) {
                this.select.setChoiceByValue(this.formatState(this.state))
            }
        },

        setChoices: function (choices) {
            this.select.setChoices(choices, 'value', 'label', true)
        },

        getChoices: async function (config = {}) {
            const existingOptions = await this.getExistingOptions(config)

            return existingOptions.concat(
                await this.getMissingOptions(existingOptions),
            )
        },

        getExistingOptions: async function ({ search, withInitialOptions }) {
            if (withInitialOptions) {
                return options
            }

            let results = []

            if (search !== '' && search !== null && search !== undefined) {
                results = await getSearchResultsUsing(search)
            } else {
                results = await getOptionsUsing()
            }

            return results.map((result) => {
                if (result.choices) {
                    result.choices = result.choices.map((groupedOption) => {
                        groupedOption.selected = Array.isArray(this.state)
                            ? this.state.includes(groupedOption.value)
                            : this.state === groupedOption.value

                        return groupedOption
                    })

                    return result
                }

                result.selected = Array.isArray(this.state)
                    ? this.state.includes(result.value)
                    : this.state === result.value

                return result
            })
        },

        refreshPlaceholder: function () {
            if (isMultiple) {
                return
            }

            this.select._renderItems()

            if (![null, undefined, ''].includes(this.state)) {
                return
            }

            this.$el.querySelector('.choices__list--single').innerHTML =
                `<div class="choices__placeholder choices__item">${placeholder ?? ''
                }</div>`
        },

        formatState: function (state) {
            if (isMultiple) {
                return (state ?? []).map((item) => item?.toString())
            }

            return state?.toString()
        },

        getMissingOptions: async function (existingOptions) {
            let state = this.formatState(this.state)

            if ([null, undefined, '', [], {}].includes(state)) {
                return {}
            }

            const existingOptionValues = new Set()

            existingOptions.forEach((existingOption) => {
                if (existingOption.choices) {
                    existingOption.choices.forEach((groupedExistingOption) =>
                        existingOptionValues.add(groupedExistingOption.value),
                    )

                    return
                }

                existingOptionValues.add(existingOption.value)
            })

            if (isMultiple) {
                if (state.every((value) => existingOptionValues.has(value))) {
                    return {}
                }

                return (await getOptionLabelsUsing())
                    .filter((option) => !existingOptionValues.has(option.value))
                    .map((option) => {
                        option.selected = true

                        return option
                    })
            }

            if (existingOptionValues.has(state)) {
                return existingOptionValues
            }

            return [
                {
                    label: await getOptionLabelUsing(),
                    value: state,
                    selected: true,
                },
            ]
        },

        showLoadingBlockUI: function () {
            if (this.blockUIElement) {
                this.blockUIElement.style.display = 'flex';
            }
        },

        hiddenLoadingBlockUI: function () {
            if (this.blockUIElement) {
                this.blockUIElement.style.display = 'none';
            }
        }
    }
};
