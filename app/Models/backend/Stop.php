<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    use HasFactory;
    protected $table = "stop";
    protected $fillable = [
        'name_mission',
        'out_set',
        'out_reset',
        'in_on',
        'in_off',
        'in_pullup',
        'in_pulldown',
        'data'
    ];
    public $timestamps = false;
}