<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionGpioModule extends Model
{
    use HasFactory;
    protected $table = "mission_gpio_modules";
    protected $fillable = [
        'name',
        'name_gpio_module',
        'time_out',
        'mode',
        'out_set',
        'out_reset',
        'in_on',
        'in_off',
        'in_pullup',
        'in_pulldown',
    ];
    public $timestamps = false;
}
