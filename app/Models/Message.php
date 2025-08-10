<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['nama', 'pesan', 'lagu'];


    protected $casts = [
        'lagu' => 'array',
        'is_active' => 'boolean',
    ];

}
