<?php

namespace Tupy\FilamentPkiSigner\Enum\Lacuna;

enum InstallationStatesEnum: int
{
    case INSTALLED = 0;
    case NOT_INSTALLED = 1;
    case OUTDATED = 2;
    case BROWSER_NOT_SUPPORTED = 3;
}
