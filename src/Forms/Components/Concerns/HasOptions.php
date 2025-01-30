<?php

namespace Tupy\FilamentPkiSigner\Forms\Components\Concerns;

trait HasOptions
{
    public function options(array $options): static
    {
        $this->_options = $options;

        return $this;
    }

    public function getOptions(): array
    {
        return (array) $this->evaluate($this->_options);
    }
}
