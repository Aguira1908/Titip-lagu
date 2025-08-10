<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class SpotifyService
{
    protected $clientId;
    protected $clientSecret;

    public function __construct()
    {
        $this->clientId = config('services.spotify.client_id');
        $this->clientSecret = config('services.spotify.client_secret');
    }

    private function getAccessToken()
    {
        return Cache::remember('spotify_access_token', 3500, function () {
            $response = Http::asForm()
                ->withBasicAuth($this->clientId, $this->clientSecret)
                ->post('https://accounts.spotify.com/api/token', [
                    'grant_type' => 'client_credentials',
                ]);

            if ($response->failed()) {
                throw new \Exception('Failed to get Spotify token');
            }

            return $response->json()['access_token'];
        });
    }

    public function searchTrack($query)
    {
        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->get('https://api.spotify.com/v1/search', [
                'q' => $query,
                'type' => 'track',
                'limit' => 10,
            ]);

        if ($response->failed()) {
            throw new \Exception('Spotify search failed');
        }

        return $response->json()['tracks']['items'];
    }
}
