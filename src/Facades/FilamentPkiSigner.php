<?php

namespace Tupy\FilamentPkiSigner\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Tupy\FilamentPkiSigner\FilamentPkiSigner
 */
class FilamentPkiSigner extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Tupy\FilamentPkiSigner\FilamentPkiSigner::class;
    }
}
