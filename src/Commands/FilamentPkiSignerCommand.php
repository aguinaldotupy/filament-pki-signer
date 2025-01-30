<?php

namespace Tupy\FilamentPkiSigner\Commands;

use Illuminate\Console\Command;

class FilamentPkiSignerCommand extends Command
{
    public $signature = 'filament-pki-signer';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
