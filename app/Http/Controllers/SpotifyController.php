<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SpotifyService;

class SpotifyController extends Controller
{
    //  public function search(Request $request, SpotifyService $spotify)
    // {
    //     // $request->validate([
    //     //     'query' => 'required|string|min:2',
    //     // ]);

    //     // $tracks = $spotify->searchTrack($request->query('query'));

    //     // $results = collect($tracks)->map(function ($track) {
    //     //     return [
    //     //         'id' => $track['id'],
    //     //         'title' => $track['name'],
    //     //         'artist' => collect($track['artists'])->pluck('name')->join(', '),
    //     //         'image' => $track['album']['images'][0]['url'] ?? null,
    //     //         'preview_url' => $track['preview_url'],
    //     //     ];
    //     // });

    //     // return response()->json($results);
        
    // }
    protected $spotifyService;

    public function __construct(SpotifyService $spotifyService)
    {
        $this->spotifyService = $spotifyService;
    }

    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string'
        ]);

        $results = $this->spotifyService->searchTrack($request->q);
        $tracks = collect($results)->map(function ($track) {
            return [
                'id' => $track['id'],
                'title' => $track['name'],
                'artist' => collect($track['artists'])->pluck('name')->join(', '),
                'image' => $track['album']['images'][0]['url'] ?? null,
                'preview_url' => $track['preview_url'],
            ];
        });
        // $tracks = collect($results); // tanpa map
        return response()->json($tracks);
    }
}
