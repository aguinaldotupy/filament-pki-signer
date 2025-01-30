<?php

namespace Tupy\FilamentPkiSigner\Forms\Components\Concerns;

use Closure;

trait HasActions
{
    public Closure | bool | null $_readableCertificate = null;
}
