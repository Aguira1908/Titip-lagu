<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\Api\MessageController;

Route::get('/messages', [MessageController::class, 'index']); // GET all messages (paginated)
Route::post('/messages', [MessageController::class, 'store']); // POST new message
Route::get('/messages/byname/{nama}', [MessageController::class, 'show']); // GET by name


Route::get('/spotify/search', [SpotifyController::class, 'search']);
