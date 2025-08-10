<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/jelajahi-pesan', function () {
    return inertia('Browse');
});

Route::get('/jelajahi-pesan/{id}', function ($id) {
    return inertia('MessageDetail', ['id' => $id]);
});