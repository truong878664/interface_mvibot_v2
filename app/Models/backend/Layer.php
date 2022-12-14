<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    use HasFactory;
    protected $table = "layer_emulator";
    protected $fillable = [
        'yawo',
        'height',
        'width',
        'name_map_active',
        'name_layer',
        'type_layer',
        'xo',
        'yo',
    ];
    public $timestamps = false;
}