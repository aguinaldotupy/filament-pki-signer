<?php

namespace Tupy\FilamentPkiSigner\Service;

use Lacuna\RestPki\RestPkiClient;
use Tupy\FilamentPkiSigner\FilamentPkiSignerPlugin;

class RestPkiService
{
    public RestPkiClient $restPkiClient;

    public function __construct() {}

    public function makeClient(): self
    {
        $plugin = FilamentPkiSignerPlugin::get();

        $this->restPkiClient = new RestPkiClient(
            endpointUrl: $plugin->getEndpoint(),
            accessToken: $plugin->getAccessKey()
        );

        return $this;
    }

    public function getRestPkiClient(): RestPkiClient
    {
        return $this->restPkiClient;
    }
}
