<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WakeUp extends Model
{
    use HasFactory;
    protected $table = "wake_up";
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