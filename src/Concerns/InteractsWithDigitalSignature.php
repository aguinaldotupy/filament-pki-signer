<?php

namespace Tupy\FilamentPkiSigner\Concerns;

trait InteractsWithDigitalSignature
{
    use InteractsWithPAdES;
    use InteractWithCertificate;
}
