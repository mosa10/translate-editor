<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sentence extends Model
{
    use HasFactory;

    protected $table = 'sentence';

    protected $fillable = [
        'range',
        'source',
        'source_tag',
        'target',
        'target_tag',
    ];
}
