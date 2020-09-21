<?php

namespace App\Models\Users;

use Laravel\Passport\Passport;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use League\OAuth2\Server\CryptKey;

class AccessToken extends \Laravel\Passport\Token
{
    /**
     * Generate a JWT from the access token
     *
     * @return string
     */
    public function convertToJWT()
    {
        $privateKey = new CryptKey(
            'file://' . Passport::keyPath('oauth-private.key'),
            null,
            false
        );

        return (string) (new Builder())
            ->setAudience($this->client_id)
            ->setId($this->id, true)
            ->setIssuedAt(time())
            ->setNotBefore(time())
            ->setExpiration($this->expires_at->getTimestamp())
            ->setSubject($this->user->id)
            ->set('scopes', [])
            ->sign(new Sha256(), new Key($privateKey->getKeyPath(), $privateKey->getPassPhrase()))
            ->getToken();
    }
}